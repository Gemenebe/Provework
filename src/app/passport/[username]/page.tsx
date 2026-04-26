"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import PassportMark from "@/components/PassportMark";
import type { Claim, Passport } from "@/lib/types";

const CONFIDENCE_RANK: Record<string, number> = { high: 3, medium: 2, low: 1 };

export default function PassportPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const [passport, setPassport] = useState<Passport | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [activeClaim, setActiveClaim] = useState<number | null>(0);

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const res = await fetch(`/api/passport/${username}`);
        if (!res.ok) {
          if (!abort) setStatus("missing");
          return;
        }
        const data = (await res.json()) as Passport;
        if (!abort) {
          setPassport(data);
          setStatus("ready");
        }
      } catch {
        if (!abort) setStatus("missing");
      }
    })();
    return () => {
      abort = true;
    };
  }, [username]);

  if (status === "loading") {
    return (
      <CenterPad>
        <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#8C8273", marginBottom: 14 }}>
          PASSPORT · LOADING
        </div>
        <div className="serif-display" style={{ fontSize: 28, fontWeight: 380 }}>
          Retrieving record for <span className="serif-italic">@{username}</span>…
        </div>
      </CenterPad>
    );
  }

  if (status === "missing" || !passport) {
    return (
      <CenterPad>
        <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#7C1D1D", marginBottom: 14 }}>
          PASSPORT · NOT ON FILE
        </div>
        <div className="serif-display" style={{ fontSize: 32, fontWeight: 380, marginBottom: 18, lineHeight: 1.1 }}>
          No record on file for <span className="serif-italic">@{username}</span>.
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#4A423A", marginBottom: 28 }}>
          Run a scan to issue a passport in under thirty seconds.
        </p>
        <Link href="/onboard" className="btn-ink" style={{ padding: "12px 22px" }}>
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Issue one →
          </span>
        </Link>
      </CenterPad>
    );
  }

  const claims = [...passport.claims].sort(
    (a, b) => (CONFIDENCE_RANK[b.confidence] || 0) - (CONFIDENCE_RANK[a.confidence] || 0),
  );

  const skillCount = claims.length;
  const highConf = claims.filter((c) => c.confidence === "high").length;
  const evidenceCount = claims.reduce((acc, c) => acc + c.evidence.length, 0);
  const issued = new Date(passport.generated_at);

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      {/* Sticky header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(241,235,221,0.92)",
          backdropFilter: "blur(10px) saturate(120%)",
          WebkitBackdropFilter: "blur(10px) saturate(120%)",
          borderBottom: "1px solid #1A1714",
        }}
      >
        <div
          className="section-max"
          style={{
            padding: "16px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#1A1714" }}>
            <PassportMark size={36} />
            <span
              className="font-display"
              style={{ fontSize: 22, fontWeight: 380, fontStyle: "italic", letterSpacing: "-0.02em", fontVariationSettings: '"opsz" 144' }}
            >
              ProveWork
            </span>
          </Link>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={() => {
                const data = JSON.stringify(passport, null, 2);
                const blob = new Blob([data], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${username}-passport.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="font-mono"
              style={{
                fontSize: 11,
                color: "#1A1714",
                background: "transparent",
                border: "1px solid #1A1714",
                padding: "9px 16px",
                cursor: "pointer",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Download VC
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="btn-ink"
              style={{ padding: "9px 16px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Copy share link
            </button>
          </div>
        </div>
      </header>

      <main className="section-max" style={{ padding: "60px 40px 120px", maxWidth: 1180 }}>
        {/* Document title strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: "1px solid #1A1714",
            marginBottom: 48,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <span className="font-mono eyebrow-faint">
            Passport · No. {hashId(passport.subject.username)}
          </span>
          <span className="font-mono eyebrow-faint">Open Talent Protocol · v0.1</span>
          <span className="font-mono eyebrow-faint">
            Issued {issued.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
          </span>
        </div>

        {/* Bearer header */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
            gap: 64,
            alignItems: "end",
            marginBottom: 56,
          }}
        >
          <div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#8C8273", marginBottom: 14 }}>
              BEARER
            </div>
            <h1
              className="serif-display"
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                fontWeight: 350,
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                marginBottom: 18,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {passport.subject.name || `@${passport.subject.username}`}
            </h1>
            <div className="font-mono" style={{ fontSize: 12, color: "#4A423A", letterSpacing: "0.06em", display: "flex", flexWrap: "wrap", gap: 18 }}>
              <span>@{passport.subject.username}</span>
              {passport.subject.location && <span>· {passport.subject.location}</span>}
              <span>· {passport.subject.public_repos} repos</span>
              <span>· joined {new Date(passport.subject.joined).getFullYear()}</span>
            </div>
            {passport.subject.bio && (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 22,
                  lineHeight: 1.45,
                  color: "#4A423A",
                  marginTop: 22,
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 30',
                  maxWidth: 600,
                }}
              >
                &ldquo;{passport.subject.bio}&rdquo;
              </p>
            )}
          </div>

          {/* Right: rubber stamp */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 }}>
            <div className="rubber-stamp" style={{ fontSize: 22, padding: "14px 26px", animation: "stamp 0.6s cubic-bezier(.25,.85,.35,1.15) both" }}>
              ATTESTED
              <span
                className="font-mono"
                style={{ fontSize: 9.5, fontStyle: "normal", letterSpacing: "0.18em", marginTop: 4, fontWeight: 500 }}
              >
                {issued.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" }).toUpperCase()}
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: 10, color: "#8C8273", letterSpacing: "0.18em", textAlign: "right" }}>
              CLAUDE OPUS 4.7 · STRUCTURED ATTESTATION
            </div>
          </div>
        </section>

        {/* Vital statistics strip */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            borderTop: "1px solid #1A1714",
            borderBottom: "1px solid #1A1714",
            marginBottom: 64,
          }}
        >
          <Stat n={skillCount} label="Skill claims" />
          <Stat n={highConf} label="High confidence" highlight />
          <Stat n={evidenceCount} label="Evidence pointers" />
          <Stat n={passport.source_signals.repos_analyzed} label="Repos analysed" />
        </section>

        {/* Ledger of claims */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28, gap: 24 }}>
            <div>
              <div
                className="font-mono"
                style={{ fontSize: 10.5, letterSpacing: "0.22em", color: "#2D5F3F", marginBottom: 8 }}
              >
                ¶ Section I
              </div>
              <h2 className="serif-display heading-md">Evidence-cited claims</h2>
            </div>
            <span className="font-mono" style={{ fontSize: 11, color: "#8C8273", letterSpacing: "0.12em" }}>
              SORTED BY CONFIDENCE
            </span>
          </div>

          <div style={{ borderTop: "1px solid #1A1714" }}>
            {claims.map((c, i) => (
              <PassportClaimEntry
                key={`${c.skill}-${i}`}
                claim={c}
                index={i}
                expanded={activeClaim === i}
                onToggle={() => setActiveClaim(activeClaim === i ? null : i)}
                isLast={i === claims.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Source signals */}
        <section
          style={{
            background: "#FBF6E8",
            border: "1px solid #1A1714",
            padding: "32px 36px",
            marginBottom: 56,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: 32, alignItems: "start" }}>
            <div>
              <div
                className="font-mono"
                style={{ fontSize: 10.5, letterSpacing: "0.22em", color: "#2D5F3F", marginBottom: 8 }}
              >
                ¶ Section II
              </div>
              <h3 className="serif-display heading-md" style={{ marginBottom: 6 }}>
                Source signals
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#4A423A", lineHeight: 1.55 }}>
                The provenance of this attestation. Every claim above descends from these inputs.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <SourceLine label="Repos analysed" value={String(passport.source_signals.repos_analyzed)} />
              <SourceLine label="Stars across analysed repos" value={String(passport.source_signals.total_stars)} />
              <SourceLine label="Languages observed" value={passport.source_signals.languages.join(" · ") || "—"} />
              <SourceLine label="Subject joined GitHub" value={new Date(passport.subject.joined).toISOString().slice(0, 10)} />
              {passport.subject.blog && <SourceLine label="Personal site" value={passport.subject.blog} />}
            </div>
          </div>
        </section>

        {/* Footer attestation */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr) auto",
            gap: 32,
            paddingTop: 24,
            borderTop: "1px solid #1A1714",
            alignItems: "center",
          }}
        >
          <PassportMark size={64} />
          <div>
            <div className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.22em", color: "#8C8273", marginBottom: 6 }}>
              ATTESTING AUTHORITY
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.45, color: "#1A1714", fontWeight: 400, fontVariationSettings: '"opsz" 30', maxWidth: 720 }}>
              The model is forbidden from inventing. Every claim above is a pointer to the
              specific artifact that proves it. Verify any of them in one click.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#8C8273" }}>
              SIGNATURE
            </span>
            <span className="serif-italic" style={{ fontSize: 22, color: "#1A1714" }}>
              §
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── pieces ──────────────────────────────────────────────────── */

