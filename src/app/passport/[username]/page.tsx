"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── MOCK DATA ──────────────────────────────────────────────── */
const PROFILE = {
  name:         "Amara Osei",
  initials:     "AO",
  title:        "Full-Stack Engineer",
  location:     "Accra, Ghana 🇬🇭",
  bio:          "Building scalable products for emerging markets. 8+ years shipping production code across fintech, edtech, and developer tooling. Open-source contributor. Advocate for African tech.",
  availability: "open",
  score:        847,
  scoreBreakdown: {
    Depth:         { value: 210, max: 250, desc: "Skill depth & mastery" },
    Velocity:      { value: 185, max: 250, desc: "Learning & growth speed" },
    Reliability:   { value: 238, max: 250, desc: "Evidence consistency" },
    Collaboration: { value: 214, max: 250, desc: "Peer & cross-team signals" },
  },
  verifiedAt:       "2026-04-26T09:41:22Z",
  verificationHash: "0x4f7a3c…e91b2d",
  domains: [
    { name: "Frontend", pct: 35, color: "#0F2D52" },
    { name: "Backend",  pct: 28, color: "#2A6FBF" },
    { name: "Systems",  pct: 18, color: "#16a34a" },
    { name: "Design",   pct: 11, color: "#8B5CF6" },
    { name: "Data",     pct:  8, color: "#E8813A" },
  ],
};

const SKILLS = [
  {
    id: 1, name: "React", domain: "Frontend", domainColor: "#0F2D52",
    signals: 14, confidence: "Expert" as const, onet: "15-1252.00",
    evidence: [
      { type: "github",       desc: "187 commits across 8 repos using React 18", date: "Mar 2025", icon: "⌥", color: "#0F2D52" },
      { type: "stackoverflow",desc: "Answered 23 React questions, 94% accepted",  date: "Jan 2025", icon: "◈", color: "#2A6FBF" },
      { type: "peer",         desc: "Attestation: Kwame Asante (Senior Eng, Andela)", date: "Feb 2025", icon: "✓", color: "#16a34a" },
    ],
  },
  {
    id: 2, name: "TypeScript", domain: "Frontend", domainColor: "#0F2D52",
    signals: 11, confidence: "Expert" as const, onet: "15-1252.00",
    evidence: [
      { type: "github",    desc: "Primary language in 5 of 8 public repos", date: "Apr 2025", icon: "⌥", color: "#0F2D52" },
      { type: "challenge", desc: "96th percentile in TypeScript micro-challenge", date: "Mar 2025", icon: "⚡", color: "#E8813A" },
    ],
  },
  {
    id: 3, name: "Node.js", domain: "Backend", domainColor: "#2A6FBF",
    signals: 9, confidence: "Proficient" as const, onet: "15-1299.08",
    evidence: [
      { type: "github",  desc: "3 production APIs built with Express + Node.js", date: "Feb 2025", icon: "⌥", color: "#0F2D52" },
      { type: "behance", desc: "Full-stack project linking frontend to Node backend", date: "Jan 2025", icon: "✦", color: "#8B5CF6" },
    ],
  },
  {
    id: 4, name: "System Design", domain: "Systems", domainColor: "#16a34a",
    signals: 7, confidence: "Proficient" as const, onet: "15-1199.11",
    evidence: [
      { type: "peer",      desc: "Led architecture review for 3-service microservices project", date: "Mar 2025", icon: "✓", color: "#16a34a" },
      { type: "challenge", desc: "Designed scalable URL shortener in 30 minutes", date: "Feb 2025", icon: "⚡", color: "#E8813A" },
    ],
  },
  {
    id: 5, name: "PostgreSQL", domain: "Backend", domainColor: "#2A6FBF",
    signals: 6, confidence: "Proficient" as const, onet: "15-1299.08",
    evidence: [
      { type: "github", desc: "Schema designs across 4 production projects", date: "Jan 2025", icon: "⌥", color: "#0F2D52" },
    ],
  },
  {
    id: 6, name: "GraphQL", domain: "Backend", domainColor: "#2A6FBF",
    signals: 4, confidence: "Emerging" as const, onet: "15-1299.08",
    evidence: [
      { type: "github", desc: "GraphQL API for one personal project", date: "Dec 2024", icon: "⌥", color: "#0F2D52" },
    ],
  },
];

