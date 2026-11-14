import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import ghatsImg from "@/assets/story/ghats.webp";
import rangoliImg from "@/assets/story/rangoli.webp";
import potteryImg from "@/assets/story/pottery.webp";
import lakshmiImg from "@/assets/story/lakshmi.webp";
import templeImg from "@/assets/story/temple.webp";
import ramaImg from "@/assets/story/rama.webp";
import familyImg from "@/assets/story/family.webp";
import eldersImg from "@/assets/story/elders.webp";

export const Route = createFileRoute("/celebrate_/story")({
  head: () => ({
    meta: [
      { title: "Story Mode — The why behind the what" },
      { name: "description", content: "Stories, facts and family traditions behind Diwali." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: StoryScreen,
});

/* Drawn on a 390 × 1825 artboard; u() scales every measurement with the frame width. */
const u = (n: number) => `calc(${n} * var(--u))`;

const serif = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const sans = '"Plus Jakarta Sans", system-ui, sans-serif';

const INK = "#231815";
const WINE = "#9b1c22";
const MUTED = "#6a5f5a";
const GOLD = "#c99a4a";
const CARD = "#fffdf9";

function box(left: number, top: number, width: number, height: number): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: u(width), height: u(height) };
}

const cardStyle: CSSProperties = {
  background: CARD,
  border: "1px solid #efe2cf",
  boxShadow: "0 3px 10px rgba(150, 110, 60, 0.08)",
};

const FACTS = [
  {
    id: "rangoli",
    img: rangoliImg,
    alt: "A lotus rangoli ringed with lit diyas and marigolds.",
    title: (
      <>
        The rangoli isn’t decoration
        <br />— it’s <span style={{ color: WINE }}>a map</span>
      </>
    ),
    body: "It tells Lakshmi where to enter and which path to take.",
  },
  {
    id: "mud",
    img: potteryImg,
    alt: "A potter shaping a clay pot on a wheel.",
    title: (
      <>
        Diyas were originally made
        <br />
        of <span style={{ color: WINE }}>mud, not clay</span>
      </>
    ),
    body: "The material matters — mud connects to the earth, which connects to abundance.",
  },
];

const STORIES = [
  {
    id: "lakshmi",
    img: lakshmiImg,
    alt: "Lakshmi seated on a pink lotus between brass lamps.",
    title: "Who is Lakshmi — really?",
    note: "Beyond the goddess of wealth,\nhere’s the full picture.",
    minutes: 5,
    top: 1043.3,
    height: 108.7,
  },
  {
    id: "north-south",
    img: templeImg,
    alt: "A south Indian temple tower at sunset, reflected in a tank.",
    title: "Why north India and south\nIndia celebrate Diwali\ncompletely differently",
    note: "Same festival, different deity,\ndifferent meaning.",
    minutes: 4,
    top: 1166.6,
    height: 151.8,
  },
  {
    id: "rama",
    img: ramaImg,
    alt: "Rama, Sita and Lakshmana arriving in Ayodhya on a horse-drawn chariot.",
    title: "The story of Rama’s\nhomecoming — the origin of\nDiwali",
    note: "Why we light diyas, told from the\nbeginning.",
    minutes: 6,
    top: 1333.6,
    height: 152.2,
  },
];

const QUOTES = [
  {
    id: "priya",
    img: familyImg,
    quote:
      "“In our family, we always\nlight the first diya from\nthe kitchen — my nani\nsaid that’s where Lakshmi\nlives first.”",
    by: "Priya, Delhi",
    left: 16.5,
    width: 171.9,
  },
  {
    id: "arjun",
    img: eldersImg,
    quote:
      "“We do the puja twice —\nonce at home, once at my\ngrandfather’s. It takes all\nnight but nobody minds.”",
    by: "Arjun, Mumbai",
    left: 201.9,
    width: 171.3,
  },
];

function StoryScreen() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-white sm:py-10">
      <style>{`
        .utsav-carousel { scrollbar-width: none; }
        .utsav-carousel::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="relative w-full max-w-[390px] overflow-hidden sm:shadow-[0_30px_60px_-20px_rgba(60,30,10,0.3),0_8px_24px_rgba(60,30,10,0.1)]"
        style={{ aspectRatio: "390 / 1825", containerType: "inline-size", background: "#f8f3ec" }}
      >
        <div
          className="absolute inset-0"
          style={{ ["--u" as string]: "calc(100cqw / 390)", color: INK }}
        >
          <Header />
          <TodaysRead />

          <SectionTitle top={612.6} icon={<BulbIcon />} iconBox={[17, 618, 12, 17]}>
            Did you <span style={{ color: WINE }}>know?</span>
          </SectionTitle>
          <div
            className="utsav-carousel"
            role="list"
            aria-label="Did you know"
            style={{
              ...box(0, 650, 390, 318),
              display: "flex",
              gap: u(15.2),
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              padding: `${u(4)} ${u(16.5)} 0`,
              scrollPaddingLeft: u(16.5),
            }}
          >
            {FACTS.map((f) => (
              <FactCard key={f.id} fact={f} />
            ))}
          </div>

          <SectionTitle top={1002.2} icon={<BookIcon />} iconBox={[16, 1007, 19, 15]}>
            The full <span style={{ color: WINE }}>story</span>
          </SectionTitle>
          {STORIES.map((s) => (
            <StoryRow key={s.id} story={s} />
          ))}

          <SectionTitle top={1516.6} icon={<PeopleIcon />} iconBox={[16, 1520, 21, 15]}>
            From other <span style={{ color: WINE }}>families</span>
          </SectionTitle>
          {QUOTES.map((q) => (
            <QuoteCard key={q.id} q={q} />
          ))}

          <TabBar />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <>
      <div
        aria-hidden
        style={{
          ...box(-30, -40, 450, 254),
          borderRadius: "0 0 50% 50% / 0 0 18% 18%",
          background: "linear-gradient(180deg, #f3ece2 0%, #f3ebe0 85%, #f5eee5 100%)",
        }}
      />
      <svg viewBox="0 0 390 140" fill="none" aria-hidden style={box(0, 0, 390, 140)}>
        <path
          d="M45.7 126C70 -30 320 -30 344.3 126"
          stroke="#e4cfab"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        <path
          d="M45.7 126Q195 86 344.3 126"
          stroke="#e4cfab"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        {[41.9, 347.6].map((x) => (
          <g key={x}>
            <path d={`M${x} 31V71`} stroke="#d2ad6b" strokeWidth="1" />
            <circle cx={x} cy="85" r="13.6" fill="#fbf2e2" stroke="#e5c78e" strokeWidth="1.1" />
            <circle cx={x} cy="101.6" r="4.5" fill="#ef8a35" />
            <circle cx={x} cy="111.6" r="3.6" fill="#f5b731" />
          </g>
        ))}
        {/* bell */}
        <path
          d="M41.9 78.5c2.6 0 3.9 1.8 4 4.300.1 2 .5 3.3 1.3 4.300.3.4.1.8-.4.8h-9.8c-.5 0-.7-.4-.4-.8.8-1 1.2-2.3 1.3-4.300.1-2.5 1.4-4.3 4-4.3Z"
          fill="#d7a43c"
        />
        <circle cx="41.9" cy="89.3" r="1.2" fill="#a8741a" />
        {/* lantern */}
        <rect x="344.6" y="78.6" width="6" height="2" rx="0.6" fill="#7a2c14" />
        <rect x="343.6" y="80.4" width="8" height="9.2" rx="3.2" fill="#e0462a" />
        <rect x="345.8" y="82.4" width="3.6" height="5.2" rx="1.6" fill="#f7b02e" />
        <rect x="344.6" y="89.4" width="6" height="1.8" rx="0.6" fill="#7a2c14" />
      </svg>

      {/* Lotus mark */}
      <svg viewBox="0 0 30 30" aria-hidden style={box(178.5, 43, 33, 33)}>
        <path
          d="M15 2c3 3.2 4.3 6.2 4.3 8.6a4.3 4.3 0 0 1-8.6 0C10.7 8.2 12 5.2 15 2Z"
          fill={WINE}
        />
        <path
          d="M3.5 7c3.600.4 6.2 2.3 7.1 5.200.6 2 0 3.7-1.5 4.3-1.600.6-3.3-.4-4.2-2.3C3.9 12.3 3.4 9.8 3.5 7Z"
          fill={WINE}
        />
        <path
          d="M26.5 7c-3.600.4-6.2 2.3-7.1 5.2-.6 2 0 3.7 1.5 4.3 1.600.6 3.3-.4 4.2-2.300.9-1.9 1.4-4.4 1.4-7.2Z"
          fill={WINE}
        />
        <path d="M4.5 19.5h21c-.8 4.5-4.9 7.5-10.5 7.5S5.3 24 4.5 19.5Z" fill={WINE} />
      </svg>

      <h1
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(127),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(35.5),
          lineHeight: u(42),
          letterSpacing: "-0.005em",
          color: WINE,
        }}
      >
        Story Mode
      </h1>
      <p
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: u(172),
          margin: 0,
          textAlign: "center",
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: u(17.5),
          lineHeight: u(22),
          letterSpacing: "0.02em",
          color: "#3a2a24",
        }}
      >
        The why behind the what
      </p>
      <svg viewBox="0 0 144 12" fill="none" aria-hidden style={box(123, 203, 144, 12)}>
        <path d="M0 6h44M100 6h44" stroke="#dcbf8a" strokeWidth="0.9" />
        {[54, 90].map((x) => (
          <g key={x} fill="#d2ad6b">
            <circle cx={x} cy="3.7" r="2.1" />
            <circle cx={x} cy="8.3" r="2.1" />
            <circle cx={x - 2.3} cy="6" r="2.1" />
            <circle cx={x + 2.3} cy="6" r="2.1" />
          </g>
        ))}
        <circle cx="72" cy="6" r="2.6" fill="#d2ad6b" />
      </svg>
    </>
  );
}

function Bracket({ style, flip }: { style: CSSProperties; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={{ position: "absolute", transform: flip ? "rotate(180deg)" : undefined, ...style }}
    >
      <path d="M1 14V1h13" stroke={GOLD} strokeWidth="1.7" />
    </svg>
  );
}

function Chip({
  children,
  style,
  to,
}: {
  children: ReactNode;
  style: CSSProperties;
  to?: "/celebrate/five-days";
}) {
  const props = {
    className:
      "group cursor-pointer no-underline transition-[filter] duration-150 hover:brightness-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: u(9),
      padding: 0,
      border: 0,
      borderRadius: u(14),
      background: "#f6e5d7",
      color: WINE,
      fontFamily: serif,
      fontWeight: 600,
      fontSize: u(13.6),
      lineHeight: 1,
      letterSpacing: "0.02em",
      ...style,
    } satisfies CSSProperties,
  };
  const content = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
        →
      </span>
    </>
  );
  return to ? (
    <Link to={to} {...props}>
      {content}
    </Link>
  ) : (
    <button type="button" {...props}>
      {content}
    </button>
  );
}

function TodaysRead() {
  return (
    <article
      aria-labelledby="todays-read"
      style={{ ...box(16.5, 244, 356.7, 336), ...cardStyle, borderRadius: u(14.5) }}
    >
      <Bracket style={{ left: u(3.6), top: u(3), width: u(14), height: u(14) }} />
      <Bracket flip style={{ right: u(3.6), bottom: u(3), width: u(13), height: u(13) }} />

      <p
        style={{
          ...box(17.2, 19.4, 120, 20),
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: u(8),
          fontFamily: serif,
          fontWeight: 700,
          fontSize: u(17),
          lineHeight: 1,
          color: WINE,
        }}
      >
        Today’s read
        <svg viewBox="0 0 22 14" aria-hidden style={{ width: u(16.5), height: u(10.5) }}>
          <path
            d="M11 0.6c1 1.3 1.4 2.2 1.4 3a1.4 1.4 0 0 1-2.8 0c0-.8.4-1.7 1.4-3Z"
            fill="#f2a325"
          />
          <path d="M1 6h20c-.8 3.8-4.8 6.6-10 6.6S1.8 9.8 1 6Z" fill="#9b2a1a" />
          <path d="M1 6h20c-.3 1-.8 1.8-1.5 2.4h-17C1.8 7.8 1.3 7 1 6Z" fill="#6a1a10" />
        </svg>
      </p>
      <h2
        id="todays-read"
        style={{
          position: "absolute",
          left: u(17.2),
          top: u(44.6),
          margin: 0,
          fontFamily: serif,
          fontWeight: 600,
          fontSize: u(25.5),
          lineHeight: u(30),
          letterSpacing: "0.003em",
          whiteSpace: "nowrap",
        }}
      >
        Why does Diwali last <span style={{ color: WINE }}>5 days?</span>
      </h2>
      <p
        style={{
          position: "absolute",
          left: u(17.2),
          top: u(83),
          width: u(312),
          margin: 0,
          fontFamily: sans,
          fontWeight: 400,
          fontSize: u(11.9),
          lineHeight: u(18.3),
          color: MUTED,
        }}
      >
        Most people only celebrate day 3. Here’s what the other 4 are actually about.
      </p>
      <Chip to="/celebrate/five-days" style={box(17.2, 134.6, 100.2, 26.8)}>
        3 min read
      </Chip>
      <img
        src={ghatsImg}
        alt="River ghats lined with temples and lamps at sunset."
        style={{
          ...box(17.2, 177, 322, 142),
          objectFit: "cover",
          borderRadius: u(10),
          filter: "sepia(0.35) saturate(1.05)",
          boxShadow: `inset 0 0 0 ${u(1)} rgba(0,0,0,0.1)`,
        }}
      />
    </article>
  );
}

function SectionTitle({
  top,
  icon,
  iconBox,
  children,
}: {
  top: number;
  icon: ReactNode;
  iconBox: [number, number, number, number];
  children: ReactNode;
}) {
  return (
    <>
      <span aria-hidden style={{ ...box(...iconBox), display: "block" }}>
        {icon}
      </span>
      <h2
        style={{
          position: "absolute",
          left: u(38.4),
          top: u(top),
          margin: 0,
          fontFamily: serif,
          fontWeight: 600,
          fontSize: u(24.5),
          lineHeight: u(26),
          letterSpacing: "0.003em",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </h2>
    </>
  );
}

function FactCard({ fact }: { fact: (typeof FACTS)[number] }) {
  return (
    <article
      role="listitem"
      style={{
        position: "relative",
        flex: "none",
        width: u(228.7),
        height: u(307.4),
        borderRadius: u(14),
        scrollSnapAlign: "start",
        ...cardStyle,
      }}
    >
      <img
        src={fact.img}
        alt={fact.alt}
        style={{ ...box(14.4, 12.8, 200.4, 126.5), objectFit: "cover", borderRadius: u(9) }}
      />
      <h3
        style={{
          position: "absolute",
          left: u(14.4),
          top: u(149.9),
          width: u(204),
          margin: 0,
          fontFamily: serif,
          fontWeight: 600,
          fontSize: u(17.4),
          lineHeight: u(25.6),
          whiteSpace: "nowrap",
        }}
      >
        {fact.title}
      </h3>
      <p
        style={{
          position: "absolute",
          left: u(14.4),
          top: u(203.4),
          width: u(198),
          margin: 0,
          fontFamily: sans,
          fontWeight: 400,
          fontSize: u(11.6),
          lineHeight: u(16.5),
          color: MUTED,
        }}
      >
        {fact.body}
      </p>
      <Chip style={box(14.8, 271.5, 96.7, 24)}>Tap to read</Chip>
    </article>
  );
}

function StoryRow({ story }: { story: (typeof STORIES)[number] }) {
  return (
    <article
      style={{ ...box(16.5, story.top, 356.7, story.height), ...cardStyle, borderRadius: u(14.5) }}
    >
      <img
        src={story.img}
        alt={story.alt}
        style={{
          position: "absolute",
          left: u(12.8),
          top: "50%",
          width: u(79.3),
          height: u(79.3),
          transform: "translateY(-50%)",
          objectFit: "cover",
          borderRadius: u(8),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: u(105),
          top: u(11.4),
          width: u(190),
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: serif,
            fontWeight: 600,
            fontSize: u(16.4),
            lineHeight: u(22),
            whiteSpace: "pre",
          }}
        >
          {story.title}
        </h3>
        <p
          style={{
            margin: `${u(3.6)} 0 0`,
            fontFamily: sans,
            fontWeight: 400,
            fontSize: u(11.2),
            lineHeight: u(14),
            color: MUTED,
            whiteSpace: "pre",
          }}
        >
          {story.note}
        </p>
        <span
          style={{
            marginTop: u(15.6),
            fontFamily: serif,
            fontWeight: 600,
            fontSize: u(12.6),
            lineHeight: 1,
            color: WINE,
          }}
        >
          {story.minutes} min read →
        </span>
      </div>
      <button
        type="button"
        aria-label={`Open “${story.title.replace(/\n/g, " ")}”`}
        className="grid cursor-pointer place-items-center transition-[filter] duration-150 hover:brightness-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]"
        style={{
          position: "absolute",
          left: u(312.5),
          top: "50%",
          width: u(31.6),
          height: u(31.6),
          transform: "translateY(-50%)",
          padding: 0,
          border: 0,
          borderRadius: "50%",
          background: "#f6e9de",
        }}
      >
        <svg viewBox="0 0 14 10" fill="none" style={{ width: u(10), height: u(7) }}>
          <path
            d="m2 2.5 5 5 5-5"
            stroke={WINE}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  );
}

function QuoteCard({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <figure
      style={{
        ...box(q.left, 1559.8, q.width, 137.2),
        margin: 0,
        borderRadius: u(14),
        ...cardStyle,
      }}
    >
      <img
        src={q.img}
        alt=""
        style={{
          ...box(12.2, 12.2, 36.5, 36.5),
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: `0 0 0 ${u(1)} #e8cf9c`,
        }}
      />
      <blockquote
        style={{
          position: "absolute",
          left: u(56.5),
          top: u(19.3),
          width: u(108),
          margin: 0,
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: u(11.5),
          lineHeight: u(18.3),
          color: "#3a2a24",
          whiteSpace: "pre",
        }}
      >
        {q.quote}
      </blockquote>
      <figcaption
        style={{
          position: "absolute",
          right: u(12.8),
          top: u(111.3),
          fontFamily: sans,
          fontWeight: 500,
          fontSize: u(11.3),
          lineHeight: 1,
          color: "#6a5f5a",
        }}
      >
        — {q.by}
      </figcaption>
    </figure>
  );
}

