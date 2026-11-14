import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";

import backdrop from "@/assets/utsav-fact-backdrop.webp";
import fiveDaysArt from "@/assets/utsav-five-days.webp";

export const Route = createFileRoute("/celebrate_/fact")({
  head: () => ({
    meta: [
      { title: "Did you know? — Diwali fact" },
      { name: "description", content: "A Diwali fact, one shake at a time." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap",
      },
    ],
  }),
  component: FactScreen,
});

/* Drawn on a 390 × 933 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const display = '"Playfair Display", "Times New Roman", serif';

const INK = "#231612";
const BODY = "#4a3a32";
const RUST = "#b5381b";
const GOLD = "#c99a4a";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: u(width), height: u(height) };
}

/** Each fact keeps to five lines at the card's measure so the layout never shifts. */
const FACTS: { lead: string; rest: string }[] = [
  {
    lead: "Diwali wasn’t always just one night.",
    rest: "Traditionally, each of the 5 days has a completely different ritual, a different deity, and a different meaning — most people only know about day 3.",
  },
  {
    lead: "Dhanteras is named for wealth.",
    rest: "Dhan means wealth and teras the thirteenth lunar day, which is why so many families buy gold, silver or a new steel pot that morning.",
  },
  {
    lead: "Day 4 is a feast shaped like a hill.",
    rest: "For Govardhan Puja, temples stack hundreds of dishes into an Annakut, a food mountain that recalls Krishna lifting Govardhan hill.",
  },
  {
    lead: "Day 5 belongs to siblings.",
    rest: "On Bhai Dooj sisters mark a tilak on their brothers’ foreheads and pray for long lives. In Maharashtra it is Bhau-Beej; in Nepal, Bhai Tika.",
  },
];

/** Soft lamp glows floating over the backdrop: [x, y, radius]. */
const BOKEH: [number, number, number][] = [
  [30, 150, 24],
  [86, 84, 20],
  [358, 96, 22],
  [368, 165, 16],
  [341, 30, 18],
  [212, 66, 12],
];

