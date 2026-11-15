import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import diyaImg from "@/assets/step/diya.webp";
import lampImg from "@/assets/step/lamp.webp";
import compassImg from "@/assets/step/compass.webp";
import paperImg from "@/assets/step/paper.webp";

export const Route = createFileRoute("/celebrate_/step")({
  head: () => ({
    meta: [
      { title: "Light the diya — Lakshmi Puja, step 3" },
      { name: "description", content: "Why the diya is lit, and which way its flame faces." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: StepScreen,
});

/* Drawn on a 390-wide artboard; u() scales every measurement with the frame width.
   The screen flows top to bottom, so each card grows with its text. */
/** The mockup is drawn at 340 wide; K scales its measurements up to the 390 frame. */
const K = 390 / 340;
const u = (n: number) => `calc(${+(n * K).toFixed(2)} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';

const INK = "#231815";
const WINE = "#8f1a1f";
const GOLD = "#d4a65a";
const BODY = "#3d322d";

/** Lakshmi Puja is step-by-step on the Day 3 checklist; this is its third step. */
const STEP = { n: 3, of: 9, id: "lamp" } as const;
const checklist = { to: "/celebrate/checklist", search: { day: 3 } } as const;

const WAVE = [6, 10, 14, 20, 12, 26, 18, 30, 22, 14, 28, 16, 24, 12, 18, 9, 6, 4];
const NOTE_SECONDS = 32;

const card: CSSProperties = {
  position: "relative",
  margin: `0 ${u(17)}`,
  borderRadius: u(13),
  border: "1px solid #e9d3ab",
  backgroundColor: "#fbf3e5",
  backgroundImage: `linear-gradient(rgba(252, 245, 232, 0.93), rgba(252, 245, 232, 0.93)), url(${paperImg})`,
  backgroundSize: "cover",
  backgroundPosition: "50% 45%",
  backgroundRepeat: "no-repeat",
  boxShadow: "0 3px 10px rgba(150, 110, 60, 0.07)",
};

function StepScreen() {
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
          background:
            "linear-gradient(180deg, #f6f1e8 0, #f6f1e8 440px, #fbf7ef 460px, #fbf7ef 100%)",
        }}
      >
        <div style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}>
          <Header />
          <StepCard />
          <Rule style={{ margin: `${u(18)} auto ${u(19)}`, width: u(138) }} />
          <Meaning />
          <FamilyNote />
          <DidYouKnow />
          <Pager />
          <MarkDone />
          <TabBar />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header style={{ position: "relative", height: u(173) }}>
      <Link
        {...checklist}
        aria-label="Back to the Day 3 checklist"
        className="grid cursor-pointer place-items-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1a1f]"
        style={{
          position: "absolute",
          left: u(16.6),
          top: u(33.7),
          width: u(32.7),
          height: u(32.7),
          borderRadius: "50%",
          border: "1px solid #e8cf9e",
          background: "#fcf3df",
          boxShadow: `0 ${u(2)} ${u(6)} rgba(150, 110, 50, 0.16)`,
        }}
      >
        <svg viewBox="0 0 8 14" fill="none" aria-hidden style={{ width: u(6), height: u(10.5) }}>
          <path
            d="M6.5 1.5 1.5 7l5 5.5"
            stroke="#2b2420"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <svg
        viewBox="0 0 80 14"
        fill="none"
        aria-hidden
        style={{ position: "absolute", left: u(155), top: u(80), width: u(80), height: u(14) }}
      >
        <path d="M2 7h14M64 7h14" stroke={WINE} strokeWidth="1.3" />
        <circle cx="18.5" cy="7" r="2" fill={WINE} />
        <circle cx="61.5" cy="7" r="2" fill={WINE} />
        <path
          d="M40 2c2.2 1.6 3.4 3.2 3.4 4.6a3.4 3.4 0 0 1-6.8 0C36.6 5.2 37.8 3.6 40 2Z"
          fill={WINE}
        />
        <path
          d="M33 5.8c2.4-.3 4.300.8 5.3 2.7L40 11.5l1.7-3c1-1.9 2.9-3 5.3-2.7-.4 3.4-2.8 6.2-7 6.2s-6.6-2.8-7-6.2Z"
          fill={WINE}
        />
      </svg>
      <h1
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(98.5),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(30.5),
          lineHeight: u(34),
          color: WINE,
        }}
      >
        Lakshmi Puja
      </h1>
      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(138),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(17.2),
          lineHeight: u(20),
          color: "#2b2420",
        }}
      >
        Step {STEP.n} of {STEP.of}
      </p>
      <svg
        viewBox="0 0 102 6"
        fill="none"
        aria-hidden
        style={{ position: "absolute", left: u(144), top: u(165.5), width: u(102), height: u(6) }}
      >
        <path d="M0 3h40M62 3h40" stroke={GOLD} strokeWidth="0.9" />
        <circle cx="51" cy="3" r="1.7" fill="#c0573a" />
        <circle cx="46" cy="3" r="0.8" fill="#c0573a" />
        <circle cx="56" cy="3" r="0.8" fill="#c0573a" />
      </svg>
    </header>
  );
}

function StepCard() {
  return (
    <section
      aria-label={`Step ${STEP.n}`}
      style={{
        position: "relative",
        margin: `${u(29.5)} ${u(17)} 0`,
        minHeight: u(84.5),
        padding: `${u(15)} ${u(84)} ${u(16)} ${u(53.5)}`,
        borderRadius: u(14),
        border: "1px solid #ecd8b3",
        background: "#fbf3e6",
        boxShadow: "0 3px 10px rgba(150, 110, 60, 0.07)",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: u(13.6),
          top: u(15.6),
          width: u(27.2),
          height: u(27.2),
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "#8f1a1f",
          color: "#fff",
          fontFamily: serif,
          fontWeight: 600,
          fontSize: u(16),
          lineHeight: 1,
        }}
      >
        {STEP.n}
      </span>
      <h2
        style={{
          margin: 0,
          fontFamily: serif,
          fontWeight: 600,
          fontSize: u(21.5),
          lineHeight: u(24),
        }}
      >
        Light the diya
      </h2>
      <p
        style={{
          margin: `${u(4)} 0 0`,
          fontFamily: sans,
          fontSize: u(11.8),
          lineHeight: u(15),
          color: "#4f4541",
        }}
      >
        Use ghee or til oil — the flame should face north
      </p>
      <img
        src={diyaImg}
        alt="A brass diya burning among marigolds."
        style={{
          position: "absolute",
          right: u(13.8),
          top: u(15),
          width: u(66.5),
          height: u(53.5),
          objectFit: "cover",
          borderRadius: u(8),
          boxShadow: `0 0 0 ${u(1)} #e8c890, 0 ${u(2)} ${u(5)} rgba(120, 70, 20, 0.2)`,
        }}
      />
    </section>
  );
}

