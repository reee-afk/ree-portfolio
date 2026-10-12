import ticker from "@/assets/ticker.png";

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y-2 border-dashed border-[var(--ink)]/30 bg-[var(--cream)] py-2">
      <div className="flex whitespace-nowrap animate-marquee">
        <img
          src={ticker}
          alt="Researching ideas, designing meanings — Ree"
          className="h-16 md:h-20 w-auto max-w-none pr-4 select-none"
          draggable={false}
        />
        <img
          src={ticker}
          alt=""
          aria-hidden
          className="h-16 md:h-20 w-auto max-w-none pr-4 select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
