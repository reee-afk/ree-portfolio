import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import { Garland } from "@/components/utsav/Garland";
import dhanterasArt from "@/assets/utsav-dhanteras.webp";
import guideArt from "@/assets/utsav-guide.webp";
import storyArt from "@/assets/utsav-story.webp";
import foodArt from "@/assets/utsav-food.webp";

export const Route = createFileRoute("/celebrate_/home")({
  head: () => ({
    meta: [
      { title: "Utsav — Dhanteras" },
      {
        name: "description",
        content: "Day 1 of 5 of Diwali: today's ritual, guide, story and food.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: HomeScreen,
});

/* Drawn on a 390 × 1068 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Outfit", system-ui, sans-serif';

const INK = "#2b1a14";
const WINE = "#8a1a1c";
const SLATE = "#45506a";
const GOLD = "#e3b65c";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: u(width), height: u(height) };
}

const DAYS = 5;
const today = 1;

type Tile = { id: string; title: string; blurb: string; art: string; alt: string; left: number };

const tiles: Tile[] = [
  {
    id: "guide",
    title: "Guide Mode",
    blurb: "Prep checklist ready",
    art: guideArt,
    alt: "An open ritual book framed with marigolds and lit diyas.",
    left: 16.5,
  },
  {
    id: "story",
    title: "Story Mode",
    blurb: "Why do we\ncelebrate\nDhanteras?",
    art: storyArt,
    alt: "An open illustrated storybook surrounded by flowers and lamps.",
    left: 139.3,
  },
  {
    id: "food",
    title: "Food",
    blurb: "What to cook today",
    art: foodArt,
    alt: "A woman stirring a brass pot of sweets beside a plate of laddoos.",
    left: 262,
  },
];

function HomeScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white sm:py-10">
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{
          aspectRatio: "390 / 1068",
          containerType: "inline-size",
          background:
            "linear-gradient(180deg, #f6efe5 0%, #f5ede2 55%, #f2e6d6 76%, #efd6b6 85%, #eac69a 92%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          <Garland />

          {/* Festival countdown */}
          <div
            style={{
              ...box(82.5, 124.3, 225, 40.3),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: u(8),
              borderRadius: u(21),
              border: `${u(1)} solid #f2e0a8`,
              background: "linear-gradient(180deg, #fffefa 0%, #fdf9ef 100%)",
              boxShadow: `0 ${u(3)} ${u(8)} rgba(190, 150, 80, 0.14)`,
              fontFamily: serif,
              fontSize: u(17.5),
              lineHeight: 1,
            }}
          >
            <SmallDiya style={{ width: u(14.5), height: u(16), marginRight: u(5) }} />
            <span style={{ fontWeight: 600, letterSpacing: "0.04em" }}>Diwali</span>
            <span
              aria-hidden
              style={{ width: u(3.6), height: u(3.6), borderRadius: "50%", background: "#e58a2a" }}
            />
            <span style={{ fontWeight: 500, color: WINE, letterSpacing: "0.03em" }}>
              5 days away
            </span>
          </div>

          <h1
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(184),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 700,
              fontSize: u(31.5),
              lineHeight: u(36),
              letterSpacing: "-0.012em",
              whiteSpace: "nowrap",
            }}
          >
            Day 1 of 5 — <span style={{ color: WINE }}>Dhanteras</span>
          </h1>

          {/* One diya per day of the festival */}
          <div
            role="img"
            aria-label={`Day ${today} of ${DAYS}: ${today} diya lit`}
            style={{ ...box(90, 240, 210, 28), display: "flex", justifyContent: "space-between" }}
          >
            {Array.from({ length: DAYS }, (_, i) => (
              <DayDiya key={i} lit={i < today} />
            ))}
          </div>

          <p
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: u(285),
              margin: 0,
              textAlign: "center",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: u(16.4),
              lineHeight: u(20),
              letterSpacing: "0.012em",
              color: "#3d2a22",
            }}
          >
            Your first diya is lit. {DAYS - today} more days to go.
          </p>
          <svg viewBox="0 0 64 8" fill="none" aria-hidden style={box(163, 313, 64, 8)}>
            <path d="M0 4h24M40 4h24" stroke="#d4893a" strokeWidth="0.9" />
            <path
              d="M25.5 4c1.9-2.4 4.3-3.4 6.5-3.4s4.6 1 6.5 3.4c-1.9 2.4-4.3 3.4-6.5 3.4S27.4 6.4 25.5 4Z"
              fill="#e3a05c"
            />
            <circle cx="32" cy="4" r="1.7" fill="#a8442a" />
          </svg>

          <TodayCard />

          {tiles.map((t) => (
            <ModeTile key={t.id} tile={t} />
          ))}

          {/* Shake for a fact */}
          <Link
            to="/celebrate/fact"
            className="group block cursor-pointer text-left no-underline transition-[filter,transform] duration-200 hover:brightness-115 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3b65c]"
            style={{
              ...box(16.3, 795.5, 356.7, 57.3),
              padding: 0,
              borderRadius: u(16.5),
              border: `${u(1)} solid #7c2a1c`,
              background:
                "radial-gradient(120% 140% at 0% 0%, #5a1018 0%, #430b12 45%, #350810 100%)",
              boxShadow: `0 ${u(6)} ${u(14)} rgba(60, 10, 10, 0.22)`,
              color: "#f3e2c4",
            }}
          >
            <svg viewBox="0 0 60 44" fill="none" aria-hidden style={box(12, 6.5, 60, 44)}>
              <path
                d="M7 6.3 8.3 9.7 11.7 11 8.3 12.3 7 15.7 5.7 12.3 2.3 11 5.7 9.7Z"
                fill="#f1c84a"
              />
              <path
                d="M44.5 31 45.7 34 48.7 35.2 45.7 36.4 44.5 39.4 43.3 36.4 40.3 35.2 43.3 34Z"
                fill="#f1c84a"
              />
              <rect
                x="20"
                y="9"
                width="16"
                height="25"
                rx="3.6"
                stroke="#e8c27a"
                strokeWidth="1.8"
              />
              <path d="M25 30h6" stroke="#e8c27a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span
              style={{
                position: "absolute",
                left: u(76),
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                gap: u(6.5),
                fontFamily: serif,
                fontWeight: 500,
                fontSize: u(14.2),
                letterSpacing: "0.045em",
                lineHeight: 1,
              }}
            >
              <svg
                viewBox="0 0 16 14"
                fill="none"
                aria-hidden
                style={{ width: u(9), height: u(8) }}
              >
                <path
                  d="m5 1 1.1 2.4 2.600.3-1.9 1.800.5 2.6L5 6.8 2.7 8.1l.5-2.6L1.3 3.7l2.6-.3Z"
                  stroke="#d9b35d"
                  strokeWidth="0.9"
                />
                <path
                  d="m12 6 .8 1.7 1.900.2-1.4 1.300.4 1.8L12 10l-1.7 1 .4-1.8L9.3 7.9l1.9-.2Z"
                  stroke="#d9b35d"
                  strokeWidth="0.9"
                />
                <path
                  d="m5 9.500.6 1.2 1.300.2-1 .9.3 1.3L5 12.5l-1.200.6.3-1.3-1-.9 1.3-.2Z"
                  stroke="#d9b35d"
                  strokeWidth="0.8"
                />
              </svg>
              Shake for a Diwali fact
            </span>
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              style={{
                ...box(315.5, 15, 27.3, 27.3),
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                border: `${u(1)} solid #8f5a2a`,
                background: "rgba(80, 20, 22, 0.6)",
              }}
            >
              <Chevron color="#e8c27a" size={5.5} />
            </span>
          </Link>

          <Ridges />
          <TabBar />
        </div>
      </div>
    </main>
  );
}

