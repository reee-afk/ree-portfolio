import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import feastImg from "@/assets/food/feast.webp";
import mathriImg from "@/assets/food/mathri.webp";
import malpuaImg from "@/assets/food/malpua.webp";
import kheerImg from "@/assets/food/kheer.webp";
import spreadImg from "@/assets/food/spread.webp";
import micImg from "@/assets/food/mic.webp";

export const Route = createFileRoute("/celebrate_/food")({
  head: () => ({
    meta: [
      { title: "Festival Food — What your festival tastes like" },
      {
        name: "description",
        content: "Today's dish, the Diwali thali and recipes from your family's kitchen.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap",
      },
    ],
  }),
  component: FoodScreen,
});

/* Drawn on a 390 × 1525 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';
const mono = '"JetBrains Mono", ui-monospace, monospace';

const INK = "#231815";
const WINE = "#9b1c22";
const MUTED = "#6b605a";
const CARD = "#fffcf7";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: u(width), height: u(height) };
}

const cardStyle: CSSProperties = {
  background: CARD,
  border: "1px solid #ecdcc4",
  boxShadow: "0 3px 10px rgba(150, 110, 60, 0.08)",
};

const DISHES = [
  {
    id: "mathri",
    day: 1,
    festival: "Dhanteras",
    name: "Mathri",
    note: "Crispy, flaky, made fresh",
    img: mathriImg,
    alt: "A brass plate of mathri beside a glass of chai.",
  },
  {
    id: "malpua",
    day: 2,
    festival: "Choti Diwali",
    name: "Malpua",
    note: "Sweet fried pancakes\nsoaked in syrup",
    img: malpuaImg,
    alt: "Syrup-soaked malpua topped with pistachio and rose petals.",
  },
  {
    id: "kheer",
    day: 3,
    festival: "Lakshmi Puja",
    name: "Kheer",
    note: "Rice pudding — the\nclassic puja offering",
    img: kheerImg,
    alt: "A brass bowl of kheer garnished with nuts and rose petals.",
  },
];

/** Bar heights of Nani's voice-note waveform, in artboard units. */
const WAVE = [7, 11, 16, 9, 20, 13, 24, 17, 10, 22, 15, 8, 19, 12, 7, 14, 9, 5];
const NOTE_SECONDS = 45;

