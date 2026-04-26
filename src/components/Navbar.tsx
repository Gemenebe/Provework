"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PassportMark from "./PassportMark";

const NAV_LINKS = [
  { href: "/#protocol", label: "Protocol" },
  { href: "/employers/discover", label: "Employers" },
  { href: "/ignite", label: "Ignite" },
  { href: "/skill-map", label: "Atlas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(241,235,221,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px) saturate(120%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px) saturate(120%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,23,20,0.18)" : "1px solid transparent",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: scrolled ? "12px 40px" : "20px 40px",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 32,
          transition: "padding 0.25s ease",
        }}
      >
        {/* Lockup: mark + wordmark */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
            color: "#1A1714",
          }}
        >
          <div style={{ width: scrolled ? 36 : 44, height: scrolled ? 36 : 44, transition: "all 0.25s ease" }}>
            <PassportMark size={scrolled ? 36 : 44} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span
              className="font-display"
              style={{
                fontSize: scrolled ? 22 : 26,
                fontWeight: 380,
                letterSpacing: "-0.025em",
                fontStyle: "italic",
                fontVariationSettings: '"opsz" 144',
                transition: "font-size 0.25s ease",
              }}
            >
              ProveWork
            </span>
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#8C8273", marginTop: 3 }}>
              OPEN · TALENT · PROTOCOL
            </span>
          </div>
        </Link>

        {/* Links */}
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 36,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-mono"
                style={{
                  textDecoration: "none",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#4A423A",
                  transition: "color 0.15s ease",
                  position: "relative",
                  paddingBottom: 4,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2D5F3F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4A423A")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/auth/login"
            className="font-mono"
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#4A423A",
              textDecoration: "none",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Sign In
          </Link>
          <Link
            href="/onboard"
            className="btn-ink"
            style={{
              padding: "10px 18px",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
            }}
          >
            Issue passport →
          </Link>
        </div>
      </div>
    </nav>
  );
}
