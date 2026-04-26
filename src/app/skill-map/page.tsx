"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PassportMark from "@/components/PassportMark";

/* ─── DYNAMIC IMPORT (fixes Recharts SSR width -1 bug) ─────── */
const Charts = dynamic(() => import("@/components/SkillMapCharts"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(26,23,20,0.18)",
        background: "#FBF6E8",
      }}
    >
      <span
        className="font-mono"
        style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8C8273", textTransform: "uppercase" }}
      >
        Plotting…
      </span>
    </div>
  ),
});

/* ─── DATA ───────────────────────────────────────────────────── */
export const BUBBLE_DATA = [
  { x: 20, y: 60, z: 85, name: "Frontend",     count: 48200, color: "#1A1714" },
  { x: 50, y: 40, z: 70, name: "Backend",      count: 39800, color: "#2D5F3F" },
  { x: 75, y: 70, z: 55, name: "Data Science", count: 28400, color: "#7C1D1D" },
  { x: 35, y: 25, z: 45, name: "Mobile",       count: 22100, color: "#4A423A" },
  { x: 65, y: 20, z: 35, name: "DevOps",       count: 17600, color: "#1F4029" },
  { x: 15, y: 80, z: 60, name: "UI/UX Design", count: 31200, color: "#5C8970" },
  { x: 85, y: 50, z: 30, name: "Blockchain",   count: 14300, color: "#6B5D4F" },
  { x: 50, y: 80, z: 50, name: "Product Mgmt", count: 25700, color: "#8C8273" },
  { x: 30, y: 50, z: 40, name: "AI/ML",        count: 19800, color: "#A88B5F" },
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

interface CountryRow {
  country: string;
  flag: string;
  talents: number;
  growth: string;
}

const TOP_COUNTRIES: CountryRow[] = [
  { country: "Nigeria",      flag: "🇳🇬", talents: 12400, growth: "+18%" },
  { country: "Kenya",        flag: "🇰🇪", talents: 9800,  growth: "+24%" },
  { country: "Ghana",        flag: "🇬🇭", talents: 7200,  growth: "+21%" },
  { country: "South Africa", flag: "🇿🇦", talents: 6800,  growth: "+12%" },
  { country: "Egypt",        flag: "🇪🇬", talents: 5600,  growth: "+16%" },
  { country: "Ethiopia",     flag: "🇪🇹", talents: 4200,  growth: "+29%" },
];

const REGIONS = ["All Regions", "West Africa", "East Africa", "North Africa", "Southern Africa", "Global"];
const PERIODS = ["6M", "1Y", "3Y"];
const CATS    = ["All", "Frontend", "Backend", "Data Science", "Mobile", "DevOps", "Design"];

export default function SkillMapPage() {
  const [region, setRegion] = useState("All Regions");
  const [period, setPeriod] = useState("1Y");
  const [category, setCategory] = useState("All");

  const totalSkills = BAR_DATA.reduce((acc, b) => acc + b.count, 0);
  const maxCountry = TOP_COUNTRIES[0].talents;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 110, position: "relative", zIndex: 1 }}>
        <div className="section-max" style={{ paddingBottom: 100 }}>
          {/* ── DOC STRIP ─────────────────────── */}
          <div
            className="doc-strip-mobile"
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
            <span className="font-mono eyebrow-faint">FILE 05 · OPEN ATLAS</span>
            <span className="font-mono eyebrow-faint">Topography of issued passports · refreshed daily</span>
            <span className="font-mono eyebrow-faint">Updated Apr 26, 2026</span>
          </div>

          {/* ── TITLE BLOCK ───────────────────── */}
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
              <div
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: "0.22em", color: "#2D5F3F", marginBottom: 18 }}
              >
                ¶ Atlas · Volume I
              </div>
              <h1 className="serif-display heading-xl" style={{ marginBottom: 22 }}>
                The atlas of
                <br />
                global <span className="serif-italic">skill signal</span>.
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
                A daily-refreshed topography of where verified evidence is being generated.
                Every datapoint descends from a passport that cites its receipts. The map
                is open, the API is open, the protocol is open.
              </p>
            </div>

            <div
              className="discover-mark-mobile"
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}
            >
              <PassportMark size={88} />
              <span
                className="font-mono"
                style={{ fontSize: 10, letterSpacing: "0.18em", color: "#8C8273", textAlign: "right" }}
              >
                OPEN TALENT PROTOCOL · v0.1
              </span>
            </div>
          </div>

          {/* ── FILTERS ───────────────────────── */}
          <section
            className="stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1.6fr) auto",
              gap: 36,
              alignItems: "start",
              padding: "20px 0",
              borderTop: "1px dashed rgba(26,23,20,0.18)",
              borderBottom: "1px dashed rgba(26,23,20,0.18)",
              marginBottom: 48,
            }}
          >
            <FilterGroup
              label="Filter · Region"
              options={REGIONS}
              value={region}
              onChange={setRegion}
            />
            <FilterGroup
              label="Filter · Category"
              options={CATS}
              value={category}
              onChange={setCategory}
            />
            <PeriodToggle period={period} setPeriod={setPeriod} />
          </section>

          {/* ── VITAL STATS STRIP ─────────────── */}
          <section
            className="stat-strip-mobile"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              borderTop: "1px solid #1A1714",
              borderBottom: "1px solid #1A1714",
              marginBottom: 80,
            }}
          >
            <Stat value="2.4M" label="Skills tracked" />
            <Stat value="TypeScript" italic label="Fastest growing" caption="+18% week-over-week" highlight />
            <Stat value="W·Africa" italic label="Top region" caption="29.6k verified bearers" />
            <Stat value="+12,400" label="New this month" />
          </section>

          {/* ── §II · UNIVERSE ─────────────────── */}
          <section style={{ marginBottom: 80 }}>
            <SectionHead numeral="¶ II" eyebrow="Universe" title="Where the signal concentrates." />
            <Charts />
          </section>

          {/* ── §III · GEOGRAPHY ───────────────── */}
          <section style={{ marginBottom: 72 }}>
            <SectionHead numeral="¶ III" eyebrow="Geography" title="Top countries by issued passports." />

            <div style={{ borderTop: "1px solid #1A1714", borderBottom: "1px solid #1A1714" }}>
              {TOP_COUNTRIES.map((c, i) => (
                <CountryEntry
                  key={c.country}
                  country={c}
                  index={i}
                  isLast={i === TOP_COUNTRIES.length - 1}
                  max={maxCountry}
                />
              ))}
            </div>
          </section>

          {/* ── §IV · BULLETIN (dark insight strip) ── */}
          <section
            className="pad-mobile-md"
            style={{
              background: "#1A1714",
              color: "#F1EBDD",
              padding: "72px 56px",
              border: "1px solid #1A1714",
              marginBottom: 56,
            }}
          >
            <div
              className="stack-md"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                alignItems: "center",
                gap: 48,
              }}
            >
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    color: "#9CCEAB",
                    marginBottom: 18,
                  }}
                >
                  ¶ IV — Bulletin · Week 17
                </div>
                <h3
                  className="serif-display"
                  style={{
                    fontSize: "clamp(28px, 3.6vw, 46px)",
                    fontWeight: 360,
                    lineHeight: 1.08,
                    letterSpacing: "-0.022em",
                    marginBottom: 18,
                    fontVariationSettings: '"opsz" 144',
                  }}
                >
                  TypeScript{" "}
                  <span className="serif-italic" style={{ color: "#9CCEAB" }}>
                    overtook
                  </span>{" "}
                  Python in growth velocity this month.
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 18,
                    lineHeight: 1.5,
                    color: "#A8987F",
                    fontWeight: 400,
                    fontVariationSettings: '"opsz" 30',
                    maxWidth: 580,
                  }}
                >
                  &ldquo;Driven by the React 19 migration wave. Verified TypeScript signals
                  grew 18% week-over-week across West Africa. Backend Python remains the
                  larger absolute volume.&rdquo;
                </p>
              </div>

              <button
                className="font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#F1EBDD",
                  color: "#1A1714",
                  padding: "16px 26px",
                  border: "1px solid #F1EBDD",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Read full bulletin <span aria-hidden>→</span>
              </button>
            </div>
          </section>

          {/* ── FOOTER LINE ───────────────────── */}
          <div
            className="stack-md"
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "auto minmax(0, 1fr) auto",
              gap: 24,
              padding: "20px 0",
              borderTop: "1px solid #1A1714",
              alignItems: "center",
            }}
          >
            <span className="font-mono" style={{ fontSize: 11, color: "#8C8273", letterSpacing: "0.14em" }}>
              QUERY · GET /api/atlas
            </span>
            <span style={{ height: 1, background: "rgba(26,23,20,0.18)" }} />
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                color: "#1A1714",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {totalSkills.toLocaleString()} signals indexed
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─── helpers ─────────────────────────────────────────────────── */

