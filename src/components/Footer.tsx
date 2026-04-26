"use client";

import Link from "next/link";
import PassportMark from "./PassportMark";

const COLS = [
  {
    title: "Protocol",
    links: [
      { href: "/onboard", label: "Issue passport" },
      { href: "/employers/discover", label: "Discover talent" },
      { href: "/ignite", label: "Ignite" },
      { href: "/skill-map", label: "Atlas" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "#", label: "Anatomy of a claim" },
      { href: "#", label: "API surface" },
      { href: "#", label: "Connector pattern" },
      { href: "#", label: "Source on GitHub" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Data protection" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1A1714",
        color: "#A8987F",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="section-max" style={{ padding: "80px 40px 36px" }}>
        {/* top: lockup + manifesto blurb */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))",
            gap: 56,
            paddingBottom: 60,
            borderBottom: "1px solid #4A423A",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <PassportMark size={48} color="#F1EBDD" />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: 26,
                    fontWeight: 380,
                    fontStyle: "italic",
                    letterSpacing: "-0.02em",
                    fontVariationSettings: '"opsz" 144',
                    color: "#F1EBDD",
                  }}
                >
                  ProveWork
                </span>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#A8987F", marginTop: 4 }}>
                  OPEN · TALENT · PROTOCOL
                </span>
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.45,
                color: "#A8987F",
                fontWeight: 400,
                fontVariationSettings: '"opsz" 30',
                maxWidth: 320,
              }}
            >
              An evidence-cited credential layer for the global workforce. The model
              attests; it does not judge.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "#5C5246",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}
              >
                ¶ {col.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 15,
                        color: "#F1EBDD",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                        fontVariationSettings: '"opsz" 30',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CCEAB")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F1EBDD")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom: imprint line */}
        <div
          style={{
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <span className="font-mono" style={{ fontSize: 11, color: "#5C5246", letterSpacing: "0.14em" }}>
            © 2026 PROVEWORK · OPEN PROTOCOL
          </span>
          <span className="font-mono" style={{ fontSize: 11, color: "#5C5246", letterSpacing: "0.14em" }}>
            FILED FOR THE WORLD BANK · OPEN TALENT CHALLENGE
          </span>
          <span className="font-mono" style={{ fontSize: 11, color: "#5C5246", letterSpacing: "0.14em" }}>
            ATTESTED BY CLAUDE OPUS 4.7
          </span>
        </div>
      </div>
    </footer>
  );
}
