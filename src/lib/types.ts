export type ClaimCategory = "shipping" | "reasoning" | "teaching" | "collaboration" | "design" | "research";
export type Confidence = "low" | "medium" | "high";

export interface Evidence {
  uri: string;
  source: string;
  excerpt: string;
}

export interface Claim {
  skill: string;
  claim_text: string;
  category: ClaimCategory;
  confidence: Confidence;
  evidence: Evidence[];
}

export interface PassportSubject {
  username: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  blog: string | null;
  followers: number;
  public_repos: number;
  joined: string;
}

export interface Passport {
  subject: PassportSubject;
  claims: Claim[];
  generated_at: string;
  source_signals: {
    repos_analyzed: number;
    languages: string[];
    total_stars: number;
  };
}

export type ScanEvent =
  | { type: "progress"; stage: string; detail: string }
  | { type: "subject"; subject: PassportSubject }
  | { type: "claim"; claim: Claim }
  | { type: "done"; passport: Passport }
  | { type: "error"; message: string };