function FoodScreen() {
  const [selected, setSelected] = useState("mathri");

  return (
    <main className="flex min-h-screen items-start justify-center bg-white sm:py-10">
      <style>{`
        .utsav-carousel { scrollbar-width: none; }
        .utsav-carousel::-webkit-scrollbar { display: none; }
        @keyframes utsav-wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.5); } }
        .utsav-playing .utsav-wavebar { animation: utsav-wave 0.9s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .utsav-playing .utsav-wavebar { animation: none; } }
      `}</style>
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{ aspectRatio: "390 / 1525", containerType: "inline-size", background: "#f9f4ec" }}
      >
        <div
          className="absolute inset-0"
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          <Header />
          <Hero />
          <TodaysDish />

          <SectionTitle top={647} icon={<BowlIcon />}>
            The Diwali <span style={{ color: WINE }}>thali</span>
          </SectionTitle>
          <p
            style={{
              position: "absolute",
              left: u(17.5),
              top: u(677.5),
              margin: 0,
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: u(13),
              lineHeight: u(16),
              color: MUTED,
            }}
          >
            5 days, 5 dishes
          </p>
          <div
            className="utsav-carousel"
            role="listbox"
            aria-label="The Diwali thali"
            style={{
              ...box(0, 705, 390, 234),
              display: "flex",
              gap: u(14),
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              padding: `${u(4)} ${u(16.5)} 0`,
              scrollPaddingLeft: u(16.5),
            }}
          >
            {DISHES.map((d) => (
              <DishCard
                key={d.id}
                dish={d}
                selected={selected === d.id}
                onSelect={() => setSelected(d.id)}
              />
            ))}
          </div>

          <WhyWeEat />

          <SectionTitle top={1147.5} icon={<PeopleIcon />}>
            From your family’s <span style={{ color: WINE }}>kitchen</span>
          </SectionTitle>
          <VoiceNote />

          <button
            type="button"
            className="group cursor-pointer text-left transition-[background-color] duration-150 hover:bg-[#fff8ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
            style={{
              ...box(17.5, 1335.5, 355, 40.3),
              padding: 0,
              borderRadius: u(13),
              color: INK,
              ...cardStyle,
            }}
          >
            <span
              aria-hidden
              style={{
                ...box(16.5, 12.4, 15.5, 15.5),
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                border: "1px solid #cfae86",
                color: "#a2856b",
                fontFamily: sans,
                fontSize: u(9),
                lineHeight: 1,
              }}
            >
              +
            </span>
            <span
              style={{
                position: "absolute",
                left: u(40.5),
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                fontFamily: serif,
                fontWeight: 600,
                fontSize: u(16.4),
                lineHeight: 1,
              }}
            >
              Add your family’s version
            </span>
            <svg
              viewBox="0 0 6 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-150 group-hover:translate-x-0.5"
              style={box(335, 16.5, 4, 7)}
            >
              <path
                d="m1 1 4 4-4 4"
                stroke="#a2856b"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <TabBar />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <>
      <svg viewBox="0 0 84 12" fill="none" aria-hidden style={box(153, 24, 84, 12)}>
        <path d="M0 9h33l5-3.2 4-3.3 4 3.3 5 3.2h33" stroke="#a83a35" strokeWidth="1.1" />
        <circle cx="42" cy="2.6" r="1.8" fill="#a83a35" />
      </svg>
      <h1
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(44),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(38),
          lineHeight: u(46),
          letterSpacing: "-0.005em",
        }}
      >
        Festival <span style={{ color: WINE }}>Food</span>
      </h1>
      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(99.5),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: u(18),
          lineHeight: u(22),
          letterSpacing: "0.035em",
          color: "#4a3d37",
        }}
      >
        What your festival tastes like
      </p>
      <svg viewBox="0 0 114 10" fill="none" aria-hidden style={box(138, 130.6, 114, 10)}>
        <defs>
          <linearGradient id="food-rule-l" x1="0" x2="1">
            <stop offset="0" stopColor="#b5504a" stopOpacity="0" />
            <stop offset="1" stopColor="#b5504a" />
          </linearGradient>
          <linearGradient id="food-rule-r" x1="1" x2="0">
            <stop offset="0" stopColor="#b5504a" stopOpacity="0" />
            <stop offset="1" stopColor="#b5504a" />
          </linearGradient>
        </defs>
        <rect x="0" y="4.6" width="47" height="0.8" fill="url(#food-rule-l)" />
        <rect x="67" y="4.6" width="47" height="0.8" fill="url(#food-rule-r)" />
        <path d="M57 1.2 60.8 5 57 8.8 53.2 5Z" fill="#a8302b" />
      </svg>
    </>
  );
}

function Hero() {
  return (
    <div
      style={{
        ...box(17.5, 158, 355, 199),
        borderRadius: u(22),
        background: "linear-gradient(180deg, #f1e3c7 0%, #eedcbc 100%)",
        boxShadow: `0 ${u(4)} ${u(12)} rgba(150, 110, 50, 0.16), inset 0 0 0 ${u(1)} rgba(210, 180, 130, 0.6)`,
      }}
    >
      <img
        src={feastImg}
        alt="A festive spread of Diwali sweets and savouries beneath lamps and marigold garlands."
        style={{
          ...box(10.5, 7, 334, 185),
          objectFit: "cover",
          borderRadius: u(12),
          boxShadow: `0 0 0 ${u(1)} rgba(120, 80, 30, 0.25)`,
        }}
      />
    </div>
  );
}

function Pill({ children, style }: { children: ReactNode; style: CSSProperties }) {
  return (
    <button
      type="button"
      className="group cursor-pointer transition-[filter] duration-150 hover:brightness-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: u(6),
        padding: 0,
        borderRadius: u(15),
        border: "1px solid #ecc9bd",
        background: "#fbeae3",
        color: WINE,
        fontFamily: sans,
        fontWeight: 500,
        fontSize: u(12.8),
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-150 group-hover:translate-x-0.5"
        style={{ fontSize: u(10) }}
      >
        →
      </span>
    </button>
  );
}

function Corner({ style }: { style: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      style={{ position: "absolute", width: u(7.5), height: u(7.5), ...style }}
    >
      <path d="M1 10C1 5 4 1.5 9 1" stroke="#a8302b" strokeWidth="1.3" />
      <circle cx="8.7" cy="1.3" r="1.1" fill="#a8302b" />
    </svg>
  );
}

