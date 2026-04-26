import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PassportCard from "@/components/PassportCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import SkillChip from "@/components/SkillChip";

/* ─── shared style helpers ─────────────────────────── */
const MAX: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };
const SECTION: React.CSSProperties = { padding: "100px 0", position: "relative" };

/* ─── data ──────────────────────────────────────────── */
const FEATURES = [
  { icon: "🪪", title: "Verified Skill Passports", body: "Not a CV. A living proof-of-work record pulled from what you've actually built — repos, commits, deployments, designs." },
  { icon: "🌍", title: "Portable Credentials", body: "One passport, every opportunity. Works across borders, industries, and platforms — from Lagos to London to Lima." },
  { icon: "🔍", title: "Employer-Ready Discovery", body: "Search talent by what they can prove, not what they claim. Filter by verified depth, not degree or job title." },
];

const STEPS = [
  { n: "01", title: "Connect Your Portfolio", body: "Link GitHub, Behance, or LinkedIn. We read your real output — commits, projects, work history." },
  { n: "02", title: "AI Verifies Your Skills", body: "Our model extracts skill signals from your portfolio and builds a verified, tamper-proof Skill Passport." },
  { n: "03", title: "Get Discovered", body: "Employers find you by proof, not pedigree. Your work speaks — globally, without gatekeeping." },
];

