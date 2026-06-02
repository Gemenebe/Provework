import { loadPassport } from "@/lib/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ username: string }> },
) {
  const { username } = await context.params;
  const passport = await loadPassport(username);
  if (!passport) {
    return new Response(JSON.stringify({ error: "passport not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(passport), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
