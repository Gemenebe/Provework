"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── DYNAMIC IMPORT (fixes Recharts SSR width -1 bug) ─────── */
const Charts = dynamic(() => import("@/components/SkillMapCharts"), { ssr: false, loading: () => (
  <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ fontSize: 13, color: "#6B7280" }}>Loading chart…</div>
  </div>
) });

/* ─── DATA ───────────────────────────────────────────────────── */
export const BUBBLE_DATA = [
  { x: 20, y: 60, z: 85, name: "Frontend",    count: 48200, color: "#0F2D52" },
  { x: 50, y: 40, z: 70, name: "Backend",     count: 39800, color: "#2A6FBF" },
  { x: 75, y: 70, z: 55, name: "Data Science",count: 28400, color: "#1a4a80" },
  { x: 35, y: 25, z: 45, name: "Mobile",      count: 22100, color: "#3a7fd5" },
  { x: 65, y: 20, z: 35, name: "DevOps",      count: 17600, color: "#0d2440" },
  { x: 15, y: 80, z: 60, name: "UI/UX Design",count: 31200, color: "#2560a8" },
  { x: 85, y: 50, z: 30, name: "Blockchain",  count: 14300, color: "#3d6fa0" },
  { x: 50, y: 80, z: 50, name: "Product Mgmt",count: 25700, color: "#1e3f6d" },
  { x: 30, y: 50, z: 40, name: "AI/ML",       count: 19800, color: "#4a7fb5" },
];

export const BAR_DATA = [
  { skill: "React",       count: 4820 },
  { skill: "Python",      count: 4310 },
  { skill: "TypeScript",  count: 3980 },
  { skill: "Node.js",     count: 3540 },
  { skill: "Figma",       count: 3200 },
  { skill: "PostgreSQL",  count: 2870 },
  { skill: "AWS",         count: 2640 },
  { skill: "Docker",      count: 2310 },
  { skill: "Flutter",     count: 1980 },
  { skill: "Solidity",    count: 1420 },
];

export const TREND_DATA = [
  { month: "May", React: 3200, Python: 2800, TypeScript: 2100, Figma: 1900 },
  { month: "Jun", React: 3500, Python: 2900, TypeScript: 2400, Figma: 2100 },
  { month: "Jul", React: 3700, Python: 3100, TypeScript: 2600, Figma: 2300 },
  { month: "Aug", React: 3900, Python: 3300, TypeScript: 2900, Figma: 2500 },
  { month: "Sep", React: 4100, Python: 3500, TypeScript: 3200, Figma: 2700 },
  { month: "Oct", React: 4300, Python: 3700, TypeScript: 3500, Figma: 2900 },
  { month: "Nov", React: 4500, Python: 3900, TypeScript: 3700, Figma: 3000 },
  { month: "Dec", React: 4600, Python: 4000, TypeScript: 3800, Figma: 3100 },
  { month: "Jan", React: 4700, Python: 4100, TypeScript: 3900, Figma: 3150 },
  { month: "Feb", React: 4750, Python: 4200, TypeScript: 3950, Figma: 3180 },
  { month: "Mar", React: 4800, Python: 4280, TypeScript: 4000, Figma: 3200 },
  { month: "Apr", React: 4820, Python: 4310, TypeScript: 3980, Figma: 3200 },
];

const TOP_COUNTRIES = [
  { country: "Nigeria",       flag: "🇳🇬", talents: 12400, growth: "+18%", color: "#0F2D52" },
  { country: "Kenya",         flag: "🇰🇪", talents: 9800,  growth: "+24%", color: "#2A6FBF" },
  { country: "Ghana",         flag: "🇬🇭", talents: 7200,  growth: "+21%", color: "#1a4a80" },
  { country: "South Africa",  flag: "🇿🇦", talents: 6800,  growth: "+12%", color: "#2A6FBF" },
  { country: "Egypt",         flag: "🇪🇬", talents: 5600,  growth: "+16%", color: "#0F2D52" },
  { country: "Ethiopia",      flag: "🇪🇹", talents: 4200,  growth: "+29%", color: "#2A6FBF" },
];

