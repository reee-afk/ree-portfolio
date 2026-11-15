import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import day1Img from "@/assets/five-days/day1.webp";
import day2Img from "@/assets/five-days/day2.webp";
import day3Img from "@/assets/five-days/day3.webp";
import day4Img from "@/assets/five-days/day4.webp";
import day5Img from "@/assets/five-days/day5.webp";

const TITLE = "Why does Diwali last 5 days?";

export const Route = createFileRoute("/celebrate_/five-days")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Story Mode` },
      {
        name: "description",
        content: "Five days, five different stories: what each day of Diwali is about.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: FiveDaysArticle,
});

/* Drawn on a 390-wide artboard; u() scales every measurement with the frame width.
   The article flows top to bottom, so each day card grows with its text. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';

const INK = "#231815";
const WINE = "#a3201f";
const RUST = "#b0451f";
const BODY = "#5a504b";

type Day = {
  n: number;
  name: string;
  tagline: string;
  img: string;
  alt: string;
  body: ReactNode;
};

const b = (t: string) => <strong style={{ fontWeight: 700, color: INK }}>{t}</strong>;

const DAYS: Day[] = [
  {
    n: 1,
    name: "Dhanteras",
    tagline: "The day of wealth",
    img: day1Img,
    alt: "A family praying before a brass kalash surrounded by diyas and sweets.",
    body: (
      <>
        Dhanteras marks the beginning. {b("Dhan")} means wealth, {b("teras")} means thirteenth — it
        falls on the 13th day of the dark fortnight. Buying new utensils or gold today isn’t just a
        tradition — it’s a prayer. You’re asking Lakshmi to multiply what you bring into the home.
      </>
    ),
  },
  {
    n: 2,
    name: "Naraka Chaturdashi",
    tagline: "The day of victory",
    img: day2Img,
    alt: "Krishna standing over the defeated demon Narakasura as a woman lights lamps.",
    body: (
      <>
        Also called Choti Diwali. This is the day Krishna defeated the demon Narakasura.
        Traditionally, people wake before sunrise, take an oil bath, and wear new clothes — it’s a
        purification ritual as much as a celebration.
      </>
    ),
  },
  {
    n: 3,
    name: "Lakshmi Puja",
    tagline: "The heart of Diwali",
    img: day3Img,
    alt: "Lakshmi seated on a pink lotus among brass lamps and marigolds.",
    body: (
      <>
        This is the night everyone knows. Lakshmi is welcomed into a clean, lit home. The diyas, the
        rangoli, the puja — everything on this night is an invitation. The lights aren’t decoration.
        They’re a signal.
      </>
    ),
  },
  {
    n: 4,
    name: "Govardhan Puja",
    tagline: "The day of gratitude",
    img: day4Img,
    alt: "Krishna holding up Govardhan hill to shelter villagers and cows.",
    body: (
      <>
        Krishna lifted the Govardhan mountain to protect his people from Indra’s wrath. On this day,
        food is offered in abundance — Annakut, meaning “mountain of food.” It’s the most communal
        day of the five.
      </>
    ),
  },
  {
    n: 5,
    name: "Bhai Dooj",
    tagline: "The day of siblings",
    img: day5Img,
    alt: "A sister marking a tilak on her brother’s forehead.",
    body: (
      <>
        Sisters apply tilak on their brothers’ foreheads and pray for their long life. Brothers give
        gifts in return. This ritual predates Raksha Bandhan — it’s the older sibling bond
        tradition.
      </>
    ),
  },
];

function FiveDaysArticle() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-white sm:py-10">
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{
          containerType: "inline-size",
          background:
            "linear-gradient(180deg, #f6dcae 0, #f8e6c6 90px, #fbf3e6 150px, #fbf6ef 260px, #fbf6ef 85%, #fbf1e3 100%)",
        }}
      >
        <div style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}>
          <Header />

          <blockquote
            style={{
              position: "relative",
              margin: `${u(38.1)} ${u(16.2)} 0`,
              padding: `${u(18.8)} ${u(18)} ${u(22.7)} ${u(33)}`,
              borderRadius: u(12),
              border: "1px solid #f3e6cc",
              background: "linear-gradient(180deg, #fcf8f1 0%, #faf3e8 100%)",
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: u(15),
              lineHeight: u(25.6),
              color: "#3d2e27",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: u(15.8),
                top: u(17),
                bottom: u(17),
                width: u(3),
                borderRadius: u(1.5),
                background: WINE,
              }}
            />
            “Most of us grew up knowing Diwali as one night of diyas and fireworks. The full story
            is five days long — and each one has a completely different meaning.”
          </blockquote>

          <ol
            aria-label="The five days"
            style={{
              listStyle: "none",
              margin: `${u(34.2)} ${u(16.2)} 0`,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: u(17),
            }}
          >
            {DAYS.map((d) => (
              <DayCard key={d.n} day={d} />
            ))}
          </ol>

          <Callout />
          <Actions />
          <TabBar />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header style={{ position: "relative", height: u(293.3) }}>
      <Link
        to="/celebrate/story"
        className="cursor-pointer no-underline transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3201f]"
        style={{
          position: "absolute",
          left: u(15.4),
          top: u(50.5),
          width: u(77.8),
          height: u(28.6),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: u(9),
          paddingRight: u(2),
          borderRadius: u(15),
          background: "#fffdf8",
          boxShadow: `0 ${u(2)} ${u(6)} rgba(170, 120, 50, 0.14)`,
          color: "#2b2e3a",
          fontFamily: sans,
          fontWeight: 600,
          fontSize: u(12.8),
          lineHeight: 1,
        }}
      >
        <svg viewBox="0 0 8 14" fill="none" aria-hidden style={{ width: u(5.5), height: u(9.5) }}>
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

      <span
        aria-hidden
        style={{
          position: "absolute",
          left: u(347),
          top: u(51.2),
          width: u(27.6),
          height: u(27.6),
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "#fbeac2",
        }}
      >
        <SmallDiya style={{ width: u(14), height: u(9) }} />
      </span>

      <svg
        viewBox="0 0 60 16"
        aria-hidden
        style={{ position: "absolute", left: u(168), top: u(94), width: u(54), height: u(15) }}
      >
        {[8, 52].map((x) => (
          <path
            key={x}
            d={`M${x} 4.2c.5 2.1 1.5 3.1 3.6 3.6-2.1.5-3.1 1.5-3.6 3.6-.5-2.1-1.5-3.1-3.6-3.6 2.1-.5 3.1-1.5 3.6-3.6Z`}
            fill="#dba254"
          />
        ))}
        <path
          d="m30 1 2 4.6 4.6-1.4-1.6 4.4 4.6 1.6-4.6 1.4 1.6 4.4L32 14.6 30 19l-2-4.4-4.6 1.4 1.6-4.4-4.6-1.6 4.6-1.4-1.6-4.4L28 5.6Z"
          fill={WINE}
          transform="scale(1 0.82)"
        />
      </svg>
      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(120.5),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(13.2),
          lineHeight: 1,
          letterSpacing: "0.14em",
          color: "#9a2424",
        }}
      >
        STORY MODE
      </p>

      <div
        style={{
          position: "absolute",
          left: u(16.2),
          top: u(145.4),
          width: u(358.3),
          height: u(148),
          borderRadius: u(14),
          border: "1px solid #f2e3c3",
          background: "linear-gradient(180deg, #fffefb 0%, #fcf8f0 100%)",
          boxShadow: `0 ${u(6)} ${u(16)} rgba(170, 120, 50, 0.12)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            paddingTop: u(17.5),
            fontFamily: serif,
            fontWeight: 700,
            fontSize: u(30.5),
            lineHeight: u(38.5),
            letterSpacing: "0.003em",
          }}
        >
          Why does Diwali
          <br />
          <span
            style={{
              textDecoration: "underline",
              textDecorationColor: "#3a2a24",
              textDecorationThickness: u(1.3),
              textUnderlineOffset: u(5),
            }}
          >
            last <span style={{ color: WINE }}>5 days?</span>
          </span>
        </h1>
        <p
          style={{
            margin: `${u(9)} 0 0`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: u(9),
            fontFamily: sans,
            fontWeight: 400,
            fontSize: u(11.6),
            lineHeight: 1,
            color: "#5e5550",
          }}
        >
          3 min read
          <span
            aria-hidden
            style={{ width: u(4.5), height: u(4.5), borderRadius: "50%", background: "#e8a33a" }}
          />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: u(3),
              fontWeight: 600,
              color: "#2b2e3a",
            }}
          >
            <SmallDiya style={{ width: u(12), height: u(7.5) }} />
            Diwali
          </span>
        </p>
      </div>
    </header>
  );
}

