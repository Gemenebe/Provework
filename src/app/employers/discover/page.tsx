"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PassportMark from "@/components/PassportMark";

/* ─── DATA ───────────────────────────────────────────────────── */
type Tier = "Elite" | "Advanced";
interface Talent {
  id: number;
  name: string;
  initials: string;
  role: string;
  location: string;
  score: number;
  skills: string[];
  available: boolean;
  slug: string;
  tier: Tier;
  evidence_count: number;
  bio: string;
}

const TALENT: Talent[] = [
  {
    id: 1,
    name: "Ibrahim Ibrahim",
    initials: "II",
    role: "Solana / Rust Engineer",
    location: "Cosmos",
    score: 891,
    skills: ["Rust", "Solana", "TypeScript", "Smart Contracts"],
    available: true,
    slug: "devwraithe",
    tier: "Elite",
    evidence_count: 12,
    bio: "Self-taught. Multiple deployed Solana programs, plus a Redis-like TCP server.",
  },
  {
    id: 2,
    name: "Amara Osei",
    initials: "AO",
    role: "Full-Stack Engineer",
    location: "Accra, Ghana",
    score: 847,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    available: true,
    slug: "amara-osei",
    tier: "Elite",
    evidence_count: 14,
    bio: "Eight years shipping production code for emerging-market fintech.",
  },
  {
    id: 3,
    name: "Kwame Asante",
    initials: "KA",
    role: "ML Engineer",
    location: "Lagos, Nigeria",
    score: 912,
    skills: ["Python", "PyTorch", "AWS", "FastAPI"],
    available: true,
    slug: "kwame-asante",
    tier: "Elite",
    evidence_count: 18,
    bio: "Built and deployed three production ML services. Open-source contributor.",
  },
  {
    id: 4,
    name: "Zara Mensah",
    initials: "ZM",
    role: "Product Designer",
    location: "Nairobi, Kenya",
    score: 783,
    skills: ["Figma", "UI/UX", "Framer", "Design Systems"],
    available: false,
    slug: "zara-mensah",
    tier: "Advanced",
    evidence_count: 9,
    bio: "Design systems lead at a fintech serving five African markets.",
  },
  {
    id: 5,
    name: "Chisom Eze",
    initials: "CE",
    role: "Backend Engineer",
    location: "Kigali, Rwanda",
    score: 841,
    skills: ["Go", "PostgreSQL", "Docker", "Kubernetes"],
    available: true,
    slug: "chisom-eze",
    tier: "Elite",
    evidence_count: 11,
    bio: "Backend engineer with deep platform-engineering instincts.",
  },
  {
    id: 6,
    name: "Nia Boateng",
    initials: "NB",
    role: "DevOps Engineer",
    location: "Abidjan, Côte d'Ivoire",
    score: 822,
    skills: ["Kubernetes", "Terraform", "CI/CD", "Linux"],
    available: true,
    slug: "nia-boateng",
    tier: "Advanced",
    evidence_count: 8,
    bio: "Maintains the infrastructure for a payments processor.",
  },
  {
    id: 7,
    name: "Fatima Al-Hassan",
    initials: "FA",
    role: "Data Scientist",
    location: "Cairo, Egypt",
    score: 876,
    skills: ["Python", "SQL", "Tableau", "Spark"],
    available: true,
    slug: "fatima-al-hassan",
    tier: "Elite",
    evidence_count: 13,
    bio: "Five public Kaggle notebooks; deep statistics fluency.",
  },
  {
    id: 8,
    name: "Tunde Adeyemi",
    initials: "TA",
    role: "Smart Contract Developer",
    location: "Lagos, Nigeria",
    score: 854,
    skills: ["Solidity", "Rust", "Web3.js", "Hardhat"],
    available: true,
    slug: "tunde-adeyemi",
    tier: "Elite",
    evidence_count: 10,
    bio: "Audited three live DeFi protocols; ships in Solidity and Rust.",
  },
  {
    id: 9,
    name: "Leila Abdi",
    initials: "LA",
    role: "UX Researcher",
    location: "Addis Ababa, Ethiopia",
    score: 762,
    skills: ["User Research", "Figma", "Miro", "Interviews"],
    available: false,
    slug: "leila-abdi",
    tier: "Advanced",
    evidence_count: 7,
    bio: "Field-research specialist for low-bandwidth user studies.",
  },
];