function TodaysDish() {
  return (
    <article
      aria-labelledby="todays-dish"
      style={{ ...box(17.5, 381, 355, 232), borderRadius: u(16), ...cardStyle }}
    >
      <Corner style={{ left: u(5.5), top: u(5.5) }} />
      <Corner style={{ right: u(5.5), bottom: u(5.5), transform: "rotate(180deg)" }} />
      <p
        style={{
          ...box(16.5, 18.7, 140, 16),
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: u(7),
          fontFamily: sans,
          fontWeight: 500,
          fontSize: u(13),
          lineHeight: 1,
          color: "#4a3f3a",
        }}
      >
        Today’s dish
        <SmallDiya style={{ width: u(14), height: u(9) }} />
      </p>
      <p
        style={{
          position: "absolute",
          left: u(16.5),
          top: u(40.5),
          margin: 0,
          fontFamily: sans,
          fontWeight: 600,
          fontSize: u(11),
          lineHeight: u(12),
          letterSpacing: "0.04em",
          color: "#8f7d70",
        }}
      >
        DHANTERAS · DAY 1
      </p>
      <h2
        id="todays-dish"
        style={{
          position: "absolute",
          left: u(16.5),
          top: u(57),
          margin: 0,
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(31),
          lineHeight: u(38),
          color: WINE,
        }}
      >
        Mathri
      </h2>
      <p
        style={{
          position: "absolute",
          left: u(16.5),
          top: u(100.8),
          width: u(200),
          margin: 0,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(14.4),
          lineHeight: u(18.5),
          color: "#3e3430",
        }}
      >
        The crispy, flaky snack made fresh before Diwali — served with pickle and chai, eaten while
        decorating the house.
      </p>
      <Pill style={box(16.5, 187.5, 104.6, 28.5)}>See recipe</Pill>
      <img
        src={mathriImg}
        alt="A brass plate of mathri beside a glass of chai."
        style={{
          ...box(224, 54, 116, 120),
          objectFit: "cover",
          borderRadius: u(10),
          boxShadow: `0 ${u(2)} ${u(6)} rgba(80, 50, 20, 0.18)`,
        }}
      />
    </article>
  );
}

function SectionTitle({
  top,
  icon,
  children,
}: {
  top: number;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <span aria-hidden style={{ ...box(17.5, top + 4, 17, 14), display: "block" }}>
        {icon}
      </span>
      <h2
        style={{
          position: "absolute",
          left: u(37),
          top: u(top),
          margin: 0,
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(23),
          lineHeight: u(26),
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </h2>
    </>
  );
}

function DishCard({
  dish,
  selected,
  onSelect,
}: {
  dish: (typeof DISHES)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      className="cursor-pointer transition-[border-color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
      style={{
        position: "relative",
        flex: "none",
        width: u(122.5),
        height: u(225),
        padding: 0,
        borderRadius: u(13),
        scrollSnapAlign: "start",
        background: CARD,
        border: `1px solid ${selected ? "#d9a3a3" : "#ecdcc4"}`,
        boxShadow: selected
          ? "0 3px 10px rgba(155, 28, 34, 0.1)"
          : "0 3px 10px rgba(150, 110, 60, 0.07)",
        color: INK,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(10),
          fontFamily: sans,
          fontWeight: 400,
          fontSize: u(10.5),
          lineHeight: u(12),
          color: "#5a504b",
        }}
      >
        DAY {dish.day}
      </span>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(21),
          fontFamily: sans,
          fontWeight: 600,
          fontSize: u(11.4),
          lineHeight: u(13),
          color: WINE,
          whiteSpace: "nowrap",
        }}
      >
        {dish.festival}
      </span>
      <img
        src={dish.img}
        alt={dish.alt}
        style={{ ...box(8.7, 41.6, 105, 104), objectFit: "cover", borderRadius: u(7) }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(154),
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(18.5),
          lineHeight: u(21),
          color: WINE,
        }}
      >
        {dish.name}
      </span>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(177.5),
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(12),
          lineHeight: u(13.5),
          color: MUTED,
          whiteSpace: "pre",
        }}
      >
        {dish.note}
      </span>
      {selected && (
        <span
          aria-hidden
          style={{ ...box(45.2, 212, 32, 2), borderRadius: u(1), background: WINE }}
        />
      )}
    </button>
  );
}

function WhyWeEat() {
  return (
    <article
      aria-labelledby="why-we-eat"
      style={{ ...box(17.5, 963, 355, 159), borderRadius: u(16), ...cardStyle }}
    >
      <img
        src={spreadImg}
        alt="A pyramid of sweets surrounded by bowls of festive food."
        style={{ ...box(15.3, 24, 110.5, 110), objectFit: "cover", borderRadius: u(9) }}
      />
      <h2
        id="why-we-eat"
        style={{
          position: "absolute",
          left: u(141),
          top: u(15),
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: u(5),
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(19.5),
          lineHeight: u(20),
          whiteSpace: "nowrap",
        }}
      >
        <span aria-hidden style={{ width: u(12.5), height: u(10), display: "block" }}>
          <BookIcon />
        </span>
        <span>
          Why we <span style={{ color: WINE }}>eat</span> what we eat
        </span>
      </h2>
      <p
        style={{
          position: "absolute",
          left: u(141),
          top: u(39.5),
          width: u(204),
          margin: 0,
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: u(13.2),
          lineHeight: u(17),
          color: "#4a3f3a",
          whiteSpace: "pre",
        }}
      >
        {
          "“Food in Indian festivals is never random.\nEvery dish carries a meaning — an offering,\na prayer, or a memory. Here’s the story\nbehind what’s on your Diwali plate.”"
        }
      </p>
      <Pill style={box(141, 119, 93, 25)}>Read more</Pill>
    </article>
  );
}