const EVIDENCE_TIMELINE = [
  { date: "Apr 2026", source: "GitHub",            icon: "⌥", desc: "Merged 12 PRs to open-source Next.js starter kit", method: "Automated parse",         color: "#0F2D52" },
  { date: "Mar 2026", source: "ProveWork Challenge",icon: "⚡", desc: "TypeScript advanced challenge — 96th percentile",   method: "AI-scored",               color: "#E8813A" },
  { date: "Mar 2026", source: "Peer Attestation",   icon: "✓", desc: "Attestation from Kwame Asante (Andela Senior Eng)",  method: "Identity-verified peer",  color: "#16a34a" },
  { date: "Feb 2026", source: "Stack Overflow",     icon: "◈", desc: "23 accepted React answers · score 1,240",          method: "Public record",            color: "#2A6FBF" },
  { date: "Feb 2026", source: "GitHub",             icon: "⌥", desc: "Published provework-hooks — 340 stars",            method: "Automated parse",         color: "#0F2D52" },
  { date: "Jan 2026", source: "Behance",            icon: "✦", desc: "Full-stack portfolio project — 2.1k views",        method: "Automated parse",         color: "#8B5CF6" },
  { date: "Dec 2025", source: "LinkedIn",           icon: "◈", desc: "6 endorsements for React + TypeScript",            method: "Platform API",            color: "#2A6FBF" },
];

const CHALLENGES = [
  { id: 1, domain: "Frontend",   domainColor: "#0F2D52", title: "React Performance Audit",        difficulty: "Advanced",     score: 94, percentile: 96, date: "Mar 2026", duration: "28 min" },
  { id: 2, domain: "TypeScript", domainColor: "#0F2D52", title: "Type-Safe API Design",           difficulty: "Advanced",     score: 91, percentile: 89, date: "Mar 2026", duration: "35 min" },
  { id: 3, domain: "Systems",    domainColor: "#16a34a", title: "Scalable URL Shortener",         difficulty: "Intermediate", score: 87, percentile: 82, date: "Feb 2026", duration: "30 min" },
  { id: 4, domain: "Backend",    domainColor: "#2A6FBF", title: "Database Query Optimisation",    difficulty: "Intermediate", score: 83, percentile: 74, date: "Jan 2026", duration: "25 min" },
];

const IGNITE_ACTIVITY = [
  { type: "solved", title: "Real-time skill verification API", company: "TalentOS",        reward: "$800",         status: "Accepted ✓",      date: "Apr 2026", color: "#16a34a",  icon: "T" },
  { type: "active", title: "Mobile Skill Passport viewer",    company: "PassportPro",      reward: "Equity",       status: "In Review",       date: "Apr 2026", color: "#E8813A",  icon: "P" },
  { type: "solved", title: "UX audit of employer dashboard",  company: "HireAfrica",       reward: "$200 + Cert",  status: "Accepted ✓",      date: "Mar 2026", color: "#16a34a",  icon: "H" },
];

/* ─── CONSTANTS ──────────────────────────────────────────────── */
const R       = 72;
const CIRC    = 2 * Math.PI * R;
const ARC_FRAC = 0.75;
const MAX_ARC = CIRC * ARC_FRAC;

const CONFIDENCE_CONFIG = {
  Exceptional: { bg: "rgba(15,45,82,0.10)",   text: "#0F2D52",  border: "rgba(15,45,82,0.20)",   bars: 4 },
  Expert:      { bg: "rgba(42,111,191,0.10)", text: "#2A6FBF",  border: "rgba(42,111,191,0.22)", bars: 3 },
  Proficient:  { bg: "rgba(22,163,74,0.09)",  text: "#16a34a",  border: "rgba(22,163,74,0.22)",  bars: 2 },
  Emerging:    { bg: "rgba(232,129,58,0.09)", text: "#E8813A",  border: "rgba(232,129,58,0.22)", bars: 1 },
} as const;

type ConfidenceKey = keyof typeof CONFIDENCE_CONFIG;
type Tab = "skills" | "evidence" | "challenges" | "ignite";

/* ─── SUB-COMPONENTS ─────────────────────────────────────────── */