function TodayCard() {
  const corner = (rot: number, pos: CSSProperties) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{
        position: "absolute",
        width: u(23),
        height: u(23),
        transform: `rotate(${rot}deg)`,
        ...pos,
      }}
    >
      <path d="M1 24V1h23" stroke={GOLD} strokeWidth="1.7" />
    </svg>
  );
  return (
    <section
      aria-labelledby="today-title"
      style={{
        ...box(16.3, 347.4, 356.7, 231.6),
        borderRadius: u(14),
        border: `${u(1)} solid #f0d9a8`,
        background: "linear-gradient(160deg, #fffcf6 0%, #fdf7ee 100%)",
        boxShadow: `0 ${u(4)} ${u(12)} rgba(170, 120, 60, 0.1)`,
      }}
    >
      {corner(0, { left: u(6.5), top: u(6.5) })}
      {corner(90, { right: u(6.5), top: u(6.5) })}
      {corner(180, { right: u(6.5), bottom: u(6.5) })}
      {corner(270, { left: u(6.5), bottom: u(6.5) })}

      <span
        style={{
          ...box(20.5, 24.3, 49.7, 19.7),
          display: "grid",
          placeItems: "center",
          borderRadius: u(10),
          background: "#fde3cc",
          color: WINE,
          fontFamily: sans,
          fontWeight: 600,
          fontSize: u(11.6),
          lineHeight: 1,
        }}
      >
        Today
      </span>

      <h2
        id="today-title"
        style={{
          position: "absolute",
          left: u(20.5),
          top: u(52),
          width: u(205),
          margin: 0,
          fontWeight: 400,
          lineHeight: u(27),
        }}
      >
        <span
          style={{
            fontFamily: serif,
            fontWeight: 700,
            fontSize: u(22.4),
            letterSpacing: "0.005em",
            color: INK,
          }}
        >
          Dhanteras
        </span>{" "}
        <span style={{ fontFamily: sans, fontSize: u(16.3), color: SLATE }}>
          — the day of wealth
        </span>
      </h2>
      <p
        style={{
          position: "absolute",
          left: u(20.5),
          top: u(115.5),
          width: u(190),
          margin: 0,
          fontFamily: sans,
          fontWeight: 400,
          fontSize: u(12.4),
          lineHeight: u(21),
          color: "#5a3a2c",
        }}
      >
        Shop for new utensils, clean the entrance, light the first diya.
      </p>

      <img
        src={dhanterasArt}
        alt="A family at a Dhanteras puja: a brass kalash on a rangoli, diyas and sweets all around."
        style={{
          ...box(217.7, 30, 118, 126.5),
          objectFit: "cover",
          borderRadius: u(7),
          boxShadow: `0 0 0 ${u(0.8)} #d9a94a, 0 ${u(3)} ${u(8)} rgba(120, 70, 20, 0.18)`,
        }}
      />

      <Link
        to="/celebrate/checklist"
        className="group cursor-pointer no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a1a1c]"
        style={{
          ...box(20.5, 171.5, 164, 39),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: u(6),
          padding: 0,
          border: 0,
          borderRadius: u(20),
          background: "linear-gradient(90deg, #a3271a 0%, #8c1c14 60%, #7a140f 100%)",
          boxShadow: `0 ${u(5)} ${u(10)} rgba(140, 40, 20, 0.25)`,
          color: "#fff6ea",
          fontFamily: sans,
          fontWeight: 500,
          fontSize: u(13.4),
          lineHeight: 1,
          letterSpacing: "0.005em",
        }}
      >
        See today's checklist
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          style={{ fontSize: u(12) }}
        >
          →
        </span>
      </Link>
    </section>
  );
}

