import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import resumeAsset from "@/assets/resume.asset.json";

const items = [
  // Root-relative so the links also work from /case/* pages.
  { label: "About", href: "/#about", color: "yellow" },
  { label: "Case Studies", href: "/#work", color: "pink" },
  { label: "Postcards", href: "/#postcards", color: "red" },
  { label: "Playground", href: "/#playground", color: "yellow" },
  { label: "Contact", href: "/#contact", color: "red" },
] as const;

const map = {
  yellow: "bg-[var(--tape-yellow)] text-[var(--ink)]",
  pink: "bg-[var(--tape-pink)] text-[var(--ink)]",
  red: "bg-[var(--tape-red)] text-white",
};

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-3 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <a href="/#top" className="flex items-center gap-2 font-serif-display text-2xl italic">
          <span className="rounded-full bg-[var(--tape-red)] px-3 py-0.5 text-white">Ree</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)] sm:inline">
            shipment #2026
          </span>
        </a>

        {/* desktop nav */}
        <ul className="hidden flex-wrap items-center justify-end gap-1.5 lg:flex">
          {items.map((it, i) => (
            <motion.li
              key={it.label}
              initial={{ y: -20, opacity: 0, rotate: (i % 2 ? 1 : -1) * 2 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 200 }}
              whileHover={{ y: -3, rotate: i % 2 ? -3 : 3 }}
              style={{ rotate: `${(i % 2 ? 1 : -1) * 1.5}deg` }}
            >
              <a
                href={it.href}
                data-cursor="grab"
                className={`block px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sticker ${map[it.color]}`}
              >
                {it.label}
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ y: -3, rotate: -3 }}
            style={{ rotate: "-1.5deg" }}
          >
            <a
              href={resumeAsset.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="grab"
              className="block px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sticker bg-[var(--ink)] text-[var(--cream)]"
            >
              ✦ Resume
            </a>
          </motion.li>
        </ul>

        {/* mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={resumeAsset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--cream)] border-2 border-[var(--ink)] px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]"
          >
            ✦ Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative h-10 w-10 rounded-full bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute left-4 right-4 top-full mt-2 rounded-md border border-[var(--ink)]/15 bg-[var(--cream)] p-4 shadow-box lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider shadow-sticker ${map[it.color]}`}
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
