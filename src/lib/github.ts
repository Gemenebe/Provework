import type { PassportSubject } from "./types";

const GITHUB_API = "https://api.github.com";

function ghHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "ProveWork-OpenTalent",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, { headers: ghHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub ${path} → ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

interface GhUser {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string;
  blog: string | null;
  followers: number;
  public_repos: number;
  created_at: string;
}

interface GhRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
  topics: string[];
}

export interface RepoBundle {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  languages: Record<string, number>;
  stars: number;
  forks: number;
  topics: string[];
  pushed_at: string;
  readme_excerpt: string | null;
  recent_commits: { sha: string; message: string; date: string; url: string }[];
}

export interface UserBundle {
  subject: PassportSubject;
  repos: RepoBundle[];
  total_stars: number;
  languages: string[];
}

async function fetchReadmeExcerpt(fullName: string): Promise<string | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${fullName}/readme`, {
      headers: { ...ghHeaders(), Accept: "application/vnd.github.raw" },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, 4000);
  } catch {
    return null;
  }
}

async function fetchLanguages(fullName: string): Promise<Record<string, number>> {
  try {
    return await gh<Record<string, number>>(`/repos/${fullName}/languages`);
  } catch {
    return {};
  }
}

async function fetchRecentCommits(fullName: string, author: string) {
  try {
    const commits = await gh<Array<{
      sha: string;
      html_url: string;
      commit: { message: string; author: { date: string } };
    }>>(`/repos/${fullName}/commits?author=${author}&per_page=8`);
    return commits.map((c) => ({
      sha: c.sha.slice(0, 7),
      message: (c.commit.message || "").split("\n")[0].slice(0, 140),
      date: c.commit.author.date,
      url: c.html_url,
    }));
  } catch {
    return [];
  }
}

export async function fetchUserBundle(username: string): Promise<UserBundle> {
  const user = await gh<GhUser>(`/users/${username}`);
  const allRepos = await gh<GhRepo[]>(`/users/${username}/repos?per_page=30&sort=updated`);

  const owned = allRepos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => {
      const score = (r: GhRepo) => r.stargazers_count * 5 + r.size / 100 + (r.description ? 2 : 0);
      return score(b) - score(a);
    })
    .slice(0, 6);

  const bundles = await Promise.all(
    owned.map(async (r): Promise<RepoBundle> => {
      const [readme_excerpt, languages, recent_commits] = await Promise.all([
        fetchReadmeExcerpt(r.full_name),
        fetchLanguages(r.full_name),
        fetchRecentCommits(r.full_name, username),
      ]);
      return {
        name: r.name,
        full_name: r.full_name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        languages,
        stars: r.stargazers_count,
        forks: r.forks_count,
        topics: r.topics || [],
        pushed_at: r.pushed_at,
        readme_excerpt,
        recent_commits,
      };
    }),
  );

  const allLangs = new Set<string>();
  let totalStars = 0;
  for (const b of bundles) {
    Object.keys(b.languages).forEach((l) => allLangs.add(l));
    totalStars += b.stars;
  }

  return {
    subject: {
      username: user.login,
      name: user.name,
      bio: user.bio,
      location: user.location,
      avatar_url: user.avatar_url,
      blog: user.blog,
      followers: user.followers,
      public_repos: user.public_repos,
      joined: user.created_at,
    },
    repos: bundles,
    total_stars: totalStars,
    languages: [...allLangs],
  };
}
