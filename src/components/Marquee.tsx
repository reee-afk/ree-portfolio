// Scrolling banner: one 960×76 tile drawn as SVG, repeated four times so the
// -50% translate in `animate-marquee` loops seamlessly even on wide screens.
const TILE_W = 960;
const TILE_H = 76;

function Label({ x, y, w, text }: { x: number; y: number; w: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={18} fill="var(--mq-yellow)" />
      <text
        x={x + 7}
        y={y + 12.5}
        fontFamily="var(--font-sans)"
        fontSize="9.5"
        fontWeight={500}
        fill="var(--mq-label-ink)"
      >
        {text}
      </text>
    </g>
  );
}

function ScriptRee({ x }: { x: number }) {
  return (
    <text
      x={x}
      y={53}
      textAnchor="middle"
      fontFamily="Damion, cursive"
      fontSize="50"
      fill="var(--mq-pink-soft)"
      stroke="var(--mq-outline)"
      strokeWidth={6}
      strokeLinejoin="round"
      paintOrder="stroke"
      style={{ filter: "drop-shadow(0 0 0.6px var(--mq-pink-soft))" }}
    >
      Ree
    </text>
  );
}

function Lips({ id }: { id: string }) {
  return (
    <g transform="translate(480 40)">
      <defs>
        <pattern id={`${id}-dots`} width="2.4" height="2.4" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="0.7" fill="var(--mq-hot-pink)" />
        </pattern>
      </defs>
      {/* halftone glow behind */}
      <ellipse cx="0" cy="2" rx="35" ry="24" fill={`url(#${id}-dots)`} opacity={0.35} />
      {/* upper lip */}
      <path
        d="M-32,0 C-24,-10 -14,-20 -6,-16 C-3,-15 -1,-13 0,-12 C1,-13 3,-15 6,-16 C14,-20 24,-10 32,0 C20,-3 10,-6 0,-4 C-10,-6 -20,-3 -32,0 Z"
        fill="var(--mq-hot-pink)"
      />
      {/* lower lip: solid top fading into halftone */}
      <path
        d="M-32,0 C-20,3 -10,5 0,5 C10,5 20,3 32,0 C26,14 14,22 0,22 C-14,22 -26,14 -32,0 Z"
        fill={`url(#${id}-dots)`}
      />
      <path
        d="M-30,1 C-20,4 -10,6 0,6 C10,6 20,4 30,1 C26,8 16,12 0,12 C-16,12 -26,8 -30,1 Z"
        fill="var(--mq-hot-pink)"
      />
      {/* mouth + teeth */}
      <path d="M-20,0 C-10,-6 10,-6 20,0 C10,5 -10,5 -20,0 Z" fill="var(--mq-mouth)" />
      <path d="M-14,-1 C-6,-5 6,-5 14,-1 C6,1 -6,1 -14,-1 Z" fill="#fff" />
    </g>
  );
}

function FragileSticker() {
  return (
    <g transform="translate(44 64) rotate(-14)">
      <circle r="23" fill="var(--mq-hot-pink)" stroke="var(--mq-ink)" strokeWidth={1.4} />
      <circle
        r="20"
        fill="none"
        stroke="var(--mq-ink)"
        strokeWidth={0.5}
        strokeDasharray="1.5 1.5"
      />
      <text
        y="-9"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="5.5"
        fontWeight={700}
        fill="var(--mq-ink)"
      >
        PLEASE
      </text>
      <text
        y="-3"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="3.4"
        fontWeight={700}
        fill="var(--mq-ink)"
      >
        HANDLE WITH CARE
      </text>
      <rect x="-19" y="0" width="38" height="10" fill="var(--mq-ink)" />
      <text
        y="8.2"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="8.5"
        fontWeight={800}
        fill="#fff"
      >
        FRAGILE
      </text>
    </g>
  );
}

function Pin() {
  return (
    <g transform="translate(272 12) rotate(35)">
      <line x1="0" y1="6" x2="0" y2="22" stroke="#8a8a8a" strokeWidth={1.4} strokeLinecap="round" />
      <rect x="-7" y="2" width="14" height="5" rx="2" fill="#d8669b" />
      <path d="M-4,-14 L4,-14 L5,2 L-5,2 Z" fill="var(--mq-pink-soft)" />
      <ellipse cx="0" cy="-15" rx="6" ry="3" fill="#f6a9c9" />
      <rect x="-2.5" y="-12" width="1.6" height="12" rx="0.8" fill="#fff" opacity={0.6} />
    </g>
  );
}

function Cursor() {
  return (
    <path
      transform="translate(646 48) rotate(-8)"
      d="M0,0 L0,24 L6,18 L10,28 L14,26 L10,16 L18,16 Z"
      fill="var(--mq-pink-soft)"
      stroke="var(--mq-cursor-stroke)"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  );
}

function Starburst() {
  const points = Array.from({ length: 20 }, (_, i) => {
    const r = i % 2 === 0 ? 28 : 13;
    const a = (Math.PI * i) / 10 - Math.PI / 2;
    return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <polygon transform="translate(908 62) rotate(8)" points={points} fill="var(--mq-hot-pink-2)" />
  );
}

function Doodle() {
  return (
    <g fill="none" stroke="var(--mq-hot-pink-2)" strokeWidth={0.9} strokeLinejoin="round">
      <path d="M122,42 L140,46 L131,58 Z" />
      <path d="M140,50 L146,64 L136,62" />
    </g>
  );
}

function Tile({ id, hidden }: { id: string; hidden?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${TILE_W} ${TILE_H}`}
      className="h-20 md:h-28 w-auto max-w-none shrink-0 select-none"
      role={hidden ? undefined : "img"}
      aria-hidden={hidden || undefined}
      aria-label={
        hidden
          ? undefined
          : "Ree — researching ideas, designing meanings. A researcher & designer with a heart full of caffeine."
      }
    >
      <defs>
        <pattern
          id={`${id}-grid`}
          width="46.5"
          height="38"
          patternUnits="userSpaceOnUse"
          x="-2"
          y="-2"
        >
          <path d="M46.5,0 L0,0 L0,38" fill="none" stroke="var(--mq-grid)" strokeWidth={0.8} />
        </pattern>
      </defs>
      <rect width={TILE_W} height={TILE_H} fill="var(--mq-bg)" />
      <rect width={TILE_W} height={TILE_H} fill={`url(#${id}-grid)`} />

      <FragileSticker />
      <Doodle />
      <Label x={101} y={20} w={111} text="Researching Ideas" />
      <Label x={145} y={40} w={128} text="Designing Meanings" />
      <Pin />

      <ScriptRee x={378} />
      <Lips id={id} />
      <ScriptRee x={590} />
      <Cursor />

      <Label x={679} y={21} w={125} text="A Researcher & Designer" />
      <Label x={724} y={40} w={138} text="Have Heart Full Of Caffeine" />
      {/* pink tape strip */}
      <rect
        x="788"
        y="13"
        width="40"
        height="13"
        fill="var(--mq-hot-pink)"
        opacity={0.6}
        transform="rotate(12 808 19)"
      />

      <Starburst />
    </svg>
  );
}

export function Marquee() {
  return (
    <div className="marquee-ree relative overflow-hidden">
      <div className="flex w-max animate-marquee">
        <Tile id="mq-a" />
        <Tile id="mq-b" hidden />
        <Tile id="mq-c" hidden />
        <Tile id="mq-d" hidden />
      </div>
    </div>
  );
}
