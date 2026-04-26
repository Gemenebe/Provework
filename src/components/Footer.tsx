"use client";

import Link from "next/link";

const COLS = [
  { title: "Platform", links: [{ href: "/onboard", label: "Get Your Passport" }, { href: "/employers/discover", label: "Discover Talent" }, { href: "/ignite", label: "Ignite Marketplace" }, { href: "/skill-map", label: "Skill Map" }] },
  { title: "Company", links: [{ href: "#", label: "About" }, { href: "#", label: "Blog" }, { href: "#", label: "Careers" }, { href: "#", label: "Press" }] },
  { title: "Legal", links: [{ href: "#", label: "Privacy" }, { href: "#", label: "Terms" }, { href: "#", label: "Data Protection" }] },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(15,45,82,0.10)", background: "#FAF8F4", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 20, color: "#0F2D52", marginBottom: 12 }}>
              prove<span style={{ color: "#2A6FBF" }}>work</span>
            </div>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65, maxWidth: 220 }}>
              The behavioral credential layer for the global workforce.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ textDecoration: "none", fontSize: 14, color: "#6B7280", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#0F2D52")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(15,45,82,0.08)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 13, color: "#6B7280" }}>© 2025 ProveWork. All rights reserved.</p>
          <p style={{ fontSize: 13, color: "#6B7280" }}>Built for the Hack Nation Hackathon</p>
        </div>
      </div>
    </footer>
  );
}