function Rule({ style, small }: { style: CSSProperties; small?: boolean }) {
  return (
    <svg
      viewBox="0 0 138 12"
      fill="none"
      aria-hidden
      style={{ display: "block", height: u(12), ...style }}
    >
      <path d="M0 6h53M85 6h53" stroke={small ? "#ead8b6" : "#e2c48f"} strokeWidth="0.9" />
      {small ? (
        <path
          d="M69 1.5c1 1.6 1.6 3 1.6 4.5S70 9 69 10.5C68 9 67.4 7.5 67.4 6S68 3.1 69 1.5Z"
          fill="#cfa25a"
        />
      ) : (
        <path
          d="M69 .5c.7 2.7 2 4.3 5 5.5-3 1.2-4.3 2.8-5 5.5-.7-2.7-2-4.3-5-5.5 3-1.2 4.3-2.8 5-5.5Z"
          fill="#cc9a4c"
        />
      )}
    </svg>
  );
}

function Brackets() {
  const b = (style: CSSProperties) => (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      style={{ position: "absolute", width: u(11), height: u(11), ...style }}
    >
      <path d="M1 12V1h11" stroke="#c99a52" strokeWidth="1.6" />
    </svg>
  );
  return (
    <>
      {b({ left: u(2.4), top: u(2.4) })}
      {b({ right: u(2.4), bottom: u(2.4), transform: "rotate(180deg)" })}
    </>
  );
}

function CardTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h2
      style={{
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: u(10),
        fontFamily: serif,
        fontWeight: 600,
        fontSize: u(17.5),
        lineHeight: u(22),
      }}
    >
      <span aria-hidden style={{ width: u(13), height: u(13), display: "block", flex: "none" }}>
        {icon}
      </span>
      <span>{children}</span>
    </h2>
  );
}

function Meaning() {
  return (
    <section style={{ ...card, padding: `${u(21)} ${u(18)} ${u(22)} ${u(17)}` }}>
      <Brackets />
      <CardTitle icon={<Sparkle />}>
        The <span style={{ color: WINE }}>meaning</span> behind this
      </CardTitle>
      <p
        style={{
          margin: `${u(11)} 0 0`,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(13.2),
          lineHeight: u(21.1),
          color: BODY,
        }}
      >
        “The diya isn’t just decoration — it’s the whole point. Lighting it is how you physically
        invite Lakshmi into your home. The flame facing north is because north is considered the
        direction of wealth and prosperity in Vastu Shastra — the ancient Indian system of spatial
        arrangement. Even if you don’t follow Vastu strictly, this is why your grandmother always
        insisted the diya faces that way.”
      </p>
      <Rule small style={{ margin: `${u(19)} auto 0`, width: u(138) }} />
    </section>
  );
}

function FamilyNote() {
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
    <section style={{ ...card, marginTop: u(14), padding: `${u(17)} ${u(14)} ${u(16)}` }}>
      <Brackets />
      <CardTitle icon={<PeopleIcon />}>
        From your <span style={{ color: WINE }}>family</span>
      </CardTitle>
      <figure
        className={playing ? "utsav-playing" : undefined}
        style={{
          position: "relative",
          margin: `${u(10)} 0 0`,
          height: u(51),
          borderRadius: u(26),
          border: "1px solid #e4cb9d",
          background: "linear-gradient(180deg, #f3e6d1 0%, #efe0c8 100%)",
        }}
      >
        <img
          src={lampImg}
          alt=""
          style={{
            position: "absolute",
            left: u(6),
            top: u(5.5),
            width: u(37),
            height: u(37),
            objectFit: "cover",
            borderRadius: "50%",
            boxShadow: `0 0 0 ${u(1.5)} #d5a961`,
          }}
        />
        <button
          type="button"
          aria-label={playing ? "Pause the family voice note" : "Play the family voice note"}
          aria-pressed={playing}
          onClick={() => setPlaying((p) => !p)}
          className="grid cursor-pointer place-items-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1a1f]"
          style={{
            position: "absolute",
            left: u(51.5),
            top: u(9.5),
            width: u(30.5),
            height: u(30.5),
            padding: 0,
            border: 0,
            borderRadius: "50%",
            background: "#8b1a1f",
          }}
        >
          {playing ? (
            <svg viewBox="0 0 10 12" aria-hidden style={{ width: u(8), height: u(10) }}>
              <rect x="1" y="1" width="2.8" height="10" rx="0.8" fill="#fff" />
              <rect x="6.2" y="1" width="2.8" height="10" rx="0.8" fill="#fff" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 10 12"
              aria-hidden
              style={{ width: u(8), height: u(10), marginLeft: u(2) }}
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
            left: u(119),
            top: u(10),
            width: u(73.5),
            height: u(30),
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
                width: u(1.9),
                height: u(h),
                borderRadius: u(1),
                background: i / WAVE.length < progress ? "#8f1a1f" : "#d58f62",
                animationDelay: `${((i % 5) * 0.12).toFixed(2)}s`,
              }}
            />
          ))}
        </span>
        <span
          style={{
            position: "absolute",
            right: u(14),
            top: u(16.5),
            fontFamily: sans,
            fontWeight: 500,
            fontSize: u(12.4),
            lineHeight: u(16),
            color: "#2b2420",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {clock}
        </span>
      </figure>
      <p
        style={{
          margin: `${u(10)} 0 0 ${u(4)}`,
          fontFamily: sans,
          fontSize: u(11.3),
          lineHeight: u(14),
          color: "#6b605a",
        }}
      >
        Recorded during Diwali 2023
      </p>
    </section>
  );
}

