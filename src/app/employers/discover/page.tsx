"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── DATA ───────────────────────────────────────────────────── */
const TALENT = [
  { id: 1,  name: "Amara Osei",       initials: "AO", role: "Full-Stack Engineer",    location: "Accra, Ghana",            score: 847, skills: ["React","TypeScript","Node.js","PostgreSQL"], available: true,  slug: "amara-osei",      tier: "Elite",    gradient: "135deg, #0F2D52 0%, #2A6FBF 100%" },
  { id: 2,  name: "Kwame Asante",     initials: "KA", role: "ML Engineer",            location: "Lagos, Nigeria",           score: 912, skills: ["Python","PyTorch","AWS","FastAPI"],           available: true,  slug: "kwame-asante",    tier: "Elite",    gradient: "135deg, #0a1f3a 0%, #1a4a80 100%" },
  { id: 3,  name: "Zara Mensah",      initials: "ZM", role: "Product Designer",       location: "Nairobi, Kenya",           score: 783, skills: ["Figma","UI/UX","Framer","Design Systems"],   available: false, slug: "zara-mensah",     tier: "Advanced", gradient: "135deg, #8B5CF6 0%, #a78bfa 100%" },
  { id: 4,  name: "Chisom Eze",       initials: "CE", role: "Backend Engineer",       location: "Kigali, Rwanda",           score: 841, skills: ["Go","PostgreSQL","Docker","Kubernetes"],      available: true,  slug: "chisom-eze",      tier: "Elite",    gradient: "135deg, #0F2D52 0%, #2A6FBF 100%" },
  { id: 5,  name: "Nia Boateng",      initials: "NB", role: "DevOps Engineer",        location: "Abidjan, Côte d'Ivoire",  score: 822, skills: ["Kubernetes","Terraform","CI/CD","Linux"],     available: true,  slug: "nia-boateng",     tier: "Advanced", gradient: "135deg, #16a34a 0%, #15803d 100%" },
  { id: 6,  name: "Emeka Nwosu",      initials: "EN", role: "Mobile Developer",       location: "Accra, Ghana",            score: 791, skills: ["React Native","Flutter","Firebase","Swift"],  available: false, slug: "emeka-nwosu",     tier: "Advanced", gradient: "135deg, #2A6FBF 0%, #1d4ed8 100%" },
  { id: 7,  name: "Fatima Al-Hassan", initials: "FA", role: "Data Scientist",         location: "Cairo, Egypt",            score: 876, skills: ["Python","SQL","Tableau","Spark"],             available: true,  slug: "fatima-al-hassan", tier: "Elite",   gradient: "135deg, #0F2D52 0%, #2A6FBF 100%" },
  { id: 8,  name: "Tunde Adeyemi",    initials: "TA", role: "Smart Contract Dev",     location: "Lagos, Nigeria",          score: 854, skills: ["Solidity","Rust","Web3.js","Hardhat"],        available: true,  slug: "tunde-adeyemi",   tier: "Elite",    gradient: "135deg, #E8813A 0%, #d97706 100%" },
  { id: 9,  name: "Leila Abdi",       initials: "LA", role: "UX Researcher",          location: "Addis Ababa, Ethiopia",   score: 762, skills: ["User Research","Figma","Miro","Interviews"],  available: false, slug: "leila-abdi",      tier: "Advanced", gradient: "135deg, #8B5CF6 0%, #7c3aed 100%" },
];

const SKILL_OPTIONS = ["React","TypeScript","Python","Figma","Node.js","Go","Flutter","Solidity","PostgreSQL","AWS"];

const TIER_CONFIG: Record<string, { bg: string; text: string; border: string; label: string }> = {
  Elite:    { bg: "rgba(15,45,82,0.08)",   text: "#0F2D52",  border: "rgba(15,45,82,0.16)",   label: "⬡ Elite" },
  Advanced: { bg: "rgba(42,111,191,0.08)", text: "#2A6FBF",  border: "rgba(42,111,191,0.18)", label: "◈ Advanced" },
};

const SKILL_COLORS: Record<string, string> = {
  React: "#0F2D52", TypeScript: "#0F2D52", "Node.js": "#16a34a",
  Python: "#2A6FBF", Go: "#16a34a", Figma: "#8B5CF6",
  Solidity: "#E8813A", Flutter: "#2A6FBF", PostgreSQL: "#16a34a", AWS: "#E8813A",
};

