import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";

export const Route = createFileRoute("/celebrate_/personalize")({
  head: () => ({
    meta: [
      { title: "Let’s personalize your experience" },
      {
        name: "description",
        content: "Three quick questions to shape how the festivals are shown to you.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: PersonalizeScreen,
});

/* Drawn on a 390 × 1300 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const display = '"Playfair Display", "Times New Roman", serif';
const sans = '"Outfit", system-ui, sans-serif';

const INK = "#2e1a12";
const MAROON = "#7a1c10";
const GOLD = "#c9a25b";
const PAPER = "#fcf7ee";

type Option = { id: string; label: string; icon: ReactNode };
type Question = { id: string; title: string; multi?: boolean; options: Option[] };

const questions: Question[] = [
  {
    id: "region",
    title: "Where are you from?",
    options: [
      { id: "north", label: "North India", icon: <NorthIcon /> },
      { id: "south", label: "South India", icon: <SouthIcon /> },
      { id: "east", label: "East India", icon: <EastIcon /> },
      { id: "west", label: "West India", icon: <WestIcon /> },
      { id: "northeast", label: "Northeast India", icon: <NortheastIcon /> },
      { id: "outside", label: "Outside India", icon: <GlobeIcon /> },
    ],
  },
  {
    id: "festivals",
    title: "Which festivals do you celebrate?",
    multi: true,
    options: [
      { id: "diwali", label: "Diwali", icon: <DiyaIcon /> },
      { id: "onam", label: "Onam", icon: <LotusIcon /> },
      { id: "bihu", label: "Bihu", icon: <DrumIcon /> },
      { id: "pongal", label: "Pongal", icon: <PotIcon /> },
      { id: "all", label: "All of them", icon: <AllIcon /> },
      { id: "exploring", label: "I’m still exploring", icon: <CompassIcon /> },
    ],
  },
  {
    id: "company",
    title: "How do you usually celebrate?",
    options: [
      { id: "family", label: "With family at home", icon: <HomeIcon /> },
      { id: "alone", label: "Away from home, alone", icon: <BackpackIcon /> },
      { id: "friends", label: "With friends", icon: <FriendsIcon /> },
      { id: "varies", label: "It varies every year", icon: <CalendarIcon /> },
    ],
  },
];

function PersonalizeScreen() {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const toggle = (q: Question, optionId: string) =>
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      const has = current.includes(optionId);
      const next = q.multi
        ? has
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        : has
          ? []
          : [optionId];
      return { ...prev, [q.id]: next };
    });

  return (
    <main className="flex min-h-screen justify-center bg-white sm:py-10">
      <div
        className="relative w-full max-w-[390px] self-start overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{ containerType: "inline-size", background: PAPER }}
      >
        <div style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK, position: "relative" }}>
          <Garland />

          <h1
            style={{
              margin: 0,
              paddingTop: u(109.5),
              textAlign: "center",
              fontFamily: display,
              fontWeight: 700,
              fontSize: u(32),
              lineHeight: u(37),
              letterSpacing: "-0.012em",
              whiteSpace: "nowrap",
              position: "relative",
            }}
          >
            Let’s personalize
            <br />
            <em style={{ fontWeight: 600, color: "#a82a1c", letterSpacing: "-0.005em" }}>
              your experience
            </em>
          </h1>

          <div
            style={{
              marginTop: u(14.4),
              height: u(18),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: u(9),
            }}
          >
            <Flourish />
            <span
              style={{
                fontFamily: sans,
                fontWeight: 500,
                fontSize: u(12.7),
                letterSpacing: "0.01em",
                color: "#7d4d38",
              }}
            >
              Quick — 3 questions, 30 seconds
            </span>
            <Flourish flip />
          </div>
          <StarRule width={125} style={{ marginTop: u(10) }} />

          <div style={{ padding: `0 ${u(17.2)}` }}>
            {questions.map((q, i) => (
              <section key={q.id} aria-labelledby={`q-${q.id}`}>
                {i > 0 && <StarRule width={88} style={{ marginTop: u(28) }} />}
                <div
                  style={{
                    marginTop: u(i === 0 ? 24 : 30.6),
                    height: u(24),
                    display: "flex",
                    alignItems: "center",
                    gap: u(11),
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: u(23.5),
                      height: u(23.5),
                      flex: "none",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      background: MAROON,
                      color: "#fbeede",
                      fontFamily: display,
                      fontWeight: 700,
                      fontSize: u(8.5),
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                  <h2
                    id={`q-${q.id}`}
                    style={{
                      margin: 0,
                      fontFamily: display,
                      fontWeight: 700,
                      fontSize: u(18.6),
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.title}
                  </h2>
                </div>
                <div
                  role="group"
                  aria-labelledby={`q-${q.id}`}
                  style={{
                    marginTop: u(14.4),
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: `${u(11)} ${u(11.6)}`,
                  }}
                >
                  {q.options.map((o) => {
                    const selected = (answers[q.id] ?? []).includes(o.id);
                    return (
                      <button
                        key={o.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggle(q, o.id)}
                        className="cursor-pointer text-left transition-[background-color,border-color,box-shadow,transform] duration-150 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1c10]"
                        style={{
                          height: u(60.8),
                          display: "flex",
                          alignItems: "center",
                          gap: u(11),
                          padding: `0 ${u(8)} 0 ${u(10.5)}`,
                          borderRadius: u(14),
                          border: `${u(1)} solid ${selected ? "#b5452a" : "#f3e4cb"}`,
                          background: selected ? "#fff1e0" : "#fffcf6",
                          boxShadow: selected
                            ? `0 0 0 ${u(1)} #b5452a, 0 ${u(3)} ${u(8)} rgba(170, 70, 30, 0.16)`
                            : `0 ${u(2)} ${u(6)} rgba(190, 150, 90, 0.1)`,
                          color: INK,
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: u(39.3),
                            height: u(39.3),
                            flex: "none",
                            display: "grid",
                            placeItems: "center",
                            borderRadius: u(11),
                            border: `${u(1)} solid #f1dfc4`,
                            background: "#faefdf",
                          }}
                        >
                          <span style={{ width: u(24), height: u(24), display: "block" }}>
                            {o.icon}
                          </span>
                        </span>
                        <span
                          style={{
                            fontFamily: sans,
                            flex: 1,
                            minWidth: 0,
                            paddingRight: u(4),
                            fontWeight: 500,
                            fontSize: u(13.9),
                            lineHeight: u(17.3),
                            WebkitTextStroke: `${u(0.25)} currentColor`,
                          }}
                        >
                          {o.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div
            style={{
              marginTop: u(34.4),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: u(13),
            }}
          >
            <Eye />
            <button
              type="button"
              className="group cursor-pointer transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1c10]"
              style={{
                width: u(266.7),
                height: u(51),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: u(11),
                padding: 0,
                borderRadius: u(26),
                border: `${u(0.75)} solid #b0613c`,
                background: "linear-gradient(90deg, #7c190d 0%, #93220f 50%, #78170b 100%)",
                boxShadow: `0 ${u(8)} ${u(16)} rgba(150, 50, 25, 0.28), 0 ${u(2)} ${u(4)} rgba(120, 30, 15, 0.2)`,
                color: "#fff6ea",
                fontFamily: sans,
                fontWeight: 600,
                fontSize: u(15.2),
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              Set my experience
              <svg
                viewBox="0 0 16 14"
                fill="none"
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ width: u(13.5), height: u(12), transform: `translateY(${u(1)})` }}
              >
                <path
                  d="M1.5 7h12.5M8.5 1.5 14 7l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Eye flip />
          </div>

          <div style={{ marginTop: u(16.5), textAlign: "center", lineHeight: u(16) }}>
            <button
              type="button"
              className="cursor-pointer hover:text-[#7a1c10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1c10]"
              style={{
                padding: 0,
                border: 0,
                background: "none",
                fontFamily: sans,
                fontWeight: 400,
                fontSize: u(12.2),
                lineHeight: u(16),
                color: "#8a5d4a",
                textDecoration: "underline",
                textDecorationThickness: u(0.7),
                textUnderlineOffset: u(2.5),
              }}
            >
              Skip, I’ll explore on my own
            </button>
          </div>

          <DiyaField />
        </div>
      </div>
    </main>
  );
}

/* ───────────────────────── Ornaments ───────────────────────── */

// Four marigold swags: [startX, endX, depth].
const SWAGS: [number, number, number][] = [
  [0, 100.5, 16.5],
  [100.5, 195, 23],
  [195, 290, 23],
  [290, 390.5, 16.5],
];

const marigolds = SWAGS.flatMap(([x0, x1, depth]) => {
  const count = Math.round((x1 - x0) / 6.2);
  return Array.from({ length: count }, (_, i) => {
    const t = i / count;
    // The string hangs as a quadratic with control point at 2 × depth.
    return {
      key: `${x0}-${i}`,
      x: x0 + (x1 - x0) * t,
      y: 4 * depth * t * (1 - t),
      yellow: i % 2 === 1,
    };
  });
});

function Lantern({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -40V0" stroke="#c99a2e" strokeWidth="1.1" />
      <path d="M-5 0h10l5.5 12h-21Z" fill="#d9a43a" />
      <rect
        x="-9"
        y="12"
        width="18"
        height="23"
        rx="1"
        fill="#fdeab4"
        stroke="#c8962e"
        strokeWidth="1.4"
      />
      <circle cx="0" cy="23.5" r="6.5" fill="#fbbf24" opacity="0.35" />
      <circle cx="0" cy="23.5" r="4.3" fill="#f59324" />
      <path d="M-9.7 35h19.4L0 44.5Z" fill="#a8741a" />
      <circle cx="0" cy="48.5" r="1.5" fill="#e2a52e" />
    </g>
  );
}

function Bell({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M0 0v18" stroke="#c99a2e" strokeWidth="1" />
      <path
        d="M0 17.5c3.6 0 5 2.8 5.2 6.5.2 3 .8 5.2 1.8 6.8.4.7 0 1.4-.8 1.4H-6.2c-.8 0-1.2-.7-.8-1.4 1-1.6 1.6-3.8 1.8-6.8.2-3.7 1.6-6.5 5.2-6.5Z"
        fill="#dba63f"
      />
      <circle cx="0" cy="36" r="2" fill="#a8741a" />
    </g>
  );
}

function Garland() {
  return (
    <svg
      viewBox="0 0 390 95"
      fill="none"
      aria-hidden
      style={{ position: "absolute", left: 0, top: 0, width: "100%", display: "block" }}
    >
      {/* faint rangoli wheel */}
      <g stroke="#f1e2cb" strokeWidth="0.8">
        <circle cx="195" cy="39.5" r="50.4" />
        <circle cx="195" cy="40" r="40.8" strokeDasharray="3.2 3.2" strokeWidth="1" />
        <circle cx="195" cy="40.3" r="25.2" />
        <path d="M195 40.3V62M195 40.3l15 13M195 40.3l-15 13M175 39h40" />
      </g>

      {/* loose paper strings behind the flowers */}
      <path d="M64 0Q195 72 325 0" stroke="#ecd3a8" strokeWidth="1.3" />
      <path d="M107 4Q195 40 285 4" stroke="#ecd3a8" strokeWidth="1" strokeDasharray="2.6 2.6" />

      <Lantern x={30.3} y={34} />
      <Lantern x={359.8} y={37.4} />
      <Bell x={71.4} />
      <Bell x={316.6} />
      {[106.7, 281].map((x) => (
        <g key={x}>
          <path d={`M${x} 0v29`} stroke="#c99a2e" strokeWidth="1" />
          <circle cx={x} cy="17.7" r="6" fill="#e9a11f" stroke="#a8741a" strokeWidth="0.9" />
        </g>
      ))}

      {/* marigolds */}
      {marigolds
        .filter((m) => !m.yellow)
        .map((m) => (
          <circle key={m.key} cx={m.x} cy={m.y + 6.8} r="4.6" fill="#f0861c" />
        ))}
      {marigolds
        .filter((m) => m.yellow)
        .map((m) => (
          <circle key={m.key} cx={m.x} cy={m.y + 3.4} r="4" fill="#fbbf24" />
        ))}
      {SWAGS.map(([x0, x1, depth]) => (
        <path
          key={x0}
          d={`M${x0} 0Q${(x0 + x1) / 2} ${depth * 2} ${x1} 0`}
          stroke="#5c8f2c"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function Flourish({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 34 10"
      fill="none"
      aria-hidden
      style={{
        width: u(33),
        height: u(9.7),
        flex: "none",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <path
        d="M1 8c6 0 9-1 12-4 2-2 4-2 6 0 3 2.6 6 4 11 4"
        stroke={GOLD}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="2.6" r="1.5" fill={GOLD} />
      <circle cx="31.5" cy="8" r="1.9" fill={GOLD} />
    </svg>
  );
}

function StarRule({ width, style }: { width: number; style?: CSSProperties }) {
  const mid = width / 2;
  const id = `rule-${width}`;
  return (
    <svg
      viewBox={`0 0 ${width} 10`}
      fill="none"
      aria-hidden
      style={{ display: "block", margin: "0 auto", width: u(width), height: u(10), ...style }}
    >
      <defs>
        <linearGradient id={`${id}-l`} x1="0" x2="1">
          <stop offset="0" stopColor="#e6cba4" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e6cba4" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="1" x2="0">
          <stop offset="0" stopColor="#e6cba4" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e6cba4" />
        </linearGradient>
      </defs>
      <rect x="0" y="4.6" width={mid - 12} height="0.8" fill={`url(#${id}-l)`} />
      <rect x={mid + 12} y="4.6" width={mid - 12} height="0.8" fill={`url(#${id}-r)`} />
      <path
        d={`M${mid} 0c.8 2.8 1.9 4 4.8 5-2.9 1-4 2.2-4.8 5-.8-2.8-1.9-4-4.8-5 2.9-1 4-2.2 4.8-5Z`}
        fill="#dcb07a"
      />
    </svg>
  );
}

function Eye({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 30 16"
      fill="none"
      aria-hidden
      style={{
        width: u(27.6),
        height: u(14.7),
        flex: "none",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <path
        d="M29 8c-5 0-8-6.5-17-6.5C5.5 1.5 1.5 4.5 1.5 8s4 6.5 10.5 6.5C21 14.5 24 8 29 8Z"
        stroke={GOLD}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="8" r="2.3" fill={GOLD} />
    </svg>
  );
}

const DIYAS: [number, number, number][] = [
  [41.5, 66, 0.8],
  [123, 72.5, 0.85],
  [195.2, 62, 1.25],
  [276.8, 68.5, 1],
  [353, 64.5, 0.75],
];

const SPARKS: [number, number][] = [
  [82.3, 56.7],
  [159.1, 52.8],
  [236, 53.6],
  [317.4, 54.4],
  [100.3, 79.3],
  [204.2, 82.7],
];

function DiyaField() {
  return (
    <svg
      viewBox="0 0 390 96"
      fill="none"
      aria-hidden
      style={{ display: "block", width: "100%", marginTop: u(33.5) }}
    >
      <defs>
        <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#edd0b4" />
          <stop offset="1" stopColor="#dcae8e" />
        </linearGradient>
        <linearGradient id="earth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b48a76" />
          <stop offset="0.35" stopColor="#a06a56" />
          <stop offset="1" stopColor="#7b2c1f" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#ffb02e" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#f08a1c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f08a1c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect y="16.7" width="390" height="79.3" fill="url(#dusk)" />
      <path
        d="M0 37l23-2 15-7.5h13l9 7.5 36-.5 11-15.5q5-4.5 11 0l10 15 68-3 13-5h9l9 7 60-1 14-8 10-19 12 19 13 8.5 54 1.5V96H0Z"
        fill="url(#earth)"
      />
      {SPARKS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#f3d9a0" />
      ))}
      {DIYAS.map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <circle cx="0" cy="-2" r="15" fill="url(#glow)" />
          <ellipse cx="0" cy="2" rx="9.5" ry="3.5" fill="#4a1408" />
          <ellipse cx="0" cy="-3.2" rx="3.2" ry="4.6" fill="#fff0a8" />
          <path d="M-7 8.5H7" stroke="#f59324" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/* ───────────────────────── Tile icons (24 × 24) ───────────────────────── */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ display: "block", width: "100%" }}>
      {children}
    </svg>
  );
}

function NorthIcon() {
  return (
    <Icon>
      <path d="M12 2.5 17.5 6h-11Z" fill="#b5512f" />
      <rect x="6" y="6" width="12" height="2.2" fill="#8f3a22" />
      <rect x="6.8" y="8.2" width="10.4" height="11" fill="#c96a45" />
      <path d="M9.5 19.2v-5a2.5 2.5 0 0 1 5 0v5Z" fill="#7a2c1a" />
      <rect x="5" y="19" width="14" height="2.2" rx="0.5" fill="#a8482a" />
    </Icon>
  );
}

function SouthIcon() {
  return (
    <Icon>
      <rect x="11.3" y="1.8" width="1.4" height="2.2" fill="#e2a52e" />
      <path d="M10 6a2 2 0 0 1 4 0Z" fill="#e9a11f" />
      <path d="M9.2 6h5.6l1 3.5H8.2Z" fill="#d6452f" />
      <path d="M8.2 9.5h7.6l1.2 3.5H7Z" fill="#2f86a8" />
      <path d="M7 13h10l1 3.5H6Z" fill="#d6452f" />
      <rect x="5.5" y="16.5" width="13" height="5" fill="#f2b632" />
      <path d="M10.5 21.5V19a1.5 1.5 0 0 1 3 0v2.5Z" fill="#6b2a17" />
    </Icon>
  );
}

function EastIcon() {
  return (
    <Icon>
      <g stroke="#a8442a" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M3 17.5h18M5.5 17.5 8.5 8.5h7l3 9M8.5 8.5l3.5 9 3.5-9" />
      </g>
      <path d="M2.5 20.2h19" stroke="#2f86a8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4.5 22h15" stroke="#7fb9cf" strokeWidth="0.9" strokeLinecap="round" />
    </Icon>
  );
}

function WestIcon() {
  return (
    <Icon>
      <rect x="5.3" y="3.5" width="2.4" height="2" fill="#a37435" />
      <rect x="16.3" y="3.5" width="2.4" height="2" fill="#a37435" />
      <rect x="3.5" y="5" width="17" height="3.2" rx="0.5" fill="#b98743" />
      <rect x="5" y="8.2" width="14" height="12.8" fill="#d2a55b" />
      <path d="M8.3 21v-6.3a3.7 3.7 0 0 1 7.4 0V21Z" fill="#8c5a2a" />
    </Icon>
  );
}

function NortheastIcon() {
  return (
    <Icon>
      <path d="M2.5 18.5 9 6.5l4 7 3-5 5.5 10Z" fill="#3f8f45" />
      <path d="m9 6.5 1.7 3-1.7 1-1.7-1ZM16 8.5l1.4 2.6-1.4.8-1.4-.8Z" fill="#dff0d6" />
      <ellipse cx="12" cy="19.5" rx="10" ry="2.6" fill="#2f7a3b" />
      <path d="M8 19.3q2-2.3 4 0 2-2.3 4 0" stroke="#b9e08a" strokeWidth="1.1" />
    </Icon>
  );
}

function GlobeIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9.5" fill="#2f7fd0" />
      <path
        d="M8 6.5c2.5-2 6-1.5 7.5.5 1 1.5-.5 3-2.5 3.2-1.5.3-1.5 1.8-3 2-2 .3-4.3-1-4.5-2.7-.1-1.2 1-2.2 2.5-3ZM13.5 14.5c1.5-.5 3.5.5 3.3 2-.2 1.5-1.8 2.5-3 2-1.3-.5-1.8-3.4-.3-4Z"
        fill="#4caf50"
      />
    </Icon>
  );
}

function DiyaIcon() {
  return (
    <Icon>
      <path
        d="M12 2.5c2 2.5 2.8 4.3 2.8 5.8a2.8 2.8 0 0 1-5.6 0c0-1.5.8-3.3 2.8-5.8Z"
        fill="#fbbf24"
      />
      <path d="M12 5.5c1 1.3 1.3 2.2 1.3 3a1.3 1.3 0 0 1-2.6 0c0-.8.3-1.7 1.3-3Z" fill="#fff1b0" />
      <path d="M2.5 12.5h19c-1 2-3 3-5 3.2H7.5c-2-.2-4-1.2-5-3.2Z" fill="#8a2c14" />
      <path d="M5.5 15c1 2.3 3.5 3.8 6.5 3.8s5.5-1.5 6.5-3.8Z" fill="#c2491f" />
      <circle cx="9" cy="16.3" r="0.7" fill="#fbbf24" />
      <circle cx="12" cy="16.8" r="0.7" fill="#fbbf24" />
      <circle cx="15" cy="16.3" r="0.7" fill="#fbbf24" />
    </Icon>
  );
}

function LotusIcon() {
  return (
    <Icon>
      <path d="M4.5 17.5q7.5 4 15 0" stroke="#3f8f45" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16.5C7.5 16.5 3.5 15 2.5 13.5c2.5-.8 4.5-.3 6 .8Z" fill="#ef6fa5" />
      <path d="M12 16.5c4.5 0 8.5-1.5 9.5-3-2.5-.8-4.5-.3-6 .8Z" fill="#ef6fa5" />
      <path
        d="M12 3.5c3 3.5 4.3 7 3.3 10.5-.5 1.5-1.8 2.5-3.3 2.5s-2.8-1-3.3-2.5c-1-3.5.3-7 3.3-10.5Z"
        fill="#f48fb8"
      />
      <path
        d="M12 7.5c1.3 2 1.8 4 1.3 6-.3 1-.8 1.5-1.3 1.5s-1-.5-1.3-1.5c-.5-2 0-4 1.3-6Z"
        fill="#fbc4da"
      />
    </Icon>
  );
}

function DrumIcon() {
  return (
    <Icon>
      <path d="M13 9.5c.5-3 2.5-5.5 6.5-6-.3 3.5-2 6-5 7Z" fill="#2f9a8a" />
      <path d="M13.5 10c1-2 2.5-3.8 4.5-5" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
      <rect
        x="4"
        y="9.5"
        width="15"
        height="11"
        rx="5"
        transform="rotate(-8 11.5 15)"
        fill="#c2491f"
      />
      <ellipse
        cx="6.3"
        cy="15.8"
        rx="2.8"
        ry="5.3"
        transform="rotate(-8 6.3 15.8)"
        fill="#e8b866"
      />
      <path
        d="m8 11.5 9 6.5M8.5 19.5l8.5-8.5"
        stroke="#f6d48a"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function PotIcon() {
  return (
    <Icon>
      <path d="M17.5 2.5 15.5 21" stroke="#4c9a3a" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="m17 6.5 3-2M16.3 11.5l2.7-1.5"
        stroke="#4c9a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <ellipse cx="9.5" cy="20" rx="7" ry="1.8" fill="#6b2a17" />
      <path
        d="M3.5 13.5c0-1.5 2.7-2.5 6-2.5s6 1 6 2.5c0 4-2.5 6.5-6 6.5s-6-2.5-6-6.5Z"
        fill="#8f3a22"
      />
      <ellipse cx="9.5" cy="12.3" rx="5.5" ry="1.9" fill="#fbf3e2" />
      <ellipse cx="9.5" cy="13.3" rx="6" ry="1.4" fill="#b5512f" />
    </Icon>
  );
}

function AllIcon() {
  return (
    <Icon>
      <path
        d="M14.5 2.5c1 1.5 2.3 2.3 4 2.5-1.7.3-3 1.5-4 3.5-1-2-2.3-3.2-4-3.5 1.7-.2 3-1 4-2.5Z"
        fill="#ef6fa5"
      />
      <path d="M5.5 7v3" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M1.5 11.5h8c-.5 1.8-2 3-4 3s-3.5-1.2-4-3Z" fill="#c2491f" />
      <path
        d="M11.5 14.5c.7 1.5 1.5 2.3 3 3-1.5.7-2.3 1.5-3 3-.7-1.5-1.5-2.3-3-3 1.5-.7 2.3-1.5 3-3Z"
        fill="#f2b632"
      />
      <circle cx="18.5" cy="16" r="3.8" fill="#8f3a22" />
    </Icon>
  );
}

function CompassIcon() {
  return (
    <Icon>
      <rect x="10.8" y="0.8" width="2.4" height="2.4" rx="0.8" fill="#c8962e" />
      <circle cx="12" cy="13" r="9.3" fill="#fdf6e6" stroke="#c8962e" strokeWidth="1.7" />
      <path d="M12 6.5 13.5 13h-3Z" fill="#c2491f" />
      <path d="M12 19.5 10.5 13h3Z" fill="#4a7fb5" />
      <path d="M5.5 13 12 11.5v3ZM18.5 13 12 14.5v-3Z" fill="#7d9bb8" />
      <circle cx="12" cy="13" r="1.1" fill="#fdf6e6" />
    </Icon>
  );
}

function HomeIcon() {
  return (
    <Icon>
      <path d="M12 3 1.5 12h21Z" fill="#8a2c14" />
      <rect x="4" y="12" width="16" height="9.5" fill="#e08a2a" />
      <rect x="9.8" y="14" width="4.4" height="7.5" fill="#fbd46a" />
      <g fill="#fbd46a">
        <circle cx="5.5" cy="13.5" r="0.6" />
        <circle cx="8" cy="13.5" r="0.6" />
        <circle cx="16" cy="13.5" r="0.6" />
        <circle cx="18.5" cy="13.5" r="0.6" />
      </g>
    </Icon>
  );
}

function BackpackIcon() {
  return (
    <Icon>
      <path d="M9.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="#2b4f80" strokeWidth="1.5" />
      <rect x="5.5" y="5.5" width="13" height="16.5" rx="4" fill="#3a66a3" />
      <path d="M5.5 14.5h13V18a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4Z" fill="#587fb3" />
      <path d="M9 7.5v10M15 7.5v10" stroke="#d7b46a" strokeWidth="1.1" strokeLinecap="round" />
    </Icon>
  );
}

function FriendsIcon() {
  return (
    <Icon>
      <path d="M1.5 21c.3-3 2.3-4.5 5-4.5 1.5 0 2.8.5 3.7 1.5L9 21Z" fill="#c96a45" />
      <path d="M22.5 21c-.3-3-2.3-4.5-5-4.5-1.5 0-2.8.5-3.7 1.5L15 21Z" fill="#e2b04a" />
      <path d="M6.5 21c.3-3.3 2.5-5.2 5.5-5.2s5.2 1.9 5.5 5.2Z" fill="#6b2a17" />
      <circle cx="5.8" cy="9.5" r="2.6" fill="#5a2415" />
      <circle cx="18.2" cy="9.5" r="2.6" fill="#5a2415" />
      <circle cx="12" cy="7.5" r="3" fill="#5a2415" />
    </Icon>
  );
}

function CalendarIcon() {
  return (
    <Icon>
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="17"
        rx="2.5"
        fill="#fdf6e6"
        stroke="#c8962e"
        strokeWidth="1.2"
      />
      <path d="M2.5 7a2.5 2.5 0 0 1 2.5-2.5h14A2.5 2.5 0 0 1 21.5 7v3h-19Z" fill="#c23b2a" />
      <path d="M7 2.5v4M17 2.5v4" stroke="#8a2c14" strokeWidth="1.5" strokeLinecap="round" />
      <g fill="#e2c9a0">
        <circle cx="7" cy="13.5" r="1" />
        <circle cx="12" cy="13.5" r="1" />
        <circle cx="17" cy="13.5" r="1" />
        <circle cx="7" cy="17.8" r="1" />
        <circle cx="17" cy="17.8" r="1" />
      </g>
      <path
        d="m12 15.8.7 1.4 1.5.2-1.1 1.1.3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1.1 1.5-.2Z"
        fill="#e9a11f"
      />
    </Icon>
  );
}
