import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import { Garland } from "@/components/utsav/Garland";

export const Route = createFileRoute("/celebrate_/all-set")({
  head: () => ({
    meta: [
      { title: "You’re all set" },
      {
        name: "description",
        content: "Utsav changes its soul automatically, every festival a different world.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400&display=swap",
      },
    ],
  }),
  component: AllSetScreen,
});

/* Drawn on a 390 × 1074 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';

const INK = "#2b1a14";
const WINE = "#8a1a1c";
const RUST = "#b0402a";
const MUTED = "#6e5c52";
const GOLD = "#d2ad6b";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: u(width), height: u(height) };
}

/** A full-width line of text whose line box starts at `top`. */
function line(top: number, extra: CSSProperties): CSSProperties {
  return {
    position: "absolute",
    left: 0,
    right: 0,
    top: u(top),
    margin: 0,
    textAlign: "center",
    ...extra,
  };
}

type Mode = {
  id: string;
  title: ReactNode;
  blurb: string;
  icon: ReactNode;
  top: number;
};

const modes: Mode[] = [
  {
    id: "guide",
    title: "Guide Mode",
    blurb: "Step by step, every ritual",
    icon: <LampIcon />,
    top: 279,
  },
  {
    id: "story",
    title: "Story Mode",
    blurb: "The why behind the what",
    icon: <BookIcon />,
    top: 399,
  },
  {
    id: "skin",
    title: (
      <>
        <span style={{ color: INK }}>Festival</span> <span style={{ color: RUST }}>Skin</span>
      </>
    ),
    blurb: "A new look, every celebration",
    icon: <FabricIcon />,
    top: 519,
  },
];

function AllSetScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white sm:py-10">
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{
          aspectRatio: "390 / 1074",
          containerType: "inline-size",
          background:
            "linear-gradient(180deg, #f6efe5 0%, #f5ede2 55%, #f2e6d6 76%, #efd6b6 86%, #e9c497 92%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          <Garland />

          {/* Bell-star ornament */}
          <svg viewBox="0 0 140 28" fill="none" aria-hidden style={box(125, 64, 140, 28)}>
            <defs>
              <linearGradient id="as-top-l" x1="0" x2="1">
                <stop offset="0" stopColor={GOLD} stopOpacity="0" />
                <stop offset="0.45" stopColor={GOLD} />
              </linearGradient>
              <linearGradient id="as-top-r" x1="1" x2="0">
                <stop offset="0" stopColor={GOLD} stopOpacity="0" />
                <stop offset="0.45" stopColor={GOLD} />
              </linearGradient>
            </defs>
            <rect x="9" y="13.5" width="39" height="0.9" fill="url(#as-top-l)" />
            <rect x="92" y="13.5" width="39" height="0.9" fill="url(#as-top-r)" />
            <path
              d="M70.00 4.83L72.47 9.77L78.18 10.48L73.99 14.23L75.05 19.61L70.00 16.99L64.95 19.61L66.01 14.23L61.82 10.48L67.53 9.77Z"
              fill="#c9a04f"
            />
            <circle cx="70" cy="23.6" r="1.9" fill="#b98c3c" />
          </svg>

          <h1
            style={line(111, {
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(40),
              lineHeight: u(40),
              letterSpacing: "-0.01em",
            })}
          >
            You’re all <em style={{ fontStyle: "italic", fontWeight: 500, color: RUST }}>set</em>
          </h1>

          <StarRule style={box(110, 167, 170, 10)} gap={19} />

          <p
            style={line(186, {
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(17),
              lineHeight: u(23),
              letterSpacing: "0.035em",
              color: MUTED,
            })}
          >
            Utsav will change its soul automatically —
            <br />
            every festival, a different world.
          </p>
          <svg viewBox="0 0 10 10" aria-hidden style={box(191.5, 245.5, 7, 7)}>
            <path
              d="m5 0 1.5 3.2 3.500.4-2.6 2.400.7 3.5L5 7.8 1.9 9.5l.7-3.5L0 3.6l3.5-.4Z"
              fill="#d4b072"
            />
          </svg>

          {modes.map((m) => (
            <ModeCard key={m.id} mode={m} />
          ))}

          {/* Dot divider */}
          <svg viewBox="0 0 182 8" fill="none" aria-hidden style={box(104, 646, 182, 8)}>
            <rect x="0" y="3.6" width="79" height="0.8" fill="#e3c99d" />
            <rect x="103" y="3.6" width="79" height="0.8" fill="#e3c99d" />
            <circle cx="91" cy="4" r="3" fill="#d7b273" />
          </svg>

          {/* Season note */}
          <div
            style={{
              ...box(21, 663, 348, 72),
              borderRadius: u(36),
              border: `${u(1)} solid #e2c590`,
              background: "linear-gradient(180deg, #fffcf3 0%, #fcf5e6 100%)",
              boxShadow: `0 ${u(2)} ${u(6)} rgba(190, 150, 90, 0.08)`,
            }}
          >
            <Fleuron style={box(10.5, 32, 13, 9)} />
            <Fleuron flip style={box(324.5, 32, 13, 9)} />
            <p
              style={line(12, {
                fontFamily: serif,
                fontWeight: 500,
                fontSize: u(17),
                lineHeight: u(23.5),
                letterSpacing: "0.03em",
                color: "#3a2820",
              })}
            >
              Right now, it’s <span style={{ color: RUST, fontWeight: 600 }}>Diwali</span> season —
              your first
              <br />
              soul is ready.{" "}
              <svg
                viewBox="0 0 24 20"
                aria-hidden
                style={{
                  display: "inline-block",
                  width: u(16),
                  height: u(13),
                  verticalAlign: "baseline",
                  transform: `translateY(${u(-1)})`,
                }}
              >
                <path
                  d="M12.5 1c1.3 1.7 1.8 2.9 1.8 3.9a1.8 1.8 0 0 1-3.6 0c0-1 .5-2.2 1.8-3.9Z"
                  fill="#f6b73c"
                />
                <path
                  d="M1.5 8.5h21c-1 3-2.6 5-5 6.2-1.800.9-3.6 1.2-5.5 1.2s-3.7-.3-5.5-1.2c-2.4-1.2-4-3.2-5-6.2Z"
                  fill="#9c3a1f"
                />
                <path
                  d="M1.5 8.5h21c-.4 1.2-1 2-1.8 2.7H3.3c-.8-.7-1.4-1.5-1.8-2.7Z"
                  fill="#6a2412"
                />
              </svg>
            </p>
          </div>

          {/* Primary action */}
          <Link
            to="/celebrate/home"
            className="group cursor-pointer no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a1a1c]"
            style={{
              ...box(50.5, 761, 289, 58.5),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: u(10),
              padding: 0,
              borderRadius: u(30),
              border: `${u(0.8)} solid #c27a4a`,
              background: "linear-gradient(180deg, #951a22 0%, #841520 55%, #6e0f17 100%)",
              boxShadow: `0 ${u(8)} ${u(16)} rgba(110, 20, 20, 0.22), 0 ${u(2)} ${u(4)} rgba(90, 15, 15, 0.18)`,
              color: "#fcf1e3",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(21),
              letterSpacing: "0.065em",
              lineHeight: 1,
            }}
          >
            <span style={{ transform: `translateY(${u(-1)})` }}>Enter Utsav</span>
            <svg
              viewBox="0 0 18 16"
              fill="none"
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ width: u(17), height: u(15) }}
            >
              <path
                d="M1.5 8h14.5M9.5 1.5 16 8l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <p
            style={line(834, {
              fontFamily: sans,
              fontWeight: 400,
              fontSize: u(11.8),
              lineHeight: u(16),
              letterSpacing: "-0.012em",
              color: "#7d6c62",
            })}
          >
            You can always change your preferences in settings
          </p>

          <Landscape />
        </div>
      </div>
    </main>
  );
}

