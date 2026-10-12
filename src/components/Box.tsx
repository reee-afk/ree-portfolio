import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import boxClosed from "@/assets/box-closed.jpg";
import boxOpen from "@/assets/box-open.jpg";

export function Box() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <button
        onClick={() => setIsOpen(true)}
        disabled={isOpen}
        aria-label="Open the box"
        className="group relative mx-auto block w-full aspect-[4/3] cursor-pointer disabled:cursor-default focus:outline-none"
      >
        {/* floating confetti / sticker bits when opened */}
        <AnimatePresence>
          {isOpen && (
            <>
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.5, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -80 - Math.random() * 120,
                    x: (Math.random() - 0.5) * 240,
                    scale: [0.5, 1, 0.8],
                    rotate: (Math.random() - 0.5) * 360,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.04, ease: "easeOut" }}
                  className="pointer-events-none absolute left-1/2 top-1/3 z-20 h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      i % 4 === 0
                        ? "var(--tape-red)"
                        : i % 4 === 1
                          ? "var(--tape-yellow)"
                          : i % 4 === 2
                            ? "var(--sticker-blue)"
                            : "var(--sticker-green)",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* closed box lid */}
        <motion.div
          className="absolute inset-0 origin-bottom"
          initial={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          animate={{
            opacity: isOpen ? 0 : 1,
            y: isOpen ? -40 : 0,
            rotateX: isOpen ? -110 : 0,
            scale: isOpen ? 0.96 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformPerspective: 1000, backfaceVisibility: "hidden" }}
        >
          <img
            src={boxClosed}
            alt="Closed creative shipping box"
            className="w-full select-none rounded-sm shadow-box"
            draggable={false}
          />
        </motion.div>

        {/* open box */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, y: 30, rotateX: 15, scale: 0.94 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 30,
            rotateX: isOpen ? 0 : 15,
            scale: isOpen ? 1 : 0.94,
          }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformPerspective: 1000 }}
        >
          <img
            src={boxOpen}
            alt="Open box revealing portfolio assets"
            className="w-full select-none rounded-sm shadow-box"
            draggable={false}
          />
          {/* soft inner glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pointer-events-none absolute inset-0 rounded-sm shadow-[inset_0_0_60px_oklch(0.95_0.05_90/0.5)]"
          />
        </motion.div>

        {/* click to unbox CTA */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="pointer-events-none absolute -bottom-6 left-1/2 z-30 -translate-x-1/2"
            >
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--ink)] px-6 py-3 type-tag text-[var(--cream)] shadow-paper ring-1 ring-[var(--cream)]/25"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--cream)] text-[8px] text-[var(--ink)]">
                  ▶
                </span>
                click to unbox
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
