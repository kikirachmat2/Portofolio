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
    name: "Acong Chat",
    description: "A character-driven AI chat app featuring Acong, an interactive persona with multi-character group discussions, credit wallet, image analysis, and bilingual support.",
    language: "TypeScript",
    html_url: "https://github.com/acongai/Acong-AI",
    homepage: "https://acong.chat",
    tags: ["AI Chat", "Next.js", "TypeScript"]
  },
  {
    name: "PiyohPOS",
    description: "Multi-outlet QR ordering, cashier, kitchen, and point-of-sale management system built for Piyoh Kopi.",
    language: "PHP",
    html_url: "https://github.com/kikirachmat2/PiyohPOS",
    homepage: "http://213.35.118.26/scan/RUthTmsrODba2PYt0WO7l4p5vZgvuDbP",
    tags: ["POS System", "PHP", "F&B Tech"]
  },
  {
    name: "PiyohWeb",
    description: "Digital web showcase and brand portal for the Piyoh Kopi coffee shop brand.",
    language: "PHP",
    html_url: "https://github.com/kikirachmat2/PiyohWeb",
    homepage: "http://213.35.118.26",
    tags: ["Brand Portal", "PHP", "Web"]
  },
  {
    name: "Manake",
    description: "Web application platform with custom digital workflows and responsive interface deployed on Vercel.",
    language: "Blade, PHP",
    html_url: "https://github.com/kikirachmat2/Manake",
    homepage: "https://manake.vercel.app",
    tags: ["Web App", "Blade", "Vercel"]
  },
  {
    name: "Kibot",
    description: "AI-assisted automation bot built in Python to streamline repetitive workflows and multi-agent operations.",
    language: "Python",
    html_url: "https://github.com/kikirachmat2/Kibot",
    homepage: null,
    tags: ["Automation", "Python", "AI"]
  }
];