function FactScreen() {
  const [index, setIndex] = useState(0);
  const [shaking, setShaking] = useState(false);
  const fact = FACTS[index];

  const another = () => {
    setIndex((i) => (i + 1) % FACTS.length);
    setShaking(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white sm:py-10">
      <style>{`
        @keyframes utsav-shake {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-14deg); }
          45% { transform: rotate(12deg); }
          70% { transform: rotate(-6deg); }
        }
        @keyframes utsav-fade { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .utsav-die, .utsav-fact { animation: none !important; }
        }
      `}</style>
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(40,20,10,0.4),0_8px_24px_rgba(40,20,10,0.15)]"
        style={{ aspectRatio: "390 / 933", containerType: "inline-size", background: "#8f8676" }}
      >
        <div
          className="absolute inset-0"
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          {/* Paper bands above and below the painting */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(60% 40% at 30% 20%, rgba(255,250,235,0.18), transparent 70%), radial-gradient(50% 30% at 75% 90%, rgba(60,50,40,0.18), transparent 70%), linear-gradient(180deg, #a69d8d 0%, #8e8575 50%, #6e665a 100%)",
            }}
          />

          {/* The painting, dimmed behind the card */}
          <div
            aria-hidden
            style={{
              ...box(0, 40.4, 390, 847.6),
              overflow: "hidden",
              boxShadow: `0 ${u(-2.4)} 0 #c8ae72, 0 ${u(2.4)} 0 #9c8550`,
            }}
          >
            <img
              src={backdrop}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                maxWidth: "none",
                objectFit: "fill",
                filter: "saturate(0.78) brightness(0.8) blur(1.1px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(30,18,10,0.12) 0%, rgba(30,18,10,0.05) 40%, rgba(30,18,10,0.42) 100%)",
              }}
            />
            {BOKEH.map(([x, y, r]) => (
              <span
                key={`${x}-${y}`}
                style={{
                  ...box(x - r, y - r, r * 2, r * 2),
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,214,140,0.42) 0%, rgba(255,200,120,0.22) 55%, rgba(255,200,120,0) 72%)",
                }}
              />
            ))}
          </div>

          <Link
            to="/celebrate/home"
            aria-label="Close fact"
            className="grid cursor-pointer place-items-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{
              ...box(326.8, 49.4, 38.5, 38.5),
              borderRadius: "50%",
              background: "rgba(36, 24, 20, 0.88)",
              boxShadow: `0 ${u(2)} ${u(6)} rgba(0,0,0,0.3)`,
            }}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              style={{ width: u(13), height: u(13) }}
            >
              <path
                d="M2 2l12 12M14 2 2 14"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          {/* The fact card */}
          <section
            aria-labelledby="fact-title"
            style={{
              ...box(16.1, 143.3, 357.7, 695.7),
              borderRadius: u(32),
              border: `${u(1.6)} solid #e6cb8e`,
              background:
                "radial-gradient(80% 50% at 50% 30%, #fffcf3 0%, rgba(255,252,243,0) 70%), linear-gradient(180deg, #fcf7ea 0%, #f8eeda 100%)",
              boxShadow: `0 ${u(10)} ${u(28)} rgba(30, 15, 5, 0.35), 0 ${u(2)} ${u(6)} rgba(30, 15, 5, 0.2)`,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: u(4.4),
                borderRadius: u(27.5),
                border: `${u(0.8)} solid #ead6a6`,
                pointerEvents: "none",
              }}
            />
            <CornerCurl style={box(10, 10, 22, 22)} />
            <CornerCurl style={{ ...box(325.7, 10, 22, 22), transform: "scaleX(-1)" }} />

            <svg viewBox="0 0 20 30" fill="none" aria-hidden style={box(166.8, 30, 26, 37)}>
              <path
                d="M2 11C6 9.3 8.3 6.5 10 2c1.7 4.5 4 7.3 8 9-2.8-.4-5.5-1.6-8-4-2.5 2.4-5.2 3.6-8 4Z"
                fill={GOLD}
              />
              <circle cx="10" cy="14.4" r="1.2" fill={GOLD} />
              <path
                d="M10 20.5c.4 2.3 1.3 3.2 3.5 3.6-2.200.4-3.1 1.3-3.5 3.6-.4-2.3-1.3-3.2-3.5-3.6 2.2-.4 3.1-1.3 3.5-3.6Z"
                fill={GOLD}
              />
            </svg>

            {/* Eyebrow */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: u(83.5),
                height: u(14),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: u(7.5),
              }}
            >
              <span
                aria-hidden
                style={{
                  width: u(40),
                  height: u(0.9),
                  background: `linear-gradient(90deg, rgba(201,154,74,0), ${GOLD})`,
                }}
              />
              <Quad />
              <span
                style={{
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: u(12.3),
                  lineHeight: 1,
                  letterSpacing: "0.3em",
                  marginRight: "-0.3em",
                  color: "#9c6a2a",
                }}
              >
                DIWALI FACT
              </span>
              <Quad />
              <span
                aria-hidden
                style={{
                  width: u(40),
                  height: u(0.9),
                  background: `linear-gradient(270deg, rgba(201,154,74,0), ${GOLD})`,
                }}
              />
            </div>

            <h2
              id="fact-title"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: u(112),
                margin: 0,
                textAlign: "center",
                fontFamily: display,
                fontWeight: 700,
                fontSize: u(31.5),
                lineHeight: u(38),
                letterSpacing: "-0.035em",
              }}
            >
              Did you{" "}
              <em style={{ color: RUST, fontStyle: "italic", letterSpacing: "-0.02em" }}>know?</em>
            </h2>

            <p
              key={index}
              className="utsav-fact"
              aria-live="polite"
              style={{
                position: "absolute",
                left: u(18),
                right: u(18),
                top: u(162.3),
                margin: 0,
                textAlign: "center",
                fontFamily: serif,
                fontWeight: 500,
                fontSize: u(16.7),
                lineHeight: u(22.8),
                letterSpacing: "0.022em",
                color: BODY,
                animation: index === 0 && !shaking ? undefined : "utsav-fade 0.35s ease-out",
              }}
            >
              {fact.lead}
              <br />
              {fact.rest}
            </p>

            <RuleWithArch style={box(82.9, 296, 192, 12)} />

            <img
              src={fiveDaysArt}
              alt="A painted panel of Diwali's five days: lamps floating on a river, then shrines for Dhanteras, Choti Diwali, Lakshmi Puja, Govardhan Puja and Bhai Dooj."
              style={{
                ...box(20.2, 331.4, 317.3, 175),
                objectFit: "cover",
                filter: "saturate(0.86) brightness(0.95) sepia(0.08)",
                borderRadius: u(10),
                border: `${u(1.8)} solid #4a3626`,
                boxShadow: `0 ${u(4)} ${u(10)} rgba(60, 35, 15, 0.3)`,
              }}
            />

            <button
              type="button"
              onClick={another}
              className="cursor-pointer transition-[filter,transform] duration-150 hover:brightness-[1.03] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5381b]"
              style={{
                ...box(20.2, 529.7, 317.3, 49.3),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: u(8),
                padding: 0,
                borderRadius: u(25),
                border: `${u(1.2)} solid #e2c48a`,
                background: "linear-gradient(180deg, #fffdf8 0%, #f9f1e1 100%)",
                boxShadow: `0 ${u(2)} ${u(5)} rgba(150, 110, 50, 0.12)`,
                color: INK,
                fontFamily: serif,
                fontWeight: 600,
                fontSize: u(18.4),
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              <Die
                className="utsav-die"
                onAnimationEnd={() => setShaking(false)}
                style={{
                  width: u(22.5),
                  height: u(22.5),
                  animation: shaking ? "utsav-shake 0.5s ease-in-out" : undefined,
                }}
              />
              Shake for another
            </button>

            <Link
              to="/celebrate/story"
              className="group cursor-pointer no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5381b]"
              style={{
                ...box(20.2, 589.7, 317.3, 51.5),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: u(8),
                padding: 0,
                borderRadius: u(26),
                border: `${u(0.8)} solid #c86a3a`,
                background: "linear-gradient(180deg, #a01b1c 0%, #8c1416 50%, #760c0f 100%)",
                boxShadow: `0 ${u(6)} ${u(12)} rgba(110, 20, 15, 0.28)`,
                color: "#fcefe0",
                fontFamily: serif,
                fontWeight: 500,
                fontSize: u(18.3),
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              Explore this in Story Mode
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>

            <RuleWithArch style={box(123.9, 657.9, 110, 12)} small />
          </section>

          <span
            aria-hidden
            style={{
              ...box(131.5, 917.3, 127, 3.3),
              borderRadius: u(2),
              background: "rgba(240, 236, 228, 0.75)",
            }}
          />
        </div>
      </div>
    </main>
  );
}

/* ───────────────────────── Ornaments ───────────────────────── */

function Quad() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden style={{ width: u(8.4), height: u(8.4), flex: "none" }}>
      {[
        [6, 2.3],
        [9.7, 6],
        [6, 9.7],
        [2.3, 6],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 2}
          y={y - 2}
          width="4"
          height="4"
          transform={`rotate(45 ${x} ${y})`}
          fill={GOLD}
        />
      ))}
    </svg>
  );
}