function PassportClaimEntry({
  claim,
  index,
  expanded,
  onToggle,
  isLast,
}: {
  claim: Claim;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "100px minmax(0, 1fr) 140px",
        gap: 32,
        padding: "32px 0",
        borderBottom: isLast ? "1px solid #1A1714" : "1px solid rgba(26,23,20,0.18)",
      }}
    >
      <div className="numeral serif-italic">{String(index + 1).padStart(2, "0")}</div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
          <span
            className="font-mono"
            style={{ fontSize: 11.5, letterSpacing: "0.18em", color: "#1A1714", textTransform: "uppercase", fontWeight: 500 }}
          >
            {claim.skill}
          </span>
          <span style={{ height: 1, width: 30, background: "#D9CFB8" }} />
          <span
            className="font-mono"
            style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "#8C8273", textTransform: "uppercase" }}
          >
            {claim.category}
          </span>
        </div>

        <p className="prose-claim" style={{ marginBottom: expanded ? 18 : 0 }}>
          {claim.claim_text}
          <sup className="cite">
            {claim.evidence.map((_, j) => `[${j + 1}]`).join("")}
          </sup>
        </p>

        {expanded && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, animation: "fade-up 0.3s ease-out both" }}>
            {claim.evidence.map((e, j) => (
              <li key={j}>
                <a
                  href={e.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "26px auto 1fr auto",
                    gap: 12,
                    alignItems: "start",
                    padding: "10px 12px",
                    background: "rgba(45,95,63,0.04)",
                    border: "1px solid rgba(45,95,63,0.18)",
                    textDecoration: "none",
                    transition: "background 0.18s ease",
                  }}
                  onMouseEnter={(ev) => ((ev.currentTarget as HTMLAnchorElement).style.background = "rgba(45,95,63,0.10)")}
                  onMouseLeave={(ev) => ((ev.currentTarget as HTMLAnchorElement).style.background = "rgba(45,95,63,0.04)")}
                >
                  <span className="font-mono" style={{ fontSize: 11, color: "#2D5F3F", letterSpacing: "0.06em", paddingTop: 2 }}>
                    [{j + 1}]
                  </span>
                  <span className="font-mono" style={{ fontSize: 10, color: "#8C8273", letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 4 }}>
                    {e.source.replace("github-", "")}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14.5, color: "#1A1714", lineHeight: 1.45 }}>
                    &ldquo;{e.excerpt}&rdquo;
                  </span>
                  <span style={{ color: "#2D5F3F", fontSize: 14, paddingTop: 2 }}>↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
        <ConfidenceMark confidence={claim.confidence} />
        <button
          onClick={onToggle}
          className="font-mono"
          style={{
            background: "transparent",
            border: "none",
            color: "#1A1714",
            fontSize: 10.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderBottom: "1px solid rgba(26,23,20,0.4)",
            paddingBottom: 2,
            transition: "color 0.15s ease, border-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#2D5F3F";
            (e.currentTarget as HTMLElement).style.borderBottomColor = "#2D5F3F";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#1A1714";
            (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(26,23,20,0.4)";
          }}
        >
          {expanded ? "Hide receipts ↑" : `${claim.evidence.length} receipt${claim.evidence.length === 1 ? "" : "s"} ↓`}
        </button>
      </div>
    </article>
  );
}

