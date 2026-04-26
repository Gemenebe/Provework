"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── DATA ───────────────────────────────────────────────────── */
const PROBLEMS = [
  {
    id: 1, title: "Build a real-time skill verification API",
    company: "TalentOS", logo: "T", logoColor: "#0F2D52", logoGrad: "135deg, #0F2D52, #2A6FBF",
    desc: "REST API that connects to GitHub, extracts skill signals, and returns a confidence score. Must handle rate limits gracefully and return results in < 2s.",
    skills: ["Node.js", "REST APIs", "GitHub API"],
    reward: "$800", rewardType: "cash",
    deadline: 5, applicants: 12, maxApplicants: 20, open: true, hot: true,
    category: "Backend",
  },
  {
    id: 2, title: "Design a credential sharing system for Web3",
    company: "ChainCred", logo: "C", logoColor: "#8B5CF6", logoGrad: "135deg, #7c3aed, #a78bfa",
    desc: "Prototype a system where skill credentials are issued as verifiable credentials on-chain and selectively disclosed using ZK proofs.",
    skills: ["Solidity", "System Design", "ZK Proofs"],
    reward: "$1,200", rewardType: "cash",
    deadline: 10, applicants: 7, maxApplicants: 15, open: true, hot: true,
    category: "Blockchain",
  },
  {
    id: 3, title: "UX audit of our employer dashboard",
    company: "HireAfrica", logo: "H", logoColor: "#E8813A", logoGrad: "135deg, #E8813A, #f59e0b",
    desc: "Full UX audit of the talent discovery dashboard. Deliver a prioritised report with recommendations and mockups for the top 3 issues.",
    skills: ["UX Research", "Figma"],
    reward: "$200 + Cert", rewardType: "mixed",
    deadline: 7, applicants: 5, maxApplicants: 10, open: true, hot: false,
    category: "Design",
  },
  {
    id: 4, title: "Optimise ML pipeline for skill extraction",
    company: "NexaAI", logo: "N", logoColor: "#16a34a", logoGrad: "135deg, #16a34a, #15803d",
    desc: "Current skill extraction pipeline takes 45s per user. Bring it under 5s. You will work with our existing Python codebase and OpenAI API integration.",
    skills: ["Python", "Machine Learning", "OpenAI API"],
    reward: "$600", rewardType: "cash",
    deadline: 14, applicants: 9, maxApplicants: 20, open: true, hot: false,
    category: "AI / ML",
  },
  {
    id: 5, title: "Build a mobile Skill Passport viewer",
    company: "PassportPro", logo: "P", logoColor: "#2A6FBF", logoGrad: "135deg, #2A6FBF, #3b82f6",
    desc: "Create a React Native screen that renders a Skill Passport beautifully. Must support offline mode and share-to-LinkedIn functionality.",
    skills: ["React Native", "UI/UX"],
    reward: "Equity + Mentorship", rewardType: "equity",
    deadline: 21, applicants: 3, maxApplicants: 10, open: true, hot: false,
    category: "Mobile",
  },
  {
    id: 6, title: "National Skill Map data pipeline",
    company: "LabourTech Africa", logo: "L", logoColor: "#6B7280", logoGrad: "135deg, #4B5563, #6B7280",
    desc: "Build a data pipeline that aggregates anonymised skill data from 10+ African countries and produces weekly summary statistics for the public dashboard.",
    skills: ["Python", "PostgreSQL", "Data Engineering"],
    reward: "$500", rewardType: "cash",
    deadline: 3, applicants: 18, maxApplicants: 18, open: false, hot: false,
    category: "Data",
  },
];

const CATEGORIES = ["All", "Backend", "Blockchain", "Design", "AI / ML", "Mobile", "Data"];

