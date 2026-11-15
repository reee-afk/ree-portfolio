import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import diwaliArt from "@/assets/festival-diwali.webp";

export const Route = createFileRoute("/celebrate")({
  head: () => ({
    meta: [
      { title: "Remembering How We Celebrate" },
      {
        name: "description",
        content: "A festive welcome screen that changes its soul with every festival.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400&display=swap",
      },
    ],
  }),
  component: CelebrateScreen,
});

/* The screen is drawn on a 390 × 923 artboard. Every measurement goes through
   u() so the whole composition scales with the frame's width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Outfit", system-ui, sans-serif';

const INK = "#351d15";
const RUST = "#8a4a2e";
const GOLD = "#e3c46c";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return {
    position: "absolute",
    left: u(left),
    top: u(top),
    width: u(width),
    height: u(height),
  };
}

function CelebrateScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white sm:py-10">
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.35),0_8px_24px_rgba(60,30,10,0.12)]"
        style={{ aspectRatio: "390 / 923", containerType: "inline-size", background: "#fbf3e6" }}
      >
        <div
          className="absolute inset-0"
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          <img
            src={diwaliArt}
            alt="A woman in an orange sari lighting diyas around a flower rangoli on a marble terrace, overlooking a river city glowing with lamps."
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "60% 50%" }}
            draggable={false}
          />
          {/* Cream haze behind the title, and a soft dusk behind the footer line. */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: [
                "radial-gradient(75% 22% at 50% 15%, rgba(252, 244, 230, 0.82) 0%, rgba(252, 244, 230, 0.55) 55%, rgba(252, 244, 230, 0) 100%)",
                "linear-gradient(180deg, rgba(252, 244, 230, 0.5) 0%, rgba(252, 244, 230, 0) 32%, rgba(40, 15, 5, 0) 82%, rgba(40, 15, 5, 0.55) 100%)",
              ].join(", "),
            }}
          />

          {/* Crest */}
          <svg viewBox="0 0 82 40" fill="none" aria-hidden style={box(174, 41.5, 41, 20)}>
            <g stroke={RUST} strokeWidth="2" strokeLinecap="round">
              <path d="M4 26C19 31 33 23 41 7c8 16 22 24 37 19" />
              <path d="M9 11c4 13 17 19 32 19s28-6 32-19" />
              <path d="M41 30v9" />
            </g>
            <g fill={RUST}>
              <circle cx="41" cy="4" r="3" />
              <circle cx="4" cy="26" r="2.6" />
              <circle cx="78" cy="26" r="2.6" />
            </g>
          </svg>

          {/* Title */}
          <h1
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(76),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(36),
              lineHeight: u(37),
              whiteSpace: "nowrap",
              textShadow: "0 1px 1px rgba(255, 244, 225, 0.35)",
            }}
          >
            Remembering
            <br />
            <span style={{ letterSpacing: "0.022em" }}>How We </span>
            <span
              style={{
                letterSpacing: "0.022em",
                backgroundImage: "linear-gradient(180deg, #d04a1c 0%, #b83416 55%, #a12a14 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "none",
              }}
            >
              Celebrate
            </span>
          </h1>

          {/* Divider under the title */}
          <svg viewBox="0 0 190 12" fill="none" aria-hidden style={box(99.5, 169.5, 190, 12)}>
            <defs>
              <linearGradient id="rule-l" x1="0" x2="1">
                <stop offset="0" stopColor={RUST} stopOpacity="0" />
                <stop offset="0.6" stopColor={RUST} stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="rule-r" x1="1" x2="0">
                <stop offset="0" stopColor={RUST} stopOpacity="0" />
                <stop offset="0.6" stopColor={RUST} stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="0" y="5.6" width="79" height="0.8" fill="url(#rule-l)" />
            <rect x="111" y="5.6" width="79" height="0.8" fill="url(#rule-r)" />
            <path
              d="M95 0.6c1.6 2.4 3 3.8 5.4 5.4-2.4 1.6-3.8 3-5.4 5.4-1.6-2.4-3-3.8-5.4-5.4 2.4-1.6 3.8-3 5.4-5.400Z"
              stroke={RUST}
              strokeWidth="1"
            />
          </svg>

          {/* Festival switcher */}
          <Leaf style={box(44, 216, 23, 12)} />
          <Leaf style={{ ...box(322.5, 216, 23, 12), transform: "scaleX(-1)" }} />
          <button
            type="button"
            aria-haspopup="listbox"
            aria-label="Festival: Diwali. Tap to switch"
            className="cursor-pointer transition-transform duration-200 hover:scale-[1.015] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a4a2e]"
            style={{
              ...box(74.5, 200, 240, 45),
              display: "flex",
              alignItems: "center",
              padding: 0,
              borderRadius: u(23),
              border: `${u(0.75)} solid rgba(214, 170, 112, 0.85)`,
              background: "linear-gradient(180deg, #fdf5e7 0%, #f8ead6 100%)",
              boxShadow: `0 ${u(3)} ${u(8)} rgba(90, 50, 15, 0.22), inset 0 ${u(1)} 0 rgba(255, 255, 255, 0.7)`,
              color: INK,
            }}
          >
            <span
              aria-hidden
              style={{
                marginLeft: u(9.5),
                width: u(31),
                height: u(31),
                flex: "none",
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 50% 40%, #fffbe0 0%, #fbec9b 60%, #f4da68 100%)",
                boxShadow: `0 0 0 ${u(0.75)} rgba(226, 190, 90, 0.9)`,
                fontSize: u(15),
                lineHeight: 1,
              }}
            >
              🪔
            </span>
            <span
              style={{
                marginLeft: u(11.5),
                fontFamily: serif,
                fontWeight: 700,
                fontSize: u(18),
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              Diwali
            </span>
            <span
              style={{
                marginLeft: u(7),
                fontFamily: sans,
                fontWeight: 300,
                fontSize: u(14.8),
                letterSpacing: "0.01em",
                lineHeight: 1,
                color: "#8f6a55",
              }}
            >
              · tap to switch
            </span>
            <svg
              viewBox="0 0 12 8"
              fill="none"
              aria-hidden
              style={{ marginLeft: "auto", marginRight: u(17), width: u(11.5), height: u(7.5) }}
            >
              <path
                d="M1.5 1.5 6 6l4.5-4.5"
                stroke={INK}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Primary action */}
          <Link
            to="/celebrate/personalize"
            className="group cursor-pointer no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3cf8a]"
            style={{
              ...box(24, 771, 341.5, 57),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: u(13),
              padding: 0,
              paddingRight: u(4),
              borderRadius: u(28.5),
              border: `${u(0.75)} solid #e2713a`,
              background: [
                "linear-gradient(100deg, rgba(255,255,255,0) 5%, rgba(255,255,255,0.11) 12%, rgba(255,255,255,0.04) 17%, rgba(255,255,255,0) 23%)",
                "linear-gradient(90deg, #8c1016 0%, #a3151b 30%, #9a1218 60%, #7c0c12 100%)",
              ].join(", "),
              boxShadow: `inset 0 0 0 ${u(1.5)} #8c1016, inset 0 0 0 ${u(2.25)} rgba(236, 132, 80, 0.55), 0 ${u(4)} ${u(14)} rgba(60, 10, 5, 0.35)`,
              color: "#fbeedc",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(20.5),
              letterSpacing: "0.045em",
              lineHeight: 1,
              boxSizing: "border-box",
            }}
          >
            <span>Let’s Begin</span>
            <svg
              viewBox="0 0 26 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ width: u(14), height: u(5.4), transform: `translateY(${u(2)})` }}
            >
              <path
                d="M1 5h23M19.5 1 24 5l-4.5 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Footer line */}
          <p
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(847.5),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 400,
              fontSize: u(14.8),
              lineHeight: u(20),
              letterSpacing: "0.04em",
              color: "#f4e8d6",
              textShadow: "0 1px 3px rgba(30, 12, 4, 0.55)",
            }}
          >
            Changes its soul with every festival
          </p>
          <svg viewBox="0 0 142 12" fill="none" aria-hidden style={box(123.5, 876, 142, 12)}>
            <defs>
              <linearGradient id="gold-l" x1="0" x2="1">
                <stop offset="0" stopColor={GOLD} stopOpacity="0" />
                <stop offset="0.5" stopColor={GOLD} />
              </linearGradient>
              <linearGradient id="gold-r" x1="1" x2="0">
                <stop offset="0" stopColor={GOLD} stopOpacity="0" />
                <stop offset="0.5" stopColor={GOLD} />
              </linearGradient>
            </defs>
            <rect x="0" y="5.5" width="53" height="1" fill="url(#gold-l)" />
            <rect x="89" y="5.5" width="53" height="1" fill="url(#gold-r)" />
            <path
              d="M71 1c1.2 2.8 3 4 6.2 5-3.2 1-5 2.2-6.2 5-1.2-2.8-3-4-6.2-5 3.2-1 5-2.2 6.2-5Z"
              stroke={GOLD}
              strokeWidth="1"
            />
            <circle cx="71" cy="6" r="1.5" fill={GOLD} />
          </svg>
        </div>
      </div>
    </main>
  );
}

function Leaf({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 46 24" fill="none" aria-hidden style={style}>
      <path
        d="M5 12C14 3 27 2 44 12 27 22 14 21 5 12Z"
        stroke={RUST}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="3.5" cy="12" r="2.6" fill={RUST} />
    </svg>
  );
}
