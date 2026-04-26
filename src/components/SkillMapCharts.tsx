"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, ScatterChart, Scatter, ZAxis, Cell, Legend,
} from "recharts";
import { BUBBLE_DATA, BAR_DATA, TREND_DATA } from "@/app/skill-map/page";

/* Tooltip — ink slab, paper text, no rounded corners */
const inkTip = {
  contentStyle: {
    background: "#1A1714",
    border: "1px solid #1A1714",
    borderRadius: 0,
    color: "#F1EBDD",
    boxShadow: "4px 4px 0 0 rgba(26,23,20,0.20)",
    fontSize: "11px",
    padding: "10px 14px",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.04em",
  },
  itemStyle:  { color: "#F1EBDD", fontWeight: 500 },
  labelStyle: { color: "#9CCEAB", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const, marginBottom: 4 },
  cursor:     { fill: "rgba(45,95,63,0.06)" },
};

const PANEL_STYLE: React.CSSProperties = {
  background: "#FBF6E8",
  border: "1px solid #1A1714",
  padding: "32px 36px",
  position: "relative",
};

export default function SkillMapCharts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Bubble chart — Skill Universe ───────────────────────────── */}
      <div className="chart-panel-mobile" style={PANEL_STYLE}>
        <ChartHead
          eyebrow="Universe · Topography"
          title="Skill universe"
          caption="Bubble area scales with verified bearers · position by relative domain density."
        />

        <div style={{ height: 320, marginTop: 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(26,23,20,0.12)" />
              <XAxis dataKey="x" type="number" hide />
              <YAxis dataKey="y" type="number" hide />
              <ZAxis dataKey="z" range={[500, 3000]} />
              <Tooltip
                {...inkTip}
                formatter={(_value, _name, props) => [
                  `${props.payload?.count?.toLocaleString() ?? ""} bearers`,
                  props.payload?.name ?? "",
                ]}
              />
              <Scatter data={BUBBLE_DATA}>
                {BUBBLE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.78} stroke="#1A1714" strokeWidth={0.5} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Legend, document-style */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "10px 22px",
            marginTop: 24,
            paddingTop: 18,
            borderTop: "1px dashed #D9CFB8",
          }}
        >
          {BUBBLE_DATA.map((b) => (
            <div key={b.name} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  background: b.color,
                  borderRadius: "50%",
                  flexShrink: 0,
                  transform: "translateY(1px)",
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "#1A1714",
                  letterSpacing: "0.06em",
                  flex: 1,
                  textTransform: "uppercase",
                }}
              >
                {b.name}
              </span>
              <span
                className="serif-italic"
                style={{
                  fontSize: 16,
                  color: "#2D5F3F",
                  fontVariationSettings: '"opsz" 30',
                }}
              >
                {(b.count / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two charts side by side ─────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {/* Bar chart — Top skills */}
        <div className="chart-panel-mobile" style={PANEL_STYLE}>
          <ChartHead
            eyebrow="Volume · Top skills"
            title="The top of the ledger"
            caption="Verified bearers per skill, sorted descending."
          />

          <div style={{ height: 320, marginTop: 24 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(26,23,20,0.10)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#4A423A", fontFamily: "var(--font-mono)" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(26,23,20,0.18)" }}
                />
                <YAxis
                  dataKey="skill"
                  type="category"
                  tick={{ fontSize: 11, fill: "#1A1714", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}
                  width={86}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...inkTip} formatter={(v) => [`${Number(v).toLocaleString()} bearers`, "Verified"]} />
                <Bar dataKey="count" radius={0} maxBarSize={16}>
                  {BAR_DATA.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i < 3 ? "#1A1714" : i < 6 ? "#2D5F3F" : "rgba(45,95,63,0.45)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area chart — Growth trends */}
        <div className="chart-panel-mobile" style={PANEL_STYLE}>
          <ChartHead
            eyebrow="Velocity · 12 months"
            title="Where the curve bends"
            caption="Verified bearer growth, monthly · four signal skills."
          />

          <div style={{ height: 320, marginTop: 24 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -8, bottom: 4 }}>
                <defs>
                  {[
                    { id: "reactGrad",  color: "#1A1714" },
                    { id: "pythonGrad", color: "#2D5F3F" },
                    { id: "tsGrad",     color: "#7C1D1D" },
                    { id: "figmaGrad",  color: "#6B5D4F" },
                  ].map((g) => (
                    <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={g.color} stopOpacity={0.22} />
                      <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(26,23,20,0.10)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "#4A423A", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
                  axisLine={{ stroke: "rgba(26,23,20,0.18)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#4A423A", fontFamily: "var(--font-mono)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...inkTip} />
                <Legend
                  wrapperStyle={{
                    fontSize: "10px",
                    color: "#4A423A",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    paddingTop: 12,
                  }}
                  iconType="rect"
                />
                <Area type="monotone" dataKey="React"      stroke="#1A1714" fill="url(#reactGrad)"  strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="Python"     stroke="#2D5F3F" fill="url(#pythonGrad)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="TypeScript" stroke="#7C1D1D" fill="url(#tsGrad)"     strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="Figma"      stroke="#6B5D4F" fill="url(#figmaGrad)"  strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartHead({
  eyebrow,
  title,
  caption,
}: {
  eyebrow: string;
  title: string;
  caption: string;
}) {
  return (
    <div>
      <div
        className="font-mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.22em",
          color: "#8C8273",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {eyebrow}
      </div>
      <h3
        className="serif-display"
        style={{
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: "-0.018em",
          color: "#1A1714",
          lineHeight: 1.15,
          marginBottom: 6,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13.5,
          color: "#4A423A",
          lineHeight: 1.5,
          maxWidth: 540,
        }}
      >
        {caption}
      </p>
    </div>
  );
}
