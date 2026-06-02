interface PassportMarkProps {
  size?: number;
  spinning?: boolean;
  color?: string;
  label?: string;
}

/**
 * The wax-seal / notary stamp that anchors the brand on every page.
 * A circular emblem with text rotating around its perimeter and a
 * citation-mark `§` glyph at the centre.
 */
export default function PassportMark({
  size = 76,
  spinning = true,
  color = "#1A1714",
  label = "OPEN · TALENT · PROTOCOL · PROVEWORK · ",
}: PassportMarkProps) {
  const radius = 38;
  return (
    <div className="mark" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path
            id="mark-circle"
            d={`M 50,50 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>

        {/* outer hairline */}
        <circle cx="50" cy="50" r="48.5" fill="none" stroke={color} strokeWidth="0.6" />
        {/* inner hairline */}
        <circle cx="50" cy="50" r="34" fill="none" stroke={color} strokeWidth="0.6" />

        {/* rotating perimeter text */}
        <g className={spinning ? "mark-spin" : undefined}>
          <text fontSize="6.2" fill={color} letterSpacing="2" fontFamily="var(--font-mono)" fontWeight={500}>
            <textPath href="#mark-circle" startOffset="0">
              {label.repeat(2)}
            </textPath>
          </text>
        </g>

        {/* centre symbol — § citation mark */}
        <text
          x="50"
          y="63"
          textAnchor="middle"
          fontSize="34"
          fontFamily="var(--font-display)"
          fontStyle="italic"
          fontWeight={400}
          fill={color}
        >
          §
        </text>
      </svg>
    </div>
  );
}
