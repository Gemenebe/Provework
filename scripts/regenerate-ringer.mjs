#!/usr/bin/env node
/**
 * Regenerate a ringer passport file via a real, live Claude scan.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/regenerate-ringer.mjs <github-handle>
 *
 * Writes to data/ringers/<handle>.json (lowercased) — the live API will then
 * serve that file as a cached "instant" passport on subsequent scans.
 */
import { fetchUserBundle } from "../src/lib/github.ts";
import { synthesizeClaims } from "../src/lib/claude.ts";
import { savePassport } from "../src/lib/cache.ts";

const username = process.argv[2];
if (!username) {
  console.error("usage: node scripts/regenerate-ringer.mjs <github-handle>");
  process.exit(1);
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY required");
  process.exit(1);
}

console.log(`→ fetching @${username} from GitHub...`);
const bundle = await fetchUserBundle(username);
console.log(`  ${bundle.repos.length} repos, ${bundle.languages.length} languages`);

console.log(`→ synthesizing claims via Claude...`);
const claims = await synthesizeClaims(bundle, {
  onClaim: (c) => console.log(`  ✓ ${c.skill} (${c.confidence})`),
});

const passport = {
  subject: bundle.subject,
  claims,
  generated_at: new Date().toISOString(),
  source_signals: {
    repos_analyzed: bundle.repos.length,
    languages: bundle.languages,
    total_stars: bundle.total_stars,
  },
};

await savePassport(passport, { ringer: true });
console.log(`\n✓ Wrote data/ringers/${username.toLowerCase()}.json with ${claims.length} claims.`);
