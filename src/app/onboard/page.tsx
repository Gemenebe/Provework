"use client";

import { useState } from "react";
import Link from "next/link";
import SkillChip from "@/components/SkillChip";
import PassportCard from "@/components/PassportCard";

const STEPS = ["Connect", "Review Skills", "Add Context", "Passport Ready"];

type Platform = "github" | "behance" | "linkedin";

interface ConnectedPlatform {
  id: Platform;
  skills: string[];
}

const PLATFORMS: {
  id: Platform;
  name: string;
  icon: string;
  desc: string;
  color: string;
}[] = [
  {
    id: "github",
    name: "GitHub",
    icon: "⌥",
    desc: "Repos, commits, languages used",
    color: "rgba(15,45,82,0.06)",
  },
  {
    id: "behance",
    name: "Behance",
    icon: "✦",
    desc: "Projects, tools, creative work",
    color: "rgba(42,111,191,0.06)",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "◈",
    desc: "Work history, endorsements",
    color: "rgba(34,197,94,0.06)",
  },
];

const EXTRACTED: Record<Platform, { label: string; verified: boolean; note: string }[]> = {
  github: [
    { label: "React", verified: true, note: "87 commits across 5 repos" },
    { label: "TypeScript", verified: true, note: "Primary language, 3 repos" },
    { label: "Node.js", verified: false, note: "12 commits, 2 repos" },
    { label: "PostgreSQL", verified: false, note: "Detected in 4 projects" },
  ],
  behance: [
    { label: "UI/UX Design", verified: true, note: "14 published projects" },
    { label: "Figma", verified: true, note: "Listed in 9 project tools" },
    { label: "Motion Design", verified: false, note: "3 animation projects" },
  ],
  linkedin: [
    { label: "System Design", verified: true, note: "6 years experience" },
    { label: "Product Strategy", verified: false, note: "3 endorsements" },
  ],
};

