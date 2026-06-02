"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PassportMark from "@/components/PassportMark";

/* ─── DATA ───────────────────────────────────────────────────── */
type RewardType = "cash" | "mixed" | "equity";
interface Problem {
  id: number;
  title: string;
  company: string;
  desc: string;
  skills: string[];
  reward: string;
  rewardType: RewardType;
  deadline: number;
  applicants: number;
  maxApplicants: number;
  open: boolean;
  hot: boolean;
  category: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "Build a real-time skill verification API",
    company: "TalentOS",
    desc: "REST API that connects to GitHub, extracts skill signals, and returns a confidence score. Must handle rate limits gracefully and return results in under two seconds.",
    skills: ["Node.js", "REST APIs", "GitHub API"],
    reward: "$800",
    rewardType: "cash",
    deadline: 5,
    applicants: 12,
    maxApplicants: 20,
    open: true,
    hot: true,
    category: "Backend",
  },
  {
    id: 2,
    title: "Design a credential sharing system for Web3",
    company: "ChainCred",
    desc: "Prototype a system where skill credentials are issued as verifiable credentials on-chain and selectively disclosed using ZK proofs.",
    skills: ["Solidity", "System Design", "ZK Proofs"],
    reward: "$1,200",
    rewardType: "cash",
    deadline: 10,
    applicants: 7,
    maxApplicants: 15,
    open: true,
    hot: true,
    category: "Blockchain",
  },
  {
    id: 3,
    title: "UX audit of our employer dashboard",
    company: "HireAfrica",
    desc: "Full UX audit of the talent discovery dashboard. Deliver a prioritised report with recommendations and mockups for the top three issues.",
    skills: ["UX Research", "Figma"],
    reward: "$200 + Cert",
    rewardType: "mixed",
    deadline: 7,
    applicants: 5,
    maxApplicants: 10,
    open: true,
    hot: false,
    category: "Design",
  },
  {
    id: 4,
    title: "Optimise ML pipeline for skill extraction",
    company: "NexaAI",
    desc: "Current skill extraction pipeline takes 45 seconds per user. Bring it under five. You will work with our existing Python codebase and Anthropic API integration.",
    skills: ["Python", "Machine Learning", "Anthropic API"],
    reward: "$600",
    rewardType: "cash",
    deadline: 14,
    applicants: 9,
    maxApplicants: 20,
    open: true,
    hot: false,
    category: "AI / ML",
  },
  {
    id: 5,
    title: "Build a mobile Skill Passport viewer",
    company: "PassportPro",
    desc: "Create a React Native screen that renders a Skill Passport beautifully. Must support offline mode and share-to-LinkedIn functionality.",
    skills: ["React Native", "UI/UX"],
    reward: "Equity + Mentorship",
    rewardType: "equity",
    deadline: 21,
    applicants: 3,
    maxApplicants: 10,
    open: true,
    hot: false,
    category: "Mobile",
  },
  {
    id: 6,
    title: "National Skill Map data pipeline",
    company: "LabourTech Africa",
    desc: "Build a data pipeline that aggregates anonymised skill data from ten African countries and produces weekly summary statistics for the public dashboard.",
    skills: ["Python", "PostgreSQL", "Data Engineering"],
    reward: "$500",
    rewardType: "cash",
    deadline: 3,
    applicants: 18,
    maxApplicants: 18,
    open: false,
    hot: false,
    category: "Data",
  },
];

const CATEGORIES = ["All", "Backend", "Blockchain", "Design", "AI / ML", "Mobile", "Data"];