const SKILL_OPTIONS = [
  "Rust",
  "Solana",
  "React",
  "TypeScript",
  "Python",
  "Go",
  "Figma",
  "PostgreSQL",
  "Kubernetes",
  "Solidity",
];

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(700);
  const [availOnly, setAvailOnly] = useState(false);

  const filtered = TALENT
    .filter((t) => {
      const q = search.trim().toLowerCase();
      if (q && !t.name.toLowerCase().includes(q) && !t.role.toLowerCase().includes(q) && !t.location.toLowerCase().includes(q))
        return false;
      if (selectedSkills.length > 0 && !selectedSkills.every((s) => t.skills.includes(s))) return false;
      if (t.score < minScore) return false;
      if (availOnly && !t.available) return false;
      return true;
    })
    .sort((a, b) => b.score - a.score);

  function toggleSkill(s: string) {
    setSelectedSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 110, position: "relative", zIndex: 1 }}>
        <div className="section-max" style={{ paddingBottom: 100 }}>
          {/* Document header strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 14,
              borderBottom: "1px solid #1A1714",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <span className="font-mono eyebrow-faint">FILE 03 · OPEN DISCOVERY</span>
            <span className="font-mono eyebrow-faint">For employers, recruiters, programme officers</span>
            <span className="font-mono eyebrow-faint">{filtered.length} of {TALENT.length} on roll</span>
          </div>

          {/* Title block */}
          <div
            className="stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
              gap: 56,
              alignItems: "end",
              marginBottom: 56,
            }}
          >
            <div>
              <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#2D5F3F", marginBottom: 18 }}>
                ¶ Records · Discovery
              </div>
              <h1 className="serif-display heading-xl" style={{ marginBottom: 22 }}>
                Find people by what
                <br />
                they have <span className="serif-italic">already proven</span>.
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 19,
                  lineHeight: 1.45,
                  color: "#4A423A",
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 30',
                  maxWidth: 600,
                }}
              >
                Every record below is a passport. Every passport is evidence-cited.
                Search by skill, location, or availability — then click into any record
                to read the receipts that justify each claim.
              </p>
            </div>

            <div className="discover-mark-mobile" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              <PassportMark size={88} />
              <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#8C8273", textAlign: "right" }}>
                OPEN TALENT PROTOCOL · v0.1
              </span>
            </div>
          </div>

          {/* Query line */}
          <section style={{ marginBottom: 32 }}>
            <label
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "#8C8273",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              }}
            >
              Records request
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                borderBottom: "1.5px solid #1A1714",
                paddingBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 26,
                  color: "#8C8273",
                  fontWeight: 380,
                  fontVariationSettings: '"opsz" 100',
                }}
              >
                show me…
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="people who shipped Solana programs"
                className="input-doc"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="font-mono"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#8C8273",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Clear ✕
                </button>
              )}
            </div>
          </section>

          {/* Filters */}
          <section
            className="stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr) auto",
              gap: 32,
              alignItems: "start",
              padding: "20px 0",
              borderTop: "1px dashed rgba(26,23,20,0.18)",
              borderBottom: "1px dashed rgba(26,23,20,0.18)",
              marginBottom: 36,
            }}
          >
            {/* Skills */}
            <div>
              <div
                className="font-mono"
                style={{ fontSize: 10.5, letterSpacing: "0.18em", color: "#8C8273", textTransform: "uppercase", marginBottom: 12 }}
              >
                Filter · Skill
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SKILL_OPTIONS.map((s) => {
                  const on = selectedSkills.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s)}
                      className="font-mono"
                      style={{
                        padding: "5px 11px",
                        background: on ? "#1A1714" : "transparent",
                        color: on ? "#F1EBDD" : "#1A1714",
                        border: "1px solid #1A1714",
                        fontSize: 10.5,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Min score */}
            <div>
              <div
                className="font-mono"
                style={{ fontSize: 10.5, letterSpacing: "0.18em", color: "#8C8273", textTransform: "uppercase", marginBottom: 12 }}
              >
                Filter · Minimum Score
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <input
                  type="range"
                  min={500}
                  max={950}
                  step={10}
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#2D5F3F" }}
                />
                <span className="font-display serif-italic" style={{ fontSize: 22, color: "#1A1714", minWidth: 40, textAlign: "right" }}>
                  {minScore}
                </span>
              </div>
            </div>

            {/* Availability */}
            <div>
              <div
                className="font-mono"
                style={{ fontSize: 10.5, letterSpacing: "0.18em", color: "#8C8273", textTransform: "uppercase", marginBottom: 12 }}
              >
                Filter · Availability
              </div>
              <button
                onClick={() => setAvailOnly(!availOnly)}
                className="font-mono"
                style={{
                  padding: "8px 14px",
                  background: availOnly ? "#2D5F3F" : "transparent",
                  color: availOnly ? "#F1EBDD" : "#1A1714",
                  border: `1px solid ${availOnly ? "#2D5F3F" : "#1A1714"}`,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {availOnly ? "✓ open only" : "Open only"}
              </button>
            </div>
          </section>

          {/* Results header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 20,
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <h2 className="serif-display heading-md">
              {filtered.length} {filtered.length === 1 ? "record" : "records"}
            </h2>
            <span className="font-mono" style={{ fontSize: 11, color: "#8C8273", letterSpacing: "0.14em" }}>
              SORTED BY EVIDENCE WEIGHT · DESCENDING
            </span>
          </div>

          {/* Records ledger */}
          <div style={{ borderTop: "1px solid #1A1714", borderBottom: "1px solid #1A1714" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "#8C8273",
                  }}
                >
                  No records match the present filters.
                </p>
              </div>
            ) : (
              filtered.map((t, i) => <RecordEntry key={t.id} talent={t} index={i} isLast={i === filtered.length - 1} />)
            )}
          </div>

          {/* Footer */}
          <div
            className="stack-md"
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "auto minmax(0, 1fr) auto",
              gap: 24,
              padding: "20px 0",
              borderTop: "1px solid #1A1714",
              alignItems: "center",
            }}
          >
            <span className="font-mono" style={{ fontSize: 11, color: "#8C8273", letterSpacing: "0.14em" }}>
              QUERY · GET /api/talent
            </span>
            <span style={{ height: 1, background: "rgba(26,23,20,0.18)" }} />
            <Link
              href="/onboard"
              className="font-mono"
              style={{
                fontSize: 11,
                color: "#2D5F3F",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid #2D5F3F",
                paddingBottom: 2,
              }}
            >
              Issue your own passport →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─── pieces ──────────────────────────────────────────────────── */

