import { motion } from "motion/react";
import type { ReactNode } from "react";

interface StickerProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
  color?: "red" | "pink" | "yellow" | "blue" | "green" | "purple" | "cream";
  draggable?: boolean;
}

const colorMap = {
  red: "bg-[var(--tape-red)] text-white",
  pink: "bg-[var(--tape-pink)] text-[var(--ink)]",
  yellow: "bg-[var(--tape-yellow)] text-[var(--ink)]",
  blue: "bg-[var(--sticker-blue)] text-white",
  green: "bg-[var(--sticker-green)] text-[var(--ink)]",
  purple: "bg-[var(--sticker-purple)] text-[var(--ink)]",
  cream: "bg-[var(--cream)] text-[var(--ink)]",
};

export function Sticker({
  children,
  className = "",
  rotate = 0,
  color = "yellow",
  draggable = true,
}: StickerProps) {
  return (
    <motion.div
      drag={draggable}
      dragMomentum={false}
      dragElastic={0.4}
      whileHover={{ scale: 1.08, rotate: rotate + 2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate }}
      animate={{ rotate }}
      style={{ rotate: `${rotate}deg` }}
      className={`inline-block cursor-grab active:cursor-grabbing select-none px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-sticker ${colorMap[color]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Tape({
  className = "",
  rotate = 0,
  color = "red",
  label,
}: {
  className?: string;
  rotate?: number;
  color?: "red" | "pink" | "yellow";
  label?: string;
}) {
  const bg =
    color === "red"
      ? "bg-[var(--tape-red)]/85 text-white"
      : color === "pink"
        ? "bg-[var(--tape-pink)]/85 text-[var(--ink)]"
        : "bg-[var(--tape-yellow)]/85 text-[var(--ink)]";
  return (
    <div
      style={{ rotate: `${rotate}deg` }}
      className={`tape-edge texture-tape font-mono text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center ${bg} ${className}`}
    >
      {label && (
        <span className="opacity-80">
          {label} · {label} · {label}
        </span>
      )}
    </div>
  );
}
