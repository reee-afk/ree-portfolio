import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Cursor } from "@/components/Cursor";
import { Sticker, Tape } from "@/components/Sticker";
import { caseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/case/$id")({
  component: CaseStudyPage,
  beforeLoad: ({ params }) => {
    if (!caseStudies[params.id]) throw notFound();
  },
  head: ({ params }) => {
    const cs = caseStudies[params.id];
    const title = cs ? `${cs.name} — ${cs.title} · Ritika Goel` : "Case Study · Ritika Goel";
    const desc = cs?.subtitle ?? "Case study by Ritika 'Ree' Goel.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

const accentMap = {
  red: "bg-[var(--tape-red)]",
  blue: "bg-[var(--sticker-blue)]",
  purple: "bg-[var(--sticker-purple)]",
} as const;

function CaseStudyPage() {
  const { id } = Route.useParams();
  const cs = caseStudies[id];
  if (!cs) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Cursor />
      <Nav />

      <article className="relative mx-auto max-w-4xl px-4 pb-24 pt-28 md:pt-36">
        {/* back link */}
        <Link
          to="/"
          hash="work"
          data-cursor="grab"
          className="inline-block rounded-full bg-[var(--ink)] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--cream)] shadow-sticker transition-transform hover:-rotate-2 hover:scale-105"
        >
          ← back to the goods
        </Link>

        {/* header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <Sticker color="yellow" rotate={-3}>
              Case study
            </Sticker>
            <Sticker color="pink" rotate={2}>
              {cs.name}
            </Sticker>
          </div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="mt-6 type-h1 text-balance-tight text-[var(--ink)]"
          >
            {cs.title}
          </motion.h1>
          <p className="mt-4 max-w-2xl type-lede text-[var(--ink)]/80">{cs.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {cs.tags.map((t) => (
              <span
                key={t}
                className="rounded-sm bg-[var(--ink)] px-2 py-1 type-tag text-[var(--cream)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 type-eyebrow text-[var(--muted-foreground)]">
            <span>✦ {cs.role}</span>
            <span>✦ {cs.timeline}</span>
          </div>
        </header>

        {/* cover */}
        <motion.div
          initial={{ opacity: 0, rotate: -1.5, y: 20 }}
          animate={{ opacity: 1, rotate: -1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 90 }}
          className="relative mt-10"
        >
          <Tape
            color="red"
            label="handle with care"
            rotate={-3}
            className="absolute -top-4 left-8 z-10 h-7 w-48"
          />
          <div className="overflow-hidden rounded-md border border-[var(--ink)]/15 bg-[var(--cream)] p-3 shadow-paper">
            <img
              src={cs.cover}
              alt={cs.coverAlt}
              className="block h-auto w-full rounded-sm object-cover"
            />
          </div>
        </motion.div>

        {/* sections */}
        <div className="mt-16 space-y-14">
          {cs.sections.map((s, i) => (
            <motion.section
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`rounded-sm px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-sticker ${accentMap[cs.accent]}`}
                  style={{ rotate: `${i % 2 ? 2 : -2}deg` }}
                >
                  {s.label} · phase
                </span>
                <h2 className="type-h3 text-[var(--ink)]">{s.title}</h2>
              </div>
              <div className="space-y-3 type-body text-[var(--ink)]/85">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 rounded-sm border border-dashed border-[var(--ink)]/25 bg-[var(--cream)] px-4 py-2.5 type-body text-[var(--ink)]/80 shadow-sticker"
                    >
                      <span className="mt-0.5 text-[var(--tape-red)]">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* outcomes */}
        <section className="mt-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {cs.outcomes.map((o, i) => (
              <motion.div
                key={o.l}
                initial={{ opacity: 0, y: 16, rotate: i % 2 ? 1.5 : -1.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                className="rounded-md border border-[var(--ink)]/15 bg-[var(--cream)] p-5 text-center shadow-paper"
              >
                <div className="font-display text-4xl text-[var(--tape-red)]">{o.n}</div>
                <div className="mt-2 type-eyebrow text-[var(--ink)]/70">{o.l}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* behance CTA */}
        <motion.a
          href={cs.behanceUrl}
          target="_blank"
          rel="noopener noreferrer external"
          data-cursor="grab"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="relative mt-14 block rounded-md border-2 border-[var(--ink)] bg-[var(--highlighter-yellow,#FFE95C)] px-6 py-8 text-center shadow-paper md:px-10"
        >
          <Tape
            color="red"
            label="the full story"
            rotate={-4}
            className="absolute -top-4 left-1/2 z-10 h-7 w-40 -translate-x-1/2"
          />
          <p className="type-eyebrow text-[var(--ink)]/70">
            this is just the taster ✦ the full unboxing lives on behance
          </p>
          <span className="mt-3 block type-h2 text-[var(--ink)]">
            Explore case{" "}
            <span className="font-serif-display italic text-[var(--tape-red)]">in depth</span> ↗
          </span>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--cream)] shadow-sticker">
            open the full case study on behance
          </span>
        </motion.a>

        {/* footer nav */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-[var(--ink)]/25 pt-8">
          <Link
            to="/"
            hash="work"
            data-cursor="grab"
            className="rounded-full bg-[var(--tape-red)] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-sticker transition-transform hover:scale-105"
          >
            ← more parcels
          </Link>
          <p className="font-hand text-2xl text-[var(--tape-red)]">— packed with care ✿</p>
        </div>
      </article>
    </div>
  );
}
