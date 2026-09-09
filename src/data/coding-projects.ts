export interface CodingProject {
  name: string;
  description: string;
  language: string;
  html_url: string;
  homepage?: string | null;
  updated_at?: string;
  tags?: string[];
}

export const fallbackCodingProjects: CodingProject[] = [
  {
    name: "Kibot",
    description: "Kibot (Kiki punya Bot) — AI-assisted bot and automation scripts developed in Python for productivity and automated workflows.",
    language: "Python",
    html_url: "https://github.com/frahmat68-beep/Kibot",
    homepage: null,
    tags: ["AI / Bot", "Python", "Automation"]
  },
  {
    name: "PiyohPOS",
    description: "Multi-outlet QR Ordering, Cashier, Kitchen, and Point-of-Sale management system developed for Piyoh Kopi.",
    language: "PHP",
    html_url: "https://github.com/frahmat68-beep/PiyohPOS",
    homepage: null,
    tags: ["POS System", "PHP", "F&B Tech"]
  },
  {
    name: "Manake",
    description: "Web application platform with custom digital workflows and responsive interface deployed on Vercel.",
    language: "Blade / PHP",
    html_url: "https://github.com/frahmat68-beep/Manake",
    homepage: "https://manake.vercel.app",
    tags: ["Web App", "Blade", "Vercel"]
  },
  {
    name: "PiyohWeb",
    description: "Digital web showcase and brand portal for Piyoh Kopi coffee shop brand.",
    language: "PHP",
    html_url: "https://github.com/frahmat68-beep/PiyohWeb",
    homepage: null,
    tags: ["Brand Portal", "PHP", "Web"]
  }
];
