"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/employers/discover", label: "For Employers" },
  { href: "/ignite", label: "Ignite" },
  { href: "/skill-map", label: "Skill Map" },
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
        transition: "all 0.3s ease",
        padding: scrolled ? "14px 0" : "22px 0",
        background: scrolled
          ? "rgba(250,248,244,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(15,45,82,0.08)"
          : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 20, color: "#0F2D52", letterSpacing: "-0.5px" }}>
            prove<span style={{ color: "#2A6FBF" }}>work</span>
          </span>
        </Link>

        {/* Links */}
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} style={{ textDecoration: "none", fontSize: 14, fontWeight: 500, color: "#6B7280", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0F2D52")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/auth/login" style={{
            textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#0F2D52",
            padding: "8px 18px", borderRadius: 999, border: "1.5px solid rgba(15,45,82,0.18)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#0F2D52"; (e.currentTarget as HTMLElement).style.background = "rgba(15,45,82,0.04)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,45,82,0.18)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Sign In
          </Link>
          <Link href="/onboard" style={{
            textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#FAF8F4",
            padding: "8px 20px", borderRadius: 999, background: "#0F2D52",
            boxShadow: "0 2px 12px rgba(15,45,82,0.28)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0a1f3a"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(15,45,82,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0F2D52"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(15,45,82,0.28)"; }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
