import { motion } from "motion/react";
import type { ReactNode } from "react";

const tagStyle = "bg-[var(--ink)] text-[var(--cream)] border border-[var(--ink)]/20";

interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  tags: string[];
  variant: "case" | "branding" | "research" | "playground" | "ux";
}

const tapeColors = {
  case: "var(--sticker-blue)",
  branding: "var(--tape-red)",
  research: "var(--sticker-purple)",
  playground: "var(--tape-yellow)",
  ux: "var(--sticker-green)",
};

const accentColors = {
  case: "bg-[var(--sticker-blue)]",
  branding: "bg-[var(--tape-red)]",
  research: "bg-[var(--sticker-purple)]",
  playground: "bg-[var(--tape-yellow)]",
  ux: "bg-[var(--sticker-green)]",
};

export function ProjectCard({
  project,
  rotate = 0,
  children,
}: {
  project: Project;
  rotate?: number;
  children?: ReactNode;
}) {
  return (
    <motion.article
      data-cursor="grab"
      whileHover={{ y: -10, rotate: rotate + 1, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ rotate: `${rotate}deg` }}
      className="group relative cursor-pointer overflow-hidden rounded-md border border-[var(--ink)]/15 bg-[var(--cream)] p-5 shadow-paper"
    >
      {/* top tape strip */}
      <div
        className="absolute left-0 right-0 top-0 h-2"
        style={{ backgroundColor: tapeColors[project.variant] }}
      />

      {/* shipping label */}
      <div className="relative z-10 mb-4 flex items-start justify-between gap-3 border-b border-dashed border-[var(--ink)]/15 pb-3">
        <div>
          <div className="type-eyebrow text-[var(--muted-foreground)]">Package #{project.id}</div>
          <div className="type-eyebrow mt-1 inline-block rounded-sm bg-[var(--ink)]/10 px-1.5 py-0.5 text-[var(--ink)]">
            ▸ {project.category}
          </div>
        </div>
        <div className="relative z-20 shrink-0 rounded-full border border-[var(--ink)]/10 bg-[var(--cream)] px-3 py-1 type-tag text-[var(--ink)] shadow-sticker">
          ✦ shipped
        </div>
      </div>

      <h3 className="type-h3 text-balance-tight text-[var(--ink)]">{project.title}</h3>
      <p className="mt-2 type-body text-[var(--ink)]/75">{project.tagline}</p>

      {children}

      <div className="mt-3 flex flex-wrap gap-1">
        {project.tags.map((t) => (
          <span key={t} className={`px-2 py-1 type-tag rounded-sm ${tagStyle}`}>
            {t}
          </span>
        ))}
      </div>

      {/* small corner stamp */}
      <div
        className={`absolute -bottom-3 -right-3 h-10 w-10 rotate-12 rounded-sm ${accentColors[project.variant]} opacity-90 shadow-sticker`}
      />
    </motion.article>
  );
}

export type { Project };