/* ───────────────────────── Tab bar ───────────────────────── */

type TabTarget = "/celebrate/home" | "/celebrate/checklist";

const TABS: { id: string; label: string; icon: ReactNode; to?: TabTarget }[] = [
  { id: "home", label: "Home", icon: <HomeTab />, to: "/celebrate/home" },
  { id: "guide", label: "Guide", icon: <GuideTab />, to: "/celebrate/checklist" },
  { id: "story", label: "Story", icon: <StoryTab /> },
  { id: "food", label: "Food", icon: <FoodTab /> },
];

function TabBar() {
  return (
    <nav
      aria-label="Utsav"
      style={{
        ...box(0, 1738.4, 390, 87),
        borderTop: "1px solid #ecdfcb",
        background: "#fdf9f4",
      }}
    >
      {TABS.map((t, i) => {
        const active = t.id === "story";
        const x = [61.5, 153, 242.6, 330.4][i];
        const style: CSSProperties = {
          ...box(x - 36, 4, 72, 62),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          border: 0,
          background: "none",
          color: active ? WINE : "#6b625c",
          textDecoration: "none",
        };
        const inner = (
          <>
            <span style={{ marginTop: u(12.5), width: u(22), height: u(22), display: "block" }}>
              {t.icon}
            </span>
            <span
              style={{
                marginTop: u(active ? 4.5 : 9),
                fontFamily: sans,
                fontWeight: active ? 700 : 500,
                fontSize: u(11.6),
                lineHeight: u(14),
              }}
            >
              {t.label}
            </span>
            {active && (
              <span
                aria-hidden
                style={{
                  marginTop: u(3.2),
                  width: u(24),
                  height: u(2.6),
                  borderRadius: u(1.3),
                  background: WINE,
                }}
              />
            )}
          </>
        );
        const cls =
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b1c22]";
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
        style={{ ...box(131.7, 75.5, 126, 3.2), borderRadius: u(2), background: "#d4c8bb" }}
      />
    </nav>
  );
}

/* ───────────────────────── Icons ───────────────────────── */

function BulbIcon() {
  return (
    <svg
      viewBox="0 0 14 20"
      fill="none"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <path
        d="M7 4.5a4.3 4.3 0 0 0-2.7 7.6c.6.5 1 1.2 1 2V15h3.4v-.9c0-.8.4-1.5 1-2A4.3 4.3 0 0 0 7 4.5Z"
        stroke="#8a8078"
        strokeWidth="0.9"
      />
      <path
        d="M5.3 16.7h3.4M5.8 18.3h2.4"
        stroke="#8a8078"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M7 .6v1.6M2 2.5l1 1.1M12 2.5l-1 1.1M.4 7h1.5M12.1 7h1.5"
        stroke="#c9b9a8"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 20 16"
      fill="none"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <path
        d="M1 2.5h7.5A1.5 1.5 0 0 1 10 4v11c-.4-.6-1-1-1.8-1H1Z"
        fill="#eef3f8"
        stroke="#4d6f9a"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M19 2.5h-7.5A1.5 1.5 0 0 0 10 4v11c.4-.6 1-1 1.8-1H19Z"
        fill="#eef3f8"
        stroke="#4d6f9a"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M3 5.5h5M3 8h5M3 10.5h4M12 5.5h5M12 8h5M12 10.5h4"
        stroke="#9fb2c8"
        strokeWidth="0.7"
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
      <rect x="4.5" y="4" width="15" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <rect
        x="8.5"
        y="2"
        width="7"
        height="4"
        rx="1.2"
        fill="#fdf9f4"
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
      <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" />
      <path d="M13 2h4v8l-2-1.5-2 1.5Z" fill="#fdf9f4" />
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
