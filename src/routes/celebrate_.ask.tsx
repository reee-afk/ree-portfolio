import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const Route = createFileRoute("/celebrate_/ask")({
  head: () => ({
    meta: [
      { title: "Ask Utsav — Lakshmi Puja" },
      { name: "description", content: "Ask anything about the step of the ritual you’re on." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: AskScreen,
});

/* Drawn on a 390 × 1188 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';

const INK = "#2a1a14";
const WINE = "#97191f";
const RUST = "#c0532a";
const GOLD = "#d9a35c";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: u(width), height: u(height) };
}

/** Bar heights of the listening waveform, left to right, in artboard units. */
const BARS = [12, 19, 30, 41, 49, 55.6, 49, 37, 25, 15, 8];

const back = { to: "/celebrate/checklist", search: { day: 3 } } as const;

function AskScreen() {
  const [holding, setHolding] = useState(false);
  const [hint, setHint] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const nudge = () => {
    setHint(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHint(false), 2200);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white sm:py-10">
      <style>{`
        @keyframes utsav-wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.55); } }
        @keyframes utsav-ring { 0% { transform: scale(1); opacity: 0.9; } 100% { transform: scale(1.12); opacity: 0; } }
        @keyframes utsav-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        .utsav-bar { animation: utsav-wave 1.4s ease-in-out infinite; transform-origin: center; }
        .utsav-holding .utsav-bar { animation-duration: 0.5s; }
        .utsav-mic-ring { animation: utsav-ring 1.4s ease-out infinite; }
        .utsav-nudge { animation: utsav-pulse 0.55s ease-in-out 3; }
        @media (prefers-reduced-motion: reduce) {
          .utsav-bar, .utsav-mic-ring, .utsav-nudge { animation: none !important; }
        }
      `}</style>
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{
          aspectRatio: "390 / 1188",
          containerType: "inline-size",
          background:
            "radial-gradient(70% 40% at 50% 25%, rgba(255,246,222,0.75) 0%, rgba(255,246,222,0) 70%), linear-gradient(180deg, #fae6c3 0%, #f9e2b9 40%, #f6d8b0 75%, #f3d0a8 100%)",
        }}
      >
        <div
          className={`absolute inset-0 ${holding ? "utsav-holding" : ""}`}
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          <Link
            {...back}
            aria-label="Close and go back to the ritual"
            className="grid cursor-pointer place-items-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97191f]"
            style={{
              ...box(338.3, 25, 30.6, 30.6),
              borderRadius: "50%",
              background: "#fdf8ef",
              boxShadow: `0 ${u(2)} ${u(6)} rgba(150, 100, 40, 0.15)`,
            }}
          >
            <svg
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              style={{ width: u(9.5), height: u(9.5) }}
            >
              <path
                d="M1.5 1.5l9 9M10.5 1.5l-9 9"
                stroke="#2b2420"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          <Ornaments />

          <h1
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(84),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 700,
              fontSize: u(37),
              lineHeight: u(42),
              letterSpacing: "0.035em",
            }}
          >
            Lakshmi Puja
          </h1>
          <p
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(130.5),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(20),
              lineHeight: u(22),
              letterSpacing: "0.02em",
              color: "#8a5843",
            }}
          >
            Step 3 of 9
          </p>
          <svg viewBox="0 0 168 10" fill="none" aria-hidden style={box(111, 163.7, 168, 10)}>
            <path d="M2 5h66M100 5h66" stroke="#dcb487" strokeWidth="0.9" />
            <path
              d="M84 .5c.6 2.2 1.6 3.6 3.6 4.5-2 .9-3 2.3-3.6 4.5-.6-2.2-1.6-3.6-3.6-4.5 2-.9 3-2.3 3.6-4.5Z"
              fill="#c98b5c"
            />
          </svg>

          <Listening />

          <p
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(406),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 600,
              fontSize: u(25.5),
              lineHeight: u(28),
            }}
          >
            Listening…
          </p>
          <p
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(445.5),
              margin: 0,
              textAlign: "center",
              fontFamily: sans,
              fontWeight: 500,
              fontSize: u(12.6),
              lineHeight: u(14),
              color: "#6f5a50",
            }}
          >
            Ask anything about this ritual
          </p>

          <Question />
          <Answer />

          <button
            type="button"
            onClick={nudge}
            className="group cursor-pointer text-left transition-[filter] duration-150 hover:brightness-[0.98] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97191f]"
            style={{
              ...box(20.6, 853.7, 348.7, 55.8),
              padding: 0,
              borderRadius: u(16),
              border: "1px solid #f1e0c9",
              background: "#f8ecdd",
              color: INK,
            }}
          >
            <span
              aria-hidden
              style={{
                ...box(16.8, 12.3, 31.6, 31.6),
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                background: "#efdcc8",
              }}
            >
              <MicIcon color={RUST} style={{ width: u(8.5), height: u(13) }} />
            </span>
            <span
              style={{
                position: "absolute",
                left: u(60.9),
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                fontFamily: serif,
                fontWeight: 500,
                fontSize: u(18.2),
                lineHeight: 1,
              }}
            >
              Ask another question
            </span>
            <svg
              viewBox="0 0 8 14"
              fill="none"
              aria-hidden
              className="transition-transform duration-150 group-hover:translate-x-0.5"
              style={box(318.6, 21.9, 6.5, 11.5)}
            >
              <path
                d="m1.5 1.5 5 5.5-5 5.5"
                stroke="#8a4a35"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Flourish style={box(20, 945, 29, 10)} />
          <Flourish flip style={box(341.5, 945, 29, 10)} />
          <Link
            {...back}
            className="group cursor-pointer no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97191f]"
            style={{
              ...box(54.2, 925.2, 281, 49.9),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: u(11),
              borderRadius: u(25),
              background: "linear-gradient(180deg, #a61e26 0%, #8f141c 55%, #7c0f16 100%)",
              boxShadow: `0 ${u(7)} ${u(14)} rgba(120, 20, 20, 0.25), inset 0 ${u(1)} 0 rgba(255,255,255,0.12)`,
              color: "#fff4ea",
              fontFamily: serif,
              fontWeight: 600,
              fontSize: u(18.6),
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}
          >
            Got it, back to the ritual
            <ArrowIcon
              style={{ width: u(13), height: u(12) }}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          {/* Hold to speak */}
          <span
            aria-hidden
            className={holding ? "utsav-mic-ring" : undefined}
            style={{
              ...box(155.7, 989.4, 77.8, 77.8),
              borderRadius: "50%",
              border: "1px solid #efbd73",
              background: "rgba(247, 211, 160, 0.45)",
            }}
          />
          <button
            type="button"
            aria-label="Hold to speak"
            aria-pressed={holding}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setHolding(true);
            }}
            onPointerUp={() => setHolding(false)}
            onPointerCancel={() => setHolding(false)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setHolding(true);
              }
            }}
            onKeyUp={() => setHolding(false)}
            onContextMenu={(e) => e.preventDefault()}
            className={`grid cursor-pointer place-items-center transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#97191f] ${hint ? "utsav-nudge" : ""}`}
            style={{
              ...box(163, 996.7, 63.2, 63.2),
              padding: 0,
              border: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 30%, #c4232b 0%, #a3171f 55%, #84111a 100%)",
              boxShadow: `0 ${u(6)} ${u(14)} rgba(130, 20, 20, 0.3)`,
              transform: holding ? "scale(0.95)" : undefined,
              touchAction: "none",
              userSelect: "none",
            }}
          >
            <MicIcon color="#fff" style={{ width: u(12), height: u(19) }} />
          </button>
          <p
            aria-live="polite"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(1074.5),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(16.5),
              lineHeight: u(18),
              color: hint ? WINE : "#8a7062",
            }}
          >
            {holding
              ? "Listening… let go when you’re done"
              : hint
                ? "Hold the mic and ask"
                : "Hold to speak"}
          </p>

          <TabBar />
        </div>
      </div>
    </main>
  );
}

