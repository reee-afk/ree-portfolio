import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import plateImg from "@/assets/recipe/plate.webp";
import ingredientsImg from "@/assets/recipe/ingredients.webp";
import mixImg from "@/assets/recipe/mix.webp";
import restImg from "@/assets/recipe/rest.webp";
import rollImg from "@/assets/recipe/roll.webp";
import fryImg from "@/assets/recipe/fry.webp";
import coolImg from "@/assets/recipe/cool.webp";
import serveImg from "@/assets/recipe/serve.webp";
import micImg from "@/assets/food/mic.webp";

export const Route = createFileRoute("/celebrate_/recipe")({
  head: () => ({
    meta: [
      { title: "Mathri — Festival Food" },
      {
        name: "description",
        content:
          "The classic Dhanteras mathri: what you need, how to make it, and your family's way.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: RecipeScreen,
});

/* Drawn on a 390-wide artboard; u() scales every measurement with the frame width.
   The recipe flows top to bottom, so each card grows with its text. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Tinos", "Times New Roman", Times, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';

const INK = "#1f1714";
const WINE = "#9b1c22";
const BODY = "#6b6260";
const GOLD = "#d9b77a";
const CARD = "#fffdf9";

const card: CSSProperties = {
  position: "relative",
  margin: `0 ${u(17.4)}`,
  borderRadius: u(16),
  border: "1px solid #f0e2cc",
  background: CARD,
  boxShadow: "0 3px 12px rgba(150, 110, 60, 0.08)",
};

const INGREDIENTS = [
  "2 cups maida (all-purpose flour)",
  "4 tbsp ghee",
  "1 tsp ajwain (carom seeds)",
  "1 tsp salt",
  "Water — enough to bind",
  "Oil for frying",
];

const STEPS = [
  {
    title: "Mix the dough",
    body: "Combine maida, ghee, ajwain and salt. Rub the ghee in until the mixture looks like breadcrumbs. Add water slowly — just enough to bring it together. Don’t over-knead.",
    img: mixImg,
    alt: "A hand rubbing ghee into flour in a brass bowl.",
  },
  {
    title: "Rest the dough",
    body: "Cover and rest for 15 minutes. This is what makes mathri crispy, not soft.",
    img: restImg,
    alt: "A smooth ball of dough flecked with ajwain resting in a bowl.",
  },
  {
    title: "Roll and cut",
    body: "Roll out thin — thinner than you think. Cut into rounds or squares. Prick each piece all over with a fork so they don’t puff up.",
    img: rollImg,
    alt: "Thin dough rolled out with rounds cut into it.",
  },
  {
    title: "Fry on low heat",
    body: "This is the most important step. Low and slow — medium-low heat, not high. Mathri fried fast turns soft. Fried slow turns crispy. Takes about 8-10 minutes per batch.",
    img: fryImg,
    alt: "Mathri frying gently in a pan of oil.",
  },
  {
    title: "Drain and cool",
    body: "Drain on paper. They crisp up further as they cool — don’t judge them hot.",
    img: coolImg,
    alt: "Golden mathri cooling on a wire rack.",
  },
];

const WAVE = [6, 10, 15, 9, 19, 24, 13, 20, 11, 17, 22, 9, 15, 12, 18, 8, 13, 6, 4];
const NOTE_SECONDS = 45;

function RecipeScreen() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-white sm:py-10">
      <style>{`
        @keyframes utsav-wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.5); } }
        .utsav-playing .utsav-wavebar { animation: utsav-wave 0.9s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .utsav-playing .utsav-wavebar { animation: none; } }
      `}</style>
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{
          containerType: "inline-size",
          background: "linear-gradient(180deg, #f6ede0 0, #f9f3ea 120px, #faf6f0 100%)",
        }}
      >
        <div style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}>
          <Header />
          <Hero />
          <Ingredients />
          <SectionTitle
            icon="👩‍🍳"
            accent="make it"
            style={{ margin: `${u(26)} ${u(17.4)} ${u(15)}` }}
          >
            How to
          </SectionTitle>
          <ol
            aria-label="Steps"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: u(14.5),
            }}
          >
            {STEPS.map((s, i) => (
              <Step key={s.title} n={i + 1} step={s} />
            ))}
          </ol>
          <FamilyVersion />
          <WhyMathri />
          <Actions />
          <TabBar />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header style={{ position: "relative", height: u(101.7) }}>
      <svg
        viewBox="0 0 92 16"
        fill="none"
        aria-hidden
        style={{ position: "absolute", left: u(149), top: u(27.4), width: u(92), height: u(16) }}
      >
        <path d="M2 8h28M62 8h28" stroke="#c97a6e" strokeWidth="0.9" />
        <path d="M46 1.5 48.4 5.6 53 8 48.4 10.4 46 14.5 43.6 10.4 39 8l4.6-2.4Z" fill="#a8302b" />
        <circle cx="46" cy="8" r="1.7" fill="#e7b04c" />
      </svg>
      <Link
        to="/celebrate/food"
        className="cursor-pointer no-underline transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
        style={{
          position: "absolute",
          left: u(17),
          top: u(47),
          width: u(68),
          height: u(29),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: u(8),
          borderRadius: u(15),
          border: "1px solid #ecdfcc",
          background: "#fffdf9",
          boxShadow: `0 ${u(2)} ${u(5)} rgba(150, 110, 60, 0.1)`,
          color: INK,
          fontFamily: serif,
          fontSize: u(13.5),
          lineHeight: 1,
        }}
      >
        <svg viewBox="0 0 8 14" fill="none" aria-hidden style={{ width: u(5), height: u(9) }}>
          <path
            d="M6.5 1.5 1.5 7l5 5.5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </Link>
      <h1
        style={{
          position: "absolute",
          left: u(95),
          right: u(40),
          top: u(52),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(24.5),
          lineHeight: u(28),
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        Festival Food
      </h1>
      <svg
        viewBox="0 0 92 10"
        fill="none"
        aria-hidden
        style={{ position: "absolute", left: u(158.5), top: u(85), width: u(92), height: u(10) }}
      >
        <path d="M14 5h20M58 5h20" stroke="#d6b27a" strokeWidth="0.8" />
        <path
          d="M46 1c.4 1.9 1.3 2.8 3.2 4-1.9 1.2-2.8 2.1-3.2 4-.4-1.9-1.3-2.8-3.2-4 1.9-1.2 2.8-2.1 3.2-4Z"
          fill="#c99a4a"
        />
        <path
          d="M3 5c1.5-2 4-2.2 6-.7M89 5c-1.5-2-4-2.2-6-.7"
          stroke="#c99a4a"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="5" cy="6" r="1.3" fill="#c99a4a" />
        <circle cx="87" cy="6" r="1.3" fill="#c99a4a" />
      </svg>
    </header>
  );
}

function Diamond({ style }: { style: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 8 8"
      fill="none"
      aria-hidden
      style={{ position: "absolute", width: u(5.5), height: u(5.5), ...style }}
    >
      <path d="M4 .5 7.5 4 4 7.5 .5 4Z" stroke="#e1c391" strokeWidth="0.9" />
    </svg>
  );
}

function SmallDiya({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 22 14" aria-hidden style={{ flex: "none", ...style }}>
      <path d="M11 0.6c1 1.3 1.4 2.2 1.4 3a1.4 1.4 0 0 1-2.8 0c0-.8.4-1.7 1.4-3Z" fill="#f2a325" />
      <path d="M1 6h20c-.8 3.8-4.8 6.6-10 6.6S1.8 9.8 1 6Z" fill="#a8341c" />
      <path d="M1 6h20c-.3 1-.8 1.8-1.5 2.4h-17C1.8 7.8 1.3 7 1 6Z" fill="#6a1a10" />
    </svg>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="dish"
      style={{
        ...card,
        minHeight: u(176),
        padding: `${u(18)} ${u(150)} ${u(19)} ${u(16.3)}`,
        border: "1px solid #ead7b4",
        boxShadow: `inset 0 0 0 ${u(3.5)} ${CARD}, inset 0 0 0 ${u(4.3)} #f1e1c4, 0 3px 12px rgba(150, 110, 60, 0.08)`,
      }}
    >
      <Diamond style={{ left: u(9), top: u(9) }} />
      <Diamond style={{ right: u(9), top: u(9) }} />
      <Diamond style={{ left: u(9), bottom: u(9) }} />
      <Diamond style={{ right: u(9), bottom: u(9) }} />
      <h2
        id="dish"
        style={{
          margin: 0,
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(33),
          lineHeight: u(34),
          color: WINE,
          letterSpacing: "-0.01em",
        }}
      >
        Mathri
      </h2>
      <p
        style={{
          margin: `${u(9.5)} 0 0`,
          display: "flex",
          alignItems: "center",
          gap: u(6),
          fontFamily: sans,
          fontSize: u(12.6),
          lineHeight: u(15),
          color: "#5a504b",
          whiteSpace: "nowrap",
        }}
      >
        Dhanteras
        <Dot />
        Day 1
        <Dot />
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: u(3),
            fontWeight: 600,
            color: WINE,
          }}
        >
          <SmallDiya style={{ width: u(12), height: u(7.5) }} />
          Diwali
        </span>
      </p>
      <p
        style={{
          margin: `${u(8.5)} 0 0`,
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: u(13.6),
          lineHeight: u(19),
          color: "#5d5552",
        }}
      >
        “The smell of mathri frying is the smell of Diwali beginning. Every household has its own
        version — this is the classic one.”
      </p>
      <img
        src={plateImg}
        alt="A brass plate piled with golden mathri."
        style={{
          position: "absolute",
          right: u(16.5),
          top: u(41.6),
          width: u(125.5),
          height: u(92),
          objectFit: "cover",
          borderRadius: u(8),
          boxShadow: `0 ${u(3)} ${u(8)} rgba(80, 50, 20, 0.22)`,
        }}
      />
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      style={{
        width: u(4),
        height: u(4),
        borderRadius: "50%",
        background: "#e0a63a",
        flex: "none",
      }}
    />
  );
}

function SectionTitle({
  icon,
  children,
  accent,
  style,
}: {
  icon: string;
  children: ReactNode;
  accent: string;
  style?: CSSProperties;
}) {
  return (
    <h2
      style={{
        display: "flex",
        alignItems: "center",
        gap: u(5),
        fontFamily: serif,
        fontWeight: 700,
        fontSize: u(20.5),
        lineHeight: u(24),
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      <span aria-hidden style={{ fontSize: u(17), lineHeight: 1 }}>
        {icon}
      </span>
      <span>
        {children} <span style={{ color: WINE }}>{accent}</span>
      </span>
    </h2>
  );
}

function Ingredients() {
  return (
    <section
      style={{
        ...card,
        marginTop: u(22.5),
        minHeight: u(256),
        padding: `${u(18.5)} ${u(16.3)} ${u(20)}`,
      }}
    >
      <SectionTitle icon="🧺" accent="need" style={{ margin: 0 }}>
        What you’ll
      </SectionTitle>
      <p
        style={{
          margin: `${u(6)} 0 0 ${u(28.5)}`,
          fontFamily: sans,
          fontSize: u(12.4),
          lineHeight: u(15),
          color: "#7a706a",
        }}
      >
        Serves 4 · ~45 minutes
      </p>
      <ul
        style={{
          listStyle: "none",
          margin: `${u(13)} 0 0`,
          padding: 0,
          width: u(160),
          display: "flex",
          flexDirection: "column",
          gap: u(11),
          fontFamily: serif,
          fontSize: u(13.3),
          lineHeight: u(15),
          color: "#2e2622",
        }}
      >
        {INGREDIENTS.map((item) => (
          <li key={item} style={{ position: "relative", paddingLeft: u(11.5) }}>
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: u(1.5),
                top: u(6.5),
                width: u(2.8),
                height: u(2.8),
                borderRadius: "50%",
                background: WINE,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
      <img
        src={ingredientsImg}
        alt="Bowls of flour, ajwain, salt and ghee laid out on a wooden table."
        style={{
          position: "absolute",
          right: u(16.5),
          top: u(74),
          width: u(142),
          height: u(106.6),
          objectFit: "cover",
          borderRadius: u(9),
          boxShadow: `0 ${u(3)} ${u(8)} rgba(80, 50, 20, 0.18)`,
        }}
      />
    </section>
  );
}

function Step({ n, step }: { n: number; step: (typeof STEPS)[number] }) {
  return (
    <li style={{ ...card, minHeight: u(96), padding: `${u(13.6)} ${u(14)} ${u(15)} ${u(120.4)}` }}>
      <div
        style={{ position: "absolute", left: u(13), top: u(12.6), width: u(94.6), height: u(70.7) }}
      >
        <img
          src={step.img}
          alt={step.alt}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: u(7),
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: u(4.7),
            top: u(5.5),
            width: u(16.5),
            height: u(16.5),
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "#9b1c22",
            boxShadow: `0 0 0 ${u(1.2)} rgba(255, 225, 190, 0.7)`,
            color: "#fff",
            fontFamily: serif,
            fontWeight: 700,
            fontSize: u(9.5),
            lineHeight: 1,
          }}
        >
          {n}
        </span>
      </div>
      <h3
        style={{
          margin: 0,
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(15),
          lineHeight: u(18),
        }}
      >
        <span className="sr-only">Step {n}: </span>
        {step.title}
      </h3>
      <p
        style={{
          margin: `${u(4)} 0 0`,
          fontFamily: serif,
          fontSize: u(12),
          lineHeight: u(16.2),
          color: BODY,
        }}
      >
        {step.body}
      </p>
    </li>
  );
}

function FamilyVersion() {
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
    <section style={{ ...card, marginTop: u(20.5), padding: `${u(19)} ${u(16.6)} ${u(17)}` }}>
      <SectionTitle icon="👥" accent="version" style={{ margin: 0 }}>
        Andaaz se
      </SectionTitle>
      <p
        style={{
          margin: `${u(4)} 0 0 ${u(28.5)}`,
          fontFamily: sans,
          fontSize: u(12.4),
          lineHeight: u(15),
          color: "#7a706a",
        }}
      >
        Your family’s way
      </p>
      <figure
        className={playing ? "utsav-playing" : undefined}
        style={{
          position: "relative",
          margin: `${u(14.5)} 0 0`,
          height: u(106),
          borderRadius: u(12),
          border: "1px solid #f0dcc0",
          background: "#faefe2",
        }}
      >
        <img
          src={micImg}
          alt=""
          style={{
            position: "absolute",
            left: u(10.8),
            top: u(10.8),
            width: u(43),
            height: u(43),
            objectFit: "cover",
            borderRadius: "50%",
            boxShadow: `0 0 0 ${u(1.3)} #d9b98a`,
          }}
        />
        <button
          type="button"
          aria-label={playing ? "Pause the family voice note" : "Play the family voice note"}
          aria-pressed={playing}
          onClick={() => setPlaying((p) => !p)}
          className="grid cursor-pointer place-items-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
          style={{
            position: "absolute",
            left: u(64.7),
            top: u(14.6),
            width: u(36.4),
            height: u(36.4),
            padding: 0,
            border: 0,
            borderRadius: "50%",
            background: "#8f1a1f",
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
                d="M1 1.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L1.9.7a.6.6 0 0 0-.9.5Z"
                fill="#fff"
              />
            </svg>
          )}
        </button>
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: u(115.3),
            top: u(19.5),
            width: u(99),
            height: u(27),
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
                width: u(1.8),
                height: u(h),
                borderRadius: u(1),
                background:
                  i / WAVE.length < progress
                    ? "#6e0f15"
                    : [4, 5, 7].includes(i)
                      ? "#a8242a"
                      : "#e0b05a",
                animationDelay: `${((i % 5) * 0.12).toFixed(2)}s`,
              }}
            />
          ))}
        </span>
        <span
          style={{
            position: "absolute",
            right: u(10.8),
            top: u(26),
            fontFamily: serif,
            fontSize: u(13),
            lineHeight: u(14),
            color: "#4a3f3a",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {clock}
        </span>
        <blockquote
          style={{
            position: "absolute",
            left: u(14.5),
            right: u(12),
            top: u(63),
            margin: 0,
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: u(12.2),
            lineHeight: u(16),
            color: "#4a3f3a",
          }}
        >
          “A fistful of ghee, enough flour to hold it together, ajwain because that’s what makes it
          ours…”
        </blockquote>
      </figure>
      <button
        type="button"
        className="group cursor-pointer text-left transition-[background-color] duration-150 hover:bg-[#fff8ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: u(37.6),
          marginTop: u(13),
          padding: `0 ${u(15)} 0 ${u(14.5)}`,
          gap: u(9),
          borderRadius: u(12),
          border: "1px solid #ecdcc4",
          background: "#fffdf9",
          color: INK,
          fontFamily: serif,
          fontSize: u(13.8),
          lineHeight: 1,
        }}
      >
        <span
          aria-hidden
          style={{
            width: u(15.5),
            height: u(15.5),
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "#f6e3d6",
            color: WINE,
            fontFamily: sans,
            fontSize: u(11),
            lineHeight: 1,
          }}
        >
          +
        </span>
        Add your family’s version
        <svg
          viewBox="0 0 6 10"
          fill="none"
          aria-hidden
          className="transition-transform duration-150 group-hover:translate-x-0.5"
          style={{ marginLeft: "auto", width: u(5.5), height: u(9.5) }}
        >
          <path
            d="m1 1 4 4-4 4"
            stroke="#7a706a"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}

function WhyMathri() {
  return (
    <section
      style={{
        ...card,
        marginTop: u(22),
        minHeight: u(165),
        padding: `${u(19)} ${u(16.3)} ${u(19)}`,
      }}
    >
      <h2
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: u(9),
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(16.6),
          lineHeight: u(20),
        }}
      >
        <span aria-hidden style={{ fontSize: u(15), lineHeight: 1 }}>
          💡
        </span>
        <span>
          Why <span style={{ color: WINE }}>mathri</span> on{" "}
          <span style={{ color: WINE }}>Dhanteras</span>?
        </span>
      </h2>
      <p
        style={{
          margin: `${u(10)} 0 0`,
          width: u(240),
          fontFamily: serif,
          fontSize: u(13.1),
          lineHeight: u(19.1),
          color: BODY,
        }}
      >
        Mathri is made fresh before Diwali begins — it’s one of the first things prepared, which is
        why its smell signals the start of the festival for so many people. It’s also offered as
        prasad during the puja.
      </p>
      <img
        src={serveImg}
        alt="Mathri served on a brass plate beside lit diyas."
        style={{
          position: "absolute",
          right: u(16.5),
          top: u(21.7),
          width: u(78),
          height: u(77.7),
          objectFit: "cover",
          borderRadius: u(9),
          boxShadow: `0 ${u(3)} ${u(8)} rgba(80, 50, 20, 0.18)`,
        }}
      />
    </section>
  );
}

function Actions() {
  const [saved, setSaved] = useState(false);
  const pill: CSSProperties = {
    height: u(38.5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: u(9),
    borderRadius: u(20),
    fontFamily: serif,
    fontSize: u(13.6),
    lineHeight: 1,
  };
  return (
    <div
      style={{
        display: "flex",
        gap: u(13.4),
        margin: `${u(13.5)} ${u(17.4)} 0`,
        position: "relative",
      }}
    >
      <Link
        to="/celebrate/food"
        className="cursor-pointer no-underline transition-[filter] duration-150 hover:brightness-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
        style={{
          ...pill,
          flex: "0 0 auto",
          width: u(188),
          border: "1px solid #e6cba2",
          background: "#f8ecdc",
          color: INK,
        }}
      >
        <svg viewBox="0 0 8 14" fill="none" aria-hidden style={{ width: u(5), height: u(9) }}>
          <path
            d="M6.5 1.5 1.5 7l5 5.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Food
      </Link>
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
        className="cursor-pointer transition-[filter] duration-150 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
        style={{
          ...pill,
          flex: 1,
          padding: 0,
          border: 0,
          background: "linear-gradient(180deg, #a3222a 0%, #8a161d 100%)",
          boxShadow: `0 ${u(5)} ${u(12)} rgba(130, 20, 20, 0.25)`,
          color: "#fff6ee",
        }}
      >
        <svg viewBox="0 0 14 14" aria-hidden style={{ width: u(12), height: u(12) }}>
          <path
            d="M7.5 1H12.5a.5.5 0 0 1 .5.5V6.5a1 1 0 0 1-.3.7L7 12.9a1 1 0 0 1-1.4 0L1.1 8.4a1 1 0 0 1 0-1.4L6.8 1.3A1 1 0 0 1 7.5 1Z"
            fill={saved ? "#f3c34a" : "#fff"}
          />
          <circle cx="10.2" cy="3.8" r="1.1" fill={WINE} />
        </svg>
        {saved ? "Recipe saved" : "Save this recipe"}
      </button>
    </div>
  );
}

/* ───────────────────────── Tab bar ───────────────────────── */

type TabTarget =
  | "/celebrate/home"
  | "/celebrate/checklist"
  | "/celebrate/story"
  | "/celebrate/food";

const TABS: { id: string; label: string; icon: ReactNode; to: TabTarget }[] = [
  { id: "home", label: "Home", icon: <HomeTab />, to: "/celebrate/home" },
  { id: "guide", label: "Guide", icon: <GuideTab />, to: "/celebrate/checklist" },
  { id: "story", label: "Story", icon: <StoryTab />, to: "/celebrate/story" },
  { id: "food", label: "Food", icon: <FoodTab />, to: "/celebrate/food" },
];

function TabBar() {
  return (
    <nav
      aria-label="Utsav"
      style={{
        position: "relative",
        height: u(64),
        marginTop: u(58),
        background: "#fbf8f3",
        borderTop: "1px solid #eee4d6",
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "food";
        const x = [37.6, 145, 250.5, 355][i];
        return (
          <Link
            key={t.id}
            to={t.to}
            aria-current={active ? "page" : undefined}
            className="cursor-pointer no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
            style={{
              position: "absolute",
              left: u(x - 34),
              top: u(4),
              width: u(68),
              height: u(54),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: active ? WINE : "#5f5955",
            }}
          >
            <span style={{ marginTop: u(7.5), width: u(19), height: u(19), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(active ? 3 : 4.5),
                fontFamily: sans,
                fontWeight: active ? 600 : 400,
                fontSize: u(11.2),
                lineHeight: u(13),
              }}
            >
              {t.label}
            </span>
            {active && (
              <span
                aria-hidden
                style={{
                  marginTop: u(4),
                  width: u(16),
                  height: u(2),
                  borderRadius: u(1),
                  background: WINE,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
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
      <rect x="4.5" y="4" width="15" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <rect
        x="8.5"
        y="2"
        width="7"
        height="4"
        rx="1.2"
        fill="#fbf8f3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m8.5 13.5 2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StoryTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <path
        d="M12 6.5C9.8 4.7 6.7 4 2.5 4.3V19c4.2-.3 7.3.4 9.5 2.2 2.2-1.8 5.3-2.5 9.5-2.2V4.3c-4.2-.3-7.3.4-9.5 2.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 6.5v14.7" stroke="currentColor" strokeWidth="1.7" />
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