function DayCard({ day }: { day: Day }) {
  return (
    <li
      aria-labelledby={`day-${day.n}`}
      style={{
        padding: `${u(12)} ${u(12)} ${u(17.2)}`,
        borderRadius: u(14),
        border: "1px solid #f1e5d0",
        background: "#fffdf9",
        boxShadow: `0 ${u(3)} ${u(10)} rgba(150, 110, 60, 0.07)`,
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={day.img}
          alt={day.alt}
          style={{
            display: "block",
            width: "100%",
            height: u(191.5),
            objectFit: "cover",
            borderRadius: u(10),
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: u(9.5),
            top: u(11.2),
            width: u(26.5),
            height: u(26.5),
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "#a5191c",
            boxShadow: `0 0 0 ${u(1.5)} rgba(255, 220, 170, 0.55)`,
            color: "#fff",
            fontFamily: sans,
            fontWeight: 700,
            fontSize: u(11.5),
            lineHeight: 1,
          }}
        >
          {day.n}
        </span>
      </div>
      <h2
        id={`day-${day.n}`}
        style={{
          margin: `${u(13.6)} 0 0`,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(17.4),
          lineHeight: u(22),
          color: "#2f2420",
        }}
      >
        Day {day.n} — <span style={{ color: WINE, fontWeight: 600 }}>{day.name}</span>
      </h2>
      <p
        style={{
          margin: `${u(1.6)} 0 0`,
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: u(13.4),
          lineHeight: u(16),
          color: RUST,
        }}
      >
        {day.tagline}
      </p>
      <p
        style={{
          margin: `${u(8)} 0 0`,
          fontFamily: sans,
          fontWeight: 400,
          fontSize: u(11.2),
          lineHeight: u(19.25),
          color: BODY,
        }}
      >
        {day.body}
      </p>
    </li>
  );
}

function Callout() {
  const sparkle = (pos: CSSProperties) => (
    <svg
      viewBox="0 0 10 10"
      aria-hidden
      style={{ position: "absolute", width: u(5), height: u(5), ...pos }}
    >
      <path
        d="M5 0c.5 2.3 1.7 3.5 5 5-3.3 1.5-4.5 2.7-5 5-.5-2.3-1.7-3.5-5-5 3.3-1.5 4.5-2.7 5-5Z"
        fill="#d2a45a"
      />
    </svg>
  );
  return (
    <aside
      style={{
        position: "relative",
        margin: `${u(14)} ${u(16.2)} 0`,
        height: u(81.3),
        display: "flex",
        alignItems: "center",
        gap: u(12.8),
        paddingLeft: u(50.5),
        borderRadius: u(14),
        border: "1px solid #f0d8ab",
        background: "linear-gradient(180deg, #fdf3e3 0%, #fbe8cd 100%)",
      }}
    >
      {sparkle({ left: u(6), top: u(5) })}
      {sparkle({ right: u(7), bottom: u(9) })}
      <span
        aria-hidden
        style={{
          width: u(35.9),
          height: u(35.9),
          flex: "none",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          border: "1px solid #f0cc68",
          background: "#fbe39b",
        }}
      >
        <svg viewBox="0 0 12 16" fill="none" style={{ width: u(9.5), height: u(12.5) }}>
          <path
            d="M6 1.5a4 4 0 0 0-2.4 7.2c.5.4.8 1 .8 1.7v.6h3.2v-.6c0-.7.3-1.300.8-1.7A4 4 0 0 0 6 1.5Z"
            stroke="#c0571f"
            strokeWidth="1.1"
          />
          <path
            d="M4.4 13h3.2M5 14.8h2M6 11V6.5M4.6 5.8 6 7.2l1.4-1.4"
            stroke="#c0571f"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: u(16.4),
          lineHeight: u(23.5),
          color: "#2f2420",
        }}
      >
        “<span style={{ color: WINE }}>Five days.</span> Five different stories.
        <br />
        Most of us only know one.”
      </p>
    </aside>
  );
}

