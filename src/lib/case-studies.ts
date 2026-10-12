import pahalCover from "@/assets/case-pahal.png";
import nodusCover from "@/assets/case-nodus.png";
import accessinavCover from "@/assets/case-accessinav.png";

export interface CaseStudy {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  role: string;
  timeline: string;
  behanceUrl: string;
  accent: "red" | "blue" | "purple";
  sections: { label: string; title: string; body: string[]; bullets?: string[] }[];
  outcomes: { n: string; l: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  pahal: {
    id: "pahal",
    name: "PAHAL",
    title: "45kg on Their Backs, Every Day",
    subtitle:
      "An ethnographic and human-centered design project addressing load carrying challenges in Sainji Village through ergonomic innovation.",
    cover: pahalCover,
    coverAlt: "PAHAL — Smart Load Support System for hill farmers, Sainji village",
    behanceUrl:
      "https://www.behance.net/gallery/255118397/PAHAL-Unpacking-the-Weight-of-Hill-Farming",
    tags: ["Ergonomics", "Rural Innovation", "Human-Centered Design"],
    role: "Researcher & Product Designer",
    timeline: "Ethnographic field study · Sainji Village",
    accent: "purple",
    sections: [
      {
        label: "01",
        title: "The Problem",
        body: [
          "In the hill village of Sainji, farmers — many of them women — carry loads of up to 45kg on their backs every single day. Fodder, firewood, harvests: everything moves on human shoulders across steep terrain.",
          "Years of this invisible labour lead to chronic back pain, spinal injuries, and early physical breakdown — yet no affordable, terrain-appropriate load support exists for them.",
        ],
        bullets: [
          "Loads of 30–45kg carried daily on steep slopes",
          "Chronic back and joint pain accepted as 'normal'",
          "Existing gear is built for trekkers, not farmers — and priced out of reach",
        ],
      },
      {
        label: "02",
        title: "The Approach",
        body: [
          "We lived the problem before designing for it — ethnographic fieldwork in Sainji, shadowing farmers on their daily routes, mapping load types, postures, and pain points.",
          "Insights from the field translated into ergonomic concepts: weight redistribution, breathable support structures, and materials that survive monsoon and mountain alike.",
        ],
        bullets: [
          "On-ground ethnography & contextual interviews",
          "Posture and load-mapping across daily tasks",
          "Iterative prototyping tested with the farmers themselves",
        ],
      },
      {
        label: "03",
        title: "The Outcome",
        body: [
          "PAHAL — a smart load support system designed with the community, not just for it. A frame that shifts weight from spine to hips, built from accessible materials, and shaped by the people who will actually wear it.",
        ],
      },
    ],
    outcomes: [
      { n: "45kg", l: "daily loads studied" },
      { n: "100%", l: "field-tested with farmers" },
      { n: "1", l: "village at the heart of design" },
    ],
  },
  nodus: {
    id: "nodus",
    name: "NODUS",
    title: "Can You Trust an AI You Can't See Think?",
    subtitle:
      "Research-driven UX design exploring trust, transparency, and critical thinking in agentic AI systems.",
    cover: nodusCover,
    coverAlt: "NODUS — A human-centered multi-agent AI decision system",
    behanceUrl:
      "https://www.behance.net/gallery/255114677/NODUS-Multi-Agent-AI-Decision-Support-System",
    tags: ["Agentic AI", "Explainable AI", "Human-Centered Design"],
    role: "UX Researcher & Designer",
    timeline: "Research → Concept → Prototype",
    accent: "blue",
    sections: [
      {
        label: "01",
        title: "The Problem",
        body: [
          "Multi-agent AI systems make decisions behind a curtain. Users get answers, but no reasoning — no way to question, verify, or push back.",
          "When AI thinks invisibly, trust becomes blind faith. NODUS asks: what would it take for people to actually see — and challenge — how an AI decides?",
        ],
        bullets: [
          "Black-box agent decisions erode user trust",
          "No interface for questioning AI reasoning",
          "Critical thinking outsourced to the machine",
        ],
      },
      {
        label: "02",
        title: "The Approach",
        body: [
          "Research-first: we studied how people build (and lose) trust in automated systems, then designed transparency layers that surface agent reasoning without overwhelming the user.",
          "The system makes each agent's contribution visible — a decision map you can interrogate, not just accept.",
        ],
        bullets: [
          "Trust & transparency literature + user research",
          "Visualizing multi-agent reasoning paths",
          "Designing for calibrated trust, not blind trust",
        ],
      },
      {
        label: "03",
        title: "The Outcome",
        body: [
          "NODUS — a human-centered multi-agent AI decision system where every conclusion comes with its reasoning attached. Users can trace which agent said what, why, and where to disagree.",
        ],
      },
    ],
    outcomes: [
      { n: "100%", l: "reasoning made visible" },
      { n: "Multi", l: "agent decision mapping" },
      { n: "0", l: "black boxes left" },
    ],
  },
  accessinav: {
    id: "accessinav",
    name: "ACCESSINAV",
    title: "Built for Eyes That Don't Guide the Way",
    subtitle:
      "An accessibility-focused UX solution enhancing navigation for visually impaired users.",
    cover: accessinavCover,
    coverAlt: "AccessiNav — an accessibility-first navigation app concept",
    behanceUrl:
      "https://www.behance.net/gallery/255110221/AccessiNav-An-Accessibility-First-App-Concept",
    tags: ["Accessible Interfaces", "Usability", "Digital Equity"],
    role: "UX Designer",
    timeline: "Accessibility-first app concept",
    accent: "red",
    sections: [
      {
        label: "01",
        title: "The Problem",
        body: [
          "Navigation apps are designed for eyes. Maps, pins, tiny text, visual-only cues — for visually impaired users, the tools meant to guide them are the ones that exclude them.",
          "Digital equity means wayfinding shouldn't depend on sight.",
        ],
        bullets: [
          "Mainstream navigation is visual-first",
          "Audio cues are an afterthought, not a foundation",
          "Indoor and last-mile navigation remain unsolved",
        ],
      },
      {
        label: "02",
        title: "The Approach",
        body: [
          "Accessibility-first, not accessibility-added. Every design decision started from non-visual interaction: spatial audio, haptic feedback, high-contrast fallbacks, and screen-reader-native flows.",
          "We designed with accessibility guidelines as the floor — and real usability for visually impaired users as the goal.",
        ],
        bullets: [
          "Audio & haptic-first interaction model",
          "Screen-reader-native information architecture",
          "Tested against WCAG and real-world scenarios",
        ],
      },
      {
        label: "03",
        title: "The Outcome",
        body: [
          "AccessiNav — an app concept where navigation speaks, vibrates, and adapts. A concept proving that when you design for the edges, you build something better for everyone.",
        ],
      },
    ],
    outcomes: [
      { n: "A11y", l: "first, not added" },
      { n: "3", l: "non-visual feedback channels" },
      { n: "∞", l: "users designed for" },
    ],
  },
};
