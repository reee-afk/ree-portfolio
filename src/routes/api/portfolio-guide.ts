import { createFileRoute } from "@tanstack/react-router";
import { handlePortfolioGuide } from "@/lib/ai/portfolio-guide.server";

export const Route = createFileRoute("/api/portfolio-guide")({
  server: {
    handlers: {
      POST: ({ request }) => handlePortfolioGuide(request),
    },
  },
});