function ModeCard({ mode }: { mode: Mode }) {
  return (
    <button
      type="button"
      className="group cursor-pointer text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-px active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a1a1c]"
      style={{
        ...box(21, mode.top, 348, 104),
        padding: 0,
        borderRadius: u(21),
        border: `${u(1)} solid #efdcc0`,
        background: "linear-gradient(135deg, #fffefb 0%, #fdf7ee 55%, #faf0e2 100%)",
        boxShadow: `0 ${u(4)} ${u(12)} rgba(170, 120, 60, 0.1), 0 ${u(1)} ${u(2)} rgba(170, 120, 60, 0.06)`,
        color: INK,
      }}
    >
      <span
        aria-hidden
        style={{
          ...box(11.5, 11.5, 79.5, 79.5),
          display: "grid",
          placeItems: "center",
          borderRadius: u(15),
          border: `${u(1)} solid #f2dc9e`,
          background: "linear-gradient(160deg, #fdf3d4 0%, #fbf0cd 50%, #fcf3d9 100%)",
        }}
      >
        <span style={{ width: u(44), height: u(44), display: "block" }}>{mode.icon}</span>
      </span>

      <span
        style={{
          position: "absolute",
          left: u(106.5),
          top: u(17.5),
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(22.5),
          lineHeight: u(24),
          letterSpacing: "-0.005em",
          color: WINE,
          whiteSpace: "nowrap",
        }}
      >
        {mode.title}
      </span>
      <span
        style={{
          position: "absolute",
          left: u(106.5),
          top: u(50.5),
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(14.7),
          lineHeight: u(15),
          letterSpacing: "0.03em",
          color: MUTED,
          whiteSpace: "nowrap",
        }}
      >
        {mode.blurb}
      </span>
      <StarRule style={box(106, 75, 60, 8)} gap={11} short />

      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        style={{
          ...box(300.5, 34.5, 35.5, 35.5),
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          border: `${u(1.2)} solid #f3dc9a`,
          background: "#fffbeb",
          boxShadow: `0 ${u(1)} ${u(3)} rgba(200, 160, 80, 0.12)`,
        }}
      >
        <svg viewBox="0 0 10 16" fill="none" style={{ width: u(6.5), height: u(11) }}>
          <path
            d="m2 2 6 6-6 6"
            stroke="#a8331f"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

/* ───────────────────────── Ornaments ───────────────────────── */

function StarRule({ style, gap, short }: { style: CSSProperties; gap: number; short?: boolean }) {
  const w = short ? 60 : 170;
  const h = short ? 8 : 10;
  const mid = w / 2;
  const s = short ? 3 : 4.5;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden style={style}>
      <rect x="0" y={h / 2 - 0.4} width={mid - gap} height="0.8" fill="#e2c595" />
      <rect x={mid + gap} y={h / 2 - 0.4} width={mid - gap} height="0.8" fill="#e2c595" />
      <path
        d={`M${mid} ${h / 2 - s}c.5 ${s * 0.6} ${s * 0.4} ${s - 0.3} ${s} ${s}c${-s * 0.6} .3 ${-s + 0.5} ${s * 0.4} ${-s} ${s}c-.5 ${-s * 0.6} ${-s * 0.4} ${-s + 0.3} ${-s} ${-s}c${s * 0.6} -.3 ${s - 0.5} ${-s * 0.4} ${s} ${-s}Z`}
        fill={short ? "#d9b57a" : "#cfa458"}
      />
    </svg>
  );
}

function Fleuron({ style, flip }: { style: CSSProperties; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 26 18"
      aria-hidden
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M16 4c4.5-1.5 9 1.5 9 5.5S21 15.5 17 14c-2-.8-3-2.3-2.8-4 .2 2.5 2.8 3.8 5 3 2.4-.9 2.4-4.7-.6-5.4-2.1-.5-4 .5-4.8 2-.4-2.200.6-4.7 2.2-5.6Z"
        fill="#c9a04f"
      />
      <path
        d="M1 9.5c3-2.5 7-3 10.5-1.2M6 6c-1.5-.6-3-.4-4 .5"
        stroke="#c9a04f"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SPARKS: [number, number, number][] = [
  [49, 1027, 1.9],
  [137, 1036, 2],
  [214, 1033, 2.2],
  [312, 1030, 1.9],
  [351, 1041, 2.1],
  [370, 1056, 1.9],
];

const FLAMES: [number, number][] = [
  [88, 1045],
  [175, 1053],
  [263, 1048],
];

function Landscape() {
  return (
    <svg
      viewBox="0 900 390 174"
      fill="none"
      aria-hidden
      style={{ position: "absolute", left: 0, bottom: 0, width: "100%", display: "block" }}
    >
      <defs>
        <radialGradient id="as-ground" cx="0.5" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#9a6418" />
          <stop offset="0.55" stopColor="#895514" />
          <stop offset="1" stopColor="#4a1a0c" />
        </radialGradient>
        <linearGradient id="as-ground-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#3f150a" stopOpacity="0.9" />
          <stop offset="0.18" stopColor="#3f150a" stopOpacity="0" />
          <stop offset="0.82" stopColor="#3f150a" stopOpacity="0" />
          <stop offset="1" stopColor="#3f150a" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* far ridge */}
      <path
        d="M0 985l40-5 9-33 21 32 30-3 15-33 22 30 38-5 20-32 21 32 40-4 18-29 21 29 30 3 21-32 20 32 25 2V1010H0Z"
        fill="#b48264"
        opacity="0.85"
      />
      {/* near ridge */}
      <path
        d="M0 993l35-3 23-22 25 23 51-2 12-28 25 27 50-1 22-28 24 28 50 4 33-26 15 22 25-2V1010H0Z"
        fill="#7a4526"
        opacity="0.78"
      />
      <path d="M0 990q195-12 390 0V1010H0Z" fill="#a0692c" opacity="0.45" />
      <rect x="0" y="1003.5" width="390" height="71" fill="url(#as-ground)" />
      <rect x="0" y="1003.5" width="390" height="71" fill="url(#as-ground-fade)" />
      {SPARKS.map(([x, y, r]) => (
        <ellipse key={x} cx={x} cy={y} rx={r * 1.45} ry={r * 1.6} fill="#f0c43a" />
      ))}
      {FLAMES.map(([x, y]) => (
        <g key={x}>
          <ellipse cx={x} cy={y + 6.4} rx="9.4" ry="2.2" fill="#e58a2a" />
          <ellipse cx={x} cy={y} rx="5.6" ry="6.4" fill="#f0c43a" />
        </g>
      ))}
    </svg>
  );
}

/* ───────────────────────── Card icons (44 × 44) ───────────────────────── */

function LampIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" style={{ display: "block", width: "100%" }}>
      <g transform="translate(22 19) scale(1.3) translate(-22 -19)">
        <circle cx="22" cy="12" r="10" fill="#fce6a3" />
        <circle cx="22" cy="13" r="6.5" fill="#fbd27a" />
        <path d="M22 4c2.8 3.3 4 5.8 4 7.8a4 4 0 0 1-8 0c0-2 1.2-4.5 4-7.8Z" fill="#e8461f" />
        <path d="M22 7.8c1.4 1.8 2 3.1 2 4.1a2 2 0 0 1-4 0c0-1 .6-2.3 2-4.1Z" fill="#fbbf24" />
        <ellipse cx="22" cy="20.5" rx="13" ry="2.6" fill="#7a3414" />
        <path d="M9 20.5h26c-.6 5-5 8.5-13 8.5s-12.4-3.5-13-8.5Z" fill="#a5461c" />
        <path d="M9.3 22.5c4 1.8 21.4 1.8 25.4 0" stroke="#8a3615" strokeWidth="1" />
        <path d="M19 29h6l2.5 4.5h-11Z" fill="#5b2412" />
        <circle cx="10" cy="29" r="3.4" fill="#ef6a20" />
        <circle cx="34" cy="29" r="3.4" fill="#ef6a20" />
      </g>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" style={{ display: "block", width: "100%" }}>
      <g stroke="#c4561f" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M5 12.5c5.5-1.2 11-1 16.5 1.5V33c-5.5-2.3-11-2.6-16.5-1.4Z" fill="#fdf3e0" />
        <path d="M39 12.5c-5.5-1.2-11-1-16.5 1.5V33c5.5-2.3 11-2.6 16.5-1.4Z" fill="#fdf3e0" />
      </g>
      <path d="M13 17.5l-3 3.3h2v4.4h2v-4.4h2Z" fill="#d97818" />
      <g stroke="#c4561f" strokeWidth="1.4" strokeLinecap="round">
        <path d="M26 17.5h9M26 21h9M26 24.5h9M26 28h6.5" />
      </g>
      <circle cx="5.5" cy="32" r="2.7" fill="#e8571f" />
      <circle cx="38.5" cy="32" r="2.7" fill="#e8571f" />
    </svg>
  );
}

function FabricIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" style={{ display: "block", width: "100%" }}>
      <g transform="rotate(-12 22 22)">
        <rect x="5" y="11" width="31" height="6.4" rx="3.2" fill="#6a2ba8" />
        <ellipse cx="35.8" cy="14.2" rx="2.4" ry="3.2" fill="#8a45cc" />
        <rect x="6.5" y="18" width="31" height="6.4" rx="3.2" fill="#d4521c" />
        <ellipse cx="37.3" cy="21.2" rx="2.4" ry="3.2" fill="#ef7a2a" />
        <rect x="8" y="25" width="31" height="6.8" rx="3.4" fill="#b81f2a" />
        <ellipse cx="38.8" cy="28.4" rx="2.5" ry="3.4" fill="#d63a3e" />
        <path d="M11 28.4h24" stroke="#f6c64a" strokeWidth="1.3" strokeDasharray="2 1.6" />
      </g>
    </svg>
  );
}