function DidYouKnow() {
  return (
    <section
      style={{
        ...card,
        marginTop: u(14),
        minHeight: u(150),
        padding: `${u(17)} ${u(92)} ${u(19)} ${u(14)}`,
      }}
    >
      <Brackets />
      <CardTitle icon={<Bulb />}>
        Did you <span style={{ color: WINE }}>know?</span>
      </CardTitle>
      <p
        style={{
          margin: `${u(10)} 0 0`,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(12.5),
          lineHeight: u(19.3),
          color: BODY,
        }}
      >
        “In some South Indian traditions, the diya faces south — the opposite direction — because
        they follow a different Vastu interpretation. Same festival, completely different rule.
        India contains multitudes.”
      </p>
      <img
        src={compassImg}
        alt="A brass compass on a carved wooden table."
        style={{
          position: "absolute",
          right: u(14),
          top: u(43.5),
          width: u(52),
          height: u(52),
          objectFit: "cover",
          borderRadius: u(9),
          boxShadow: `0 0 0 ${u(1)} #e8c890, 0 ${u(2)} ${u(5)} rgba(120, 70, 20, 0.2)`,
        }}
      />
    </section>
  );
}

function Pager() {
  const pill: CSSProperties = {
    flex: 1,
    height: u(38),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: u(13),
    padding: 0,
    borderRadius: u(19),
    border: "1px solid #e8d2a8",
    background: "#fcf6ec",
    color: INK,
    fontFamily: sans,
    fontWeight: 500,
    fontSize: u(12.8),
    lineHeight: 1,
  };
  const knob = (dir: "prev" | "next") => (
    <span
      aria-hidden
      style={{
        width: u(19.6),
        height: u(19.6),
        display: "grid",
        placeItems: "center",
        borderRadius: "50%",
        background: "#f3e2bd",
      }}
    >
      <svg viewBox="0 0 6 10" fill="none" style={{ width: u(3.5), height: u(6) }}>
        <path
          d={dir === "prev" ? "M5 1 1 5l4 4" : "m1 1 4 4-4 4"}
          stroke="#5a4a3a"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
  const cls =
    "cursor-pointer no-underline transition-[background-color] duration-150 hover:bg-[#fff9ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1a1f]";
  return (
    <nav
      aria-label="Puja steps"
      style={{ display: "flex", alignItems: "center", gap: u(10), margin: `${u(20)} ${u(17)} 0` }}
    >
      <Link {...checklist} hash="step-2" className={cls} style={pill}>
        {knob("prev")}
        Previous step
      </Link>
      <span aria-hidden style={{ width: 1, height: u(19), background: "#e0c79c", flex: "none" }} />
      <Link {...checklist} hash="step-4" className={cls} style={pill}>
        Next step
        {knob("next")}
      </Link>
    </nav>
  );
}

function MarkDone() {
  return (
    <div style={{ position: "relative", margin: `${u(22)} ${u(17)} 0` }}>
      <Link
        to="/celebrate/checklist"
        search={{ day: 3, done: STEP.id }}
        className="group cursor-pointer no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1a1f]"
        style={{
          height: u(48.5),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: u(15),
          borderRadius: u(25),
          background: "linear-gradient(90deg, #8e1a1d 0%, #8a1519 60%, #7b1015 100%)",
          boxShadow: `0 ${u(7)} ${u(14)} rgba(120, 20, 20, 0.25)`,
          color: "#fcefe0",
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(19),
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}
      >
        <svg viewBox="0 0 14 10" fill="none" aria-hidden style={{ width: u(11), height: u(8) }}>
          <path
            d="m1.5 5 4 3.5 7-7"
            stroke="#f3c23c"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Mark this step done
      </Link>
      <svg
        viewBox="0 0 10 22"
        aria-hidden
        style={{ position: "absolute", right: u(-4), top: u(13.5), width: u(9), height: u(21) }}
      >
        <path d="M0 0c4 3 8 7 10 11-2 4-6 8-10 11 2-4 3-7.5 3-11S2 4 0 0Z" fill="#c6a15c" />
      </svg>
    </div>
  );
}

/* ───────────────────────── Tab bar ───────────────────────── */

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
        position: "relative",
        height: u(68),
        marginTop: u(32),
        borderTop: "1px solid #ecdcc3",
        background: "#fcf8f1",
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "guide";
        const x = [32.6, 121.4, 209.4, 294.6][i];
        const style: CSSProperties = {
          position: "absolute",
          left: u(x - 32),
          top: u(5),
          width: u(64),
          height: u(52),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: active ? WINE : "#6b625c",
        };
        const inner = (
          <>
            <span style={{ marginTop: u(6.5), width: u(17), height: u(17), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(active ? 3 : 5),
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
                  marginTop: u(3.5),
                  width: u(23),
                  height: u(2),
                  borderRadius: u(1),
                  background: WINE,
                }}
              />
            )}
          </>
        );
        const cls =
          "cursor-pointer no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1a1f]";
        if (!t.to)
          return (
            <Link key={t.id} {...checklist} aria-current="page" className={cls} style={style}>
              {inner}
            </Link>
          );
        return (
          <Link key={t.id} to={t.to} className={cls} style={style}>
            {inner}
          </Link>
        );
      })}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: u(131.5),
          top: u(56.5),
          width: u(127),
          height: u(3.3),
          borderRadius: u(2),
          background: "#d2cdc7",
        }}
      />
    </nav>
  );
}