function Ornaments() {
  return (
    <svg viewBox="0 0 390 30" fill="none" aria-hidden style={box(0, 50, 390, 30)}>
      <path
        d="M109 14c8-1.5 16 1.5 22 .5 3-.5 5-1.6 7-.5"
        stroke={RUST}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M118 14.5c4 1.4 9 1.4 12-.6" stroke={RUST} strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="141.6" cy="14" r="1.8" fill={RUST} />
      <path
        d="M281 14c-8-1.5-16 1.5-22 .5-3-.5-5-1.6-7-.5"
        stroke={RUST}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M272 14.5c-4 1.4-9 1.4-12-.6"
        stroke={RUST}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="248.4" cy="14" r="1.8" fill={RUST} />
      <path
        d="M194.6 5 199 12h-2.6l4.6 6.6h-4.4l2.4 3.4h-8.8l2.4-3.4h-4.4l4.6-6.6h-2.6Z"
        fill={RUST}
      />
    </svg>
  );
}

function Listening() {
  const cx = 194.6;
  const cy = 296.1;
  const ring = (r: number, color: string, w: number) => (
    <span
      aria-hidden
      style={{
        ...box(cx - r, cy - r, r * 2, r * 2),
        borderRadius: "50%",
        border: `${u(w)} solid ${color}`,
      }}
    />
  );
  return (
    <div role="img" aria-label="Listening">
      {ring(95.1, "rgba(238, 205, 150, 0.8)", 0.8)}
      {ring(83.7, "#e8bd78", 0.9)}
      {ring(71.2, "#d8a058", 1.1)}
      <span
        aria-hidden
        style={{
          ...box(cx - 55, cy - 55, 110, 110),
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #fffaf0 0%, #fff4dd 45%, rgba(255, 238, 205, 0.6) 75%, rgba(255, 238, 205, 0) 100%)",
          boxShadow: `0 0 ${u(24)} ${u(8)} rgba(255, 244, 220, 0.6)`,
        }}
      />
      <div
        aria-hidden
        style={{
          ...box(cx - 28, cy - 28, 56, 56),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {BARS.map((h, i) => (
          <span
            key={i}
            className="utsav-bar"
            style={{
              width: u(2),
              height: u(h),
              borderRadius: u(1),
              background: "#c2451f",
              animationDelay: `${(Math.abs(i - 5) * 0.12).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Question() {
  return (
    <figure
      style={{
        ...box(20.6, 481.7, 348.7, 86.5),
        margin: 0,
        borderRadius: u(16),
        border: "1px solid #ecc9ab",
        background: "linear-gradient(180deg, #f7dfcb 0%, #f4d8c2 100%)",
        boxShadow: `0 ${u(2)} ${u(6)} rgba(170, 100, 50, 0.08)`,
      }}
    >
      <svg viewBox="0 0 16 12" aria-hidden style={box(17.4, 27, 9.5, 7)}>
        <path
          d="M6 1C3 2 1 4.5 1 8a3 3 0 1 0 3-3c.3-1.6 1.3-2.8 2.5-3.5ZM15 1c-3 1-5 3.5-5 7a3 3 0 1 0 3-3c.3-1.6 1.3-2.8 2.5-3.5Z"
          fill="#c9653e"
        />
      </svg>
      <blockquote
        style={{
          position: "absolute",
          left: u(36.6),
          top: u(17.5),
          width: u(280),
          margin: 0,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(18.6),
          lineHeight: u(25),
          letterSpacing: "0.01em",
          color: INK,
        }}
      >
        “Why does the diya have to face north?”
      </blockquote>
      <figcaption className="sr-only">You asked</figcaption>
      <svg viewBox="0 0 20 11" aria-hidden style={box(299, 85, 20, 11)}>
        <path d="M0 0h20L10 10Z" fill="#f4d8c2" />
        <path d="M0 0 10 10 20 0" stroke="#ecc9ab" strokeWidth="1" fill="none" />
      </svg>
    </figure>
  );
}

function Answer() {
  const curl = (style: CSSProperties) => (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      style={{ position: "absolute", width: u(9), height: u(9), ...style }}
    >
      <path d="M1 11C1 6 4 2 10 1" stroke="#c7a171" strokeWidth="1" />
      <circle cx="10" cy="1.8" r="1" fill="#c7a171" />
    </svg>
  );
  return (
    <section
      aria-label="Utsav says"
      style={{
        ...box(20.6, 585.8, 348.7, 254.5),
        borderRadius: u(16),
        border: "1px solid #f1e0c4",
        background: "linear-gradient(180deg, #fcf7ef 0%, #faf3e8 100%)",
        boxShadow: `0 ${u(4)} ${u(12)} rgba(170, 120, 60, 0.1)`,
      }}
    >
      {curl({ left: u(6), top: u(6) })}
      {curl({ right: u(6), top: u(6), transform: "scaleX(-1)" })}
      {curl({ left: u(6), bottom: u(6), transform: "scaleY(-1)" })}
      {curl({ right: u(6), bottom: u(6), transform: "scale(-1)" })}

      <span
        aria-hidden
        style={{
          ...box(22.7, 18.3, 43.2, 43.2),
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          border: "1px solid #efc865",
          background: "radial-gradient(circle at 40% 35%, #fff2c4 0%, #fbe39a 100%)",
        }}
      >
        <svg viewBox="0 0 20 24" aria-hidden style={{ width: u(15), height: u(18) }}>
          <path
            d="M10 1c1.6 2 2.3 3.4 2.3 4.6a2.3 2.3 0 0 1-4.6 0C7.7 4.4 8.4 3 10 1Z"
            fill="#f2a325"
          />
          <path d="M1.5 11h17c-.6 3.6-4 6.2-8.5 6.2S2.1 14.6 1.5 11Z" fill="#8f2310" />
          <path d="M7 17.3h6l1.6 3.2H5.4Z" fill="#6a1a0d" />
        </svg>
      </span>
      <h2
        style={{
          position: "absolute",
          left: u(79.2),
          top: u(29),
          margin: 0,
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(22.7),
          lineHeight: u(24),
        }}
      >
        Utsav <em style={{ fontWeight: 500, color: "#9b1c3a" }}>says</em>
      </h2>
      <p
        style={{
          position: "absolute",
          left: u(22.6),
          top: u(70.7),
          width: u(316),
          margin: 0,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(16.2),
          lineHeight: u(22.9),
          letterSpacing: "0.012em",
          color: "#33241e",
        }}
      >
        The flame faces north because north is the direction of wealth in Vastu Shastra — it’s how
        you signal to Lakshmi which way to enter. Your grandmother probably did it without thinking
        — now you know why.
      </p>
      <Link
        to="/celebrate/step"
        className="group cursor-pointer no-underline transition-[background-color] duration-150 hover:bg-[#fff8ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97191f]"
        style={{
          ...box(17.7, 199.6, 313.4, 40),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: u(10),
          padding: 0,
          borderRadius: u(20),
          border: "1px solid #e5c595",
          background: "#fffcf6",
          color: "#8f2a1c",
          fontFamily: serif,
          fontWeight: 600,
          fontSize: u(17),
          lineHeight: 1,
        }}
      >
        Read more about this
        <ArrowIcon
          style={{ width: u(11), height: u(10) }}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </Link>
    </section>
  );
}

/* ───────────────────────── Bits ───────────────────────── */

function Flourish({ style, flip }: { style: CSSProperties; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 30 10"
      fill="none"
      aria-hidden
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <circle cx="2" cy="5" r="1.6" fill="#c25a3a" />
      <path
        d="M3 5c4-3 10-3.5 14-1.8 3 1.3 6 1.8 12 1.8-6 0-9 .5-12 1.8C13 8.5 7 8 3 5Z"
        stroke="#c25a3a"
        strokeWidth="1"
      />
    </svg>
  );
}

function ArrowIcon({ style, className }: { style: CSSProperties; className?: string }) {
  return (
    <svg viewBox="0 0 14 12" fill="none" aria-hidden className={className} style={style}>
      <path
        d="M1 6h11.5M7.5 1 12.5 6l-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicIcon({ color, style }: { color: string; style: CSSProperties }) {
  return (
    <svg viewBox="0 0 12 19" fill="none" aria-hidden style={style}>
      <rect x="3.2" y="0.8" width="5.6" height="10.6" rx="2.8" fill={color} />
      <path
        d="M1 8.5a5 5 0 0 0 10 0M6 13.5v4.5M3.5 18h5"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type TabTarget = "/celebrate/home" | "/celebrate/story" | "/celebrate/food";

const TABS: { id: string; label: string; icon: ReactNode; to?: TabTarget }[] = [
  { id: "home", label: "Home", icon: <HomeTab />, to: "/celebrate/home" },
  { id: "guide", label: "Guide", icon: <GuideTab /> },
  { id: "story", label: "Story", icon: <StoryTab />, to: "/celebrate/story" },
  { id: "food", label: "Food", icon: <FoodTab />, to: "/celebrate/food" },
];

function TabBar() {
  return (
    <nav
      aria-label="Utsav"
      style={{
        ...box(0, 1113.1, 390, 75.3),
        background: "#fbf4ea",
        borderTop: "1px solid #f1e3cf",
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "guide";
        const x = [66.5, 152.4, 237.9, 322.7][i];
        const style: CSSProperties = {
          ...box(x - 34, 3, 68, 58),
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
            <span style={{ marginTop: u(12), width: u(20), height: u(20), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(active ? 3.5 : 7),
                fontFamily: sans,
                fontWeight: active ? 700 : 500,
                fontSize: u(11.6),
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
                  width: u(20),
                  height: u(2),
                  borderRadius: u(1),
                  background: WINE,
                }}
              />
            )}
          </>
        );
        const cls =
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97191f]";
        if (t.id === "guide")
          return (
            <Link key={t.id} {...back} aria-current="page" className={cls} style={style}>
              {inner}
            </Link>
          );
        return t.to ? (
          <Link key={t.id} to={t.to} className={cls} style={style}>
            {inner}
          </Link>
        ) : (
          <button key={t.id} type="button" className={cls} style={style}>
            {inner}
          </button>
        );
      })}
      <span
        aria-hidden
        style={{ ...box(131.4, 71.5, 127.4, 3.3), borderRadius: u(2), background: "#c9c2bb" }}
      />
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
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
      <path
        d="m8 10 4 4 4-4"
        stroke="#fbf4ea"
        strokeWidth="2"
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
      <path
        d="M4.5 7h15l-1 14h-13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 11a3.5 3.5 0 0 0 7 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M6 7 8 3h8l2 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
