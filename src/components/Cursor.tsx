import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [variant, setVariant] = useState<"default" | "grab" | "open">("default");
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='grab']")) setVariant("grab");
      else if (t.closest("[data-cursor='open']")) setVariant("open");
      else setVariant("default");
    };
    // Hide the dot when the pointer leaves the window instead of leaving it stranded.
    const leave = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseout", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        animate={{
          scale: variant === "default" ? 1 : variant === "grab" ? 1.6 : 2.2,
          rotate: variant === "open" ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-3 w-3 rounded-full bg-[var(--tape-red)] mix-blend-multiply" />
        {variant === "grab" && (
          <span className="absolute left-5 top-0 whitespace-nowrap rounded bg-[var(--ink)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--cream)]">
            grab
          </span>
        )}
        {variant === "open" && (
          <span className="absolute left-5 top-0 whitespace-nowrap rounded bg-[var(--tape-red)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
            open me
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
