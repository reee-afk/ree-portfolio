import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

import utensilsImg from "@/assets/checklist/utensils.webp";
import entranceImg from "@/assets/checklist/entrance.webp";
import rangoliImg from "@/assets/checklist/rangoli.webp";
import diyasImg from "@/assets/checklist/diyas.webp";
import duskImg from "@/assets/checklist/dusk.webp";
import pujaImg from "@/assets/checklist/puja.webp";
import marigoldImg from "@/assets/checklist/marigold.webp";
import familyImg from "@/assets/checklist/family.webp";
import altarImg from "@/assets/checklist/altar.webp";
import idolImg from "@/assets/checklist/idol.webp";
import lampImg from "@/assets/checklist/lamp.webp";
import garlandImg from "@/assets/checklist/garland.webp";
import bhogImg from "@/assets/checklist/bhog.webp";
import waterImg from "@/assets/checklist/water.webp";
import aartiImg from "@/assets/checklist/aarti.webp";
import bellImg from "@/assets/checklist/bell.webp";
import prasadImg from "@/assets/checklist/prasad.webp";

export const Route = createFileRoute("/celebrate_/checklist")({
  head: () => ({
    meta: [
      { title: "Prep Checklist — Dhanteras" },
      { name: "description", content: "Everything to prepare on Day 1 of Diwali, Dhanteras." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: ChecklistScreen,
});

/* Drawn on a 390 × 1487 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';

const INK = "#2b1a14";
const WINE = "#8f1d1d";
const RUST = "#c8472a";
const MUTED = "#6b5c55";
const GOLD = "#d9b77a";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: u(width), height: u(height) };
}

type Task = { id: string; title: string; note: string; img: string; alt: string };

const DHANTERAS_TASKS: Task[] = [
  {
    id: "utensils",
    title: "Buy new utensils or gold",
    note: "Dhanteras is the auspicious day for new purchases",
    img: utensilsImg,
    alt: "A brass kalash and silver bowls on a puja table.",
  },
  {
    id: "entrance",
    title: "Clean the main entrance",
    note: "Lakshmi enters through a clean, welcoming door",
    img: entranceImg,
    alt: "A carved wooden door framed with a marigold toran.",
  },
  {
    id: "rangoli",
    title: "Draw or buy a rangoli",
    note: "Place it at the entrance — facing outward",
    img: rangoliImg,
    alt: "A bright flower-shaped rangoli with diyas around it.",
  },
  {
    id: "diyas",
    title: "Fill diyas with oil",
    note: "You’ll need one for each day — 5 minimum",
    img: diyasImg,
    alt: "Rows of lit clay diyas.",
  },
  {
    id: "dusk",
    title: "Light the first diya at dusk",
    note: "Place it at the entrance, facing north",
    img: duskImg,
    alt: "Garden steps lined with diyas at dusk.",
  },
  {
    id: "puja",
    title: "Set up the puja space",
    note: "Clear a shelf or table — clean cloth, idol, flowers",
    img: pujaImg,
    alt: "A decorated home shrine with idols, lamps and flowers.",
  },
  {
    id: "marigold",
    title: "Buy marigold flowers",
    note: "Fresh marigolds for the puja tomorrow",
    img: marigoldImg,
    alt: "Orange marigolds in bloom.",
  },
  {
    id: "family",
    title: "Notify family of puja time",
    note: "Coordinate who’s doing what, and when",
    img: familyImg,
    alt: "An open notebook and pen beside a brass lamp and idols.",
  },
];

/** Day 3: the Lakshmi puja, in the order it is performed. */
const DIWALI_TASKS: Task[] = [
  {
    id: "altar",
    title: "Clean the puja altar",
    note: "Wipe it down and spread a fresh red cloth",
    img: altarImg,
    alt: "A woman wiping down a carved wooden altar.",
  },
  {
    id: "idol",
    title: "Place the Lakshmi idol",
    note: "Seat her on a raised stand, framed by lamps",
    img: idolImg,
    alt: "A Lakshmi idol on a lotus, between brass lamps.",
  },
  {
    id: "lamp",
    title: "Light the main diya",
    note: "A ghee lamp that stays lit through the night",
    img: lampImg,
    alt: "A hand lighting a brass lamp.",
  },
  {
    id: "garland",
    title: "Offer a marigold garland",
    note: "Drape it over the idol with both hands",
    img: garlandImg,
    alt: "Hands placing a marigold garland on the Lakshmi idol.",
  },
  {
    id: "bhog",
    title: "Arrange sweets and fruit",
    note: "Laddoos, pedas, bananas and pomegranate",
    img: bhogImg,
    alt: "Plates of laddoos and pedas beside bananas and fruit.",
  },
  {
    id: "water",
    title: "Sprinkle holy water",
    note: "Purify the space with water from the kalash",
    img: waterImg,
    alt: "A hand sprinkling water beside a brass kalash.",
  },
  {
    id: "aarti",
    title: "Perform the aarti",
    note: "Circle the lamp clockwise as you sing",
    img: aartiImg,
    alt: "A woman circling a lit aarti lamp before the idol.",
  },
  {
    id: "bell",
    title: "Ring the bell",
    note: "Keep it ringing through the aarti",
    img: bellImg,
    alt: "A hand ringing a brass temple bell.",
  },
  {
    id: "prasad",
    title: "Share the prasad",
    note: "Offer it to everyone with both hands",
    img: prasadImg,
    alt: "Hands passing a bowl of prasad.",
  },
];

const TASKS_BY_DAY: Record<number, Task[]> = { 1: DHANTERAS_TASKS, 3: DIWALI_TASKS };

const DAYS = [
  { n: 1, name: "Dhanteras" },
  { n: 2, name: "Naraka Ch." },
  { n: 3, name: "Diwali" },
  { n: 4, name: "Govardhan" },
  { n: 5, name: "Bhai Dooj" },
];

const ROW_TOP = 390.3;
const ROW_STEP = 90.1;
const ROW_H = 79.2;
const DIYAS = 5;

function ChecklistScreen() {
  const [day, setDay] = useState(1);
  // Ticks are kept per day, so switching tabs doesn't lose them.
  const [doneByDay, setDoneByDay] = useState<Record<number, Set<string>>>(() => ({
    1: new Set(["utensils", "entrance"]),
    3: new Set(),
  }));
  const tasks = TASKS_BY_DAY[day];
  const done = doneByDay[day];
  const toggle = (id: string) =>
    setDoneByDay((prev) => {
      const next = new Set(prev[day]);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, [day]: next };
    });

  const count = done.size;
  const lit = Math.floor((count * DIYAS) / tasks.length);
  // Everything below the list moves down by one row per task beyond eight.
  const extra = (tasks.length - 8) * ROW_STEP;
  const dayName = DAYS[day - 1].name;

  return (
    <main className="flex min-h-screen items-start justify-center bg-white sm:py-10">
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{
          aspectRatio: `390 / ${1487 + extra}`,
          containerType: "inline-size",
          background: "#fbf6ee",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          <Header dayName={dayName} day={day} />

          {/* Progress */}
          <div
            role="progressbar"
            aria-label="Today's tasks"
            aria-valuemin={0}
            aria-valuemax={tasks.length}
            aria-valuenow={count}
            style={{
              ...box(65.3, 249, 260.2, 29.3),
              borderRadius: u(15),
              border: `${u(1)} solid #e8d6b6`,
              background: "#f4eadb",
            }}
          >
            <span
              aria-hidden
              style={{
                ...box(17.6, 11.1, 111.7, 7),
                borderRadius: u(4),
                background: "#ead9c2",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: `${(count / tasks.length) * 100}%`,
                  borderRadius: u(4),
                  background: "linear-gradient(90deg, #c0392b 0%, #a32a1a 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </span>
            <span
              style={{
                position: "absolute",
                left: u(141.3),
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                fontFamily: sans,
                fontWeight: 500,
                fontSize: u(13),
                letterSpacing: "0.01em",
                color: "#5a4a44",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {count} of {tasks.length} tasks done
            </span>
          </div>

          <DayTabs day={day} onSelect={setDay} />

          <ul aria-label={`${dayName} tasks`} style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {tasks.map((t, i) => (
              <TaskRow
                key={t.id}
                task={t}
                top={ROW_TOP + i * ROW_STEP}
                checked={done.has(t.id)}
                onToggle={() => toggle(t.id)}
              />
            ))}
          </ul>

          <HintBar offset={extra} />
          <DiyaTracker lit={lit} offset={extra} />
          <TabBar offset={extra} />
        </div>
      </div>
    </main>
  );
}

function Header({ day, dayName }: { day: number; dayName: string }) {
  return (
    <>
      {/* Warm glow and the scalloped arch above it */}
      <div
        aria-hidden
        style={{
          ...box(-40, -60, 470, 420),
          background:
            "radial-gradient(48% 46% at 50% 52%, rgba(250,218,140,0.9) 0%, rgba(251,228,168,0.6) 45%, rgba(251,246,238,0) 100%)",
        }}
      />
      <svg
        viewBox="0 0 390 72"
        fill="none"
        aria-hidden
        style={{ ...box(0, 0, 390, 72), display: "block" }}
      >
        <path
          d="M30 0C38 32 62 50 91 54c3-3 6-3.6 9-1.6C126 64 160 69 195 69s69-5 95-16.6c3-2 6-1.4 9 1.6 29-4 53-22 61-54"
          fill="rgba(255,250,236,0.55)"
          stroke="#eedcb4"
          strokeWidth="1.1"
        />
      </svg>

      <Link
        to="/celebrate/home"
        aria-label="Back to home"
        className="grid cursor-pointer place-items-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1d1d]"
        style={{
          ...box(21.3, 49, 38.4, 38.4),
          borderRadius: "50%",
          background: "#fffdf9",
          boxShadow: `0 ${u(2)} ${u(8)} rgba(150, 110, 50, 0.16)`,
        }}
      >
        <svg viewBox="0 0 10 16" fill="none" aria-hidden style={{ width: u(7.5), height: u(12) }}>
          <path
            d="M8 2 2 8l6 6"
            stroke={INK}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <svg viewBox="0 0 136 20" fill="none" aria-hidden style={box(127, 100.6, 136, 20)}>
        <path d="M2 10h44M90 10h44" stroke="#d8a86a" strokeWidth="0.9" />
        <path d="M68 1.5 76.5 10 68 18.5 59.5 10Z" stroke={RUST} strokeWidth="1.3" />

        <circle cx="68" cy="10" r="2.2" fill={RUST} />
      </svg>

      <h1
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(134),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(34.5),
          lineHeight: u(42),
          letterSpacing: "-0.005em",
          color: WINE,
        }}
      >
        Prep Checklist
      </h1>
      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(181),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 600,
          fontSize: u(20),
          lineHeight: u(24),
        }}
      >
        Day {day} of 5 — <span style={{ color: WINE }}>{dayName}</span>
      </p>

      <svg viewBox="0 0 146 12" fill="none" aria-hidden style={box(122, 219, 146, 12)}>
        <path d="M0 6h56M90 6h56" stroke="#e0bf8c" strokeWidth="0.9" />
        <path
          d="m73 1.2 1.4 3.1 3.4.4-2.5 2.300.7 3.3L73 8.7l-3 1.600.7-3.3-2.5-2.3 3.4-.4Z"
          fill={RUST}
        />
      </svg>
    </>
  );
}

function DayTabs({ day, onSelect }: { day: number; onSelect: (day: number) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Festival days"
      style={{
        ...box(17.7, 307, 355.3, 62.5),
        borderRadius: u(16),
        border: `${u(1)} solid #e8d6b6`,
        background: "#f3e8d8",
      }}
    >
      {DAYS.map((d, i) => {
        const active = d.n === day;
        const ready = d.n in TASKS_BY_DAY;
        const cx = [54.2, 124.5, 195.2, 266.2, 337][i] - 17.7;
        return (
          <button
            key={d.n}
            type="button"
            role="tab"
            aria-selected={active}
            aria-disabled={!ready}
            title={ready ? undefined : `Day ${d.n} opens on ${d.name}`}
            onClick={() => ready && onSelect(d.n)}
            className={active ? "cursor-default" : ready ? "cursor-pointer" : "cursor-not-allowed"}
            style={{
              ...box(cx - 32, 4.9, 64, 52.9),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 0,
              border: 0,
              borderRadius: u(12),
              background: active
                ? "linear-gradient(180deg, #9a2222 0%, #861818 100%)"
                : "transparent",
              boxShadow: active ? `0 ${u(3)} ${u(8)} rgba(130, 25, 20, 0.25)` : undefined,
              color: active ? "#fff8ef" : "#6b5a52",
              fontFamily: sans,
            }}
          >
            <span
              style={{
                marginTop: u(active ? 10.5 : 12.6),
                fontWeight: active ? 700 : 500,
                fontSize: u(12.6),
                lineHeight: u(14),
              }}
            >
              Day {d.n}
            </span>
            <span
              style={{
                marginTop: u(active ? 3.4 : 3.6),
                fontWeight: 400,
                fontSize: u(9.6),
                lineHeight: u(12),
                color: active ? "#fbe9d8" : "#8a7a72",
                whiteSpace: "nowrap",
              }}
            >
              {d.name}
            </span>
            {active && (
              <span
                aria-hidden
                style={{
                  marginTop: u(3.2),
                  width: u(5),
                  height: u(5),
                  borderRadius: "50%",
                  background: "#f7c63c",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function TaskRow({
  task,
  top,
  checked,
  onToggle,
}: {
  task: Task;
  top: number;
  checked: boolean;
  onToggle: () => void;
}) {
  // Swipe a row left to complete it (or right to undo). Taps still go through the checkbox.
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const [drag, setDrag] = useState(0);

  const onPointerDown = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerMove = (e: PointerEvent<HTMLLIElement>) => {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) < 6 || Math.abs(e.clientY - s.y) > Math.abs(dx)) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.setPointerCapture(e.pointerId);
    setDrag(Math.max(-70, Math.min(70, dx)));
  };
  const onPointerEnd = () => {
    if (drag <= -50 && !checked) onToggle();
    else if (drag >= 50 && checked) onToggle();
    start.current = null;
    setDrag(0);
  };

  return (
    <li
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      style={{
        ...box(17.7, top, 355.3, ROW_H),
        borderRadius: u(14.6),
        border: `${u(1)} solid ${checked ? "#ead7b6" : "#efe2cc"}`,
        background: checked ? "#fffaf1" : "#fffcf7",
        boxShadow: `0 ${u(2)} ${u(6)} rgba(170, 130, 70, 0.07)`,
        transform: drag ? `translateX(${drag}px)` : undefined,
        transition: drag ? undefined : "transform 0.2s ease, background-color 0.2s ease",
        touchAction: "pan-y",
      }}
    >
      <label
        style={{
          position: "absolute",
          inset: 0,
          cursor: "pointer",
          borderRadius: "inherit",
        }}
      >
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={checked}
          onChange={onToggle}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#8f1d1d]"
          style={{
            ...box(13.9, 27.4, 24.4, 24.4),
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            border: checked ? 0 : `${u(1.5)} solid #d6b77a`,
            background: checked ? WINE : "transparent",
            transition: "background-color 0.15s ease",
          }}
        >
          {checked && (
            <svg viewBox="0 0 12 10" fill="none" style={{ width: u(10), height: u(8.4) }}>
              <path
                d="m1.5 5 3 3 6-6"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <img
          src={task.img}
          alt={task.alt}
          draggable={false}
          style={{
            ...box(53.1, 12.1, 62.5, 54.7),
            objectFit: "cover",
            borderRadius: u(8),
            boxShadow: `0 ${u(1)} ${u(3)} rgba(80, 50, 20, 0.15)`,
          }}
        />
        <span
          style={{
            position: "absolute",
            left: u(131.3),
            right: u(12),
            top: u(12.5),
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontFamily: serif,
              fontWeight: 600,
              fontSize: u(16),
              lineHeight: u(18),
              letterSpacing: "0.01em",
              color: INK,
            }}
          >
            {task.title}
          </span>
          <span
            style={{
              marginTop: u(2.4),
              fontFamily: sans,
              fontWeight: 400,
              fontSize: u(11.9),
              lineHeight: u(17.9),
              color: MUTED,
            }}
          >
            {task.note}
          </span>
        </span>
      </label>
    </li>
  );
}

function HintBar({ offset }: { offset: number }) {
  return (
    <div
      aria-hidden
      style={{
        ...box(17.7, 1120.2 + offset, 355.3, 53.7),
        borderRadius: u(16),
        border: `${u(1)} solid #e8d6b6`,
        background: "#f3e6d2",
        fontFamily: sans,
        fontWeight: 600,
        fontSize: u(10.8),
        lineHeight: u(14.4),
        color: "#3a2a24",
      }}
    >
      <span style={{ ...box(25, 15.9, 25.4, 25.4), ...circle }}>
        <svg viewBox="0 0 10 16" fill="none" style={{ width: u(6), height: u(9.6) }}>
          <path
            d="M8 2 2 8l6 6"
            stroke={RUST}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        style={{
          position: "absolute",
          left: u(60.3),
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        Swipe to complete
      </span>
      <span style={{ ...box(177.5, 9, 1, 35.7), background: "#e1c99f" }} />
      <span style={{ ...box(217.1, 15.9, 25.4, 25.4), ...circle }}>
        <svg viewBox="0 0 16 18" fill="none" style={{ width: u(12), height: u(13.5) }}>
          <circle cx="6" cy="4" r="3.2" stroke={RUST} strokeWidth="1.3" />
          <path
            d="M6 4v8.5l-1.8-1.6a1.4 1.4 0 0 0-2 2L5.5 16.5h7.3l1.3-6.2a1.5 1.5 0 0 0-1.2-1.8L8 7.6V4.3a1 1 0 0 0-2 0Z"
            fill={RUST}
          />
        </svg>
      </span>
      <span style={{ position: "absolute", left: u(251.9), top: u(12.5) }}>
        Hold to add
        <br />a family note
      </span>
    </div>
  );
}

const circle: CSSProperties = {
  display: "grid",
  placeItems: "center",
  borderRadius: "50%",
  background: "#fffdf8",
  boxShadow: "0 1px 2px rgba(150, 110, 50, 0.12)",
};

function Bracket({ style, rot }: { style: CSSProperties; rot: number }) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      style={{
        position: "absolute",
        width: u(25),
        height: u(25),
        transform: `rotate(${rot}deg)`,
        ...style,
      }}
    >
      <path d="M1 25V6a5 5 0 0 1 5-5h19" stroke={GOLD} strokeWidth="1.5" />
    </svg>
  );
}

function DiyaTracker({ lit, offset }: { lit: number; offset: number }) {
  return (
    <section
      aria-label={`${lit} of ${DIYAS} diyas lit`}
      style={{
        ...box(17.7, 1183 + offset, 355.3, 183.4),
        borderRadius: u(20),
        border: `${u(1)} solid #ecdbbd`,
        background: "radial-gradient(70% 60% at 50% 35%, #fffcf4 0%, #f8eedd 100%)",
        boxShadow: `0 ${u(4)} ${u(12)} rgba(170, 130, 70, 0.1)`,
      }}
    >
      <Bracket rot={0} style={{ left: u(9.1), top: u(20.6) }} />
      <Bracket rot={90} style={{ right: u(9.1), top: u(20.6) }} />
      <Bracket rot={180} style={{ right: u(9.1), bottom: u(9.1) }} />
      <Bracket rot={270} style={{ left: u(9.1), bottom: u(9.1) }} />

      {Array.from({ length: DIYAS }, (_, i) => {
        const on = i < lit;
        const cx = 65.2 + i * 56.6;
        const w = on ? 44 : 35.8;
        return (
          <svg
            key={i}
            viewBox="0 0 44 46"
            fill="none"
            aria-hidden
            style={{ ...box(cx - 22, 48, 44, 46), overflow: "visible" }}
          >
            {on && (
              <>
                <circle cx="22" cy="22" r="18" fill="url(#ck-glow)" />
                <path d="M22 8c5.5 7 8 12 8 16a8 8 0 0 1-16 0c0-4 2.5-9 8-16Z" fill="#f0a91c" />
                <path
                  d="M22 17c2.8 3.6 4.2 6.4 4.2 8.6a4.2 4.2 0 0 1-8.4 0c0-2.2 1.4-5 4.2-8.6Z"
                  fill="#fde68a"
                />
              </>
            )}
            <path
              d={`M${22 - w / 2} 37.5h${w}c-2 5.3-9 8-${w / 2} 8s-${w / 2 - 2}-2.7-${w / 2} -8Z`}
              fill={on ? "#b94a22" : "#d9d4cc"}
              style={{ transition: "fill 0.3s ease" }}
            />
            {on && (
              <path
                d={`M${22 - w / 2 + 1} 40.5q${w / 2 - 1} 8 ${w - 2} 0`}
                stroke="#e8832e"
                strokeWidth="1.3"
              />
            )}
          </svg>
        );
      })}
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="ck-glow">
            <stop offset="0" stopColor="#fde68a" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(119),
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: u(7),
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: u(12.6),
          lineHeight: u(18),
          letterSpacing: "0.012em",
          color: "#3d2c24",
        }}
      >
        <TickRule />
        Light all {DIYAS} diyas by completing today’s tasks
        <TickRule flip />
      </p>

      <svg viewBox="0 0 108 12" fill="none" aria-hidden style={box(123.8, 148.7, 108, 12)}>
        <path d="M0 6h39.4M68.6 6H108" stroke="#e3c79a" strokeWidth="0.9" />
        <circle cx="54" cy="6" r="2.7" fill={RUST} />
        <path
          d="M54 0v1.8M54 10.2V12M48 6h1.8M58.2 6H60"
          stroke={RUST}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    </section>
  );
}

function TickRule({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 22 12"
      fill="none"
      aria-hidden
      style={{
        width: u(18.5),
        height: u(10),
        flex: "none",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <rect
        x="1"
        y="1"
        width="3"
        height="10"
        rx="0.6"
        fill="#f2dfb8"
        stroke={GOLD}
        strokeWidth="0.7"
      />
      <path d="M7 6h12" stroke={GOLD} strokeWidth="1.1" />
    </svg>
  );
}

const TABS: {
  id: string;
  label: string;
  icon: ReactNode;
  to?: "/celebrate/home" | "/celebrate/story";
}[] = [
  { id: "home", label: "Home", icon: <HomeTab />, to: "/celebrate/home" },
  { id: "guide", label: "Guide", icon: <GuideTab /> },
  { id: "story", label: "Story", icon: <StoryTab />, to: "/celebrate/story" },
  { id: "food", label: "Food", icon: <FoodTab /> },
];

function TabBar({ offset }: { offset: number }) {
  return (
    <nav
      aria-label="Utsav"
      style={{
        ...box(0, 1401.4 + offset, 390, 85.6),
        borderTop: `${u(1)} solid #e9dcc6`,
        background: "#f7f1e8",
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "guide";
        const x = [39.9, 145.7, 250.6, 352.5][i];
        const style: CSSProperties = {
          ...box(x - 36, 6, 72, 60),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          border: 0,
          background: "none",
          color: active ? WINE : "#5d5650",
          textDecoration: "none",
        };
        const inner = (
          <>
            <span style={{ marginTop: u(10.4), width: u(21), height: u(21), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(active ? 3.5 : 5.5),
                fontFamily: sans,
                fontWeight: active ? 700 : 500,
                fontSize: u(11.3),
                lineHeight: u(15),
              }}
            >
              {t.label}
            </span>
            {active && (
              <span
                aria-hidden
                style={{
                  marginTop: u(3),
                  width: u(19.5),
                  height: u(1.9),
                  borderRadius: u(1),
                  background: WINE,
                }}
              />
            )}
          </>
        );
        const cls =
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1d1d]";
        return t.to ? (
          <Link key={t.id} to={t.to} className={cls} style={style}>
            {inner}
          </Link>
        ) : (
          <button
            key={t.id}
            type="button"
            aria-current={active ? "page" : undefined}
            className={cls}
            style={style}
          >
            {inner}
          </button>
        );
      })}
      <span
        aria-hidden
        style={{ ...box(131.7, 77.8, 128, 3.3), borderRadius: u(2), background: "#cfc7bd" }}
      />
    </nav>
  );
}

/* ───────────────────────── Tab icons (24 × 24) ───────────────────────── */

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
        stroke="#fbf6ee"
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
        d="M12 6.5C9.8 4.7 6.7 4 2.5 4.3V19c4.2-.3 7.300.4 9.5 2.2 2.2-1.8 5.3-2.5 9.5-2.2V4.3c-4.2-.3-7.300.4-9.5 2.2Z"
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