function DomainRingSVG({ domains }: { domains: typeof PROFILE.domains }) {
  const OR = 60, IR = 44, CX = 70, CY = 70;
  let cum = 0;
  const segs = domains.map(d => {
    const s = (cum / 100) * 2 * Math.PI - Math.PI / 2;
    cum += d.pct;
    const e = (cum / 100) * 2 * Math.PI - Math.PI / 2;
    const g = 0.04;
    const sa = s + g, ea = e - g;
    const x1o = CX + OR * Math.cos(sa), y1o = CY + OR * Math.sin(sa);
    const x2o = CX + OR * Math.cos(ea), y2o = CY + OR * Math.sin(ea);
    const x1i = CX + IR * Math.cos(ea), y1i = CY + IR * Math.sin(ea);
    const x2i = CX + IR * Math.cos(sa), y2i = CY + IR * Math.sin(sa);
    const lg = d.pct > 50 ? 1 : 0;
    return { ...d, path: `M${x1o},${y1o} A${OR},${OR},0,${lg},1,${x2o},${y2o} L${x1i},${y1i} A${IR},${IR},0,${lg},0,${x2i},${y2i} Z` };
  });
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      {segs.map(seg => (
        <path key={seg.name} d={seg.path} fill={seg.color} opacity={0.88} />
      ))}
    </svg>
  );
}

function ScoreArc({ score }: { score: number }) {
  const filled = (score / 1000) * MAX_ARC;
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      <defs>
        <linearGradient id="scoreArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#3a7fd5" />
          <stop offset="100%" stopColor="#0F2D52" />
        </linearGradient>
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <circle cx={100} cy={100} r={R}
        fill="none" stroke="rgba(15,45,82,0.07)" strokeWidth={11}
        strokeDasharray={`${MAX_ARC} ${CIRC - MAX_ARC}`} strokeLinecap="round"
        transform="rotate(-202 100 100)"
      />
      {/* Fill */}
      <circle cx={100} cy={100} r={R}
        fill="none" stroke="url(#scoreArcGrad)" strokeWidth={11}
        strokeDasharray={`${filled} ${CIRC - filled}`} strokeLinecap="round"
        transform="rotate(-202 100 100)"
        filter="url(#arcGlow)"
      />
    </svg>
  );
}

