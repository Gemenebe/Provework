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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
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
          className="doc-header-mobile"
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

          {/* Links — hidden on mobile */}
          <ul
            className="hide-mobile"
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

          {/* Spacer to maintain grid on mobile (links hidden) */}
          <span className="show-mobile" aria-hidden style={{ display: "none" }} />

          {/* Actions — desktop */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
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

          {/* Hamburger — mobile only */}
          <button
            className="show-mobile"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            style={{
              background: "transparent",
              border: "1px solid #1A1714",
              padding: 10,
              cursor: "pointer",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
            }}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
              <rect x="0" y="0" width="20" height="1.5" fill="#1A1714" />
              <rect x="0" y="6.25" width="20" height="1.5" fill="#1A1714" />
              <rect x="0" y="12.5" width="20" height="1.5" fill="#1A1714" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 14,
              borderBottom: "1px solid #1A1714",
              marginBottom: 28,
            }}
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                color: "#1A1714",
              }}
            >
              <PassportMark size={36} />
              <span
                className="font-display"
                style={{
                  fontSize: 22,
                  fontWeight: 380,
                  fontStyle: "italic",
                  letterSpacing: "-0.025em",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                ProveWork
              </span>
            </Link>

            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              style={{
                background: "transparent",
                border: "1px solid #1A1714",
                padding: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <line x1="2" y1="2" x2="14" y2="14" stroke="#1A1714" strokeWidth="1.5" />
                <line x1="14" y1="2" x2="2" y2="14" stroke="#1A1714" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.22em",
              color: "#2D5F3F",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            ¶ Index
          </div>

          <nav style={{ display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-link"
              >
                {l.label}
                <span aria-hidden style={{ fontSize: 18, color: "#8C8273" }}>→</span>
              </Link>
            ))}
          </nav>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 36,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Link
              href="/onboard"
              onClick={() => setMenuOpen(false)}
              className="btn-ink"
              style={{
                padding: "16px 22px",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                width: "100%",
              }}
            >
              Issue passport →
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="btn-outline"
              style={{
                padding: "14px 22px",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                width: "100%",
              }}
            >
              Sign in
            </Link>
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "#8C8273",
                textAlign: "center",
                marginTop: 14,
              }}
            >
              OPEN TALENT PROTOCOL · v0.1
            </span>
          </div>
        </div>
      )}
    </>
  );
}
