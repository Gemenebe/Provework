interface Skill { label: string; verified: boolean; }

interface PassportCardProps {
  name?: string;
  role?: string;
  location?: string;
  score?: number;
  skills?: Skill[];
  floating?: boolean;
  style?: React.CSSProperties;
}

export default function PassportCard({
  name = "Amara Osei",
  role = "Full-Stack Engineer",
  location = "Accra, Ghana",
  score = 87,
  skills = [
    { label: "React", verified: true },
    { label: "TypeScript", verified: true },
    { label: "Node.js", verified: false },
    { label: "PostgreSQL", verified: false },
    { label: "System Design", verified: true },
  ],
  floating = false,
  style,
}: PassportCardProps) {
  const cardStyle: React.CSSProperties = {
    width: 320,
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: "28px 28px 24px",
    boxShadow: "0 24px 60px rgba(15,45,82,0.16), 0 0 0 1px rgba(255,255,255,0.6) inset",
    animation: floating ? "float 5s ease-in-out infinite" : undefined,
    ...style,
  };

  return (
    <div style={cardStyle}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#6B7280", letterSpacing: "1.8px", textTransform: "uppercase" }}>
          Skill Passport
        </span>
        <span style={{
          background: "#0F2D52", color: "#FAF8F4",
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: 0.5,
        }}>
          ✓ Verified
        </span>
      </div>

      {/* Avatar + Identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, #0F2D52 0%, #2A6FBF 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 16, color: "#FAF8F4",
          flexShrink: 0,
        }}>
          {name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 17, color: "#0D1B2A", lineHeight: 1.2 }}>
            {name}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{role} · {location}</div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {skills.map((s) => (
          <span key={s.label} style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
            background: s.verified ? "rgba(34,197,94,0.09)" : "rgba(42,111,191,0.09)",
            border: `1px solid ${s.verified ? "rgba(34,197,94,0.22)" : "rgba(42,111,191,0.20)"}`,
            color: s.verified ? "#16a34a" : "#2A6FBF",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.verified ? "#16a34a" : "#2A6FBF", flexShrink: 0 }} />
            {s.label}
          </span>
        ))}
      </div>

      {/* Score */}
      <div style={{ background: "rgba(15,45,82,0.04)", borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#6B7280" }}>ProveWork Score</span>
          <div>
            <span style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 26, color: "#0F2D52", lineHeight: 1 }}>
              {score}
            </span>
            <span style={{ fontSize: 12, color: "#6B7280" }}>/100</span>
          </div>
        </div>
        <div style={{ height: 4, background: "rgba(15,45,82,0.08)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${score}%`,
            background: "linear-gradient(90deg, #2A6FBF, #0F2D52)",
            borderRadius: 999,
          }} />
        </div>
        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 6 }}>
          Top <strong style={{ color: "#0F2D52" }}>12%</strong> globally
        </div>
      </div>
    </div>
  );
}
