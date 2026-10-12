import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Item = {
  id: number;
  label: string;
  color: "red" | "pink" | "yellow" | "blue" | "green" | "purple";
  x: number;
  y: number;
  rotate: number;
};

const TRAY = [
  { label: "★ awwwards", color: "red" as const },
  { label: "coffee · 3", color: "yellow" as const },
  { label: "made in figma", color: "blue" as const },
  { label: "scrapbook brain", color: "pink" as const },
  { label: "research = love", color: "green" as const },
  { label: "kraft + chaos", color: "purple" as const },
  { label: "doodle daily", color: "yellow" as const },
  { label: "ship it ♡", color: "red" as const },
  { label: "tape > glue", color: "blue" as const },
  { label: "est. 2020", color: "pink" as const },
  { label: "cat approved", color: "green" as const },
  { label: "handle w/ care", color: "purple" as const },
  { label: "✿ hand-made", color: "pink" as const },
  { label: "fragile ☼", color: "red" as const },
  { label: "✶ overthinker", color: "blue" as const },
  { label: "pixel pusher", color: "purple" as const },
  { label: "ramen fuel", color: "yellow" as const },
  { label: "plant parent", color: "green" as const },
  { label: "✎ sketch club", color: "pink" as const },
  { label: "deadline ✗", color: "yellow" as const },
  { label: "♪ lo-fi only", color: "blue" as const },
  { label: "midnight oil", color: "purple" as const },
  { label: "snail mail", color: "green" as const },
];

const colorMap = {
  red: "bg-[var(--tape-red)] text-white",
  pink: "bg-[var(--tape-pink)] text-[var(--ink)]",
  yellow: "bg-[var(--tape-yellow)] text-[var(--ink)]",
  blue: "bg-[var(--sticker-blue)] text-white",
  green: "bg-[var(--sticker-green)] text-[var(--ink)]",
  purple: "bg-[var(--sticker-purple)] text-[var(--ink)]",
};

