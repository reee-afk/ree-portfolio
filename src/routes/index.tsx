import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Cursor } from "@/components/Cursor";
import { Box } from "@/components/Box";
import { Sticker, Tape } from "@/components/Sticker";
import { Marquee } from "@/components/Marquee";
import { VoiceNote } from "@/components/VoiceNote";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import { PostcardComposer } from "@/components/PostcardComposer";
import portrait from "@/assets/box-portrait.jpg";
import pahalCover from "@/assets/case-pahal.png";
import nodusCover from "@/assets/case-nodus.png";
import accessinavCover from "@/assets/case-accessinav.png";
import postcardRee from "@/assets/postcard-ree.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ritika — Unboxing My Creative World" },
      {
        name: "description",
        content:
          "Portfolio of Ritika 'Ree' Goel — researcher and product designer crafting experiences where curiosity meets emotion.",
      },
      { property: "og:title", content: "Ritika — Unboxing My Creative World" },
      {
        property: "og:description",
        content:
          "Portfolio of Ritika 'Ree' Goel — researcher and product designer crafting experiences where curiosity meets emotion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ritika — Unboxing My Creative World" },
      {
        name: "twitter:description",
        content:
          "Portfolio of Ritika 'Ree' Goel — researcher and product designer crafting experiences where curiosity meets emotion.",
      },
    ],
  }),
});

const projects: Project[] = [
  {
    id: "pahal",
    title: "45kg on Their Backs, Every Day",
    category: "Case Study",
    tagline:
      "An ethnographic and human-centered design project addressing load carrying challenges in Sainji Village through ergonomic innovation.",
    tags: ["Ergonomics", "Rural Innovation", "Human-Centered Design"],
    variant: "research",
  },
  {
    id: "nodus",
    title: "Can You Trust an AI You Can't See Think?",
    category: "Case Study",
    tagline:
      "Research-driven UX design exploring trust, transparency, and critical thinking in agentic AI systems.",
    tags: ["Agentic AI", "Explainable AI", "Human-Centered Design"],
    variant: "case",
  },
  {
    id: "accessinav",
    title: "Built for Eyes That Don't Guide the Way",
    category: "Case Study",
    tagline:
      "An accessibility-focused UX solution enhancing navigation for visually impaired users.",
    tags: ["Accessible Interfaces", "Usability", "Digital Equity"],
    variant: "research",
  },
];