export default function IgnitePage() {
  const [view, setView] = useState<"browse" | "post">("browse");
  const [applying, setApplying] = useState<number | null>(null);
  const [proof, setProof] = useState("");
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [filter, setFilter] = useState("All");

  const visible = PROBLEMS.filter((p) => filter === "All" || p.category === filter);
  const totalBounty = PROBLEMS.filter((p) => p.open && p.rewardType === "cash")
    .map((p) => parseInt(p.reward.replace(/[^0-9]/g, ""), 10))
    .reduce((a, b) => a + b, 0);

  function submit(id: number) {
    setSubmitted((prev) => [...prev, id]);
    setApplying(null);
    setProof("");
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 110, position: "relative", zIndex: 1 }}>
        <div className="section-max" style={{ paddingBottom: 100 }}>
          {/* Document strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 14,
              borderBottom: "1px solid #1A1714",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <span className="font-mono eyebrow-faint">FILE 04 · OPEN COMMISSIONS</span>
            <span className="font-mono eyebrow-faint">Real briefs · accepted submissions become evidence</span>
            <span className="font-mono eyebrow-faint">{visible.length} of {PROBLEMS.length} listings</span>
          </div>

          {/* Title block */}
          <div
            className="stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
              gap: 56,
              alignItems: "end",
              marginBottom: 48,
            }}
          >
            <div>
              <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#2D5F3F", marginBottom: 18 }}>
                ¶ Ignite · Classifieds
              </div>
              <h1 className="serif-display heading-xl" style={{ marginBottom: 22 }}>
                Solve real briefs.
                <br />
                <span className="serif-italic">Earn permanent receipts.</span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 19,
                  lineHeight: 1.45,
                  color: "#4A423A",
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 30',
                  maxWidth: 600,
                }}
              >
                Companies post commissions. You ship. Accepted submissions become
                permanent, evidence-cited claims on your passport — no different in
                weight from a public open-source contribution.
              </p>
            </div>

            <div className="ignite-bounty-mobile" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
              <div
                className="serif-display big-num-mobile"
                style={{
                  fontSize: 64,
                  fontWeight: 350,
                  letterSpacing: "-0.03em",
                  color: "#2D5F3F",
                  lineHeight: 0.9,
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                ${totalBounty.toLocaleString()}
              </div>
              <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "#8C8273", textTransform: "uppercase" }}>
                Open bounty pool · USD
              </span>
            </div>
          </div>

          {/* Tab strip */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginBottom: 32,
              borderBottom: "1px solid #1A1714",
            }}
          >
            {(["browse", "post"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="font-mono"
                style={{
                  padding: "14px 28px",
                  background: "transparent",
                  border: "none",
                  borderBottom: view === v ? "3px solid #2D5F3F" : "3px solid transparent",
                  marginBottom: -1,
                  color: view === v ? "#1A1714" : "#8C8273",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: view === v ? 600 : 500,
                  cursor: "pointer",
                  transition: "color 0.15s ease",
                }}
              >
                {v === "browse" ? "Browse listings" : "Post a commission"}
              </button>
            ))}
            <span style={{ flex: 1 }} />
          </div>

          {view === "browse" && (
            <>
              {/* Category filter */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
                {CATEGORIES.map((c) => {
                  const on = filter === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className="font-mono"
                      style={{
                        padding: "5px 11px",
                        background: on ? "#1A1714" : "transparent",
                        color: on ? "#F1EBDD" : "#1A1714",
                        border: "1px solid #1A1714",
                        fontSize: 10.5,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* Listings */}
              <div style={{ borderTop: "1px solid #1A1714", borderBottom: "1px solid #1A1714" }}>
                {visible.length === 0 ? (
                  <div style={{ padding: "60px 0", textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "#8C8273",
                      }}
                    >
                      No commissions in this category.
                    </p>
                  </div>
                ) : (
                  visible.map((p, i) => (
                    <CommissionEntry
                      key={p.id}
                      problem={p}
                      index={i}
                      isLast={i === visible.length - 1}
                      submitted={submitted.includes(p.id)}
                      applying={applying === p.id}
                      proof={proof}
                      onApply={() => setApplying(p.id)}
                      onCancel={() => {
                        setApplying(null);
                        setProof("");
                      }}
                      onProofChange={setProof}
                      onSubmit={() => submit(p.id)}
                    />
                  ))
                )}
              </div>
            </>
          )}

          {view === "post" && <PostForm />}

          {/* How-it-works coda */}
          <section style={{ marginTop: 80 }}>
            <div className="hairline-double" style={{ width: 60, marginBottom: 28 }} />
            <h2 className="serif-display heading-md" style={{ marginBottom: 32 }}>
              How a commission becomes <span className="serif-italic">evidence</span>.
            </h2>
            <ol
              className="primitives-mobile"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 0,
                borderTop: "1px solid #1A1714",
                borderBottom: "1px solid #1A1714",
              }}
            >
              {[
                ["I", "Browse", "Pick a listing whose brief, reward, and deadline make sense for you."],
                ["II", "Ship", "Submit code, design, or a write-up. Evidence quality matters more than scope."],
                ["III", "Cite", "Accepted submissions become a permanent claim on your passport, with the brief as the citation."],
              ].map(([n, h, b], i) => (
                <li
                  key={String(n)}
                  style={{
                    padding: "32px 28px",
                    borderRight: i < 2 ? "1px solid #1A1714" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <span className="numeral serif-italic">{n}.</span>
                  <h3 className="serif-display" style={{ fontSize: 22, fontWeight: 420 }}>
                    {h}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.55, color: "#4A423A" }}>{b}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Footer */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <span className="font-mono" style={{ fontSize: 11, color: "#8C8273", letterSpacing: "0.14em" }}>
              POST · /api/commissions · OPEN
            </span>
            <PassportMark size={56} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─── pieces ──────────────────────────────────────────────────── */

function CommissionEntry({
  problem,
  index,
  isLast,
  submitted,
  applying,
  proof,
  onApply,
  onCancel,
  onProofChange,
  onSubmit,
}: {
  problem: Problem;
  index: number;
  isLast: boolean;
  submitted: boolean;
  applying: boolean;
  proof: string;
  onApply: () => void;
  onCancel: () => void;
  onProofChange: (s: string) => void;
  onSubmit: () => void;
}) {
  const closed = !problem.open;
  return (
    <article
      className="ledger-row"
      style={{
        display: "grid",
        gridTemplateColumns: "100px minmax(0, 1.6fr) minmax(0, 1fr) 200px",
        gap: 32,
        padding: "32px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(26,23,20,0.18)",
        opacity: closed ? 0.55 : 1,
        animation: "fade-up 0.4s cubic-bezier(.2,.7,.3,1) both",
        animationDelay: `${Math.min(index * 30, 200)}ms`,
      }}
    >
      <div className="numeral serif-italic ledger-num" style={{ paddingLeft: 4 }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* main column */}
      <div className="ledger-main">
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
          <span
            className="font-mono"
            style={{ fontSize: 10.5, color: "#8C8273", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            {problem.category}
          </span>
          <span style={{ height: 1, width: 24, background: "#D9CFB8" }} />
          <span
            className="font-mono"
            style={{ fontSize: 10.5, color: "#1A1714", letterSpacing: "0.06em" }}
          >
            {problem.company}
          </span>
          {problem.hot && (
            <span
              className="font-mono"
              style={{
                fontSize: 9.5,
                color: "#7C1D1D",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                border: "1px solid #7C1D1D",
                padding: "2px 7px",
              }}
            >
              urgent
            </span>
          )}
          {closed && (
            <span
              className="font-mono"
              style={{
                fontSize: 9.5,
                color: "#8C8273",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                border: "1px solid #8C8273",
                padding: "2px 7px",
              }}
            >
              closed
            </span>
          )}
        </div>

        <h3
          className="serif-display"
          style={{
            fontSize: 26,
            fontWeight: 400,
            letterSpacing: "-0.018em",
            lineHeight: 1.15,
            marginBottom: 10,
          }}
        >
          {problem.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            lineHeight: 1.5,
            color: "#4A423A",
            fontWeight: 400,
            fontVariationSettings: '"opsz" 30',
            marginBottom: 14,
          }}
        >
          {problem.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {problem.skills.map((s) => (
            <span
              key={s}
              className="font-mono"
              style={{
                padding: "4px 10px",
                background: "rgba(45,95,63,0.08)",
                border: "1px solid rgba(45,95,63,0.22)",
                color: "#2D5F3F",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* metadata column */}
      <div className="ledger-meta" style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 24 }}>
        <Meta label="Reward" value={problem.reward} accent />
        <Meta label="Deadline" value={`${problem.deadline} day${problem.deadline === 1 ? "" : "s"}`} />
        <Meta
          label="Applicants"
          value={`${problem.applicants} / ${problem.maxApplicants}`}
        />
      </div>

      {/* action column */}
      <div className="ledger-action" style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", paddingTop: 14 }}>
        {submitted ? (
          <div className="rubber-stamp" style={{ fontSize: 14, padding: "10px 18px" }}>
            SUBMITTED
            <span className="font-mono" style={{ fontSize: 9, fontStyle: "normal", letterSpacing: "0.16em", marginTop: 3, fontWeight: 500 }}>
              UNDER REVIEW
            </span>
          </div>
        ) : applying ? (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
            <textarea
              autoFocus
              value={proof}
              onChange={(e) => onProofChange(e.target.value)}
              rows={4}
              placeholder="Approach. Code link. Write-up."
              style={{
                width: "100%",
                background: "#FBF6E8",
                border: "1px solid #1A1714",
                padding: "10px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "#1A1714",
                resize: "vertical",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={onCancel} className="btn-outline" style={{ flex: 1, padding: "10px 0", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!proof.trim()}
                className="btn-stamp"
                style={{ flex: 1, padding: "10px 0", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                File →
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onApply}
            disabled={closed}
            className="btn-ink"
            style={{
              width: "100%",
              padding: "12px 0",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {closed ? "Closed" : "Apply →"}
          </button>
        )}
      </div>
    </article>
  );
}

function Meta({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: "#8C8273", textTransform: "uppercase", marginBottom: 3 }}>
        {label}
      </div>
      <div
        className="serif-display"
        style={{
          fontSize: accent ? 22 : 18,
          fontWeight: accent ? 400 : 380,
          color: accent ? "#2D5F3F" : "#1A1714",
          letterSpacing: "-0.01em",
          fontVariationSettings: '"opsz" 100',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function PostForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [reward, setReward] = useState("");
  const [posted, setPosted] = useState(false);

  if (posted) {
    return (
      <div
        style={{
          padding: "40px 36px",
          background: "#FBF6E8",
          border: "1px solid #1A1714",
          textAlign: "center",
        }}
      >
        <div className="rubber-stamp" style={{ fontSize: 22, padding: "12px 22px", display: "inline-flex" }}>
          POSTED
          <span className="font-mono" style={{ fontSize: 10, fontStyle: "normal", letterSpacing: "0.16em", marginTop: 4, fontWeight: 500 }}>
            UNDER REVIEW
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 18,
            color: "#4A423A",
            marginTop: 22,
          }}
        >
          We will publish your commission within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPosted(true);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        maxWidth: 760,
        padding: "8px 0",
      }}
    >
      <Field
        label="Title"
        sample="Build a real-time skill verification API"
        value={title}
        onChange={setTitle}
      />
      <FieldArea
        label="Brief"
        sample="What needs to be built. Constraints. Definition of done."
        value={desc}
        onChange={setDesc}
      />
      <Field label="Reward" sample="$800 · cash" value={reward} onChange={setReward} />
      <button
        type="submit"
        disabled={!title.trim() || !desc.trim() || !reward.trim()}
        className="btn-ink"
        style={{
          alignSelf: "flex-start",
          padding: "14px 28px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        File for review →
      </button>
    </form>
  );
}

function Field({
  label,
  sample,
  value,
  onChange,
}: {
  label: string;
  sample: string;
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <div>
      <label className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8C8273", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
        {label}
      </label>
      <div style={{ borderBottom: "1.5px solid #1A1714", paddingBottom: 12 }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={sample}
          className="input-doc"
          style={{ fontSize: 24 }}
        />
      </div>
    </div>
  );
}

function FieldArea({
  label,
  sample,
  value,
  onChange,
}: {
  label: string;
  sample: string;
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <div>
      <label className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8C8273", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder={sample}
        style={{
          width: "100%",
          background: "transparent",
          border: "1px solid #1A1714",
          padding: "14px 16px",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 18,
          fontVariationSettings: '"opsz" 30',
          color: "#1A1714",
          resize: "vertical",
          outline: "none",
        }}
      />
    </div>
  );
}