export function PostcardComposer() {
  const [items, setItems] = useState<Item[]>([]);
  const [stamped, setStamped] = useState(false);
  const [sent, setSent] = useState(false);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  function addItem(label: string, color: Item["color"]) {
    const rect = surfaceRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 600;
    const h = rect?.height ?? 380;
    setItems((prev) => [
      ...prev,
      {
        id: nextId.current++,
        label,
        color,
        x: w * (0.15 + Math.random() * 0.55),
        y: h * (0.2 + Math.random() * 0.55),
        rotate: (Math.random() - 0.5) * 18,
      },
    ]);
  }

  function reset() {
    setItems([]);
    setStamped(false);
    setSent(false);
  }

  const [dropped, setDropped] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function send() {
    setSent(true);
    timers.current = [
      setTimeout(() => setDropped(true), 1500),
      setTimeout(() => {
        setDropped(false);
        reset();
      }, 2600),
    ];
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      {/* POSTCARD */}
      <div className="relative">
        {/* mailbox catch target */}
        <motion.div
          initial={false}
          animate={sent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute -bottom-4 right-6 z-30 flex flex-col items-center"
        >
          <motion.div
            animate={dropped ? { rotate: [0, -8, 6, -3, 0], y: [0, -4, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-16 w-20 rounded-t-2xl bg-[var(--tape-red)] border-2 border-[var(--ink)] shadow-sticker"
          >
            <div className="absolute inset-x-2 top-2 h-1.5 rounded-sm bg-[var(--ink)]/70" />
            <div className="absolute -right-1 top-6 h-6 w-2 rounded-r bg-[var(--ink)]" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-widest text-white/90">
              mail
            </div>
          </motion.div>
          <div className="h-3 w-3 bg-[var(--ink)]" />
        </motion.div>

        <motion.div
          animate={
            sent
              ? {
                  x: [0, 80, 180, 260, 320],
                  y: [0, -120, -160, -80, 80],
                  rotate: [0, -8, 4, 14, 26],
                  scale: [1, 0.95, 0.8, 0.55, 0.25],
                  opacity: [1, 1, 1, 1, 0],
                }
              : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1], times: [0, 0.25, 0.5, 0.8, 1] }}
          ref={surfaceRef}
          className="relative aspect-[5/3] w-full overflow-hidden rounded-sm bg-[var(--cream)] shadow-paper border border-[var(--ink)]/15"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0 0 0 / 0.04) 1px, transparent 1px), radial-gradient(oklch(0.4 0.05 60 / 0.06) 1px, transparent 1px), linear-gradient(to right, oklch(0.55 0.14 250 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.55 0.14 250 / 0.18) 1px, transparent 1px)",
            backgroundSize: "3px 3px, 5px 5px, 44px 44px, 44px 44px",
          }}
        >
          {/* center divider */}
          <div className="pointer-events-none absolute inset-y-6 left-1/2 w-px bg-[var(--ink)]/20" />

          {/* postmark stamp area */}
          <div className="pointer-events-none absolute right-6 top-6 h-20 w-24 border-2 border-dashed border-[var(--ink)]/30 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/40">
            stamp
          </div>

          <AnimatePresence>
            {stamped && (
              <motion.div
                initial={{ scale: 2.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="absolute right-4 top-4 z-20 rounded-full border-4 border-[var(--tape-red)] px-3 py-2 text-center font-display text-[10px] leading-tight text-[var(--tape-red)]"
                style={{ rotate: "-12deg" }}
              >
                <div>POSTED</div>
                <div className="font-mono text-[8px]">REE · 2026</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* return address */}
          <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/60">
            from: your studio
            <br />
            to: ree
          </div>

          {/* draggable stickers */}
          {items.map((it) => (
            <motion.div
              key={it.id}
              drag
              dragConstraints={surfaceRef}
              dragMomentum={false}
              dragElastic={0.2}
              initial={{ scale: 0, rotate: it.rotate }}
              animate={{ scale: 1, rotate: it.rotate }}
              whileDrag={{ scale: 1.1, zIndex: 30 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              style={{ left: it.x, top: it.y, position: "absolute" }}
              className={`cursor-grab active:cursor-grabbing select-none px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sticker ${colorMap[it.color]}`}
              onDoubleClick={() => setItems((prev) => prev.filter((x) => x.id !== it.id))}
            >
              {it.label}
            </motion.div>
          ))}

          {/* empty hint */}
          {items.length === 0 && !sent && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif-display text-2xl italic text-[var(--ink)]/30">
              tap a sticker →
            </div>
          )}
        </motion.div>

        {/* controls */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setStamped(true)}
            disabled={stamped || sent}
            data-cursor="grab"
            className="rounded-full border-2 border-[var(--ink)] bg-[var(--cream)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest shadow-sticker hover:bg-[var(--tape-yellow)] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ✦ Stamp it
          </button>
          <button
            onClick={send}
            disabled={!stamped || sent || items.length === 0}
            data-cursor="grab"
            className="rounded-full bg-[var(--tape-red)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-sticker hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ✉ Send postcard
          </button>
          <button
            onClick={reset}
            data-cursor="grab"
            className="ml-auto font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/60 hover:text-[var(--tape-red)] underline-offset-4 hover:underline"
          >
            clear all
          </button>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/40">
          double-click a sticker to peel it off
        </p>
      </div>

      {/* TRAY */}
      <div className="relative rounded-md border-2 border-dashed border-[var(--ink)]/25 bg-[var(--cream)]/60 p-4">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/60">
          <span>sticker tray · tap to drop</span>
          <span className="rounded-sm bg-[var(--ink)] px-1.5 py-0.5 text-[8px] text-[var(--cream)]">
            {TRAY.length} pcs
          </span>
        </div>

        <div className="relative max-h-[420px] overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2">
            {TRAY.map((t, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, rotate: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addItem(t.label, t.color)}
                data-cursor="grab"
                className={`select-none px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sticker ${colorMap[t.color]}`}
              >
                {t.label}
              </motion.button>
            ))}
          </div>

          {/* plastic wrap sheen */}
          <div
            className="pointer-events-none absolute inset-0 rounded-sm mix-blend-overlay opacity-70"
            style={{
              background:
                "linear-gradient(115deg, oklch(1 0 0 / 0.35) 0%, oklch(1 0 0 / 0) 18%, oklch(1 0 0 / 0) 38%, oklch(1 0 0 / 0.22) 46%, oklch(1 0 0 / 0) 54%, oklch(1 0 0 / 0) 72%, oklch(1 0 0 / 0.3) 88%, oklch(1 0 0 / 0) 100%), repeating-linear-gradient(115deg, oklch(1 0 0 / 0.04) 0 2px, transparent 2px 6px)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-sm opacity-40"
            style={{
              background:
                "radial-gradient(120% 60% at 20% 0%, oklch(1 0 0 / 0.35), transparent 55%), radial-gradient(80% 50% at 90% 100%, oklch(1 0 0 / 0.25), transparent 60%)",
            }}
          />
        </div>

        {/* crinkle tape corners */}
        <div className="pointer-events-none absolute -top-2 left-6 h-4 w-12 rotate-[-6deg] bg-[var(--tape-yellow)]/80 shadow-sticker" />
        <div className="pointer-events-none absolute -bottom-2 right-8 h-4 w-14 rotate-[4deg] bg-[var(--tape-pink)]/80 shadow-sticker" />

        <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/50">
          ✂ tear open · {TRAY.length} stickers inside
        </p>
      </div>
    </div>
  );
}
