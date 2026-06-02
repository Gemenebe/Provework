import { fetchUserBundle } from "@/lib/github";
import { synthesizeClaims } from "@/lib/claude";
import { loadPassport, setMemPassport } from "@/lib/cache";
import type { Claim, Passport, ScanEvent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sse(event: ScanEvent) {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = String(body?.username || "").trim();
  if (!username) {
    return new Response(JSON.stringify({ error: "username required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: ScanEvent) => controller.enqueue(encoder.encode(sse(event)));

      try {
        // 1. Cached ringer fast-path — instant demo.
        const cached = await loadPassport(username);
        if (cached) {
          send({ type: "progress", stage: "cache", detail: "Cached passport found — replaying" });
          send({ type: "subject", subject: cached.subject });
          for (const claim of cached.claims) {
            send({ type: "progress", stage: "synthesis", detail: `Verified ${claim.skill}` });
            send({ type: "claim", claim });
            await new Promise((r) => setTimeout(r, 350));
          }
          send({ type: "done", passport: cached });
          controller.close();
          return;
        }

        // 2. Live scan.
        send({ type: "progress", stage: "github", detail: `Fetching @${username}` });
        const bundle = await fetchUserBundle(username);
        send({ type: "subject", subject: bundle.subject });
        send({
          type: "progress",
          stage: "github",
          detail: `Analyzing ${bundle.repos.length} repos · ${bundle.languages.length} languages · ${bundle.total_stars} stars`,
        });

        send({ type: "progress", stage: "synthesis", detail: "Claude is reading the evidence…" });

        const claims: Claim[] = await synthesizeClaims(bundle, {
          onClaim: async (claim) => {
            send({ type: "progress", stage: "synthesis", detail: `Verified ${claim.skill}` });
            send({ type: "claim", claim });
          },
        });

        const passport: Passport = {
          subject: bundle.subject,
          claims,
          generated_at: new Date().toISOString(),
          source_signals: {
            repos_analyzed: bundle.repos.length,
            languages: bundle.languages,
            total_stars: bundle.total_stars,
          },
        };
        setMemPassport(passport);
        send({ type: "done", passport });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Scan failed";
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