const STATS = [
  { label: "Skills Tracked",   display: "2.4M",        icon: "◈" },
  { label: "Fastest Growing",  display: "TypeScript",   icon: "⬡" },
  { label: "Top Region",       display: "West Africa",  icon: "📍" },
  { label: "New This Month",   display: "+12,400",      icon: "↑" },
];

const REGIONS   = ["All Regions", "West Africa", "East Africa", "North Africa", "Southern Africa", "Global"];
const PERIODS   = ["6M", "1Y", "3Y"];
const CATS      = ["All Skills", "Frontend", "Backend", "Data Science", "Mobile", "DevOps", "Design"];

export default function SkillMapPage() {
  const [region, setRegion]   = useState("All Regions");
  const [period, setPeriod]   = useState("1Y");
  const [category, setCategory] = useState("All Skills");

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingBottom: 80 }}>

        {/* ── HERO HEADER ── */}
        <div style={{
          background: "linear-gradient(140deg, #0a1f3a 0%, #0F2D52 40%, #1a4a80 70%, #2A6FBF 100%)",
          paddingTop: 130, paddingBottom: 70, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, right: "5%", width: 480, height: 480, borderRadius: "50%", background: "rgba(42,111,191,0.15)", filter: "blur(90px)", pointerEvents: "none" }} />

          <div className="section-max" style={{ position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 600 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.50)", letterSpacing: "2px", textTransform: "uppercase" }}>
                <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.30)" }} />
                Data Intelligence
              </span>
              <h1 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,56px)", color: "#FFFFFF", lineHeight: 1.06, letterSpacing: "-2px" }}>
                The Global<br />
                <span style={{ color: "rgba(255,255,255,0.55)" }}>Skill Landscape</span>
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.60)", lineHeight: 1.75, maxWidth: 500 }}>
                Real-time intelligence on how skills are distributed, growing, and shifting across the global workforce. Updated daily from verified passport data.
              </p>
            </div>
          </div>
        </div>

        <div className="section-max" style={{ paddingTop: 44 }}>

          {/* ── STAT CALLOUTS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.90)", borderRadius: 16,
                boxShadow: "0 2px 16px rgba(15,45,82,0.07)", padding: "20px 22px",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: "rgba(15,45,82,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 800, fontSize: 22, color: "#0F2D52", letterSpacing: "-0.5px" }}>
                    {s.display}
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── FILTERS ── */}
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 36,
            background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.90)", borderRadius: 14,
            boxShadow: "0 2px 12px rgba(15,45,82,0.06)", padding: "14px 20px",
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0F2D52" }}>Filter:</span>
            {[
              { label: "Region",   options: REGIONS,  value: region,   set: setRegion },
              { label: "Category", options: CATS,     value: category, set: setCategory },
            ].map(f => (
              <div key={f.label} style={{ position: "relative" }}>
                <select
                  value={f.value}
                  onChange={e => f.set(e.target.value)}
                  style={{
                    border: "1.5px solid rgba(15,45,82,0.10)", borderRadius: 10,
                    padding: "8px 32px 8px 12px", fontSize: 12, fontWeight: 600, color: "#0F2D52",
                    background: "rgba(255,255,255,0.80)", outline: "none", appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
                <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: "#6B7280", pointerEvents: "none" }}>▾</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(15,45,82,0.05)", borderRadius: 10, padding: 3, marginLeft: "auto" }}>
              {PERIODS.map(t => (
                <button key={t} onClick={() => setPeriod(t)} style={{
                  padding: "6px 16px", borderRadius: 8,
                  fontSize: 12, fontWeight: 700,
                  background: period === t ? "#0F2D52" : "transparent",
                  color: period === t ? "#FAF8F4" : "#6B7280",
                  border: "none", cursor: "pointer",
                  boxShadow: period === t ? "0 1px 6px rgba(15,45,82,0.22)" : "none",
                  transition: "all 0.18s",
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ── CHARTS ── */}
          <Charts />

          {/* ── TOP COUNTRIES TABLE ── */}
          <div style={{ marginTop: 32 }}>
            <div style={{
              background: "rgba(255,255,255,0.78)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.90)", borderRadius: 20,
              boxShadow: "0 4px 24px rgba(15,45,82,0.07)", padding: "28px 32px",
            }}>
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 18, color: "#0D1B2A", letterSpacing: "-0.3px", marginBottom: 4 }}>
                  Top Countries by Talent Volume
                </h2>
                <p style={{ fontSize: 13, color: "#6B7280" }}>Verified professionals with at least one confirmed skill signal</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, padding: "0 4px 12px", borderBottom: "1px solid rgba(15,45,82,0.08)" }}>
                  {["Country", "Verified Talents", "Growth MoM", ""].map((h, i) => (
                    <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", textAlign: i > 0 ? "right" : "left" }}>{h}</span>
                  ))}
                </div>
                {TOP_COUNTRIES.map((c, i) => {
                  const maxTalents = TOP_COUNTRIES[0].talents;
                  const barPct = (c.talents / maxTalents) * 100;
                  return (
                    <div key={c.country} style={{
                      display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, padding: "14px 4px",
                      borderBottom: i < TOP_COUNTRIES.length - 1 ? "1px solid rgba(15,45,82,0.05)" : "none",
                      alignItems: "center",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 20 }}>{c.flag}</span>
                        <div>
                          <div style={{ fontFamily: "var(--font-sora-var)", fontWeight: 600, fontSize: 14, color: "#0D1B2A" }}>{c.country}</div>
                          <div style={{ height: 3, width: `${barPct}%`, maxWidth: 180, background: c.color, borderRadius: 999, marginTop: 5, opacity: 0.65, transition: "width 0.6s ease" }} />
                        </div>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0D1B2A", textAlign: "right" }}>
                        {c.talents.toLocaleString()}
                      </span>
                      <span style={{
                        fontSize: 12, fontWeight: 700, color: "#16a34a",
                        background: "rgba(34,197,94,0.09)", padding: "3px 10px",
                        borderRadius: 999, border: "1px solid rgba(34,197,94,0.20)",
                        textAlign: "right", whiteSpace: "nowrap",
                      }}>
                        {c.growth}
                      </span>
                      <div style={{ textAlign: "right" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, color: "#2A6FBF",
                          background: "rgba(42,111,191,0.08)", padding: "3px 10px",
                          borderRadius: 999, border: "1px solid rgba(42,111,191,0.15)",
                          cursor: "pointer", whiteSpace: "nowrap",
                        }}>
                          View →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── INSIGHT BANNER ── */}
          <div style={{
            marginTop: 28, borderRadius: 18, overflow: "hidden",
            background: "linear-gradient(135deg, #0F2D52 0%, #1a4a80 50%, #2A6FBF 100%)",
            padding: "32px 36px", position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,129,58,0.12)", filter: "blur(60px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.50)", letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: 8 }}>
                  🔮 Weekly Insight
                </p>
                <h3 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 20, color: "#FFFFFF", letterSpacing: "-0.5px", marginBottom: 8 }}>
                  TypeScript overtook Python in growth velocity this month
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.60)", lineHeight: 1.6, maxWidth: 520 }}>
                  Driven by the React 19 migration wave, TypeScript verified signals grew 18% week-over-week across West Africa.
                </p>
              </div>
              <button style={{
                padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.10)", color: "#FFFFFF",
                fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0,
                transition: "all 0.18s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)"; }}
              >
                Read Full Report →
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
