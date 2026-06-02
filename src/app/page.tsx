import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PassportMark from "@/components/PassportMark";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* ══════════════════════════════════════════════════════════
          HERO  ·  the document opens
          ═══════════════════════════════════════════════════════ */}
      <section className="hero-section-mobile" style={{ paddingTop: 160, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        <div className="section-max">
          {/* Document header strip */}
          <div
            className="doc-strip-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 18,
              marginBottom: 56,
              borderBottom: "1px solid #1A1714",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span className="font-mono eyebrow-faint" style={{ fontSize: 11 }}>
              Vol. I · No. 001
            </span>
            <span className="font-mono eyebrow-faint" style={{ fontSize: 11 }}>
              World Bank · Open Talent Challenge
            </span>
            <span className="font-mono eyebrow-faint" style={{ fontSize: 11 }}>
              Filed Apr 26, 2026
            </span>
          </div>

          {/* Hero grid */}
          <div
            className="stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 64,
              alignItems: "end",
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "#2D5F3F",
                  textTransform: "uppercase",
                  marginBottom: 32,
                }}
              >
                ¶ Manifesto · 0.1
              </div>

              <h1 className="serif-display heading-xl" style={{ marginBottom: 36 }}>
                The world&rsquo;s talent
                <br />
                is not invisible.
                <br />
                <span className="serif-italic" style={{ color: "#2D5F3F" }}>
                  Its evidence
                </span>{" "}
                is.
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  lineHeight: 1.45,
                  color: "#4A423A",
                  maxWidth: 620,
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 30',
                  marginBottom: 44,
                }}
              >
                A self-taught coder ships a React app from a flat in Accra. A community
                organiser maps three thousand streets in Lagos. A translator localises
                a textbook into Yoruba. The work happens. The receipts exist. The
                economy still cannot see them.
                <br />
                <br />
                <em>ProveWork is the open infrastructure layer that fixes that.</em>
              </p>

              <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/onboard" className="btn-ink">
                  <span className="font-mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Issue a passport
                  </span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/employers/discover"
                  className="btn-link-ink"
                  style={{ fontSize: 14 }}
                >
                  Read the protocol
                </Link>
              </div>

              <div
                style={{
                  marginTop: 56,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11.5,
                  color: "#8C8273",
                  letterSpacing: "0.04em",
                  display: "flex",
                  gap: 22,
                  flexWrap: "wrap",
                }}
              >
                <span>§ verifiable credential</span>
                <span>§ evidence-cited</span>
                <span>§ open API</span>
                <span>§ no platform lock-in</span>
              </div>
            </div>

            {/* Right column — passport spread */}
            <div className="doc-spread-mobile" style={{ width: 360, position: "relative" }}>
              <DocumentSpread />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THESIS  ·  one big serif sentence the room can read
          ═══════════════════════════════════════════════════════ */}
      <section
        id="protocol"
        className="pad-mobile-md"
        style={{
          padding: "120px 0",
          background: "#E8DFC9",
          borderTop: "1px solid #1A1714",
          borderBottom: "1px solid #1A1714",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-max">
          <div
            className="stack-md-numeral"
            style={{
              display: "grid",
              gridTemplateColumns: "120px minmax(0, 1fr)",
              gap: 32,
              maxWidth: 1080,
            }}
          >
            <div className="numeral">¶ I</div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.22,
                  fontWeight: 360,
                  letterSpacing: "-0.018em",
                  color: "#1A1714",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                The binding constraint on global talent mobility is not skill —
                it is <span className="serif-italic">verification</span>. Self-taught
                workers generate signal constantly. Commits, posts, contributions,
                projects shipped. The signal is unaggregated and untranslated, so
                employers fall back on credentials, and credentials are precisely
                what the people we are trying to reach do not have.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.5vw, 32px)",
                  lineHeight: 1.32,
                  fontWeight: 400,
                  color: "#2D5F3F",
                  marginTop: 28,
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                We make verification cheap by having Claude attest with receipts —
                every claim cites the artifact that proves it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THE THREE PRIMITIVES
          ═══════════════════════════════════════════════════════ */}
      <section className="pad-mobile-md" style={{ padding: "120px 0", position: "relative", zIndex: 1 }}>
        <div className="section-max">
          <SectionHead numeral="¶ II" eyebrow="Primitives" title="Three layers, none of them a job board." />

          <div
            className="primitives-mobile"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 0,
              borderTop: "1px solid #1A1714",
              borderBottom: "1px solid #1A1714",
            }}
          >
            {[
              {
                tag: "I.",
                title: "Connectors",
                body: "Read what people have already built. GitHub today. Stack Overflow, OpenStreetMap, WhatsApp Business, YouTube tomorrow. Adding the next is mechanical work.",
                detail: "src/lib/github.ts → ~150 LOC per source",
              },
              {
                tag: "II.",
                title: "Synthesis",
                body: "Claude reads the evidence and emits skill claims. Forbidden from inventing — every claim must cite a specific artifact in the input. The model attests, never judges.",
                detail: "claude-opus-4-7 · adaptive thinking · structured tool use",
              },
              {
                tag: "III.",
                title: "Passport",
                body: "Output is a verifiable credential — JSON-LD, signed, portable. Anyone can build employer-side discovery on top. Open API, open primitives.",
                detail: "GET /api/passport/[handle] · download · share",
              },
            ].map((p, i) => (
              <div
                key={p.tag}
                style={{
                  padding: "44px 36px",
                  borderRight: i < 2 ? "1px solid #1A1714" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  position: "relative",
                  background: "transparent",
                }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: 56,
                    fontStyle: "italic",
                    fontWeight: 320,
                    color: "#2D5F3F",
                    lineHeight: 0.9,
                    fontVariationSettings: '"opsz" 144',
                  }}
                >
                  {p.tag}
                </span>
                <h3 className="serif-display" style={{ fontSize: 28, fontWeight: 420 }}>
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15.5,
                    lineHeight: 1.55,
                    color: "#4A423A",
                  }}
                >
                  {p.body}
                </p>
                <span className="font-mono" style={{ fontSize: 10.5, color: "#8C8273", letterSpacing: "0.06em", marginTop: "auto", paddingTop: 12 }}>
                  {p.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ANATOMY OF A CLAIM (the moneymaker section)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="pad-mobile-md"
        style={{
          padding: "120px 0",
          background: "#FBF6E8",
          borderTop: "1px solid #1A1714",
          borderBottom: "1px solid #1A1714",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-max">
          <SectionHead numeral="¶ III" eyebrow="Anatomy" title="A claim. A receipt. Nothing else." />

          <div
            className="stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
              gap: 56,
              alignItems: "start",
            }}
          >
            {/* Claim card — looks like an entry in a passport */}
            <div className="paper-card" style={{ padding: "32px 36px", background: "#F1EBDD", borderColor: "#1A1714" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
                <span className="font-mono" style={{ fontSize: 11, color: "#8C8273", letterSpacing: "0.1em" }}>
                  ENTRY 02
                </span>
                <span style={{ height: 1, flex: 1, background: "#D9CFB8" }} />
                <span className="font-mono" style={{ fontSize: 11, color: "#2D5F3F", letterSpacing: "0.1em" }}>
                  HIGH CONFIDENCE
                </span>
              </div>

              <div className="font-mono" style={{ fontSize: 11, color: "#1A1714", letterSpacing: "0.18em", marginBottom: 14 }}>
                REACT · SHIPPING
              </div>

              <p className="prose-claim" style={{ marginBottom: 22 }}>
                Designed and shipped Boost Track, a React application that gives
                backend engineers a pre-wired frontend so they can stand up a UI
                for their API in minutes.
                <sup className="cite">[1][2]</sup>
              </p>

              <div style={{ borderTop: "1px solid #D9CFB8", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <CitationLine
                  n={1}
                  source="github-repo"
                  excerpt="Boost Track is a React application designed to accelerate frontend development for backend APIs."
                />
                <CitationLine
                  n={2}
                  source="github-readme"
                  excerpt="Sign-in, sign-up, password reset, and profile management screens are readily available."
                />
              </div>
            </div>

            {/* Annotation column — explains what makes this different */}
            <div style={{ paddingTop: 12 }}>
              <div className="hairline-double" style={{ width: 80, marginBottom: 22 }} />
              <h3 className="serif-display" style={{ fontSize: 30, fontWeight: 400, lineHeight: 1.15, marginBottom: 22 }}>
                Every claim is a <span className="serif-italic">pointer</span>, not a summary.
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  ["¶", "Click the citation. The original artifact opens in one tab. The claim is verifiable in seconds, not minutes."],
                  ["¶", "Confidence is a property of the evidence, not the person. Multi-source = high. Single-source = medium. Topic tag = low."],
                  ["¶", "No citation, no claim. Claude is system-prompted to refuse fabrication. The model attests; it does not judge."],
                ].map(([sym, text], i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 14, alignItems: "start" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#2D5F3F", fontSize: 18 }}>
                      {sym}
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55, color: "#4A423A" }}>{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROCESS  ·  three numbered moves
          ═══════════════════════════════════════════════════════ */}
      <section className="pad-mobile-md" style={{ padding: "120px 0", position: "relative", zIndex: 1 }}>
        <div className="section-max">
          <SectionHead numeral="¶ IV" eyebrow="Method" title="The whole transaction in 90 seconds." />

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[
              ["I", "Type a handle.", "Any GitHub identifier. No login. No profile to fill in. We treat the public footprint as the record."],
              ["II", "Watch the receipts.", "Connectors fetch; Claude reads; claims stream in one by one. Each one cites the artifact that proves it. Average run: under thirty seconds."],
              ["III", "Hand it to anyone.", "The passport is signed, downloadable, embeddable. An employer in Berlin and a recruiter in Bangalore see the same evidence layer."],
            ].map(([n, head, body], i, arr) => (
              <li
                key={String(n)}
                className="stack-md-numeral"
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px minmax(0, 1fr)",
                  gap: 40,
                  padding: "44px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid #1A1714" : "none",
                  borderTop: i === 0 ? "1px solid #1A1714" : "none",
                  alignItems: "start",
                }}
              >
                <span className="numeral serif-italic">{n}.</span>
                <div>
                  <h3 className="serif-display" style={{ fontSize: "clamp(28px, 2.6vw, 38px)", fontWeight: 420, lineHeight: 1.1, marginBottom: 12 }}>
                    {head}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "#4A423A", maxWidth: 720 }}>
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          QUOTE / IMPACT  ·  one big stamp
          ═══════════════════════════════════════════════════════ */}
      <section
        className="pad-mobile-md"
        style={{
          padding: "140px 0",
          background: "#1A1714",
          color: "#F1EBDD",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-max">
          <div className="stack-md" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 64 }}>
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "#A8987F",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                ¶ V — Closing
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(34px, 4.2vw, 60px)",
                  fontWeight: 320,
                  lineHeight: 1.08,
                  letterSpacing: "-0.022em",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                The same evidence layer that surfaces a senior React engineer in
                Berlin{" "}
                <span className="serif-italic" style={{ color: "#9CCEAB" }}>
                  surfaces a self-taught coder in Accra.
                </span>{" "}
                The economy stops being able to claim it cannot see them.
              </p>

              <div style={{ marginTop: 48, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                <Link
                  href="/onboard"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#F1EBDD",
                    color: "#1A1714",
                    border: "1px solid #F1EBDD",
                    padding: "16px 26px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Issue your passport <span aria-hidden>→</span>
                </Link>
                <Link
                  href="https://github.com"
                  className="font-mono"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#A8987F",
                    textDecoration: "none",
                    borderBottom: "1px solid #4A423A",
                    paddingBottom: 2,
                  }}
                >
                  Read the source
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <PassportMark size={140} color="#F1EBDD" />
              <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#A8987F" }}>
                ATTESTED · 2026
              </span>
            </div>
          </div>
        </div>
      </section>

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
    <div className="stack-md-numeral" style={{ marginBottom: 56, display: "grid", gridTemplateColumns: "120px minmax(0, 1fr)", gap: 32, alignItems: "end" }}>
      <span className="numeral">{numeral}</span>
      <div>
        <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#2D5F3F", textTransform: "uppercase", marginBottom: 14 }}>
          {eyebrow}
        </div>
        <h2 className="serif-display heading-lg">{title}</h2>
      </div>
    </div>
  );
}