const CATEGORY_CONFIG: Record<string, { bg: string; color: string; border: string }> = {
  Backend:    { bg: "rgba(15,45,82,0.08)",    color: "#0F2D52",  border: "rgba(15,45,82,0.15)" },
  Blockchain: { bg: "rgba(139,92,246,0.08)",  color: "#8B5CF6",  border: "rgba(139,92,246,0.20)" },
  Design:     { bg: "rgba(232,129,58,0.08)",  color: "#E8813A",  border: "rgba(232,129,58,0.20)" },
  "AI / ML":  { bg: "rgba(22,163,74,0.08)",   color: "#16a34a",  border: "rgba(22,163,74,0.20)" },
  Mobile:     { bg: "rgba(42,111,191,0.08)",  color: "#2A6FBF",  border: "rgba(42,111,191,0.20)" },
  Data:       { bg: "rgba(107,114,128,0.08)", color: "#6B7280",  border: "rgba(107,114,128,0.20)" },
};

const REWARD_CONFIG: Record<string, { bg: string; color: string; border: string; icon: string }> = {
  cash:   { bg: "rgba(34,197,94,0.08)",   color: "#16a34a",  border: "rgba(34,197,94,0.22)",   icon: "💵" },
  mixed:  { bg: "rgba(232,129,58,0.08)",  color: "#E8813A",  border: "rgba(232,129,58,0.22)",  icon: "🏆" },
  equity: { bg: "rgba(42,111,191,0.09)",  color: "#2A6FBF",  border: "rgba(42,111,191,0.22)",  icon: "🚀" },
};

/* ─── HOW IT WORKS STEPS ─────────────────────────────────────── */
const HOW_IT_WORKS = [
  { n: "01", title: "Browse Problems",  desc: "Find real challenges posted by companies. Each comes with a clear brief, reward, and deadline." },
  { n: "02", title: "Submit Your Proof", desc: "Solve the problem. Submit your approach — code, design, write-up. Evidence quality matters." },
  { n: "03", title: "Earn Verified Evidence", desc: "Accepted submissions become verified signals in your Skill Passport — permanent and shareable." },
];

