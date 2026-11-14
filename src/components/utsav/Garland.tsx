/** The orange cloth swag with two hanging bells that tops the Utsav screens (390-wide artboard units). */
export function Garland() {
  // The cloth swag: a thick orange band dipping twice and lifting at the centre.
  const swag = "M-6 14C40 24 90 40 140 43Q170 44 195 35Q220 44 250 43C300 40 350 24 396 14";
  const beads = "M-6 26C40 36 90 52 140 55Q170 56 195 47Q220 56 250 55C300 52 350 36 396 26";
  return (
    <svg
      viewBox="0 0 390 90"
      fill="none"
      aria-hidden
      style={{ position: "absolute", left: 0, top: 0, width: "100%", display: "block" }}
    >
      {[38, 347.5].map((x) => (
        <g key={x}>
          <path d={`M${x} 0v74`} stroke="#c9a04f" strokeWidth="1.2" />
          <path
            d={`M${x} 73c4 0 6 2.8 6.3 6.300.2 2.400.8 4 1.9 5.300.4.500.1 1-.5 1H${x - 7.7}c-.6 0-.9-.5-.5-1 1.1-1.3 1.7-2.9 1.9-5.300.3-3.5 2.3-6.3 6.3-6.3Z`}
            fill="#d1a957"
          />
          <ellipse cx={x} cy="88.3" rx="2.3" ry="1.3" fill="#c9a04f" />
        </g>
      ))}
      <path
        d={beads}
        stroke="#f5c93a"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeDasharray="0.1 8.2"
      />
      <path d={swag} stroke="#ec8c3c" strokeWidth="19" />
      <path d={swag} stroke="#f39b2c" strokeWidth="6" transform="translate(0 6.5)" />
      <path
        d={swag}
        stroke="#f5c93a"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeDasharray="4 4.2"
        transform="translate(0 -3)"
        opacity="0.85"
      />
    </svg>
  );
}