function ConfidenceMark({ confidence }: { confidence: string }) {
  const filled = confidence === "high" ? 3 : confidence === "medium" ? 2 : 1;
  const label = confidence === "high" ? "High" : confidence === "medium" ? "Medium" : "Emerging";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }} title={`${confidence} confidence`}>
      <span style={{ display: "inline-flex", gap: 2, alignItems: "flex-end" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 4,
              height: i === 0 ? 6 : i === 1 ? 9 : 12,
              background: i < filled ? "#2D5F3F" : "rgba(26,23,20,0.18)",
            }}
          />
        ))}
      </span>
      <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "#2D5F3F", textTransform: "uppercase" }}>
        {label}
      </span>
    </span>
  );
}

function Stat({ n, label, highlight = false }: { n: number; label: string; highlight?: boolean }) {
  return (
    <div
      style={{
        padding: "28px 22px",
        borderRight: "1px solid #1A1714",
        position: "relative",
      }}
    >
      <div
        className="serif-display"
        style={{
          fontSize: 56,
          fontWeight: 350,
          color: highlight ? "#2D5F3F" : "#1A1714",
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          fontVariationSettings: '"opsz" 144',
          marginBottom: 8,
        }}
      >
        {String(n).padStart(2, "0")}
      </div>
      <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "#4A423A", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function SourceLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 240px) 1fr", gap: 18, alignItems: "baseline", paddingBottom: 12, borderBottom: "1px dashed #D9CFB8" }}>
      <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "#8C8273", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontStyle: "italic", color: "#1A1714", fontWeight: 400, fontVariationSettings: '"opsz" 30' }}>
        {value}
      </span>
    </div>
  );
}

function CenterPad({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div className="paper-card" style={{ padding: "40px 44px", maxWidth: 540, textAlign: "left", background: "#FBF6E8" }}>
        {children}
      </div>
    </div>
  );
}

/* Stable display number from username */
function hashId(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return String(h % 9999).padStart(4, "0");
}
