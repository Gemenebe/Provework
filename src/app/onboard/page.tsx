"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PassportMark from "@/components/PassportMark";
import type { Claim, PassportSubject, ScanEvent } from "@/lib/types";

const CONFIDENCE_LABEL: Record<string, string> = {
  high: "High",
  medium: "Medium",
  low: "Emerging",
};

export default function ScanPage() {
  const [username, setUsername] = useState("");
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState<PassportSubject | null>(null);
  const [progress, setProgress] = useState<{ stage: string; detail: string } | null>(null);
  const [progressLog, setProgressLog] = useState<string[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [scannedHandle, setScannedHandle] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function startScan(handle: string) {
    const clean = handle.trim().replace(/^@/, "");
    if (!clean) return;
    setScanning(true);
    setDone(false);
    setError(null);
    setSubject(null);
    setProgress({ stage: "init", detail: "Connecting to GitHub" });
    setProgressLog([`init · connecting to github`]);
    setClaims([]);
    setScannedHandle(clean);

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: clean }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error(`Scan failed: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";
        for (const part of parts) {
          const line = part.split("\n").find((l) => l.startsWith("data:"));
          if (!line) continue;
          try {
            const event = JSON.parse(line.slice(5).trim()) as ScanEvent;
            handleEvent(event);
          } catch {
            /* ignore */
          }
        }
      }
      setScanning(false);
      setDone(true);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError((e as Error).message);
      setScanning(false);
    }
  }

  function handleEvent(event: ScanEvent) {
    switch (event.type) {
      case "progress":
        setProgress({ stage: event.stage, detail: event.detail });
        setProgressLog((log) => [...log, `${event.stage} · ${event.detail.toLowerCase()}`].slice(-10));
        break;
      case "subject":
        setSubject(event.subject);
        break;
      case "claim":
        setClaims((prev) => [...prev, event.claim]);
        break;
      case "done":
        setProgress({ stage: "done", detail: `passport issued · ${event.passport.claims.length} claims` });
        setProgressLog((log) => [...log, `done · passport issued`]);
        break;
      case "error":
        setError(event.message);
        setScanning(false);
        break;
    }
  }

  function reset() {
    setScanning(false);
    setDone(false);
    setError(null);
    setSubject(null);
    setProgress(null);
    setProgressLog([]);
    setClaims([]);
    setScannedHandle(null);
    setUsername("");
  }

  const showInput = !scanning && !done && !subject;

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      {/* Document header bar */}
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

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span className="font-mono" style={{ fontSize: 10.5, color: "#8C8273", letterSpacing: "0.18em" }}>
              FILE 02 · ISSUE PASSPORT
            </span>
            {scannedHandle && (
              <button
                onClick={reset}
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "#1A1714",
                  background: "transparent",
                  border: "1px solid #1A1714",
                  padding: "8px 14px",
                  cursor: "pointer",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                ← New scan
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="section-max" style={{ padding: "72px 40px 120px", maxWidth: 1080 }}>
        {/* ── EMPTY ── */}
        {showInput && (
          <ScanInput username={username} setUsername={setUsername} onSubmit={() => startScan(username)} />
        )}

        {/* ── ACTIVE / DONE ── */}
        {!showInput && (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <SubjectMasthead
              subject={subject}
              fallbackHandle={scannedHandle}
              progress={progress}
              progressLog={progressLog}
              scanning={scanning}
              done={done}
            />

            <ClaimsLedger claims={claims} scanning={scanning} />

            {done && claims.length > 0 && scannedHandle && (
              <DoneStrip username={scannedHandle} claimCount={claims.length} />
            )}

            {error && (
              <div
                style={{
                  padding: "20px 22px",
                  background: "#FBF6E8",
                  border: "1px solid #7C1D1D",
                  fontSize: 14,
                  color: "#1A1714",
                }}
              >
                <div className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.18em", color: "#7C1D1D", marginBottom: 6 }}>
                  SCAN HALTED
                </div>
                <div style={{ marginBottom: 14 }}>{error}</div>
                <button
                  onClick={reset}
                  className="btn-outline"
                  style={{ padding: "10px 16px", fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Try a different handle
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────── */

function ScanInput({
  username,
  setUsername,
  onSubmit,
}: {
  username: string;
  setUsername: (s: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div style={{ paddingTop: 28 }}>
      <div className="hairline-double" style={{ width: 60, marginBottom: 28 }} />
      <div
        className="font-mono"
        style={{ fontSize: 11, letterSpacing: "0.22em", color: "#2D5F3F", textTransform: "uppercase", marginBottom: 28 }}
      >
        ¶ Issue · Step 01
      </div>

      <h1 className="serif-display heading-lg" style={{ marginBottom: 22, maxWidth: 880 }}>
        Type a GitHub handle.
        <br />
        <span className="serif-italic">Watch the evidence appear.</span>
      </h1>

      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 19,
          lineHeight: 1.45,
          color: "#4A423A",
          maxWidth: 640,
          marginBottom: 56,
          fontWeight: 400,
          fontVariationSettings: '"opsz" 30',
        }}
      >
        We read what someone has actually built — repos, READMEs, commit history — and emit
        evidence-cited skill claims an employer can verify in one click. No CV. No claims
        without receipts.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 28 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 24, alignItems: "end" }}>
          <div>
            <label
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "#8C8273",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              }}
            >
              Subject
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                borderBottom: "1.5px solid #1A1714",
                paddingBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 26,
                  color: "#8C8273",
                  fontWeight: 380,
                  fontVariationSettings: '"opsz" 100',
                }}
              >
                github.com/
              </span>
              <input
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="any-handle"
                className="input-doc"
              />
            </div>
          </div>
          <button type="submit" disabled={!username.trim()} className="btn-ink" style={{ height: 64, padding: "0 30px" }}>
            <span
              className="font-mono"
              style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Run scan
            </span>
            <span aria-hidden style={{ fontSize: 18 }}>
              →
            </span>
          </button>
        </div>
      </form>

      <div
        className="font-mono"
        style={{ fontSize: 12, color: "#4A423A", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}
      >
        <span>§</span>
        <span>Suggested ringer:</span>
        <button
          onClick={() => {
            setUsername("devwraithe");
            setTimeout(onSubmit, 50);
          }}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            color: "#2D5F3F",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            cursor: "pointer",
            borderBottom: "1px solid #2D5F3F",
          }}
        >
          @devwraithe
        </button>
        <span>— a self-taught Solana engineer, scanned live.</span>
      </div>
    </div>
  );
}

function SubjectMasthead({
  subject,
  fallbackHandle,
  progress,
  progressLog,
  scanning,
  done,
}: {
  subject: PassportSubject | null;
  fallbackHandle: string | null;
  progress: { stage: string; detail: string } | null;
  progressLog: string[];
  scanning: boolean;
  done: boolean;
}) {
  const handle = subject?.username || fallbackHandle || "";

  return (
    <div>
      <div className="hairline-double" style={{ marginBottom: 22 }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
          gap: 56,
          alignItems: "start",
        }}
      >
        {/* Left: subject identity */}
        <div>
          <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#8C8273", marginBottom: 10 }}>
            BEARER
          </div>
          <h1 className="serif-display" style={{ fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 360, lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 14 }}>
            {subject?.name ? (
              subject.name
            ) : (
              <span className="serif-italic" style={{ color: "#8C8273" }}>
                {handle ? `@${handle}` : "—"}
              </span>
            )}
          </h1>

          <div className="font-mono" style={{ fontSize: 12, color: "#4A423A", letterSpacing: "0.06em", display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 18 }}>
            <span>@{handle || "—"}</span>
            {subject?.location && <span>· {subject.location}</span>}
            {subject?.public_repos != null && <span>· {subject.public_repos} repos</span>}
            {subject?.followers != null && <span>· {subject.followers} followers</span>}
          </div>

          {subject?.bio && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.5,
                color: "#4A423A",
                fontWeight: 400,
                fontVariationSettings: '"opsz" 30',
                maxWidth: 520,
              }}
            >
              &ldquo;{subject.bio}&rdquo;
            </p>
          )}
        </div>

        {/* Right: status panel + log */}
        <div
          style={{
            background: "#1A1714",
            color: "#F1EBDD",
            padding: "22px 24px",
            border: "1px solid #1A1714",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
            <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.22em", color: "#A8987F" }}>
              SCAN STATUS
            </span>
            <StatusBadge done={done} scanning={scanning} />
          </div>

          {progress && (
            <div style={{ paddingBottom: 12, borderBottom: "1px solid #4A423A" }}>
              <div
                className="font-mono"
                style={{ fontSize: 9.5, letterSpacing: "0.2em", color: "#A8987F", textTransform: "uppercase", marginBottom: 4 }}
              >
                Now
              </div>
              <div
                className="font-display"
                style={{ fontSize: 19, fontStyle: "italic", fontWeight: 380, fontVariationSettings: '"opsz" 30', color: "#F1EBDD", lineHeight: 1.2 }}
              >
                {progress.detail}
              </div>
            </div>
          )}

          <div>
            <div
              className="font-mono"
              style={{ fontSize: 9.5, letterSpacing: "0.2em", color: "#A8987F", marginBottom: 8 }}
            >
              EVENT LOG
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 11.5,
                lineHeight: 1.65,
                color: "#A8987F",
                maxHeight: 140,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {progressLog.length === 0 && <span>—</span>}
              {progressLog.slice().reverse().slice(0, 7).map((entry, i) => (
                <div
                  key={`${entry}-${i}`}
                  style={{
                    color: i === 0 ? "#F1EBDD" : "#A8987F",
                    opacity: 1 - i * 0.12,
                    transition: "opacity 0.4s ease, color 0.4s ease",
                  }}
                >
                  <span style={{ color: "#5C8970", marginRight: 6 }}>›</span>
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="hairline-soft" style={{ marginTop: 36 }} />
    </div>
  );
}

function StatusBadge({ done, scanning }: { done: boolean; scanning: boolean }) {
  if (done) {
    return (
      <span
        className="font-mono"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "#9CCEAB",
          padding: "4px 10px",
          border: "1px solid #2D5F3F",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#9CCEAB" }} />
        ISSUED
      </span>
    );
  }
  if (scanning) {
    return (
      <span
        className="font-mono"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "#A8987F",
          padding: "4px 10px",
          border: "1px solid #A8987F",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#9CCEAB", animation: "pulse-dot 1.4s ease-in-out infinite" }} />
        IN FLIGHT
      </span>
    );
  }
  return null;
}

function ClaimsLedger({ claims, scanning }: { claims: Claim[]; scanning: boolean }) {
  if (claims.length === 0 && !scanning) return null;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div
            className="font-mono"
            style={{ fontSize: 10.5, letterSpacing: "0.22em", color: "#2D5F3F", marginBottom: 6 }}
          >
            ¶ Ledger
          </div>
          <h2 className="serif-display heading-md">Evidence-cited claims</h2>
        </div>
        <span className="font-mono" style={{ fontSize: 11, color: "#8C8273", letterSpacing: "0.12em" }}>
          {String(claims.length).padStart(2, "0")} {claims.length === 1 ? "ENTRY" : "ENTRIES"}
        </span>
      </div>

      <div
        style={{
          borderTop: "1px solid #1A1714",
          borderBottom: "1px solid #1A1714",
        }}
      >
        {claims.map((c, i) => (
          <ClaimEntry key={`${c.skill}-${i}`} claim={c} index={i} isLast={i === claims.length - 1 && !scanning} />
        ))}
        {scanning && <ScanningRow first={claims.length === 0} />}
      </div>
    </div>
  );
}

function ClaimEntry({ claim, index, isLast }: { claim: Claim; index: number; isLast: boolean }) {
  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "100px minmax(0, 1fr)",
        gap: 32,
        padding: "32px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(26,23,20,0.18)",
        animation: "fade-up 0.45s cubic-bezier(.2,.7,.3,1) both",
        animationDelay: `${Math.min(index * 40, 200)}ms`,
      }}
    >
      <div>
        <div
          className="font-display"
          style={{
            fontStyle: "italic",
            fontSize: 50,
            color: "#1A1714",
            lineHeight: 0.9,
            fontWeight: 320,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <span
            className="font-mono"
            style={{ fontSize: 11.5, letterSpacing: "0.18em", color: "#1A1714", textTransform: "uppercase", fontWeight: 500 }}
          >
            {claim.skill}
          </span>
          <span style={{ height: 1, flex: 1, background: "#D9CFB8", maxWidth: 60 }} />
          <span
            className="font-mono"
            style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "#8C8273", textTransform: "uppercase" }}
          >
            {claim.category}
          </span>
          <ConfidenceMark confidence={claim.confidence} />
        </div>

        <p className="prose-claim" style={{ marginBottom: 18 }}>
          {claim.claim_text}
          <sup className="cite">
            {claim.evidence.map((_, j) => `[${j + 1}]`).join("")}
          </sup>
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
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
      </div>
    </article>
  );
}

function ConfidenceMark({ confidence }: { confidence: string }) {
  const filled = confidence === "high" ? 3 : confidence === "medium" ? 2 : 1;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }} title={`${confidence} confidence`}>
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
        {CONFIDENCE_LABEL[confidence] || confidence}
      </span>
    </span>
  );
}

function ScanningRow({ first }: { first: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px minmax(0, 1fr)",
        gap: 32,
        padding: "32px 0",
      }}
    >
      <div className="numeral serif-italic" style={{ color: "rgba(26,23,20,0.2)" }}>
        {first ? "01" : "··"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="shimmer" style={{ height: 16, width: "30%" }} />
        <div className="shimmer" style={{ height: 22, width: "85%" }} />
        <div className="shimmer" style={{ height: 22, width: "60%" }} />
        <div className="shimmer" style={{ height: 38, width: "100%", marginTop: 6 }} />
      </div>
    </div>
  );
}

function DoneStrip({ username, claimCount }: { username: string; claimCount: number }) {
  return (
    <div
      style={{
        background: "#1A1714",
        color: "#F1EBDD",
        padding: "32px 36px",
        border: "1px solid #1A1714",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 32,
        alignItems: "center",
      }}
    >
      <div>
        <div
          className="font-mono"
          style={{ fontSize: 11, letterSpacing: "0.22em", color: "#9CCEAB", marginBottom: 12 }}
        >
          ¶ Done · Passport sealed
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(28px, 3vw, 40px)",
            lineHeight: 1.05,
            fontWeight: 360,
            letterSpacing: "-0.02em",
            fontVariationSettings: '"opsz" 144',
            marginBottom: 8,
          }}
        >
          <span className="serif-italic">{claimCount}</span> evidence-cited claim
          {claimCount === 1 ? "" : "s"} · ready to share.
        </h2>
        <p className="font-mono" style={{ fontSize: 12, letterSpacing: "0.04em", color: "#A8987F" }}>
          Filed under @{username}. Anyone with the link can verify in one click.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link
          href={`/passport/${username}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#F1EBDD",
            color: "#1A1714",
            padding: "13px 22px",
            border: "1px solid #F1EBDD",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          View passport →
        </Link>
        <button
          onClick={() => {
            const url = `${window.location.origin}/passport/${username}`;
            navigator.clipboard.writeText(url);
          }}
          style={{
            background: "transparent",
            color: "#F1EBDD",
            padding: "13px 22px",
            border: "1px solid rgba(241,235,221,0.3)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Copy share link
        </button>
      </div>
    </div>
  );
}