function RuleWithArch({ style, small }: { style: CSSProperties; small?: boolean }) {
  const w = small ? 110 : 192;
  const mid = w / 2;
  const gap = small ? 13 : 18;
  return (
    <svg viewBox={`0 0 ${w} 12`} fill="none" aria-hidden style={style}>
      <defs>
        <linearGradient id={`fr-l-${w}`} x1="0" x2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0" />
          <stop offset="0.5" stopColor={GOLD} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`fr-r-${w}`} x1="1" x2="0">
          <stop offset="0" stopColor={GOLD} stopOpacity="0" />
          <stop offset="0.5" stopColor={GOLD} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="0" y="5.6" width={mid - gap} height="0.8" fill={`url(#fr-l-${w})`} />
      <rect x={mid + gap} y="5.6" width={mid - gap} height="0.8" fill={`url(#fr-r-${w})`} />
      <path
        d={`M${mid - 4} 6.2C${mid - 2} 5.4 ${mid - 0.8} 4 ${mid} 1.8c.8 2.2 2 3.6 4 4.4-1.5-.2-2.8-.8-4-1.8-1.2 1-2.5 1.6-4 1.8Z`}
        fill={GOLD}
      />
      <circle cx={mid} cy="9.3" r="0.9" fill={GOLD} />
    </svg>
  );
}

function CornerCurl({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden style={style}>
      <path d="M2 20C2 10 8 3 18 2" stroke="#d9bd84" strokeWidth="0.7" />
      <path
        d="M5 20.5C5.5 12.5 10 6.5 18.5 5"
        stroke="#d9bd84"
        strokeWidth="0.6"
        strokeDasharray="1 1.4"
      />
      <circle cx="5" cy="5.5" r="1.2" fill="#c99a4a" />
    </svg>
  );
}

function Die({
  style,
  className,
  onAnimationEnd,
}: {
  style: CSSProperties;
  className?: string;
  onAnimationEnd?: () => void;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      onAnimationEnd={onAnimationEnd}
      style={{ flex: "none", ...style }}
    >
      <path d="M12 1.5 21.5 6.5v11L12 22.5 2.5 17.5v-11Z" fill="#f3f1ee" />
      <path d="M12 12v10.5L2.5 17.5v-11Z" fill="#dcd8d2" />
      <path d="M12 12v10.5l9.5-5v-11Z" fill="#c9c4bd" />
      <path d="M12 1.5 21.5 6.5 12 12 2.5 6.5Z" fill="#fbfaf8" />
      <ellipse cx="12" cy="6.7" rx="1.5" ry="0.9" fill="#d42f2f" />
      <circle cx="5.3" cy="11.5" r="1" fill="#2b2622" />
      <circle cx="9" cy="17" r="1" fill="#2b2622" />
      <circle cx="14.6" cy="18.3" r="1" fill="#2b2622" />
      <circle cx="16.8" cy="14.7" r="1" fill="#2b2622" />
      <circle cx="19" cy="11.2" r="1" fill="#2b2622" />
    </svg>
  );
}