/** A link when it has somewhere to go, otherwise a plain button. */
function Tappable({
  to,
  children,
  ...rest
}: {
  to?: "/celebrate/checklist" | "/celebrate/story";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-current"?: "page";
}) {
  return to ? (
    <Link to={to} {...rest}>
      {children}
    </Link>
  ) : (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}

function ModeTile({ tile }: { tile: Tile }) {
  return (
    <Tappable
      to={
        tile.id === "guide"
          ? "/celebrate/checklist"
          : tile.id === "story"
            ? "/celebrate/story"
            : undefined
      }
      className="group cursor-pointer no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-px active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a1a1c]"
      style={{
        ...box(tile.left, 596.5, 111.2, 181.8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${u(10.5)} ${u(6)} 0`,
        borderRadius: u(12),
        border: `${u(1)} solid #f0dcae`,
        background: "#fdf9ef",
        boxShadow: `0 ${u(4)} ${u(10)} rgba(170, 120, 60, 0.1)`,
        color: INK,
      }}
    >
      <img
        src={tile.art}
        alt={tile.alt}
        style={{
          width: u(89),
          height: u(62.7),
          flex: "none",
          objectFit: "cover",
          borderRadius: u(11),
          boxShadow: `0 0 0 ${u(0.8)} #e2b860`,
        }}
      />
      <span
        style={{
          marginTop: u(9.5),
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(14.4),
          lineHeight: u(17),
          letterSpacing: "0.005em",
        }}
      >
        {tile.title}
      </span>
      <span
        style={{
          marginTop: u(3.5),
          minHeight: u(24.6),
          maxWidth: u(100),
          whiteSpace: "pre-line",
          fontFamily: sans,
          fontWeight: 400,
          fontSize: u(10.2),
          lineHeight: u(12.3),
          color: "#3f4a63",
          textAlign: "center",
        }}
      >
        {tile.blurb}
      </span>
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        style={{
          marginTop: u(5.5),
          width: u(23.2),
          height: u(23.2),
          flex: "none",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          border: `${u(1)} solid #f2d77a`,
          background: "#fdf3c4",
        }}
      >
        <Chevron color={WINE} size={4.2} />
      </span>
    </Tappable>
  );
}

const TABS: { id: string; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Home", icon: <HomeTab /> },
  { id: "guide", label: "Guide", icon: <GuideTab /> },
  { id: "story", label: "Story", icon: <StoryTab /> },
  { id: "food", label: "Food", icon: <FoodTab /> },
];

function TabBar() {
  return (
    <nav
      aria-label="Utsav"
      style={{
        ...box(0, 975, 390, 93),
        borderRadius: `${u(16)} ${u(16)} 0 0`,
        background: "#f4efe7",
        boxShadow: `0 ${u(-2)} ${u(8)} rgba(120, 70, 30, 0.08)`,
        borderBottom: `${u(2.2)} solid #3a1208`,
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "home";
        const x = [52.5, 147.3, 242.5, 337.9][i];
        return (
          <Tappable
            key={t.id}
            to={
              t.id === "guide"
                ? "/celebrate/checklist"
                : t.id === "story"
                  ? "/celebrate/story"
                  : undefined
            }
            aria-current={active ? "page" : undefined}
            className="cursor-pointer no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a1a1c]"
            style={{
              ...box(x - 36, 6, 72, 56),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 0,
              border: 0,
              background: "none",
              color: active ? "#9a1b1b" : "#5d5650",
            }}
          >
            <span style={{ marginTop: u(3), width: u(21.5), height: u(21.5), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(5.2),
                fontFamily: sans,
                fontWeight: active ? 600 : 400,
                fontSize: u(11.3),
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
                  width: u(20.5),
                  height: u(1.9),
                  borderRadius: u(1),
                  background: "#9a1b1b",
                }}
              />
            )}
          </Tappable>
        );
      })}
      <span
        aria-hidden
        style={{
          ...box(131, 68, 128, 3.3),
          borderRadius: u(2),
          background: "#d7d3cd",
        }}
      />
    </nav>
  );
}