/* Mini SVG score arc (no font rendering issues) */
function ScoreArc({ score, size = 56 }: { score: number; size?: number }) {
  const R = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * R;
  const arcFrac = 0.75;
  const maxArc = circ * arcFrac;
  const filled = (score / 1000) * maxArc;
  const tier = score >= 850 ? "#0F2D52" : "#2A6FBF";
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0 }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(15,45,82,0.09)"
          strokeWidth={size * 0.065} strokeDasharray={`${maxArc} ${circ - maxArc}`}
          strokeLinecap="round" transform={`rotate(-202 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={tier}
          strokeWidth={size * 0.065} strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round" transform={`rotate(-202 ${cx} ${cy})`} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: size * 0.22, fontWeight: 800, color: "#0F2D52", lineHeight: 1, letterSpacing: "-0.5px" }}>
          {score}
        </span>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const [search, setSearch]                 = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minScore, setMinScore]             = useState(700);
  const [availOnly, setAvailOnly]           = useState(false);
  const [saved, setSaved]                   = useState<number[]>([]);

  const filtered = TALENT
    .filter(t => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.role.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedSkills.length > 0 && !selectedSkills.every(s => t.skills.includes(s))) return false;
      if (t.score < minScore) return false;
      if (availOnly && !t.available) return false;
      return true;
    })
    .sort((a, b) => b.score - a.score);

  const featuredTalent = TALENT.filter(t => t.tier === "Elite" && t.available).slice(0, 4);

  function toggleSave(id: number) {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingBottom: 80, position: "relative" }}>

        {/* ── HERO ── */}
        <div style={{
          background: "linear-gradient(140deg, #0a1f3a 0%, #0F2D52 40%, #1a4a80 70%, #2A6FBF 100%)",
          paddingTop: 130, paddingBottom: 70, position: "relative", overflow: "hidden",
        }}>
          {/* Dot grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          {/* Radial glow */}
          <div style={{ position: "absolute", bottom: -80, right: -100, width: 500, height: 500, borderRadius: "50%", background: "rgba(42,111,191,0.18)", filter: "blur(90px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: -60, left: "30%", width: 300, height: 300, borderRadius: "50%", background: "rgba(232,129,58,0.08)", filter: "blur(70px)", pointerEvents: "none" }} />

          <div className="section-max" style={{ position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "2px", textTransform: "uppercase" }}>
                <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.35)" }} />
                For Employers
              </span>
              <h1 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,58px)", color: "#FFFFFF", lineHeight: 1.06, letterSpacing: "-2px" }}>
                Hire by proof,<br />
                <span style={{ color: "rgba(255,255,255,0.55)" }}>not by promise.</span>
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, maxWidth: 460 }}>
                Every candidate is verified against real portfolio evidence, public commits, and peer signals. No resumes. No guesswork.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)", borderRadius: 12, padding: "10px 18px",
                  fontSize: 13, fontWeight: 600, color: "#FFFFFF",
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                  {TALENT.filter(t => t.available).length} open right now
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0, marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 36 }}>
              {[
                { label: "Verified Talents", value: "47,200+" },
                { label: "Skills Mapped",    value: "2.4M" },
                { label: "Avg Match Time",   value: "< 4 hrs" },
                { label: "Countries Active", value: "54" },
              ].map((s, i) => (
                <div key={s.label} style={{ flex: "1 1 120px", paddingRight: 32, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none", paddingLeft: i > 0 ? 32 : 0 }}>
                  <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 28, color: "#FFFFFF", letterSpacing: "-1px" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURED ELITE TALENT ── */}
        <div style={{ background: "rgba(15,45,82,0.03)", borderBottom: "1px solid rgba(15,45,82,0.07)", padding: "28px 0" }}>
          <div className="section-max">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#2A6FBF", letterSpacing: "1.8px", textTransform: "uppercase" }}>Featured Elite</span>
              <div style={{ flex: 1, height: 1, background: "rgba(15,45,82,0.06)" }} />
            </div>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4 }}>
              {featuredTalent.map(t => (
                <Link key={t.id} href={`/passport/${t.slug}`} style={{ textDecoration: "none", flexShrink: 0 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "14px 18px",
                    background: "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.85)", borderRadius: 14,
                    boxShadow: "0 2px 12px rgba(15,45,82,0.07)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer", minWidth: 220,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(15,45,82,0.13)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(15,45,82,0.07)"; }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(${t.gradient})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 13, color: "#FAF8F4",
                    }}>{t.initials}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 600, fontSize: 13, color: "#0D1B2A" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>{t.score} pts · {t.role.split(" ")[0]}</div>
                    </div>
                    <span style={{ marginLeft: 4, fontSize: 10, fontWeight: 700, color: "#16a34a", background: "rgba(34,197,94,0.09)", padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(34,197,94,0.22)", flexShrink: 0 }}>Open</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="section-max" style={{ paddingTop: 44 }}>
          <div style={{ display: "grid", gridTemplateColumns: "270px 1fr", gap: 28, alignItems: "start" }}>

            {/* ── SIDEBAR ── */}
            <aside style={{ position: "sticky", top: 96 }}>
              <div style={{
                background: "rgba(255,255,255,0.80)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.90)", borderRadius: 18,
                boxShadow: "0 4px 24px rgba(15,45,82,0.07)", padding: 24, display: "flex", flexDirection: "column", gap: 20,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2D52", letterSpacing: "0.5px" }}>Filter Talent</div>

                {/* Search */}
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#6B7280" }}>⌕</span>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Name, role, skill…"
                    style={{
                      width: "100%", boxSizing: "border-box",
                      border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 10,
                      paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
                      fontSize: 13, color: "#0D1B2A", background: "rgba(255,255,255,0.8)",
                      outline: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#0F2D52")}
                    onBlur={e => (e.target.style.borderColor = "rgba(15,45,82,0.10)")}
                  />
                </div>

                {/* Min Score Slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "1.2px", textTransform: "uppercase" }}>Min Score</span>
                    <span style={{
                      fontSize: 12, fontWeight: 800, color: "#FAF8F4",
                      background: "#0F2D52", padding: "2px 10px", borderRadius: 999,
                    }}>{minScore}</span>
                  </div>
                  <input type="range" min={0} max={1000} step={50} value={minScore}
                    onChange={e => setMinScore(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#0F2D52", cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: "#6B7280" }}>0</span>
                    <span style={{ fontSize: 10, color: "#6B7280" }}>1000</span>
                  </div>
                </div>

                {/* Available toggle */}
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <div
                    onClick={() => setAvailOnly(!availOnly)}
                    style={{
                      width: 38, height: 22, borderRadius: 999, position: "relative",
                      background: availOnly ? "#0F2D52" : "rgba(15,45,82,0.10)",
                      transition: "background 0.22s", cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 3, left: availOnly ? 19 : 3,
                      width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.20)", transition: "left 0.22s",
                    }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#0D1B2A" }}>Open to work only</span>
                </label>

                {/* Skills filter */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {SKILL_OPTIONS.map(s => (
                      <label key={s} style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", padding: "3px 0" }}>
                        <div
                          onClick={() => setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                          style={{
                            width: 16, height: 16, borderRadius: 5, flexShrink: 0,
                            border: selectedSkills.includes(s) ? "none" : "1.5px solid rgba(15,45,82,0.20)",
                            background: selectedSkills.includes(s) ? "#0F2D52" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.18s", cursor: "pointer",
                          }}
                        >
                          {selectedSkills.includes(s) && <span style={{ fontSize: 9, color: "#FAF8F4", lineHeight: 1 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: "#0D1B2A" }}>{s}</span>
                        {SKILL_COLORS[s] && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: SKILL_COLORS[s], flexShrink: 0 }} />}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedSkills([]); setMinScore(700); setAvailOnly(false); setSearch(""); }}
                  style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", background: "none", border: "1px solid rgba(15,45,82,0.12)", borderRadius: 8, padding: "7px 0", cursor: "pointer", transition: "all 0.18s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#0F2D52"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(15,45,82,0.30)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#6B7280"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(15,45,82,0.12)"; }}
                >
                  Clear all filters
                </button>
              </div>
            </aside>

            {/* ── TALENT GRID ── */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <div>
                  <p style={{ fontSize: 14, color: "#6B7280" }}>
                    Showing <strong style={{ color: "#0D1B2A", fontWeight: 700 }}>{filtered.length}</strong> verified professionals
                    {selectedSkills.length > 0 && <span style={{ color: "#2A6FBF" }}> · filtered by {selectedSkills.join(", ")}</span>}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {saved.length > 0 && (
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0F2D52", background: "rgba(15,45,82,0.07)", padding: "5px 12px", borderRadius: 999 }}>
                      ♥ {saved.length} saved
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: "#6B7280", background: "rgba(15,45,82,0.05)", padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(15,45,82,0.08)" }}>
                    Score ↓
                  </span>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div style={{
                  textAlign: "center", padding: "80px 40px",
                  background: "rgba(255,255,255,0.70)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.85)", borderRadius: 20,
                }}>
                  <div style={{ fontSize: 52, marginBottom: 16, opacity: 0.5 }}>🔍</div>
                  <p style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 18, color: "#0D1B2A", marginBottom: 8 }}>No matches found</p>
                  <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>Try adjusting your filters or lowering the minimum score</p>
                  <button
                    onClick={() => { setSelectedSkills([]); setMinScore(600); setAvailOnly(false); setSearch(""); }}
                    style={{ fontSize: 13, fontWeight: 600, color: "#FAF8F4", background: "#0F2D52", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer" }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 20 }}>
                  {filtered.map(t => (
                    <div key={t.id} style={{
                      background: "rgba(255,255,255,0.78)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                      border: "1px solid rgba(255,255,255,0.90)", borderRadius: 18,
                      boxShadow: "0 2px 16px rgba(15,45,82,0.07)",
                      display: "flex", flexDirection: "column", overflow: "hidden",
                      transition: "transform 0.22s ease, box-shadow 0.22s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 44px rgba(15,45,82,0.13)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(15,45,82,0.07)"; }}
                    >
                      {/* Top accent bar */}
                      <div style={{ height: 3, background: t.tier === "Elite" ? "linear-gradient(90deg, #0F2D52, #2A6FBF)" : "linear-gradient(90deg, #2A6FBF, #3a7fd5)" }} />

                      <div style={{ padding: "20px 20px 0" }}>
                        {/* Header row */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                          {/* Avatar */}
                          <div style={{
                            width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
                            background: `linear-gradient(${t.gradient})`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 15, color: "#FAF8F4",
                            boxShadow: "0 2px 10px rgba(15,45,82,0.25)",
                          }}>
                            {t.initials}
                          </div>
                          {/* Name */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 15, color: "#0D1B2A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "-0.3px" }}>
                              {t.name}
                            </div>
                            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{t.role}</div>
                          </div>
                          {/* Save button */}
                          <button
                            onClick={() => toggleSave(t.id)}
                            style={{
                              width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(15,45,82,0.12)",
                              background: saved.includes(t.id) ? "rgba(15,45,82,0.08)" : "transparent",
                              cursor: "pointer", fontSize: 14, flexShrink: 0,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              transition: "all 0.18s",
                            }}
                            title={saved.includes(t.id) ? "Remove from saved" : "Save talent"}
                          >
                            {saved.includes(t.id) ? "♥" : "♡"}
                          </button>
                        </div>

                        {/* Location + availability row */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                          <span style={{ fontSize: 12, color: "#6B7280", flex: 1 }}>📍 {t.location}</span>
                          {t.available ? (
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              fontSize: 10, fontWeight: 700, color: "#16a34a",
                              background: "rgba(34,197,94,0.09)", border: "1px solid rgba(34,197,94,0.22)",
                              padding: "2px 9px", borderRadius: 999,
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "block" }} />
                              Open
                            </span>
                          ) : (
                            <span style={{ fontSize: 10, fontWeight: 600, color: "#6B7280", background: "rgba(15,45,82,0.05)", padding: "2px 9px", borderRadius: 999 }}>
                              Not available
                            </span>
                          )}
                        </div>

                        {/* Score + Tier row */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                          <ScoreArc score={t.score} size={52} />
                          <div>
                            <span style={{
                              display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                              background: TIER_CONFIG[t.tier].bg, color: TIER_CONFIG[t.tier].text,
                              border: `1px solid ${TIER_CONFIG[t.tier].border}`, marginBottom: 4,
                            }}>
                              {TIER_CONFIG[t.tier].label}
                            </span>
                            <div style={{ fontSize: 11, color: "#6B7280" }}>SkillPrint Score</div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                          {t.skills.map(s => (
                            <span key={s} style={{
                              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
                              background: `${SKILL_COLORS[s] ?? "#0F2D52"}12`,
                              color: SKILL_COLORS[s] ?? "#0F2D52",
                              border: `1px solid ${SKILL_COLORS[s] ?? "#0F2D52"}22`,
                            }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA row */}
                      <div style={{
                        display: "flex", gap: 8, padding: "12px 20px 18px",
                        borderTop: "1px solid rgba(15,45,82,0.05)",
                        marginTop: "auto",
                      }}>
                        <Link
                          href={`/passport/${t.slug}`}
                          style={{
                            flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
                            background: "#0F2D52", color: "#FAF8F4",
                            fontSize: 12, fontWeight: 700, borderRadius: 10, padding: "10px 0",
                            textDecoration: "none",
                            boxShadow: "0 2px 10px rgba(15,45,82,0.22)",
                            transition: "background 0.18s, transform 0.15s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#0a1f3a"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#0F2D52"; e.currentTarget.style.transform = ""; }}
                        >
                          View Passport ↗
                        </Link>
                        <button
                          style={{
                            width: 40, height: 40, borderRadius: 10, border: "1.5px solid rgba(15,45,82,0.14)",
                            background: "transparent", cursor: "pointer", fontSize: 15, color: "#6B7280",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            transition: "all 0.18s",
                          }}
                          title="Send message"
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A6FBF"; (e.currentTarget as HTMLButtonElement).style.color = "#2A6FBF"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(42,111,191,0.05)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(15,45,82,0.14)"; (e.currentTarget as HTMLButtonElement).style.color = "#6B7280"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                        >
                          ✉
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