function VoiceNote() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setElapsed((s) => {
        if (s + 1 >= NOTE_SECONDS) {
          setPlaying(false);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer.current);
  }, [playing]);

  const shown = playing || elapsed > 0 ? elapsed : NOTE_SECONDS;
  const clock = `${Math.floor(shown / 60)}:${String(shown % 60).padStart(2, "0")}`;
  const progress = elapsed / NOTE_SECONDS;

  return (
    <figure
      className={playing ? "utsav-playing" : undefined}
      style={{ ...box(17.5, 1185, 355, 138), margin: 0, borderRadius: u(16), ...cardStyle }}
    >
      <figcaption
        style={{
          position: "absolute",
          left: u(14.6),
          top: u(14.5),
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(14),
          lineHeight: u(18),
        }}
      >
        Voice note from Nani — Mathri recipe
      </figcaption>
      <img
        src={micImg}
        alt=""
        style={{
          ...box(14.5, 41.6, 47.6, 47.6),
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: `0 0 0 ${u(1.2)} #d9b98a`,
        }}
      />
      <button
        type="button"
        aria-label={playing ? "Pause Nani’s voice note" : "Play Nani’s voice note"}
        aria-pressed={playing}
        onClick={() => setPlaying((p) => !p)}
        className="grid cursor-pointer place-items-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
        style={{
          ...box(74.3, 47, 36.2, 36.2),
          padding: 0,
          border: 0,
          borderRadius: "50%",
          background: "#9b1c22",
        }}
      >
        {playing ? (
          <svg viewBox="0 0 10 12" aria-hidden style={{ width: u(9), height: u(11) }}>
            <rect x="1" y="1" width="2.8" height="10" rx="0.8" fill="#fff" />
            <rect x="6.2" y="1" width="2.8" height="10" rx="0.8" fill="#fff" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 10 12"
            aria-hidden
            style={{ width: u(9), height: u(11), marginLeft: u(2) }}
          >
            <path
              d="M1 1.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L1.900.7a.6.6 0 0 0-.9.5Z"
              fill="#fff"
            />
          </svg>
        )}
      </button>
      <span
        aria-hidden
        style={{
          ...box(122.5, 53, 62.5, 24),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {WAVE.map((h, i) => (
          <span
            key={i}
            className="utsav-wavebar"
            style={{
              width: u(1.6),
              height: u(h),
              borderRadius: u(1),
              background:
                i / WAVE.length < progress ? "#6e0f15" : i % 3 === 2 ? "#e0a3a3" : "#b8434a",
              animationDelay: `${((i % 5) * 0.12).toFixed(2)}s`,
            }}
          />
        ))}
      </span>
      <span
        aria-live="off"
        style={{
          position: "absolute",
          right: u(14.7),
          top: u(57),
          fontFamily: mono,
          fontSize: u(12.5),
          lineHeight: u(16),
          color: "#5a504b",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {clock}
      </span>
      <span aria-hidden style={{ ...box(14.6, 100, 325.8, 1), background: "#efe3d2" }} />
      <blockquote
        style={{
          position: "absolute",
          left: u(14.6),
          top: u(107.5),
          margin: 0,
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: u(13.2),
          lineHeight: u(16),
          color: "#4a3f3a",
          whiteSpace: "nowrap",
        }}
      >
        “Andaaz se — a fistful of ghee, enough flour to hold it together…”
      </blockquote>
    </figure>
  );
}

/* ───────────────────────── Tab bar ───────────────────────── */

type TabTarget = "/celebrate/home" | "/celebrate/checklist" | "/celebrate/story";

const TABS: { id: string; label: string; icon: ReactNode; to?: TabTarget }[] = [
  { id: "home", label: "Home", icon: <HomeTab />, to: "/celebrate/home" },
  { id: "guide", label: "Guide", icon: <GuideTab />, to: "/celebrate/checklist" },
  { id: "story", label: "Story", icon: <StoryTab />, to: "/celebrate/story" },
  { id: "food", label: "Food", icon: <FoodTab /> },
];

function TabBar() {
  return (
    <nav
      aria-label="Utsav"
      style={{
        ...box(0, 1451.5, 390, 73.5),
        background: "#f6efe5",
        borderTop: "1px solid #ece0cf",
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "food";
        const x = [37, 146, 253, 357][i];
        const style: CSSProperties = {
          ...box(x - 34, 6, 68, 56),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          border: 0,
          background: "none",
          color: active ? WINE : "#7a706a",
          textDecoration: "none",
        };
        const inner = (
          <>
            <span style={{ marginTop: u(6), width: u(20), height: u(20), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(active ? 3 : 5),
                fontFamily: serif,
                fontWeight: active ? 700 : 500,
                fontSize: u(12),
                lineHeight: u(14),
              }}
            >
              {t.label}
            </span>
            {active && (
              <span
                aria-hidden
                style={{
                  marginTop: u(3.5),
                  width: u(19),
                  height: u(2),
                  borderRadius: u(1),
                  background: WINE,
                }}
              />
            )}
          </>
        );
        const cls =
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]";
        return t.to ? (
          <Link key={t.id} to={t.to} className={cls} style={style}>
            {inner}
          </Link>
        ) : (
          <button key={t.id} type="button" aria-current="page" className={cls} style={style}>
            {inner}
          </button>
        );
      })}
    </nav>
  );
}

/* ───────────────────────── Icons ───────────────────────── */

function SmallDiya({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 22 14" aria-hidden style={{ flex: "none", ...style }}>
      <path d="M11 0.6c1 1.3 1.4 2.2 1.4 3a1.4 1.4 0 0 1-2.8 0c0-.8.4-1.7 1.4-3Z" fill="#f2a325" />
      <path d="M1 6h20c-.8 3.8-4.8 6.6-10 6.6S1.8 9.8 1 6Z" fill="#a8341c" />
      <path d="M1 6h20c-.3 1-.8 1.8-1.5 2.4h-17C1.8 7.8 1.3 7 1 6Z" fill="#6a1a10" />
    </svg>
  );
}

function BowlIcon() {
  return (
    <svg
      viewBox="0 0 18 14"
      fill="none"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <ellipse cx="9" cy="6" rx="7.5" ry="2" fill="#7fae5a" />
      <path
        d="M1 6h16c-.6 4-3.8 6.8-8 6.8S1.6 10 1 6Z"
        fill="#d9dde3"
        stroke="#a9b1bc"
        strokeWidth="0.6"
      />
      <path
        d="M5 4.5c1-.8 2.2-.9 3-.3M10 3.8c1.2-.5 2.3-.2 3 .6"
        stroke="#f4f0d8"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 20 16"
      fill="none"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <path
        d="M1 2.5h7.5A1.5 1.5 0 0 1 10 4v11c-.4-.6-1-1-1.8-1H1Z"
        fill="#eef3f8"
        stroke="#4d6f9a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M19 2.5h-7.5A1.5 1.5 0 0 0 10 4v11c.4-.6 1-1 1.8-1H19Z"
        fill="#eef3f8"
        stroke="#4d6f9a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      viewBox="0 0 22 16"
      fill="none"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <circle cx="7" cy="4.5" r="3.4" fill="#6d8fbd" />
      <path d="M.8 15.5c0-3.8 2.7-6.2 6.2-6.2s6.2 2.4 6.2 6.2Z" fill="#6d8fbd" />
      <circle cx="15" cy="4.5" r="3.4" fill="#4f74a6" />
      <path d="M8.8 15.5c0-3.8 2.7-6.2 6.2-6.2s6.2 2.4 6.2 6.2Z" fill="#4f74a6" />
    </svg>
  );
}

function HomeTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <path
        d="M3.5 10.5 12 3l8.5 7.5V20a1 1 0 0 1-1 1h-4.5v-6h-6v6H4.5a1 1 0 0 1-1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GuideTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <rect
        x="4.5"
        y="2.5"
        width="15"
        height="19"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 8h7M8.5 12h7M8.5 16h4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StoryTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <path
        d="M6 2h13v17H6.5A2.5 2.5 0 0 0 4 21.5V4a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4 21.5A2.5 2.5 0 0 1 6.5 19H19v3H6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FoodTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <path d="M3 11h18c-.6 5.5-4.4 9-9 9s-8.4-3.5-9-9Z" fill="currentColor" />
      <path d="M8 11C8 7.5 9.8 5 12 5s4 2.5 4 6" fill="currentColor" />
      <path d="M12 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