function RecordEntry({ talent, index, isLast }: { talent: Talent; index: number; isLast: boolean }) {
  return (
    <Link
      href={`/passport/${talent.slug}`}
      className="ledger-row"
      style={{
        display: "grid",
        gridTemplateColumns: "100px minmax(0, 1.6fr) minmax(0, 1fr) 140px",
        gap: 32,
        padding: "30px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(26,23,20,0.18)",
        textDecoration: "none",
        color: "#1A1714",
        transition: "background 0.18s ease",
        position: "relative",
        animation: "fade-up 0.4s cubic-bezier(.2,.7,.3,1) both",
        animationDelay: `${Math.min(index * 30, 200)}ms`,
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(45,95,63,0.04)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
    >
      {/* numeral */}
      <div className="numeral serif-italic ledger-num" style={{ paddingLeft: 4 }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* identity + skills */}
      <div className="ledger-main">
        <div className="font-mono" style={{ fontSize: 10.5, color: "#8C8273", letterSpacing: "0.14em", marginBottom: 6 }}>
          BEARER
        </div>
        <div
          className="serif-display"
          style={{
            fontSize: 30,
            fontWeight: 380,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginBottom: 6,
          }}
        >
          {talent.name}
        </div>
        <div
          className="font-mono"
          style={{ fontSize: 11.5, color: "#4A423A", letterSpacing: "0.06em", marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 14 }}
        >
          <span>{talent.role}</span>
          <span>· {talent.location}</span>
          <span>· {talent.evidence_count} receipts</span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 15.5,
            color: "#4A423A",
            lineHeight: 1.45,
            fontWeight: 400,
            fontVariationSettings: '"opsz" 30',
          }}
        >
          &ldquo;{talent.bio}&rdquo;
        </p>
      </div>

      {/* skills */}
      <div className="ledger-meta" style={{ display: "flex", flexWrap: "wrap", gap: 6, alignContent: "flex-start", paddingTop: 22 }}>
        {talent.skills.map((s) => (
          <span
            key={s}
            className="font-mono"
            style={{
              padding: "4px 10px",
              background: "rgba(45,95,63,0.08)",
              border: "1px solid rgba(45,95,63,0.22)",
              color: "#2D5F3F",
              fontSize: 10.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* score + status */}
      <div className="ledger-action" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
        <div
          className="serif-display"
          style={{
            fontSize: 50,
            fontWeight: 350,
            letterSpacing: "-0.025em",
            color: talent.tier === "Elite" ? "#2D5F3F" : "#1A1714",
            lineHeight: 0.9,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {talent.score}
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: 9.5,
            letterSpacing: "0.16em",
            color: talent.available ? "#2D5F3F" : "#8C8273",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: talent.available ? "#2D5F3F" : "#8C8273",
            }}
          />
          {talent.available ? "open to work" : "not open"}
        </span>
        <span className="font-mono" style={{ fontSize: 10, color: "#1A1714", letterSpacing: "0.12em", textTransform: "uppercase", borderBottom: "1px solid #1A1714", paddingBottom: 2 }}>
          Open record →
        </span>
      </div>
    </Link>
  );
}
