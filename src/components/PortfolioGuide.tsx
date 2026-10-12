"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "motion/react";
import { DefaultChatTransport } from "ai";
import { ChevronDown, MessageCircle, PackageOpen, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

const transport = new DefaultChatTransport({ api: "/api/portfolio-guide" });
const suggestions = ["Which case should I open?", "What does Ree do?", "How can I contact Ree?"];

export function PortfolioGuide() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, stop } = useChat({
    transport,
    onError: (chatError) =>
      setError(chatError.message || "This parcel got a little lost. Please try again."),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setError(null);
    void sendMessage({ text: question });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.aside
            aria-label="Ree's Portfolio Guide"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="mb-3 flex h-[min(590px,calc(100vh-7rem))] w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-md border-2 border-[var(--ink)] bg-[var(--cream)] shadow-box"
          >
            <div className="texture-kraft relative flex min-h-16 items-center gap-3 border-b-2 border-[var(--ink)] px-4 text-[var(--cream)]">
              <div className="flex size-10 rotate-[-3deg] items-center justify-center border-2 border-dashed border-[var(--cream)] bg-[var(--tape-red)] font-display text-sm font-semibold shadow-sticker">
                RG
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold leading-none">Portfolio Guide</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-80">
                  ask what’s inside
                </p>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Close portfolio guide"
                onClick={() => setOpen(false)}
                className="text-[var(--cream)] hover:bg-[var(--cream)]/15 hover:text-[var(--cream)]"
              >
                <ChevronDown />
              </Button>
              <span
                aria-hidden
                className="absolute -bottom-2 left-20 h-4 w-24 rotate-[-2deg] bg-[var(--tape-yellow)]/80"
              />
            </div>

            <Conversation className="min-h-0">
              <ConversationContent className="gap-4 p-4">
                <Message from="assistant">
                  <MessageContent className="font-sans text-sm leading-relaxed">
                    Hi! I’m Ree’s tiny portfolio guide. Ask me about her work, process, or where to
                    find things.
                  </MessageContent>
                </Message>

                {messages.length === 0 && (
                  <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => ask(suggestion)}
                        className="h-auto whitespace-normal rounded-full border-dashed border-[var(--ink)]/40 bg-[var(--tape-yellow)]/55 px-3 py-1.5 text-left font-mono text-[10px] leading-snug text-[var(--ink)] hover:bg-[var(--tape-yellow)]"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}

                {messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "bg-[var(--ink)] px-3 py-2 text-[var(--cream)]"
                          : "font-sans text-sm leading-relaxed"
                      }
                    >
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <MessageResponse key={`${message.id}-${index}`}>
                            {part.text}
                          </MessageResponse>
                        ) : null,
                      )}
                    </MessageContent>
                  </Message>
                ))}

                {status === "submitted" && (
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <PackageOpen className="size-4" />
                    <Shimmer className="font-mono text-xs">Unpacking an answer…</Shimmer>
                  </div>
                )}
                {error && (
                  <p
                    role="alert"
                    className="border-l-4 border-[var(--tape-red)] bg-[var(--tape-pink)]/25 px-3 py-2 font-sans text-xs text-[var(--ink)]"
                  >
                    {error}
                  </p>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <div className="border-t-2 border-dashed border-[var(--ink)]/25 bg-[var(--cream)] p-3">
              <PromptInput
                onSubmit={(message) => ask(message.text)}
                className="rounded-md border-2 border-[var(--ink)]/30 bg-[var(--card)] shadow-none"
              >
                <PromptInputTextarea
                  ref={inputRef}
                  aria-label="Ask about Ree's portfolio"
                  placeholder="Ask about a project…"
                  disabled={busy}
                  className="min-h-12 font-sans text-sm"
                />
                <PromptInputFooter className="justify-end pt-0">
                  <PromptInputSubmit
                    status={status}
                    onStop={stop}
                    className="bg-[var(--tape-red)] text-[var(--primary-foreground)] hover:bg-[var(--tape-red)]/90"
                  />
                </PromptInputFooter>
              </PromptInput>
              <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)]">
                conversation resets on refresh
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <Button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close portfolio guide" : "Open portfolio guide"}
        onClick={() => setOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 rotate-[3deg] rounded-md border-2 border-[var(--ink)] bg-[var(--tape-red)] text-[var(--primary-foreground)] shadow-sticker transition-transform hover:rotate-0 hover:bg-[var(--tape-red)]/90 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3"
      >
        {open ? <X /> : <MessageCircle />}
        <span className="hidden font-mono text-xs uppercase tracking-widest sm:inline">
          Ask Ree’s guide
        </span>
      </Button>
    </div>
  );
}