function Actions() {
  const [shareLabel, setShareLabel] = useState("Share this");
  const [saved, setSaved] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (label: string) => {
    setShareLabel(label);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShareLabel("Share this"), 2000);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: TITLE, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      flash("Link copied");
    } catch (err) {
      if ((err as DOMException)?.name !== "AbortError") flash("Couldn’t share");
    }
  };

  const pill: CSSProperties = {
    flex: 1,
    height: u(41),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: u(9),
    padding: 0,
    borderRadius: u(21),
    border: "1px solid #f0d58e",
    background: "#fffdf9",
    color: "#2b2e3a",
    fontFamily: sans,
    fontWeight: 600,
    fontSize: u(12.4),
    lineHeight: 1,
  };
  const cls =
    "cursor-pointer transition-[background-color] duration-150 hover:bg-[#fff7e8] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3201f]";

  return (
    <div style={{ display: "flex", gap: u(12.8), margin: `${u(27)} ${u(16.2)} 0` }}>
      <button type="button" onClick={share} className={cls} style={pill}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden style={{ width: u(13), height: u(13) }}>
          <path
            d="M8 10.5V1.5M4.5 5 8 1.5 11.5 5M2 10v3.5h12V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span aria-live="polite">{shareLabel}</span>
      </button>
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
        className={cls}
        style={pill}
      >
        <svg viewBox="0 0 12 16" fill="none" aria-hidden style={{ width: u(10.5), height: u(14) }}>
          <path
            d="M1.5 1.5h9v13L6 11l-4.5 3.5Z"
            stroke={saved ? WINE : "currentColor"}
            fill={saved ? WINE : "none"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        {saved ? "Saved to my notes" : "Save to my notes"}
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

const TABS: { id: string; label: string; icon: ReactNode; to?: TabTarget }[] = [
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
        height: u(77.5),
        marginTop: u(59.6),
        background: "#ffffff",
        borderTop: "1px solid #f1e8dc",
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "story";
        const x = [53.4, 147.5, 241.5, 335.6][i];
        const style: CSSProperties = {
          position: "absolute",
          left: u(x - 34),
          top: u(4),
          width: u(68),
          height: u(56),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          border: 0,
          background: "none",
          color: active ? WINE : "#6f6a66",
          textDecoration: "none",
        };
        const inner = (
          <>
            <span style={{ marginTop: u(7.5), width: u(19), height: u(19), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(5.5),
                fontFamily: sans,
                fontWeight: active ? 700 : 500,
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
                  width: u(27),
                  height: u(2.2),
                  borderRadius: u(1.1),
                  background: WINE,
                }}
              />
            )}
          </>
        );
        const cls =
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3201f]";
        return t.to ? (
          <Link
            key={t.id}
            to={t.to}
            aria-current={active ? "page" : undefined}
            className={cls}
            style={style}
          >
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
        style={{
          position: "absolute",
          left: u(130.4),
          top: u(65.6),
          width: u(128.2),
          height: u(3.2),
          borderRadius: u(2),
          background: "#d8dbe0",
        }}
      />
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
      <rect x="7" y="2" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 6v14a2 2 0 0 0 2 2h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 6.5h7M10 10h7M10 13.5h4.5"
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
        d="M12 6C9.8 4.4 6.7 3.8 2.5 4v15c4.2-.2 7.3.5 9.5 2 2.2-1.5 5.3-2.2 9.5-2V4c-4.2-.2-7.3.4-9.5 2Z"
        fill="currentColor"
      />
      <path d="M12 6v15" stroke="#fff" strokeWidth="1.2" />
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