function SectionHead({
  numeral,
  eyebrow,
  title,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div
      className="stack-md-numeral"
      style={{
        marginBottom: 36,
        display: "grid",
        gridTemplateColumns: "120px minmax(0, 1fr)",
        gap: 32,
        alignItems: "end",
      }}
    >
      <span className="numeral">{numeral}</span>
      <div>
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#2D5F3F",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
        <h2 className="serif-display heading-md">{title}</h2>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <div>
      <div
        className="font-mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.18em",
          color: "#8C8273",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className="font-mono"
              style={{
                padding: "5px 11px",
                background: on ? "#1A1714" : "transparent",
                color: on ? "#F1EBDD" : "#1A1714",
                border: "1px solid #1A1714",
                fontSize: 10.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PeriodToggle({
  period,
  setPeriod,
}: {
  period: string;
  setPeriod: (s: string) => void;
}) {
  return (
    <div>
      <div
        className="font-mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.18em",
          color: "#8C8273",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        Window
      </div>
      <div style={{ display: "flex", border: "1px solid #1A1714" }}>
        {PERIODS.map((p, i) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="font-mono"
            style={{
              padding: "8px 16px",
              background: period === p ? "#1A1714" : "transparent",
              color: period === p ? "#F1EBDD" : "#1A1714",
              border: "none",
              borderLeft: i > 0 ? "1px solid #1A1714" : "none",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  caption,
  italic = false,
  highlight = false,
}: {
  value: string;
  label: string;
  caption?: string;
  italic?: boolean;
  highlight?: boolean;
}) {
  return (
    <div style={{ padding: "28px 22px", borderRight: "1px solid #1A1714" }}>
      <div
        className={italic ? "serif-italic" : "serif-display"}
        style={{
          fontSize: italic ? 38 : 56,
          fontWeight: italic ? 380 : 350,
          color: highlight ? "#2D5F3F" : "#1A1714",
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          fontVariationSettings: '"opsz" 144',
          marginBottom: 10,
        }}
      >
        {value}
      </div>
      {caption && (
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 14,
            color: "#4A423A",
            marginBottom: 8,
            fontVariationSettings: '"opsz" 30',
          }}
        >
          {caption}
        </div>
      )}
      <div
        className="font-mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.16em",
          color: "#4A423A",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CountryEntry({
  country,
  index,
  isLast,
  max,
}: {
  country: CountryRow;
  index: number;
  isLast: boolean;
  max: number;
}) {
  const barPct = (country.talents / max) * 100;
  return (
    <div
      className="ledger-row"
      style={{
        display: "grid",
        gridTemplateColumns: "100px minmax(0, 1.6fr) minmax(0, 1fr) 140px",
        gap: 32,
        padding: "30px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(26,23,20,0.18)",
        alignItems: "center",
        animation: "fade-up 0.4s cubic-bezier(.2,.7,.3,1) both",
        animationDelay: `${Math.min(index * 30, 180)}ms`,
      }}
    >
      <div className="numeral serif-italic ledger-num" style={{ paddingLeft: 4 }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="ledger-main" style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }} aria-hidden>
          {country.flag}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            className="serif-display"
            style={{
              fontSize: 28,
              fontWeight: 380,
              letterSpacing: "-0.018em",
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            {country.country}
          </div>
          <div
            style={{
              height: 3,
              width: `${barPct}%`,
              maxWidth: 240,
              background: "#2D5F3F",
              opacity: 0.7,
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      <div className="ledger-meta" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          className="serif-display"
          style={{
            fontSize: 32,
            fontWeight: 380,
            color: "#1A1714",
            letterSpacing: "-0.018em",
            lineHeight: 1,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {country.talents.toLocaleString()}
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "#8C8273",
            textTransform: "uppercase",
          }}
        >
          Verified bearers
        </div>
      </div>

      <div
        className="ledger-action"
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: 10.5,
            color: "#2D5F3F",
            letterSpacing: "0.14em",
            border: "1px solid #2D5F3F",
            padding: "4px 10px",
            textTransform: "uppercase",
          }}
        >
          {country.growth} mom
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "#1A1714",
            borderBottom: "1px solid #1A1714",
            paddingBottom: 2,
            textTransform: "uppercase",
          }}
        >
          Open record →
        </span>
      </div>
    </div>
  );
}
