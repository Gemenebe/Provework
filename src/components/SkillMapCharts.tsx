"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, ScatterChart, Scatter, ZAxis, Cell, Legend,
} from "recharts";
import { BUBBLE_DATA, BAR_DATA, TREND_DATA } from "@/app/skill-map/page";

const navyTip = {
  contentStyle: {
    background: "rgba(13,27,42,0.94)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "12px",
    color: "#FAF8F4",
    boxShadow: "0 8px 32px rgba(15,45,82,0.28)",
    fontSize: "12px",
    padding: "10px 14px",
  },
  itemStyle:  { color: "#FAF8F4", fontWeight: 600 },
  labelStyle: { color: "rgba(255,255,255,0.55)", fontSize: "11px", marginBottom: 4 },
  cursor:     { fill: "rgba(15,45,82,0.04)" },
};

const PANEL_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.90)",
  borderRadius: 20,
  boxShadow: "0 4px 24px rgba(15,45,82,0.07)",
  padding: "28px 32px",
};

export default function SkillMapCharts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Bubble chart — Skill Universe */}
      <div style={PANEL_STYLE}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 18, color: "#0D1B2A", letterSpacing: "-0.3px", marginBottom: 4 }}>
            Skill Universe
          </h2>
          <p style={{ fontSize: 13, color: "#6B7280" }}>
            Bubble size = verified talent volume · Position = relative domain density
          </p>
        </div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,45,82,0.05)" />
              <XAxis dataKey="x" type="number" hide />
              <YAxis dataKey="y" type="number" hide />
              <ZAxis dataKey="z" range={[500, 3000]} />
              <Tooltip
                {...navyTip}
                formatter={(_value, _name, props) => [
                  `${props.payload?.count?.toLocaleString() ?? ""} verified talents`,
                  props.payload?.name ?? "",
                ]}
              />
              <Scatter data={BUBBLE_DATA}>
                {BUBBLE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.78} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 16 }}>
          {BUBBLE_DATA.map(b => (
            <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: b.color }} />
              <span style={{ fontSize: 11, color: "#6B7280" }}>{b.name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#0F2D52" }}>{(b.count / 1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two charts side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>

        {/* Bar chart — Top Skills */}
        <div style={PANEL_STYLE}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 18, color: "#0D1B2A", letterSpacing: "-0.3px", marginBottom: 4 }}>
              Top Skills by Volume
            </h2>
            <p style={{ fontSize: 13, color: "#6B7280" }}>Verified talent count per skill</p>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,45,82,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#6B7280" }} tickLine={false} axisLine={false} />
                <YAxis dataKey="skill" type="category" tick={{ fontSize: 11, fill: "#6B7280" }} width={78} axisLine={false} tickLine={false} />
                <Tooltip {...navyTip} formatter={v => [`${Number(v).toLocaleString()} talents`]} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={18}>
                  {BAR_DATA.map((_, i) => (
                    <Cell key={i} fill={i < 3 ? "#0F2D52" : i < 6 ? "#2A6FBF" : "rgba(42,111,191,0.35)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area chart — Growth Trends */}
        <div style={PANEL_STYLE}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontFamily: "var(--font-sora-var)", fontWeight: 700, fontSize: 18, color: "#0D1B2A", letterSpacing: "-0.3px", marginBottom: 4 }}>
              Skill Growth Trends
            </h2>
            <p style={{ fontSize: 13, color: "#6B7280" }}>Verified talent growth over 12 months</p>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -8, bottom: 4 }}>
                <defs>
                  {[
                    { id: "reactGrad",  color: "#0F2D52" },
                    { id: "pythonGrad", color: "#2A6FBF" },
                    { id: "tsGrad",     color: "#3a7fd5" },
                    { id: "figmaGrad",  color: "#8B5CF6" },
                  ].map(g => (
                    <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={g.color} stopOpacity={0.18} />
                      <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,45,82,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip {...navyTip} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#6B7280", paddingTop: 8 }} />
                <Area type="monotone" dataKey="React"      stroke="#0F2D52" fill="url(#reactGrad)"  strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="Python"     stroke="#2A6FBF" fill="url(#pythonGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="TypeScript" stroke="#3a7fd5" fill="url(#tsGrad)"     strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="Figma"      stroke="#8B5CF6" fill="url(#figmaGrad)"  strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