function Index() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden">
      <Cursor />
      <Nav />

      {/* HERO */}
      <section className="relative px-4 pb-40 pt-28 md:pb-56 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <Sticker color="yellow" rotate={-3}>
              Portfolio · 2026
            </Sticker>
            <Sticker color="pink" rotate={2}>
              Handle with love
            </Sticker>
          </div>

          <h1 className="text-center font-display leading-[0.92] text-[var(--ink)]">
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
              className="block text-[clamp(3.5rem,12vw,9.5rem)] font-bold"
            >
              Unboxing
            </motion.span>
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 80 }}
              className="block text-[clamp(1.8rem,6.5vw,5rem)] font-normal"
            >
              my creative{" "}
              <span className="relative inline-block font-serif-display italic font-normal text-[var(--tape-red)]">
                world
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-center type-lede text-[var(--ink)]/80"
          >
            "Born to create, raised by deadlines — with a heart full of art and caffeine."
          </motion.p>

          <p className="mx-auto mt-3 max-w-xl text-center type-eyebrow text-[var(--muted-foreground)]">
            Researcher · Product Designer · Curiosity meets Emotion
          </p>

          {/* Box */}
          <div className="relative mt-10">
            <Sticker color="red" rotate={-8} className="absolute left-2 top-0 z-10 md:left-12">
              ↓ open me ↓
            </Sticker>
            <Sticker color="yellow" rotate={6} className="absolute right-4 top-10 z-10 md:right-20">
              📦 from: Ree Studio
            </Sticker>
            <Box />
          </div>
          <div className="h-12 md:h-16" />
        </div>
      </section>

      <Marquee />

      {/* ABOUT */}
      <section id="about" className="relative px-4 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="relative">
            <Tape
              color="red"
              label="shipment manifest"
              rotate={-3}
              className="absolute -top-4 left-8 z-10 h-7 w-56"
            />
            <motion.div
              initial={{ rotate: -2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative aspect-square overflow-hidden bg-[var(--cream)] p-3 shadow-paper"
            >
              <img
                src={portrait}
                alt="Ritika Goel peeking from a creative box"
                className="h-full w-full object-cover"
              />
              <Sticker
                color="pink"
                rotate={8}
                className="absolute bottom-4 right-4"
                draggable={false}
              >
                ♥ Ree
              </Sticker>
            </motion.div>
          </div>

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 type-eyebrow text-[var(--muted-foreground)]">
              <span className="h-px w-8 bg-[var(--ink)]" /> Package Insert · 01
            </div>
            <div className="flex items-center gap-4">
              <h2 className="type-h2 text-[var(--ink)]">
                About <span className="text-[var(--tape-red)]">Ree</span>
              </h2>
              <VoiceNote />
            </div>
            <p className="mt-6 type-lede text-[var(--ink)]/90">
              I'm Ritika Goel — a researcher and product designer who treats every project like a
              careful little parcel.
            </p>
            <p className="mt-4 max-w-prose type-body text-[var(--ink)]/80">
              To me, design is more than aesthetics — it's a process of discovery, empathy, and
              innovation. I build products that are meaningful, intuitive, and human-centered.
              Welcome to my creative space, where ideas evolve into purposeful design and curiosity
              drives every project.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Sticker color="purple" rotate={-3}>
                Empathy-led
              </Sticker>
              <Sticker color="green" rotate={2}>
                Research-driven
              </Sticker>
              <Sticker color="yellow" rotate={-1}>
                Detail-obsessed
              </Sticker>
              <Sticker color="blue" rotate={4}>
                Caffeine-powered
              </Sticker>
            </div>

            <p className="mt-8 font-hand text-3xl text-[var(--tape-red)]">
              — packed with curiosity ✿
            </p>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative overflow-hidden px-4 py-24">
        {/* playful background ornaments */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-6 top-16 h-40 w-40 rounded-full bg-[var(--tape-yellow)]/30 blur-2xl" />
          <div className="absolute right-10 top-1/3 h-52 w-52 rounded-full bg-[var(--tape-pink)]/30 blur-3xl" />
          <div className="absolute bottom-20 left-1/3 h-44 w-44 rounded-full bg-[var(--sticker-green)]/25 blur-3xl" />
          {/* dotted grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              color: "var(--ink)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* HEADER as a shipping manifest card */}
          <div className="relative mb-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-2 type-eyebrow text-[var(--muted-foreground)]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--tape-red)] animate-pulse" />
                  Inventory · 3 items · ready to ship
                </div>
                <h2 className="type-h2 text-[var(--ink)]">
                  The{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 font-display text-[var(--tape-red)]">Goods</span>
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                      className="absolute -bottom-1 left-0 h-3 w-full origin-left bg-[var(--tape-yellow)]/70"
                    />
                  </span>
                </h2>
              </div>

              <div className="relative max-w-sm">
                <p className="type-lede text-[var(--ink)]/80">
                  "A few little parcels. Open any one — each holds a story, a problem, and a small
                  obsession."
                </p>
                <p className="mt-3 font-hand text-2xl text-[var(--tape-red)]">
                  — packed with care ✿
                </p>
              </div>
            </div>
          </div>

          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const cover =
                p.id === "pahal" ? pahalCover : p.id === "nodus" ? nodusCover : accessinavCover;
              const card = (
                <ProjectCard key={p.id} project={p} rotate={((i % 3) - 1) * 1.2}>
                  <div className="mt-3 overflow-hidden rounded-sm border border-[var(--ink)]/15 bg-[#1f2d44] shadow-sticker">
                    <img
                      src={cover}
                      alt={`${p.title} — case study cover`}
                      loading="lazy"
                      className="block h-auto w-full object-cover"
                    />
                    <div className="border-t border-dashed border-[var(--ink)]/20 bg-[var(--cream)] px-2 py-1.5 text-center type-tag font-normal text-[var(--tape-red)]">
                      ▸ tap to open case study
                    </div>
                  </div>
                </ProjectCard>
              );
              return (
                <Link
                  key={p.id}
                  to="/case/$id"
                  params={{ id: p.id }}
                  data-cursor="grab"
                  className="block cursor-pointer"
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* POSTCARDS FROM REE — cute dedicated nook */}
      <section id="postcards" className="relative px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="type-eyebrow text-[var(--muted-foreground)]">
              Special delivery · just for you
            </div>
            <h2 className="mt-2 type-h2 text-[var(--ink)]">
              Postcards from{" "}
              <span className="font-serif-display italic text-[var(--tape-red)]">Ree</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md type-lede text-[var(--ink)]/70">
              Tiny letters of art, mailed straight from the heart.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                type="button"
                data-cursor="grab"
                whileHover={{ y: -8, rotate: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                className="group relative mx-auto block w-full max-w-md cursor-pointer"
              >
                {/* envelope */}
                <div
                  style={{ rotate: "-2deg" }}
                  className="relative overflow-hidden rounded-md border-2 border-[var(--ink)]/20 bg-[var(--cream)] p-8 shadow-paper"
                >
                  <Tape
                    color="pink"
                    rotate={-6}
                    label="par avion"
                    className="absolute -top-3 left-6 h-7 w-40"
                  />
                  <Sticker color="red" rotate={8} className="absolute -right-3 -top-3">
                    ★ 5¢
                  </Sticker>

                  <div className="aspect-[5/3] flex flex-col items-center justify-center rounded-sm border border-dashed border-[var(--ink)]/30 bg-[#fdf6ee] p-4">
                    <div className="type-eyebrow text-[var(--muted-foreground)]">
                      sealed envelope
                    </div>
                    <div className="mt-3 font-hand text-5xl text-[var(--tape-red)] leading-none">
                      ♥ open me ♥
                    </div>
                    <div className="mt-3 font-serif-display italic text-[var(--ink)]/70">
                      a little note inside
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between type-tag font-normal text-[var(--ink)]/60">
                    <span>from: ree ✿</span>
                    <span className="text-[var(--tape-red)]">▸ tap to read</span>
                  </div>
                </div>
              </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
              <motion.div
                initial={{ rotate: -4, scale: 0.85, opacity: 0 }}
                animate={{ rotate: -1.5, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="relative"
              >
                <img
                  src={postcardRee}
                  alt="Handwritten postcard from Ree — always find time for the things that make you feel happy to be alive"
                  className="w-full h-auto rounded-md shadow-paper"
                />
                <Sticker color="yellow" rotate={-8} className="absolute -top-4 -left-4">
                  with love ♥
                </Sticker>
                <a
                  href={postcardRee}
                  download="postcard-from-ree.png"
                  data-cursor="grab"
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-[var(--tape-red)] px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white shadow-paper transition-transform hover:scale-105 active:scale-95"
                >
                  <span>↓ save postcard</span>
                </a>
              </motion.div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* RESEARCH STRIP / horizontal scroll */}
      <section id="research" className="relative py-20">
        <div className="mx-auto mb-8 max-w-7xl px-4">
          <div className="type-eyebrow text-[var(--muted-foreground)]">
            Featured case study · horizontal pull
          </div>
          <h2 className="mt-2 type-h2 text-[var(--ink)]">
            Pull the <span className="text-[var(--tape-red)]">Tray →</span>
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto px-4 pb-6 [scrollbar-width:thin] snap-x">
          {[
            {
              t: "Discover",
              c: "Field interviews, diary studies, and a wall of sticky notes.",
              color: "blue",
            },
            {
              t: "Define",
              c: "From 200+ insights to 3 sharp problem statements.",
              color: "yellow",
            },
            {
              t: "Design",
              c: "Sketches, lo-fi flows, prototypes, taped on the wall.",
              color: "pink",
            },
            { t: "Deliver", c: "A shippable product packed with intention.", color: "green" },
            {
              t: "Reflect",
              c: "Postcards to my future self — what I'd do differently.",
              color: "purple",
            },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
              className="snap-start min-w-[280px] md:min-w-[360px] rounded-md bg-[var(--cream)] p-6 shadow-paper border-2 border-dashed border-[var(--ink)]/20"
            >
              <Sticker color={s.color as "blue"} rotate={-3} draggable={false}>
                0{i + 1} · phase
              </Sticker>
              <h3 className="mt-4 type-h3 text-[var(--ink)]">{s.t}</h3>
              <p className="mt-3 type-lede text-[var(--ink)]/75">{s.c}</p>
              <div className="mt-6 h-1 w-12 bg-[var(--tape-red)]" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLAYGROUND — postcard composer */}
      <section id="playground" className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="type-eyebrow text-[var(--muted-foreground)]">
              Mini game · build a postcard
            </div>
            <h2 className="mt-2 type-h2 text-[var(--ink)]">
              <span className="text-[var(--tape-red)]">Post</span>card lab
            </h2>
            <p className="mx-auto mt-4 max-w-xl type-lede text-[var(--ink)]/70">
              Pick stickers, arrange the mess, stamp it, send it off.
            </p>
          </div>

          <div className="mt-12">
            <PostcardComposer />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="relative texture-kraft rounded-md p-8 md:p-14 shadow-box">
            <Tape
              color="yellow"
              rotate={-4}
              label="open here"
              className="absolute -top-3 left-1/2 h-7 w-64 -translate-x-1/2"
            />
            <div className="text-center text-[var(--cream)]">
              <div className="type-eyebrow opacity-80">Return address</div>
              <h2 className="mt-3 type-h2">
                Let's ship
                <br />
                something{" "}
                <span className="font-serif-display italic text-[var(--tape-yellow)] lowercase">
                  together.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg font-serif-display text-xl italic opacity-90">
                Have a brief, a half-baked idea, or just want to say hi? My inbox is always taking
                deliveries.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:ritikagoell369@gmail.com"
                  data-cursor="grab"
                  className="rounded-full bg-[var(--tape-red)] px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-white shadow-sticker hover:scale-105 transition"
                >
                  ✉ ritikagoell369@gmail.com
                </a>
                <a
                  href="https://www.behance.net/ritikagoel3"
                  target="_blank"
                  rel="noopener noreferrer external"
                  data-cursor="grab"
                  className="rounded-full bg-[var(--cream)] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink)] shadow-sticker"
                >
                  Behance
                </a>
                <a
                  href="https://www.linkedin.com/in/ritika-goel-85b549365/"
                  target="_blank"
                  rel="noopener noreferrer external"
                  data-cursor="grab"
                  className="rounded-full bg-[var(--cream)] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink)] shadow-sticker"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/reereeereee_/"
                  target="_blank"
                  rel="noopener noreferrer external"
                  data-cursor="grab"
                  className="rounded-full bg-[var(--cream)] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink)] shadow-sticker"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative texture-kraft mt-10 px-4 py-12 text-[var(--cream)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-display text-3xl">Ree Studio</div>
            <p className="mt-2 max-w-sm font-serif-display text-lg italic opacity-80">
              Packed with curiosity and shipped with love.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded border-2 border-dashed border-[var(--cream)]/60 px-3 py-2 type-tag font-normal">
              ✦ tracking #RG-2026
            </div>
            <div className="rounded bg-[var(--tape-red)] px-3 py-2 type-tag font-normal text-white">
              ✓ delivered with care
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-dashed border-[var(--cream)]/30 pt-4 type-tag font-normal opacity-70">
          © 2026 Ritika "Ree" Goel · Handle with love
        </div>
      </footer>
    </div>
  );
}
