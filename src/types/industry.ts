// ─── Industry Page Types ──────────────────────────────────────────────────────
// Mirrors the shape of ServiceData / Solution but tuned for industry verticals.
// Every field that maps to a section in the Word document is represented here.
// Optional sections use `?` so pages with fewer sections compile cleanly.

export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string; // e.g. "(RBAC + MFA + SSO)"
  type: "source" | "layer" | "branch" | "output";
  children?: string[]; // used by "branch" nodes
}

export interface ArchitectureData {
  nodes: ArchNode[];
}

export interface IndustryMetric {
  value: string;
  label: string;
}

export interface IndustryChallenge {
  title: string;
  items: string[];
}

export interface IndustryModule {
  /** e.g. "Web SCADA & Real-Time Monitoring" */
  title: string;
  /** 1–2 sentence description of what the module does */
  description: string;
  /** What the module monitors / covers */
  monitors?: string[];
  /** Key features of the module */
  features?: string[];
  /** Business benefits delivered */
  benefits?: string[];
}

export interface IndustryBenefit {
  title: string;
  description: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  image?: string; // path relative to /public, e.g. "/industries/renewable-energy.jpg"

  hero: {
    /** Short mono-uppercase tagline above the heading */
    tagline: string;
    /** Main H1 heading */
    heading: string;
    /** 2–3 sentence description paragraph */
    description: string;
    ctas: string[];
  };

  /** 3–4 KPI / scale metrics shown in the strip below the hero */
  metrics: IndustryMetric[];

  /** 1–2 sentence platform overview paragraph */
  overview: string;

  /** Industry challenges — grouped by theme */
  challenges: IndustryChallenge[];

  /**
   * Platform modules — each becomes a card in the "Platform Modules" section.
   * Maps directly to the platform feature blocks in the Word document.
   */
  modules: IndustryModule[];

  /** Business benefits — shown in the "Business Benefits" grid */
  benefits: IndustryBenefit[];

  /** Why Altrex Tech differentiators — shown as a checklist */
  whyAltrex: string[];

  /** CTA footer section */
  cta: {
    heading: string;
    description: string;
  };

  architecture?: ArchitectureData;
}