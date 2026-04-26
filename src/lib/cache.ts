import { promises as fs } from "fs";
import path from "path";
import type { Passport } from "./types";

const RINGER_DIR = path.join(process.cwd(), "data", "ringers");
const memCache = new Map<string, Passport>();

function key(username: string) {
  return username.toLowerCase();
}

export async function loadPassport(username: string): Promise<Passport | null> {
  const k = key(username);
  if (memCache.has(k)) return memCache.get(k)!;

  try {
    const file = path.join(RINGER_DIR, `${k}.json`);
    const txt = await fs.readFile(file, "utf-8");
    const passport = JSON.parse(txt) as Passport;
    memCache.set(k, passport);
    return passport;
  } catch {
    return null;
  }
}

export async function savePassport(passport: Passport, opts: { ringer?: boolean } = {}) {
  const k = key(passport.subject.username);
  memCache.set(k, passport);
  if (opts.ringer) {
    await fs.mkdir(RINGER_DIR, { recursive: true });
    await fs.writeFile(
      path.join(RINGER_DIR, `${k}.json`),
      JSON.stringify(passport, null, 2),
      "utf-8",
    );
  }
}

export function setMemPassport(passport: Passport) {
  memCache.set(key(passport.subject.username), passport);
}
