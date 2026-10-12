import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server.ts";

const SYSTEM_PROMPT = `You are Ree's Portfolio Guide, a warm, concise guide inside Ritika "Ree" Goel's portfolio.

Only answer questions about Ritika, her portfolio, projects, design process, skills, contact details, and navigation. If asked about anything unrelated, gently say you only know what's packed inside Ree's portfolio and invite a portfolio question. Never invent facts. Keep answers under 120 words unless the visitor explicitly requests more detail. Use friendly plain language and occasional packaging metaphors, but do not overdo them. Markdown is welcome.

Portfolio facts:
- Ritika Goel, also called Ree, is a researcher and product designer.
- Her approach is empathy-led, research-driven, detail-focused, human-centered, and shaped by curiosity and emotion.
- PAHAL: "45kg on Their Backs, Every Day". Ethnographic fieldwork in Sainji Village about hill farmers carrying 30–45kg loads. The proposed smart load support shifts weight from spine to hips and uses accessible, terrain-appropriate materials. Role: Researcher & Product Designer.
- NODUS: "Can You Trust an AI You Can't See Think?". Research-driven UX exploring trust, transparency, and critical thinking in multi-agent AI. It visualizes agent reasoning so people can trace and challenge decisions. Role: UX Researcher & Designer.
- AccessiNav: "Built for Eyes That Don't Guide the Way". An accessibility-first navigation concept using audio, haptic feedback, high contrast, and screen-reader-native flows for visually impaired users. Role: UX Designer.
- Each project card opens a portfolio case page. Each case page includes an Explore case in depth link to the complete Behance case study.
- The site also includes a voice note beside About Ree, downloadable Postcards from Ree, and an interactive Postcard Lab.
- Contact: ritikagoell369@gmail.com. Behance: behance.net/ritikagoel3. LinkedIn: linkedin.com/in/ritika-goel-85b549365. Instagram: instagram.com/reereeereee_.
- The top navigation has About, Case Studies (the section is titled "The Goods"), Postcards, Playground (the Postcard Lab), Contact, and Resume.`;

// Limits keep a public, credit-metered endpoint from being used as a free AI proxy.
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1_000;
const MAX_OUTPUT_TOKENS = 600;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best effort: counts live per server instance, so this slows abuse rather than
// guaranteeing a global cap.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  if (requestLog.size > 5_000) {
    for (const [k, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) requestLog.delete(k);
    }
  }
  return recent.length > RATE_LIMIT;
}

function clientKey(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous"
  );
}

function messageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

// The chat client shows the response body as the error message, so errors are plain text.
function textError(message: string, status: number) {
  return new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

function errorMessage(status: number) {
  if (status === 402)
    return "The guide is taking a little break because its AI credits need topping up.";
  if (status === 429)
    return "The guide is receiving too many notes right now. Please try again shortly.";
  return "The guide could not unpack that answer. Please try again.";
}

export async function handlePortfolioGuide(request: Request) {
  try {
    if (isRateLimited(clientKey(request))) {
      return textError(errorMessage(429), 429);
    }

    let body: { messages?: unknown };
    try {
      body = (await request.json()) as { messages?: unknown };
    } catch {
      return textError("Please send a portfolio question.", 400);
    }
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return textError("Please send a portfolio question.", 400);
    }

    // Only visitor and guide turns are accepted; anything else (e.g. a "system" turn
    // trying to override the instructions) is dropped.
    const messages = (body.messages as UIMessage[])
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && Array.isArray(m.parts))
      .slice(-MAX_MESSAGES);
    const last = messages.at(-1);
    if (!last || last.role !== "user" || !messageText(last).trim()) {
      return textError("Please send a portfolio question.", 400);
    }
    if (messages.some((m) => messageText(m).length > MAX_MESSAGE_CHARS)) {
      return textError(
        `That note is a bit long — please keep questions under ${MAX_MESSAGE_CHARS} characters.`,
        413,
      );
    }

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return textError("The portfolio guide is not configured yet.", 503);
    }

    const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      abortSignal: request.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    return withLovableAiGatewayRunIdHeader(
      result.toUIMessageStreamResponse({ originalMessages: messages, sendReasoning: false }),
      runIdFetch,
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return new Response(null, { status: 499 });
    }
    console.error(error);
    const status =
      typeof error === "object" && error && "statusCode" in error ? Number(error.statusCode) : 500;
    const safeStatus = Number.isInteger(status) && status >= 400 && status < 600 ? status : 500;
    return textError(errorMessage(safeStatus), safeStatus);
  }
}