/* ───────────────────────── Icons ───────────────────────── */

function Sparkle() {
  return (
    <svg viewBox="0 0 14 14" style={{ display: "block", width: "100%", height: "100%" }}>
      <path
        d="M7 0c.6 3.3 2.2 5 5.5 7-3.3 2-4.9 3.7-5.5 7-.6-3.3-2.2-5-5.5-7C4.8 5 6.4 3.3 7 0Z"
        fill="#e3a136"
      />
    </svg>
  );
}

function Bulb() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <path
        d="M8 4a3.5 3.5 0 0 0-2.2 6.2c.4.300.7.800.7 1.3v.5h3v-.5c0-.5.3-1 .7-1.3A3.5 3.5 0 0 0 8 4Z"
        stroke="#d4943a"
        strokeWidth="1.2"
      />
      <path
        d="M6.5 14h3M8 .6V2M2.6 2.8l1 1M13.4 2.8l-1 1M.8 8h1.4M13.8 8h1.4"
        stroke="#d4943a"
        strokeWidth="1.1"
        strokeLinecap="round"
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
      <rect x="3" y="2" width="18" height="20" rx="3" fill="currentColor" />
      <path
        d="M7.5 8h9M7.5 12h9M7.5 16h5.5"
        stroke="#fcf8f1"
        strokeWidth="1.8"
        strokeLinecap="round"
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
      <path
        d="M4.5 8h15l-1 13h-13Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10.5V6a3.5 3.5 0 0 1 7 0v4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