function CitationLine({ n, source, excerpt }: { n: number; source: string; excerpt: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "26px auto 1fr", gap: 12, alignItems: "start" }}>
      <span className="font-mono" style={{ fontSize: 11, color: "#2D5F3F", letterSpacing: "0.06em", paddingTop: 2 }}>
        [{n}]
      </span>
      <span className="font-mono" style={{ fontSize: 10.5, color: "#8C8273", letterSpacing: "0.08em", textTransform: "uppercase", paddingTop: 3 }}>
        {source}
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontStyle: "italic", color: "#4A423A", lineHeight: 1.45 }}>
        &ldquo;{excerpt}&rdquo;
      </span>
    </div>
  );
}

/* The mock "passport spread" on the right of the hero */
function DocumentSpread() {
  return (
    <div
      style={{
        position: "relative",
        background: "#FBF6E8",
        border: "1px solid #1A1714",
        padding: "26px 28px",
        boxShadow: "8px 8px 0 0 #1A1714",
        transform: "rotate(2deg)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.18em", color: "#8C8273" }}>
          PASSPORT · No. 0047
        </span>
        <PassportMark size={36} spinning={false} />
      </div>

      <div className="hairline-double" style={{ marginBottom: 16 }} />

      <div className="font-mono" style={{ fontSize: 9.5, color: "#8C8273", letterSpacing: "0.1em", marginBottom: 4 }}>
        BEARER
      </div>
      <div className="serif-display" style={{ fontSize: 22, fontWeight: 380, marginBottom: 4 }}>
        Ibrahim Ibrahim
      </div>
      <div className="font-mono" style={{ fontSize: 10.5, color: "#4A423A", letterSpacing: "0.04em", marginBottom: 22 }}>
        @devwraithe · Cosmos
      </div>

      <div className="font-mono" style={{ fontSize: 9.5, color: "#8C8273", letterSpacing: "0.1em", marginBottom: 10 }}>
        EVIDENCE-CITED CLAIMS · 7
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
        {[
          { skill: "rust", conf: "high" },
          { skill: "solana", conf: "high" },
          { skill: "smart-contract-engineering", conf: "high" },
          { skill: "systems-programming", conf: "med" },
          { skill: "self-directed-learning", conf: "med" },
        ].map((c) => (
          <li key={c.skill} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center", paddingBottom: 6, borderBottom: "1px dashed #D9CFB8" }}>
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "#1A1714" }}>{c.skill}</span>
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: c.conf === "high" ? "#2D5F3F" : "#4A423A", textTransform: "uppercase" }}>
              {c.conf}
            </span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
        <div className="rubber-stamp" style={{ fontSize: 13 }}>
          ISSUED
          <span className="font-mono" style={{ fontSize: 8.5, fontStyle: "normal", letterSpacing: "0.12em", marginTop: 2, fontWeight: 500 }}>
            APR · 2026
          </span>
        </div>
      </div>
    </div>
  );
}