export default function OnboardPage() {
  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState<ConnectedPlatform[]>([]);
  const [scanning, setScanning] = useState<Platform | null>(null);
  const [skills, setSkills] = useState<{ label: string; verified: boolean }[]>([]);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("open");

  function connectPlatform(id: Platform) {
    if (connected.find((c) => c.id === id)) return;
    setScanning(id);
    setTimeout(() => {
      const extracted = EXTRACTED[id].map((s) => ({
        label: s.label,
        verified: s.verified,
      }));
      setConnected((prev) => [...prev, { id, skills: extracted.map((s) => s.label) }]);
      setSkills((prev) => {
        const existing = new Set(prev.map((s) => s.label));
        return [...prev, ...extracted.filter((s) => !existing.has(s.label))];
      });
      setScanning(null);
    }, 1800);
  }

  const allExtracted = connected.flatMap((c) =>
    EXTRACTED[c.id]
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[rgba(15,45,82,0.08)]">
        <div
          className="h-full bg-navy transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Nav */}
      <div className="pt-8 px-8 flex items-center justify-between">
        <Link href="/" className="font-sora font-bold text-xl text-navy">
          prove<span className="text-cobalt">work</span>
        </Link>
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-navy" : "bg-[rgba(15,45,82,0.15)]"
                }`}
              />
              <span
                className={`text-xs font-medium hidden md:block ${
                  i === step ? "text-navy" : "text-smoke"
                }`}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px bg-[rgba(15,45,82,0.15)]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">

        {/* ── STEP 1: CONNECT ── */}
        {step === 0 && (
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3">Step 1</p>
              <h1 className="heading-md text-ink mb-3">
                Connect your work, prove yourself
              </h1>
              <p className="text-smoke">
                Link at least one platform. We read your real output — not your claims.
              </p>
            </div>

            <div className="space-y-4">
              {PLATFORMS.map((p) => {
                const isConnected = connected.find((c) => c.id === p.id);
                const isScanning = scanning === p.id;
                return (
                  <div
                    key={p.id}
                    className="glass-card p-5 flex items-center gap-5"
                  >
                    <div
                      className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: p.color }}
                    >
                      {p.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-ink mb-0.5">{p.name}</div>
                      <div className="text-sm text-smoke">{p.desc}</div>
                      {isConnected && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {EXTRACTED[p.id].map((s) => (
                            <SkillChip key={s.label} label={s.label} verified={s.verified} size="sm" />
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => connectPlatform(p.id)}
                      disabled={!!isConnected || isScanning}
                      className={`flex-shrink-0 text-sm font-semibold px-5 py-2 rounded-[10px] border transition-all duration-200 ${
                        isConnected
                          ? "bg-green-50 border-green-200 text-green-700"
                          : isScanning
                          ? "border-navy/20 text-smoke cursor-wait"
                          : "btn-navy text-sm !py-2 !px-5"
                      }`}
                    >
                      {isConnected
                        ? "✓ Connected"
                        : isScanning
                        ? "Scanning..."
                        : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(1)}
              disabled={connected.length === 0}
              className="btn-navy w-full !py-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue → Review {skills.length} Skills
            </button>
          </div>
        )}

        {/* ── STEP 2: REVIEW SKILLS ── */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3">Step 2</p>
              <h1 className="heading-md text-ink mb-3">
                Here&apos;s what we found
              </h1>
              <p className="text-smoke">
                {skills.length} skills extracted from your portfolio. Remove anything
                that doesn&apos;t feel right.
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              {allExtracted.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between py-2 border-b border-[rgba(15,45,82,0.06)] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <SkillChip label={s.label} verified={s.verified} />
                    <span className="text-xs text-smoke">{s.note}</span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      s.verified
                        ? "bg-green-50 text-green-700"
                        : "bg-[rgba(232,129,58,0.08)] text-energy"
                    }`}
                  >
                    {s.verified ? "High" : "Medium"}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(0)}
                className="btn-outline flex-1 !py-3"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="btn-navy flex-[2] !py-3"
              >
                Confirm Skills →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: CONTEXT ── */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3">Step 3</p>
              <h1 className="heading-md text-ink mb-3">
                Add context to your skills
              </h1>
              <p className="text-smoke">All optional — but it helps employers find you.</p>
            </div>

            <div className="glass-card p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-ink block mb-2">
                  Headline / Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 160))}
                  placeholder="e.g. Full-stack engineer building products for emerging markets"
                  rows={3}
                  className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 placeholder:text-smoke focus:outline-none focus:border-navy transition-colors resize-none"
                />
                <div className="text-xs text-smoke text-right mt-1">
                  {bio.length}/160
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink block mb-2">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lagos, Nigeria"
                  className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 placeholder:text-smoke focus:outline-none focus:border-navy transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-ink block mb-2">
                  Availability
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 focus:outline-none focus:border-navy transition-colors"
                >
                  <option value="open">Open now</option>
                  <option value="soon">Open in 30 days</option>
                  <option value="closed">Not looking</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-outline flex-1 !py-3"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-navy flex-[2] !py-3"
              >
                Finish Setup →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: PASSPORT READY ── */}
        {step === 3 && (
          <div className="space-y-8 text-center">
            <div>
              <div className="text-5xl mb-4">🎉</div>
              <p className="eyebrow mb-3">Step 4</p>
              <h1 className="heading-md text-ink mb-3">
                Your Skill Passport is ready
              </h1>
              <p className="text-smoke">
                Share it with employers, embed it on your site, or let ProveWork
                surface you to opportunities automatically.
              </p>
            </div>

            <div className="flex justify-center">
              <PassportCard
                name="You"
                role={bio || "Professional"}
                location={location || "Worldwide"}
                score={87}
                skills={skills.slice(0, 5).map((s) => ({ label: s.label, verified: s.verified }))}
                style={{ boxShadow: "0 24px 60px rgba(15,45,82,0.18)" }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/passport/me"
                className="btn-navy flex-1 !py-4 text-center"
              >
                View My Passport
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/passport/me`
                  );
                }}
                className="btn-outline flex-1 !py-4"
              >
                Share My Passport
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