/* ───────────────────────── Ornaments ───────────────────────── */

function Chevron({ color, size }: { color: string; size: number }) {
  return (
    <svg
      viewBox="0 0 10 16"
      fill="none"
      aria-hidden
      style={{ width: u(size), height: u(size * 1.6) }}
    >
      <path
        d="m2.5 2.5 5.5 5.5-5.5 5.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallDiya({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 20 22" aria-hidden style={{ flex: "none", ...style }}>
      <path d="M10 1c1.4 1.8 2 3 2 4.1a2 2 0 0 1-4 0C8 4 8.6 2.8 10 1Z" fill="#f2a325" />
      <path d="M1.5 10.5h17c-.6 3-3.6 5.2-8.5 5.2s-7.9-2.2-8.5-5.2Z" fill="#b8501c" />
      <path d="M6.5 15.5h7l1.8 3.5H4.7Z" fill="#8a3615" />
    </svg>
  );
}

function DayDiya({ lit }: { lit: boolean }) {
  const bowl = lit ? "#a5461c" : "#d4d1cd";
  const rim = lit ? "#7a3414" : "#bebab5";
  const foot = lit ? "#8a3615" : "#c9c5c0";
  return (
    <svg viewBox="0 0 26 28" aria-hidden style={{ width: u(24.5), height: u(26.4) }}>
      {lit && (
        <>
          <path
            d="M13 1c2 2.5 2.9 4.4 2.9 5.8a2.9 2.9 0 0 1-5.8 0C10.1 5.4 11 3.5 13 1Z"
            fill="#f08a24"
          />
          <path
            d="M13 3.6c1 1.3 1.4 2.3 1.4 3a1.4 1.4 0 0 1-2.8 0c0-.7.4-1.7 1.4-3Z"
            fill="#e8402a"
          />
        </>
      )}
      <ellipse cx="13" cy="15" rx="12" ry="2.3" fill={rim} />
      <path d="M1 15h24c-.8 4-5.2 6.3-12 6.3S1.8 19 1 15Z" fill={bowl} />
      <path d="M8 21.2h10l2.2 4H5.8Z" fill={foot} />
    </svg>
  );
}

function Ridges() {
  return (
    <svg
      viewBox="0 900 390 110"
      fill="none"
      aria-hidden
      style={{ ...box(0, 900, 390, 110), display: "block" }}
    >
      <path
        d="M0 985l40-5 9-33 21 32 30-3 15-33 22 30 38-5 20-32 21 32 40-4 18-29 21 29 30 3 21-32 20 32 25 2V1010H0Z"
        fill="#b48264"
        opacity="0.85"
      />
      <path
        d="M0 993l35-3 23-22 25 23 51-2 12-28 25 27 50-1 22-28 24 28 50 4 33-26 15 22 25-2V1010H0Z"
        fill="#7a4526"
        opacity="0.78"
      />
    </svg>
  );
}

/* ───────────────────────── Tab icons (24 × 24) ───────────────────────── */

function HomeTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <path d="M12 2.5 1.5 11.5h3V21h5.5v-5.5h4V21h5.5v-9.5h3Z" fill="currentColor" />
    </svg>
  );
}

function GuideTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <rect x="3.5" y="2" width="17" height="20" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M7.5 7.5h9M7.5 11.5h9M7.5 15.5h5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StoryTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <path
        d="M5 2h15v20H6.5A2.5 2.5 0 0 1 4 19.5V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M4 18.5a1.5 1.5 0 0 1 1.5-1.5H20" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function FoodTab() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      <path d="M8 3.5V2M16 3.5V2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="14" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.6 12.5h16.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