const SKILLS_SHOWCASE = [
  { label: "React", verified: true }, { label: "TypeScript", verified: true },
  { label: "Python", verified: false }, { label: "Figma", verified: true },
  { label: "Node.js", verified: true }, { label: "System Design", verified: true },
  { label: "PostgreSQL", verified: false }, { label: "AWS", verified: true },
  { label: "UI/UX Design", verified: true }, { label: "Docker", verified: false },
  { label: "GraphQL", verified: true }, { label: "Machine Learning", verified: false },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 60, position: "relative", overflow: "hidden" }}>

        {/* Radial glow behind right column */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,111,191,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        {/* Radial glow bottom left */}
        <div style={{ position: "absolute", bottom: "5%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,45,82,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ ...MAX, width: "100%", display: "flex", alignItems: "center", gap: 80 }}>

          {/* Left */}
          <div style={{ flex: "1 1 0", maxWidth: 600 }}>

            {/* Live badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.80)", backdropFilter: "blur(12px)", border: "1px solid rgba(15,45,82,0.10)", borderRadius: 999, padding: "6px 14px 6px 8px", marginBottom: 32 }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: "rgba(34,197,94,0.12)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 2s ease-in-out infinite", display: "block" }} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0F2D52" }}>
                47,832 skills verified today
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontSize: "clamp(40px, 5vw, 62px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-2px", color: "#0D1B2A", marginBottom: 24 }}>
              The World&apos;s Talent<br />
              Is Not Invisible.<br />
              <span style={{ color: "#0F2D52" }}>Your Infrastructure Is.</span>
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#6B7280", maxWidth: 460, marginBottom: 36 }}>
              <strong style={{ color: "#0D1B2A", fontWeight: 600 }}>Prove Work</strong> reads what people{" "}
              <em style={{ fontStyle: "italic" }}>do</em>, not what they <em style={{ fontStyle: "italic" }}>claim</em>.
              A behavioral credential layer for the global workforce.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/onboard" style={{
                display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
                background: "#0F2D52", color: "#FAF8F4", fontWeight: 600, fontSize: 15,
                padding: "14px 28px", borderRadius: 12,
                boxShadow: "0 4px 20px rgba(15,45,82,0.30), 0 1px 0 rgba(255,255,255,0.1) inset",
                transition: "all 0.2s",
              }}>
                Get Your Skill Passport
              </Link>
              <Link href="/employers/discover" style={{
                display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
                background: "transparent", color: "#0F2D52", fontWeight: 600, fontSize: 15,
                padding: "14px 28px", borderRadius: 12, border: "1.5px solid #0F2D52",
                transition: "all 0.2s",
              }}>
                Discover Talent
              </Link>
            </div>

            {/* Social proof */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
              <div style={{ display: "flex" }}>
                {["A","K","Z","E","N"].map((l, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${210 + i * 12}, 60%, ${35 + i * 5}%)`, border: "2px solid #FAF8F4", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#FAF8F4" }}>
                    {l}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "#6B7280" }}>
                Joined by <strong style={{ color: "#0D1B2A" }}>2.4M+ professionals</strong> across 127 countries
              </p>
            </div>
          </div>

          {/* Right — Floating passport card */}
          <div style={{ flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Decorative glow */}
            <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,111,191,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
            <PassportCard floating />
          </div>
        </div>
      </section>

      {/* ══════════════════════ LOGOS / TRUST BAR ══════════════════════ */}
      <div style={{ borderTop: "1px solid rgba(15,45,82,0.07)", borderBottom: "1px solid rgba(15,45,82,0.07)", padding: "22px 0", background: "rgba(255,255,255,0.5)" }}>
        <div style={{ ...MAX, display: "flex", alignItems: "center", justifyContent: "center", gap: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", letterSpacing: "1.5px", textTransform: "uppercase" }}>Trusted by teams at</span>
          {["GitHub","Andela","Flutterwave","Paystack","TechCabal","Interswitch"].map((co) => (
            <span key={co} style={{ fontSize: 14, fontWeight: 700, color: "rgba(15,45,82,0.35)", letterSpacing: "-0.3px" }}>{co}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════ FEATURES ══════════════════════ */}
      <section style={SECTION}>
        <div style={MAX}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: "#2A6FBF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>
              What We Do
            </div>
            <h2 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#0D1B2A", letterSpacing: "-0.8px", marginBottom: 14 }}>
              Infrastructure for human potential
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 480, margin: "0 auto" }}>
              Three layers that turn raw talent into verifiable, portable, employer-ready proof.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} style={{
                background: "rgba(255,255,255,0.70)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(15,45,82,0.08)", borderRadius: 20, padding: 32,
                boxShadow: "0 2px 16px rgba(15,45,82,0.06), 0 0 0 1px rgba(255,255,255,0.8) inset",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: i === 0 ? "rgba(15,45,82,0.06)" : i === 1 ? "rgba(42,111,191,0.08)" : "rgba(34,197,94,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 22 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 600, fontSize: 18, color: "#0D1B2A", marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section id="how-it-works" style={{ background: "#0F2D52", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        {/* Dot grid overlay in navy */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        {/* Radial glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,111,191,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ ...MAX, position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>
              The Process
            </div>
            <h2 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#FAF8F4", letterSpacing: "-0.8px", marginBottom: 14 }}>
              From portfolio to passport in minutes
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.50)", maxWidth: 400, margin: "0 auto" }}>Connect once. Prove everything.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, position: "relative" }}>
            {/* connector line */}
            <div style={{ position: "absolute", top: 32, left: "calc(16.66% + 24px)", right: "calc(16.66% + 24px)", height: 1, background: "rgba(255,255,255,0.12)" }} />

            {STEPS.map((s) => (
              <div key={s.n} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 20, color: "#FAF8F4" }}>
                  {s.n}
                </div>
                <h3 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 600, fontSize: 18, color: "#FAF8F4", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.54)", lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #0a2240 0%, #1a4a80 100%)", padding: "64px 0" }}>
        <div style={{ ...MAX, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {[
            { end: 127, suffix: "", label: "Countries Represented" },
            { end: 0, display: "2.4M", label: "Skills Mapped" },
            { end: 89, suffix: "%", label: "Employer Match Rate" },
            { end: 48, suffix: "h", prefix: "<", label: "Max Verification Time" },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: "center", padding: "0 24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none" }}>
              <div style={{ fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 44, color: "#FAF8F4", letterSpacing: "-1.5px", lineHeight: 1, marginBottom: 8 }}>
                {s.display ? s.display : (
                  <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />
                )}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.50)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ SKILLS SHOWCASE ══════════════════════ */}
      <section style={SECTION}>
        <div style={{ ...MAX, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2A6FBF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>
            Verified Skills
          </div>
          <h2 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#0D1B2A", letterSpacing: "-0.8px", marginBottom: 14 }}>
            Every skill, backed by proof
          </h2>
          <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 480, margin: "0 auto 48px" }}>
            Green means verified against real work. Every chip links to evidence an employer can inspect.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, maxWidth: 640, margin: "0 auto" }}>
            {SKILLS_SHOWCASE.map((s) => (
              <SkillChip key={s.label} label={s.label} verified={s.verified} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIAL ══════════════════════ */}
      <section style={{ ...SECTION, background: "rgba(255,255,255,0.45)" }}>
        <div style={{ ...MAX, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {[
            { quote: "I got hired at a Berlin startup without a degree. My passport did the talking.", name: "Kofi Mensah", role: "Backend Engineer · Ghana", score: 91 },
            { quote: "ProveWork is the first tool that actually shows employers what our candidates are capable of.", name: "Aisha Kamara", role: "Head of Talent · Lagos", score: null },
            { quote: "I had 10 years of experience but no way to prove it. Now I have a passport that speaks louder than any CV.", name: "Priya Nair", role: "Product Designer · India", score: 84 },
          ].map((t) => (
            <div key={t.name} style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(15,45,82,0.08)", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(15,45,82,0.06)" }}>
              <div style={{ fontSize: 32, color: "#0F2D52", opacity: 0.3, marginBottom: 12, lineHeight: 1, fontFamily: "Georgia, serif" }}>&ldquo;</div>
              <p style={{ fontSize: 15, color: "#0D1B2A", lineHeight: 1.65, marginBottom: 20, fontStyle: "italic" }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #0F2D52, #2A6FBF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#FAF8F4", flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0D1B2A" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{t.role}</div>
                </div>
                {t.score && <div style={{ marginLeft: "auto", fontFamily: "var(--font-sora-var), sans-serif", fontWeight: 700, fontSize: 18, color: "#0F2D52" }}>{t.score}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ FINAL CTA ══════════════════════ */}
      <section style={{ padding: "140px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,111,191,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ ...MAX, position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: "#2A6FBF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>
            Get Started Free
          </div>
          <h2 style={{ fontFamily: "var(--font-sora-var), sans-serif", fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700, color: "#0D1B2A", letterSpacing: "-1.2px", lineHeight: 1.12, marginBottom: 20 }}>
            Your skills exist.<br />
            <span style={{ color: "#0F2D52" }}>Now prove them.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#6B7280", marginBottom: 40 }}>
            Join 2.4 million professionals who already have their Skill Passport.
          </p>
          <Link href="/onboard" style={{
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            background: "#0F2D52", color: "#FAF8F4", fontWeight: 600, fontSize: 16,
            padding: "16px 40px", borderRadius: 12,
            boxShadow: "0 4px 24px rgba(15,45,82,0.32)",
            transition: "all 0.2s",
          }}>
            Get Your Skill Passport →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