function SkillCard({ skill }: { skill: typeof SKILLS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const conf = CONFIDENCE_CONFIG[skill.confidence as ConfidenceKey] ?? CONFIDENCE_CONFIG.Emerging;

  return (
    <div style={{
      background: "rgba(255,255,255,0.70)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.88)", borderRadius: 14,
      boxShadow: "0 2px 12px rgba(15,45,82,0.06)", overflow: "hidden",
      transition: "box-shadow 0.22s",
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        {/* Domain indicator */}
        <div style={{ width: 4, height: 36, borderRadius: 999, background: skill.domainColor, flexShrink: 0 }} />

        {/* Name + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
            <span style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 15, color: "#0D1B2A", letterSpacing: "-0.2px" }}>
              {skill.name}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 600, color: skill.domainColor,
              background: `${skill.domainColor}12`, padding: "1px 8px", borderRadius: 999,
            }}>
              {skill.domain}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#6B7280" }}>
            {skill.signals} verified signals · O*NET {skill.onet}
          </div>
        </div>

        {/* Confidence + depth */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
            background: conf.bg, color: conf.text, border: `1px solid ${conf.border}`,
          }}>
            {skill.confidence}
          </span>
          <div style={{ display: "flex", gap: 3 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                width: 16, height: 3.5, borderRadius: 999,
                background: i <= conf.bars ? skill.domainColor : "rgba(15,45,82,0.09)",
                transition: "background 0.2s",
              }} />
            ))}
          </div>
        </div>

        <span style={{
          fontSize: 12, color: "#6B7280",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.22s", flexShrink: 0,
        }}>▾</span>
      </button>

      {expanded && (
        <div style={{
          borderTop: "1px solid rgba(15,45,82,0.06)",
          background: "rgba(15,45,82,0.015)", padding: "14px 18px 16px",
          animation: "fade-up 0.18s ease",
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
            Evidence Sources
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {skill.evidence.map((ev, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: `${ev.color}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, color: ev.color, marginTop: 1,
                }}>
                  {ev.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12.5, color: "#0D1B2A", lineHeight: 1.45 }}>{ev.desc}</span>
                  <span style={{ fontSize: 11, color: "#6B7280", marginLeft: 8 }}>{ev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function PassportPage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab]       = useState<Tab>("skills");
  const [showTooltip, setShowTooltip]   = useState(false);
  const [showShare, setShowShare]       = useState(false);
  const [copied, setCopied]             = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(`https://provework.app/passport/${params.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: "skills",     label: "Skills",      count: SKILLS.length },
    { id: "evidence",   label: "Evidence",    count: EVIDENCE_TIMELINE.length },
    { id: "challenges", label: "Challenges",  count: CHALLENGES.length },
    { id: "ignite",     label: "Ignite",      count: IGNITE_ACTIVITY.length },
  ];

  return (
    <>
      <Navbar />

      {/* ── HERO BAND ── */}
      <div style={{
        background: "linear-gradient(140deg, #0a1f3a 0%, #0F2D52 50%, #1a4a80 80%, #2A6FBF 100%)",
        paddingTop: 110, paddingBottom: 60, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, right: "8%", width: 350, height: 350, borderRadius: "50%", background: "rgba(42,111,191,0.18)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div className="section-max" style={{ position: "relative" }}>
          <Link href="/employers/discover" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.50)", textDecoration: "none", marginBottom: 24, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.80)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
          >
            ← Talent Discovery
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: "50%", flexShrink: 0,
              background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 28, color: "#FFFFFF",
              boxShadow: "0 0 0 4px rgba(255,255,255,0.06)",
            }}>
              {PROFILE.initials}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                <h1 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: "clamp(22px,3vw,32px)", color: "#FFFFFF", letterSpacing: "-0.8px" }}>
                  {PROFILE.name}
                </h1>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 11, fontWeight: 700, color: "#16a34a",
                  background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.30)",
                  padding: "3px 10px", borderRadius: 999,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 2s ease-in-out infinite" }} />
                  Open to work
                </span>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)" }}>{PROFILE.title} · {PROFILE.location}</p>
            </div>

            {/* Score badge in hero */}
            <div style={{ marginLeft: "auto", textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 900, fontSize: 42, color: "#FFFFFF", letterSpacing: "-2px", lineHeight: 1, textShadow: "0 0 40px rgba(255,255,255,0.20)" }}>
                {PROFILE.score}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.50)", marginTop: 2 }}>/ 1000 SkillPrint Score</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>Elite Tier · Top 8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <main style={{ paddingBottom: 80, position: "relative" }}>
        <div className="section-max" style={{ paddingTop: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 28, alignItems: "start" }}>

            {/* ══════════ LEFT COLUMN ══════════ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 100 }}>

              {/* Identity + domain ring */}
              <div style={{
                background: "rgba(255,255,255,0.78)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.90)", borderRadius: 20,
                boxShadow: "0 4px 28px rgba(15,45,82,0.09)", padding: "28px 28px 22px",
                textAlign: "center",
              }}>
                {/* Domain ring */}
                <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <DomainRingSVG domains={PROFILE.domains} />
                  <div style={{
                    position: "absolute", width: 78, height: 78, borderRadius: "50%",
                    background: "linear-gradient(135deg, #0F2D52, #2A6FBF)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 24, color: "#FAF8F4",
                    boxShadow: "0 4px 20px rgba(15,45,82,0.30)",
                  }}>
                    {PROFILE.initials}
                  </div>
                </div>

                {/* Domain legend */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 16 }}>
                  {PROFILE.domains.map(d => (
                    <span key={d.name} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: "#6B7280" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                      {d.name} {d.pct}%
                    </span>
                  ))}
                </div>

                {/* Bio text */}
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, textAlign: "left" }}>{PROFILE.bio}</p>
              </div>

              {/* Score card */}
              <div style={{
                background: "rgba(255,255,255,0.78)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.90)", borderRadius: 20,
                boxShadow: "0 4px 28px rgba(15,45,82,0.09)", padding: "22px 26px",
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#6B7280", letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: 16 }}>
                  SkillPrint Score
                </div>

                {/* Arc */}
                <div
                  style={{ position: "relative", display: "flex", justifyContent: "center", cursor: "help" }}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <ScoreArc score={PROFILE.score} />
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-sora-var)", fontWeight: 900,
                      fontSize: 44, color: "#0F2D52", lineHeight: 1, letterSpacing: "-2px",
                    }}>
                      {PROFILE.score}
                    </div>
                    <div style={{ fontSize: 10, color: "#6B7280", marginTop: 3 }}>/ 1000</div>
                  </div>

                  {/* Score tooltip */}
                  {showTooltip && (
                    <div style={{
                      position: "absolute", bottom: "calc(100% + 14px)", left: "50%",
                      transform: "translateX(-50%)",
                      background: "#0F2D52", borderRadius: 14, padding: "16px 20px",
                      minWidth: 250, boxShadow: "0 16px 48px rgba(15,45,82,0.35)",
                      zIndex: 50, pointerEvents: "none",
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>
                        Score Breakdown
                      </div>
                      {Object.entries(PROFILE.scoreBreakdown).map(([key, val]) => (
                        <div key={key} style={{ marginBottom: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#FAF8F4" }}>{key}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#FAF8F4" }}>
                              {val.value}<span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 400 }}>/{val.max}</span>
                            </span>
                          </div>
                          <div style={{ height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 999 }}>
                            <div style={{ height: "100%", width: `${(val.value / val.max) * 100}%`, background: "#3a7fd5", borderRadius: 999 }} />
                          </div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", marginTop: 3 }}>{val.desc}</div>
                        </div>
                      ))}
                      {/* Arrow */}
                      <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, background: "#0F2D52", clipPath: "polygon(50% 100%, 0 0, 100% 0)", borderRadius: 2 }} />
                    </div>
                  )}
                </div>

                {/* Tier badge */}
                <div style={{ textAlign: "center", marginBottom: 18 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: "#0F2D52",
                    background: "rgba(15,45,82,0.07)", padding: "4px 16px", borderRadius: 999,
                  }}>
                    Elite Tier · Top 8%
                  </span>
                </div>

                {/* Breakdown mini bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {Object.entries(PROFILE.scoreBreakdown).map(([key, val]) => (
                    <div key={key}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#6B7280" }}>{key}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0F2D52" }}>
                          {val.value}<span style={{ fontWeight: 400, color: "#6B7280" }}>/{val.max}</span>
                        </span>
                      </div>
                      <div style={{ height: 4, background: "rgba(15,45,82,0.07)", borderRadius: 999 }}>
                        <div style={{
                          height: "100%",
                          width: `${(val.value / val.max) * 100}%`,
                          background: "linear-gradient(90deg, #2A6FBF, #0F2D52)",
                          borderRadius: 999,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified badge */}
              <div style={{
                background: "rgba(15,45,82,0.03)", border: "1px solid rgba(15,45,82,0.09)",
                borderRadius: 14, padding: "14px 18px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>🔐</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0F2D52" }}>Verified via ProveWork</span>
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.65 }}>
                  <span style={{ display: "block" }}>
                    {new Date(PROFILE.verifiedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: "#0F2D52", marginTop: 3, display: "block", wordBreak: "break-all" }}>
                    {PROFILE.verificationHash}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => setShowShare(!showShare)}
                  style={{
                    width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "#0F2D52", color: "#FAF8F4",
                    fontSize: 13, fontWeight: 700, borderRadius: 12, padding: "12px 0",
                    border: "none", cursor: "pointer",
                    boxShadow: "0 3px 16px rgba(15,45,82,0.26)",
                    transition: "background 0.18s, transform 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0a1f3a"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0F2D52"; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
                >
                  ↗ Share Passport
                </button>
                <button style={{
                  width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: "transparent", color: "#0F2D52",
                  fontSize: 13, fontWeight: 700, borderRadius: 12, padding: "11px 0",
                  border: "1.5px solid rgba(15,45,82,0.18)", cursor: "pointer",
                  transition: "background 0.18s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,45,82,0.04)"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "transparent"}
                >
                  ⬇ Download PDF
                </button>
              </div>

              {/* Share panel */}
              {showShare && (
                <div style={{
                  background: "rgba(255,255,255,0.90)", backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.90)", borderRadius: 16, padding: 18,
                  boxShadow: "0 6px 28px rgba(15,45,82,0.12)", animation: "scale-in 0.18s ease",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0D1B2A", marginBottom: 12 }}>Public Passport Link</div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "rgba(15,45,82,0.04)", border: "1px solid rgba(15,45,82,0.10)",
                    borderRadius: 10, padding: "8px 12px", marginBottom: 14,
                  }}>
                    <span style={{ fontSize: 11, color: "#6B7280", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      provework.app/passport/{params.username}
                    </span>
                    <button onClick={copyLink} style={{
                      fontSize: 11, fontWeight: 700, flexShrink: 0,
                      color: copied ? "#16a34a" : "#2A6FBF",
                      background: "none", border: "none", cursor: "pointer",
                      transition: "color 0.2s",
                    }}>
                      {copied ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                  {/* QR placeholder */}
                  <div style={{
                    width: "100%", aspectRatio: "1", background: "rgba(15,45,82,0.04)",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px dashed rgba(15,45,82,0.12)",
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 36, marginBottom: 6, opacity: 0.5 }}>▦</div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>QR Code</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ══════════ RIGHT COLUMN ══════════ */}
            <div>
              {/* Tabs */}
              <div style={{
                display: "flex", gap: 4, background: "rgba(15,45,82,0.05)",
                border: "1px solid rgba(15,45,82,0.07)", borderRadius: 14, padding: 4, marginBottom: 22,
              }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                    flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer",
                    fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 700,
                    background: activeTab === t.id ? "#FFFFFF" : "transparent",
                    color: activeTab === t.id ? "#0F2D52" : "#6B7280",
                    boxShadow: activeTab === t.id ? "0 1px 8px rgba(15,45,82,0.10)" : "none",
                    transition: "all 0.18s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  }}>
                    {t.label}
                    {t.count !== undefined && (
                      <span style={{
                        fontSize: 10, fontWeight: 800,
                        background: activeTab === t.id ? "rgba(15,45,82,0.08)" : "rgba(15,45,82,0.06)",
                        color: activeTab === t.id ? "#0F2D52" : "#6B7280",
                        padding: "1px 6px", borderRadius: 999,
                      }}>
                        {t.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* ── SKILLS TAB ── */}
              {activeTab === "skills" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>
                      <strong style={{ color: "#0D1B2A" }}>{SKILLS.length} skills</strong> verified
                      <span style={{ margin: "0 6px", opacity: 0.4 }}>·</span>
                      <strong style={{ color: "#0D1B2A" }}>{SKILLS.filter(s => s.confidence === "Expert").length} Expert+</strong>
                    </span>
                    <span style={{ fontSize: 11, color: "#6B7280", background: "rgba(15,45,82,0.05)", padding: "3px 10px", borderRadius: 999 }}>
                      Click to expand evidence
                    </span>
                  </div>
                  {SKILLS.map(skill => <SkillCard key={skill.id} skill={skill} />)}
                </div>
              )}

              {/* ── EVIDENCE TAB ── */}
              {activeTab === "evidence" && (
                <div>
                  {/* Filter pills */}
                  <div style={{ display: "flex", gap: 7, marginBottom: 24, flexWrap: "wrap" }}>
                    {["All", "GitHub", "Peer", "Challenge", "Platform"].map((f, fi) => (
                      <button key={f} style={{
                        fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, cursor: "pointer",
                        background: fi === 0 ? "#0F2D52" : "rgba(15,45,82,0.05)",
                        color: fi === 0 ? "#FAF8F4" : "#6B7280",
                        border: fi === 0 ? "none" : "1px solid rgba(15,45,82,0.10)",
                        transition: "all 0.18s",
                      }}>
                        {f}
                      </button>
                    ))}
                  </div>

                  <div style={{ position: "relative" }}>
                    {/* Timeline spine */}
                    <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, rgba(15,45,82,0.12), rgba(15,45,82,0.04))" }} />

                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {EVIDENCE_TIMELINE.map((ev, i) => (
                        <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 18 }}>
                          {/* Node */}
                          <div style={{
                            width: 36, height: 36, borderRadius: "50%", flexShrink: 0, zIndex: 1,
                            background: "rgba(255,255,255,0.90)", backdropFilter: "blur(8px)",
                            border: `1.5px solid ${ev.color}30`,
                            boxShadow: `0 2px 10px rgba(15,45,82,0.08)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 14, color: ev.color,
                          }}>
                            {ev.icon}
                          </div>
                          {/* Card */}
                          <div style={{
                            flex: 1, background: "rgba(255,255,255,0.72)", backdropFilter: "blur(14px)",
                            border: "1px solid rgba(255,255,255,0.88)", borderRadius: 12, padding: "12px 16px",
                            boxShadow: "0 1px 8px rgba(15,45,82,0.05)",
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: ev.color }}>{ev.source}</span>
                              <span style={{ fontSize: 10, color: "#6B7280" }}>·</span>
                              <span style={{ fontSize: 11, color: "#6B7280" }}>{ev.date}</span>
                            </div>
                            <p style={{ fontSize: 13, color: "#0D1B2A", lineHeight: 1.5, marginBottom: 6 }}>{ev.desc}</p>
                            <span style={{
                              fontSize: 10, fontWeight: 600, color: "#6B7280",
                              background: "rgba(15,45,82,0.05)", padding: "2px 8px", borderRadius: 999,
                            }}>
                              {ev.method}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── CHALLENGES TAB ── */}
              {activeTab === "challenges" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {/* Summary */}
                  <div style={{
                    background: "rgba(255,255,255,0.72)", backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.88)", borderRadius: 14, padding: "16px 20px",
                    display: "flex", gap: 24, flexWrap: "wrap",
                  }}>
                    {[
                      { label: "Challenges Completed", value: CHALLENGES.length },
                      { label: "Avg Score", value: `${Math.round(CHALLENGES.reduce((a,c) => a + c.score, 0) / CHALLENGES.length)}/100` },
                      { label: "Best Percentile", value: `${Math.max(...CHALLENGES.map(c => c.percentile))}th` },
                    ].map(s => (
                      <div key={s.label}>
                        <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 22, color: "#0F2D52", letterSpacing: "-0.5px" }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {CHALLENGES.map(ch => (
                    <div key={ch.id} style={{
                      background: "rgba(255,255,255,0.72)", backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.88)", borderRadius: 14, padding: "18px 20px",
                      boxShadow: "0 2px 12px rgba(15,45,82,0.05)",
                      display: "flex", alignItems: "center", gap: 18,
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(15,45,82,0.10)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(15,45,82,0.05)"; }}
                    >
                      {/* Conic score ring */}
                      <div style={{
                        width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                        background: `conic-gradient(${ch.domainColor} ${ch.score}%, rgba(15,45,82,0.07) 0%)`,
                        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%", background: "#FAF8F4",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 14, color: ch.domainColor,
                        }}>
                          {ch.score}
                        </div>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 15, color: "#0D1B2A", marginBottom: 5, letterSpacing: "-0.2px" }}>
                          {ch.title}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 10, fontWeight: 700, background: `${ch.domainColor}12`, color: ch.domainColor, padding: "2px 8px", borderRadius: 999 }}>{ch.domain}</span>
                          <span style={{ fontSize: 10, fontWeight: 600, background: "rgba(15,45,82,0.05)", color: "#6B7280", padding: "2px 8px", borderRadius: 999 }}>{ch.difficulty}</span>
                          <span style={{ fontSize: 11, color: "#6B7280" }}>{ch.duration}</span>
                          <span style={{ fontSize: 11, color: "#6B7280" }}>· {ch.date}</span>
                        </div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 18, color: "#0F2D52" }}>
                          {ch.percentile}<span style={{ fontSize: 11, fontWeight: 600 }}>th</span>
                        </div>
                        <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>Percentile</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── IGNITE TAB ── */}
              {activeTab === "ignite" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 6 }}>
                    Problems solved for real companies. Each submission is permanently attached to this passport.
                  </p>
                  {IGNITE_ACTIVITY.map((act, i) => (
                    <div key={i} style={{
                      background: "rgba(255,255,255,0.72)", backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.88)", borderRadius: 14, padding: "18px 20px",
                      boxShadow: "0 2px 12px rgba(15,45,82,0.05)",
                      display: "flex", alignItems: "center", gap: 16,
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(15,45,82,0.10)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(15,45,82,0.05)"; }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: `${act.color}14`, border: `1px solid ${act.color}22`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 16, color: act.color,
                      }}>
                        {act.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 14, color: "#0D1B2A", marginBottom: 4, letterSpacing: "-0.2px" }}>
                          {act.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B7280" }}>{act.company} · {act.date}</div>
                      </div>
                      <div style={{ flexShrink: 0, textAlign: "right" }}>
                        <div style={{
                          fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999,
                          background: act.color === "#16a34a" ? "rgba(34,197,94,0.09)" : "rgba(232,129,58,0.09)",
                          color: act.color,
                          border: `1px solid ${act.color}25`,
                          marginBottom: 4,
                        }}>
                          {act.status}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2D52" }}>{act.reward}</div>
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