export default function IgnitePage() {
  const [view, setView]           = useState<"browse" | "post">("browse");
  const [applying, setApplying]   = useState<number | null>(null);
  const [proof, setProof]         = useState("");
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [filter, setFilter]       = useState("All");

  const visible = PROBLEMS.filter(p => filter === "All" || p.category === filter);

  function submit(id: number) {
    setSubmitted(prev => [...prev, id]);
    setApplying(null);
    setProof("");
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingBottom: 80, position: "relative" }}>

        {/* ── HERO ── */}
        <div style={{
          background: "linear-gradient(140deg, #0a1f3a 0%, #0F2D52 40%, #1a4a80 70%, #2A6FBF 100%)",
          paddingTop: 130, paddingBottom: 72, position: "relative", overflow: "hidden",
        }}>
          {/* Dot grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          {/* Glows */}
          <div style={{ position: "absolute", top: -80, right: "10%", width: 440, height: 440, borderRadius: "50%", background: "rgba(232,129,58,0.11)", filter: "blur(90px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: "-5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(42,111,191,0.14)", filter: "blur(70px)", pointerEvents: "none" }} />

          <div className="section-max" style={{ position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 620 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.50)", letterSpacing: "2px", textTransform: "uppercase" }}>
                <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.30)" }} />
                Problem Marketplace
              </span>
              <h1 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,58px)", color: "#FFFFFF", lineHeight: 1.06, letterSpacing: "-2px" }}>
                SkillPrint{" "}
                <span style={{
                  background: "linear-gradient(90deg, #E8813A, #f59e0b)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Ignite</span>
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, maxWidth: 520 }}>
                Solve real problems from real companies. Every accepted submission becomes verified evidence permanently attached to your Skill Passport.
              </p>
            </div>

            {/* Stats + Toggle */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 28, marginTop: 48 }}>
              <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 32, flexWrap: "wrap" }}>
                {[
                  { v: "$28,400+", l: "Total Bounty Pool" },
                  { v: "5 Open",   l: "Active Problems" },
                  { v: "2,840+",   l: "Total Submissions" },
                  { v: "94%",      l: "Hire Rate After" },
                ].map((s, i) => (
                  <div key={s.l} style={{ paddingRight: 28, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
                    <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 24, color: "#FFFFFF", letterSpacing: "-0.5px" }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Browse / Post Toggle */}
              <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14, padding: 4, gap: 4 }}>
                {(["browse", "post"] as const).map(v => (
                  <button key={v} onClick={() => setView(v)} style={{
                    padding: "10px 24px", borderRadius: 11, border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 700,
                    background: view === v ? "#FFFFFF" : "transparent",
                    color: view === v ? "#0F2D52" : "rgba(255,255,255,0.60)",
                    boxShadow: view === v ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                    transition: "all 0.20s",
                  }}>
                    {v === "browse" ? "Browse Problems" : "Post a Problem"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="section-max" style={{ paddingTop: 44 }}>

          {/* ── BROWSE VIEW ── */}
          {view === "browse" && (
            <>
              {/* Category pills */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 30 }}>
                {CATEGORIES.map(c => {
                  const cfg = CATEGORY_CONFIG[c];
                  const active = filter === c;
                  return (
                    <button key={c} onClick={() => setFilter(c)} style={{
                      fontSize: 12, fontWeight: 700, padding: "7px 18px", borderRadius: 999,
                      border: active && cfg ? `1px solid ${cfg.border}` : "1px solid rgba(15,45,82,0.12)",
                      background: active && cfg ? cfg.bg : active ? "rgba(15,45,82,0.07)" : "transparent",
                      color: active && cfg ? cfg.color : active ? "#0F2D52" : "#6B7280",
                      cursor: "pointer", transition: "all 0.18s",
                    }}
                    onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,45,82,0.05)"; (e.currentTarget as HTMLButtonElement).style.color = "#0D1B2A"; } }}
                    onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#6B7280"; } }}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* Problem cards grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 22 }}>
                {visible.map(p => {
                  const rs = REWARD_CONFIG[p.rewardType];
                  const cat = CATEGORY_CONFIG[p.category] ?? { bg: "rgba(15,45,82,0.06)", color: "#6B7280", border: "rgba(15,45,82,0.12)" };
                  const isDone = submitted.includes(p.id);
                  const fillPct = Math.round((p.applicants / p.maxApplicants) * 100);
                  return (
                    <div key={p.id} style={{
                      background: "rgba(255,255,255,0.78)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                      border: "1px solid rgba(255,255,255,0.90)", borderRadius: 18,
                      boxShadow: "0 2px 16px rgba(15,45,82,0.07)",
                      display: "flex", flexDirection: "column", overflow: "hidden",
                      transition: "transform 0.22s ease, box-shadow 0.22s ease",
                      opacity: !p.open && !isDone ? 0.72 : 1,
                    }}
                    onMouseEnter={e => { if (p.open) { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 14px 48px rgba(15,45,82,0.13)"; } }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(15,45,82,0.07)"; }}
                    >
                      {/* Top accent */}
                      <div style={{ height: 3, background: p.hot ? "linear-gradient(90deg, #E8813A, #f59e0b)" : "linear-gradient(90deg, #0F2D52, #2A6FBF)" }} />

                      <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                        {/* Company header */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                          <div style={{
                            width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                            background: `linear-gradient(${p.logoGrad})`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 18, color: "#FFFFFF",
                            boxShadow: `0 4px 14px ${p.logoColor}30`,
                          }}>
                            {p.logo}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                              <span style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 14.5, color: "#0D1B2A", lineHeight: 1.35 }}>{p.title}</span>
                              {p.hot && (
                                <span style={{ fontSize: 9, fontWeight: 800, color: "#E8813A", background: "rgba(232,129,58,0.10)", border: "1px solid rgba(232,129,58,0.25)", padding: "2px 8px", borderRadius: 999, letterSpacing: "0.5px", flexShrink: 0, whiteSpace: "nowrap" }}>
                                  🔥 HOT
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>{p.company}</div>
                          </div>
                        </div>

                        {/* Description */}
                        <p style={{
                          fontSize: 13, color: "#6B7280", lineHeight: 1.65, marginBottom: 16,
                          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}>
                          {p.desc}
                        </p>

                        {/* Skills */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                          {p.skills.map(s => (
                            <span key={s} style={{
                              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
                              background: "rgba(15,45,82,0.05)", color: "#0F2D52",
                              border: "1px solid rgba(15,45,82,0.10)",
                            }}>
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Meta badges */}
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                          <span style={{
                            fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999,
                            background: rs.bg, color: rs.color, border: `1px solid ${rs.border}`,
                          }}>
                            {rs.icon} {p.reward}
                          </span>
                          <span style={{
                            fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
                            background: p.deadline <= 3 ? "rgba(239,68,68,0.08)" : "rgba(15,45,82,0.05)",
                            color: p.deadline <= 3 ? "#ef4444" : "#6B7280",
                            border: `1px solid ${p.deadline <= 3 ? "rgba(239,68,68,0.20)" : "rgba(15,45,82,0.08)"}`,
                          }}>
                            ⏱ {p.deadline}d left
                          </span>
                          <span style={{
                            fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
                            background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                            marginLeft: "auto",
                          }}>
                            {p.category}
                          </span>
                        </div>

                        {/* Applicant fill bar */}
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                            <span style={{ fontSize: 11, color: "#6B7280" }}>{p.applicants} applied</span>
                            <span style={{ fontSize: 11, color: p.applicants >= p.maxApplicants ? "#ef4444" : "#6B7280" }}>
                              {p.maxApplicants - p.applicants > 0 ? `${p.maxApplicants - p.applicants} spots left` : "Full"}
                            </span>
                          </div>
                          <div style={{ height: 3, background: "rgba(15,45,82,0.06)", borderRadius: 999 }}>
                            <div style={{
                              height: "100%", width: `${Math.min(fillPct, 100)}%`,
                              background: fillPct >= 90 ? "linear-gradient(90deg, #ef4444, #f87171)" : "linear-gradient(90deg, #0F2D52, #2A6FBF)",
                              borderRadius: 999, transition: "width 0.4s ease",
                            }} />
                          </div>
                        </div>

                        {/* CTA */}
                        <div style={{ marginTop: "auto" }}>
                          {isDone ? (
                            <div style={{
                              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.22)",
                              borderRadius: 11, padding: "11px 16px",
                              fontSize: 13, fontWeight: 700, color: "#16a34a", textAlign: "center",
                            }}>
                              ✓ Proof submitted — under review
                            </div>
                          ) : (
                            <button
                              disabled={!p.open}
                              onClick={() => p.open && setApplying(p.id)}
                              style={{
                                width: "100%", padding: "12px 0",
                                background: p.open ? "#0F2D52" : "rgba(15,45,82,0.08)",
                                color: p.open ? "#FAF8F4" : "#6B7280",
                                border: "none", borderRadius: 11,
                                fontSize: 13, fontWeight: 700,
                                cursor: p.open ? "pointer" : "not-allowed",
                                boxShadow: p.open ? "0 3px 14px rgba(15,45,82,0.24)" : "none",
                                transition: "background 0.18s, transform 0.15s, box-shadow 0.18s",
                              }}
                              onMouseEnter={e => { if (p.open) { (e.currentTarget as HTMLButtonElement).style.background = "#0a1f3a"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
                              onMouseLeave={e => { if (p.open) { (e.currentTarget as HTMLButtonElement).style.background = "#0F2D52"; (e.currentTarget as HTMLButtonElement).style.transform = ""; } }}
                            >
                              {p.open ? "Apply with Proof →" : "Closed"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── How It Works ── */}
              <div style={{ marginTop: 72 }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#2A6FBF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>How Ignite Works</p>
                  <h2 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: "clamp(24px,3vw,36px)", color: "#0D1B2A", letterSpacing: "-1px" }}>
                    Prove skills through real work
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
                  {HOW_IT_WORKS.map((step, i) => (
                    <div key={step.n} style={{
                      background: "rgba(255,255,255,0.70)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.85)", borderRadius: 18,
                      boxShadow: "0 2px 16px rgba(15,45,82,0.06)", padding: "28px 28px 26px",
                      position: "relative", overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "var(--font-sora-var)", fontWeight: 900, fontSize: 52, color: "rgba(15,45,82,0.04)", lineHeight: 1, pointerEvents: "none" }}>
                        {step.n}
                      </div>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12, marginBottom: 16,
                        background: `rgba(15,45,82,${0.06 + i * 0.04})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 16, color: "#0F2D52",
                      }}>
                        {["⌕", "⌥", "⬡"][i]}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 16, color: "#0D1B2A", marginBottom: 10 }}>{step.title}</h3>
                      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── POST VIEW ── */}
          {view === "post" && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              {/* Info banner */}
              <div style={{
                background: "linear-gradient(135deg, rgba(15,45,82,0.06) 0%, rgba(42,111,191,0.08) 100%)",
                border: "1px solid rgba(42,111,191,0.15)", borderRadius: 14, padding: "16px 22px",
                marginBottom: 28, display: "flex", alignItems: "center", gap: 14,
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>⚡</span>
                <p style={{ fontSize: 13, color: "#0F2D52", lineHeight: 1.55 }}>
                  <strong>Ignite problems become talent pipelines.</strong> Every applicant&apos;s submission is verified and added to their Skill Passport — creating a permanent record of their work for you.
                </p>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.82)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.90)", borderRadius: 22,
                boxShadow: "0 6px 32px rgba(15,45,82,0.09)", padding: "40px 44px",
              }}>
                <h2 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 24, color: "#0D1B2A", marginBottom: 6, letterSpacing: "-0.5px" }}>
                  Post a Real Problem
                </h2>
                <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 36 }}>
                  Tap into verified talent. Build a pipeline. Pay only for results.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  {[
                    { label: "Problem Title", placeholder: "e.g. Build a skill matching algorithm" },
                    { label: "Company / Organisation", placeholder: "Your company name" },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 8 }}>{f.label}</label>
                      <input placeholder={f.placeholder} style={{
                        width: "100%", boxSizing: "border-box",
                        border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 12,
                        padding: "12px 14px", fontSize: 13, color: "#0D1B2A",
                        background: "rgba(255,255,255,0.80)", outline: "none", transition: "border-color 0.2s",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#0F2D52")}
                      onBlur={e => (e.target.style.borderColor = "rgba(15,45,82,0.10)")}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 8 }}>Detailed Description</label>
                    <textarea rows={5} placeholder="Describe the problem clearly. What needs to be built, designed, or researched? What does success look like?" style={{
                      width: "100%", boxSizing: "border-box",
                      border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 12,
                      padding: "12px 14px", fontSize: 13, color: "#0D1B2A",
                      background: "rgba(255,255,255,0.80)", outline: "none", resize: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#0F2D52")}
                    onBlur={e => (e.target.style.borderColor = "rgba(15,45,82,0.10)")}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 8 }}>Reward</label>
                      <input placeholder="e.g. $500 or Equity" style={{
                        width: "100%", boxSizing: "border-box",
                        border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 12,
                        padding: "12px 14px", fontSize: 13, color: "#0D1B2A",
                        background: "rgba(255,255,255,0.80)", outline: "none", transition: "border-color 0.2s",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#0F2D52")}
                      onBlur={e => (e.target.style.borderColor = "rgba(15,45,82,0.10)")}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 8 }}>Deadline</label>
                      <input type="date" style={{
                        width: "100%", boxSizing: "border-box",
                        border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 12,
                        padding: "12px 14px", fontSize: 13, color: "#0D1B2A",
                        background: "rgba(255,255,255,0.80)", outline: "none", transition: "border-color 0.2s",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#0F2D52")}
                      onBlur={e => (e.target.style.borderColor = "rgba(15,45,82,0.10)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 8 }}>
                      Required Skills <span style={{ fontWeight: 400, color: "#6B7280" }}>(comma separated)</span>
                    </label>
                    <input placeholder="Python, Machine Learning, API Design" style={{
                      width: "100%", boxSizing: "border-box",
                      border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 12,
                      padding: "12px 14px", fontSize: 13, color: "#0D1B2A",
                      background: "rgba(255,255,255,0.80)", outline: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#0F2D52")}
                    onBlur={e => (e.target.style.borderColor = "rgba(15,45,82,0.10)")}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 8 }}>Category</label>
                    <select style={{
                      width: "100%", boxSizing: "border-box",
                      border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 12,
                      padding: "12px 14px", fontSize: 13, color: "#0D1B2A",
                      background: "rgba(255,255,255,0.80)", outline: "none", appearance: "none",
                    }}>
                      {["Backend", "Frontend", "Design", "AI / ML", "Blockchain", "Mobile", "Data", "Other"].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    style={{
                      width: "100%", padding: "15px 0", marginTop: 4,
                      background: "#0F2D52", color: "#FAF8F4",
                      border: "none", borderRadius: 12, cursor: "pointer",
                      fontFamily: "var(--font-sora-var)", fontSize: 15, fontWeight: 700,
                      boxShadow: "0 4px 20px rgba(15,45,82,0.28)",
                      transition: "background 0.18s, transform 0.15s, box-shadow 0.18s",
                      letterSpacing: "-0.3px",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0a1f3a"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(15,45,82,0.36)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0F2D52"; (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(15,45,82,0.28)"; }}
                  >
                    Post Problem Live →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── APPLY MODAL ── */}
      {applying !== null && (() => {
        const prob = PROBLEMS.find(p => p.id === applying)!;
        return (
          <div
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24, background: "rgba(10,20,34,0.62)", backdropFilter: "blur(10px)",
            }}
            onClick={e => { if (e.target === e.currentTarget) setApplying(null); }}
          >
            <div style={{
              background: "rgba(255,255,255,0.97)", backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.90)", borderRadius: 24,
              boxShadow: "0 32px 80px rgba(15,45,82,0.30)", padding: "40px 40px 36px",
              maxWidth: 540, width: "100%",
              animation: "scale-in 0.22s ease",
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(${prob.logoGrad})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 20, color: "#FFFFFF",
                  boxShadow: `0 4px 16px ${prob.logoColor}30`,
                }}>
                  {prob.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 17, color: "#0D1B2A", letterSpacing: "-0.3px" }}>
                    Submit Your Proof
                  </div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{prob.title} · {prob.company}</div>
                </div>
                <button
                  onClick={() => setApplying(null)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(15,45,82,0.12)", background: "transparent", cursor: "pointer", fontSize: 14, color: "#6B7280", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  ✕
                </button>
              </div>

              {/* Proof note */}
              <div style={{
                background: "rgba(15,45,82,0.04)", border: "1px solid rgba(15,45,82,0.08)",
                borderRadius: 10, padding: "12px 16px", marginBottom: 18,
                fontSize: 13, color: "#6B7280", lineHeight: 1.55,
              }}>
                💡 Your submission becomes verified evidence in your Skill Passport. Be detailed — quality of proof affects your confidence score.
              </div>

              <textarea
                value={proof}
                onChange={e => setProof(e.target.value)}
                rows={6}
                placeholder="Explain your approach, link to a repo, design file, or write-up. Include what problem you solved and how you validated it."
                style={{
                  width: "100%", boxSizing: "border-box",
                  border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 12,
                  padding: "12px 14px", fontSize: 13, color: "#0D1B2A",
                  background: "rgba(255,255,255,0.80)", outline: "none", resize: "none",
                  marginBottom: 8, transition: "border-color 0.2s",
                }}
                onFocus={e => (e.target.style.borderColor = "#0F2D52")}
                onBlur={e => (e.target.style.borderColor = "rgba(15,45,82,0.10)")}
              />
              <div style={{ fontSize: 11, color: "#6B7280", textAlign: "right", marginBottom: 22 }}>
                {proof.trim().length}/10 min characters {proof.trim().length >= 10 && "✓"}
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setApplying(null)} style={{
                  flex: 1, padding: "13px 0",
                  background: "transparent", color: "#0F2D52",
                  border: "1.5px solid rgba(15,45,82,0.20)", borderRadius: 12,
                  fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.18s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,45,82,0.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => submit(applying)}
                  disabled={proof.trim().length < 10}
                  style={{
                    flex: 2, padding: "13px 0",
                    background: proof.trim().length >= 10 ? "#0F2D52" : "rgba(15,45,82,0.08)",
                    color: proof.trim().length >= 10 ? "#FAF8F4" : "#6B7280",
                    border: "none", borderRadius: 12,
                    fontSize: 13, fontWeight: 700,
                    cursor: proof.trim().length >= 10 ? "pointer" : "not-allowed",
                    boxShadow: proof.trim().length >= 10 ? "0 3px 14px rgba(15,45,82,0.26)" : "none",
                    transition: "all 0.18s",
                  }}
                >
                  Submit Proof →
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <Footer />
    </>
  );
}
