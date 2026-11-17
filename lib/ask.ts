// "Ask about Krishi": a small keyword search (BM25) over this site's own content.
// No language model is involved, so every answer is text written on this site.

import { getAllProjects, getSiteConfig } from '@/lib/content';
import { EDUCATION, PIPELINE, RECOGNITION, experiences, volunteerExperience } from '@/lib/resume';

export type Card = {
  id: string;
  title: string;
  answer: string;
  href: string;
  cta: string;
  keys: string; // extra words that should match strongly
};

const site = getSiteConfig();
const projects = getAllProjects();

const byCompany = (name: string) => experiences.find((r) => r.company === name);
const gov = byCompany('Ontario Government');
const york = byCompany('York University');

const CURATED: Card[] = [
  {
    id: 'availability',
    title: 'Availability',
    answer: `Krishi is open to Summer 2027 roles in machine learning, data science and generative AI. His Honours Computer Science degree at York University is expected in August 2027.`,
    href: '#contact',
    cta: 'Get in touch',
    keys: 'available availability hiring open summer 2027 intern internship coop co-op job role start when graduate graduation new grad free looking',
  },
  {
    id: 'contact',
    title: 'Contact',
    answer: `The fastest way is email at ${site.email}. He is also on LinkedIn (in/krishi-shah3) and GitHub (@krishi-shah).`,
    href: '#contact',
    cta: 'Contact options',
    keys: 'contact email reach message talk call linkedin github phone connect',
  },
  {
    id: 'location',
    title: 'Location',
    answer: `He is based in ${site.location}, Canada.`,
    href: '#contact',
    cta: 'Contact options',
    keys: 'where based location live city toronto canada remote relocate ontario',
  },
  {
    id: 'rag',
    title: 'RAG and LLM work',
    answer:
      'FinRAG AI answers financial questions grounded in SEC filings. It uses hybrid BM25 and FAISS retrieval with a cross encoder reranker, and retuning chunking lifted context recall to 0.92. ML Engineer Skills packages ML review checks as Claude Code skills.',
    href: '/projects/finrag-ai/',
    cta: 'Read the FinRAG case study',
    keys: 'rag retrieval llm llms gpt langchain faiss bm25 vector embeddings generative genai chatbot reranker prompt agent agents',
  },
  {
    id: 'vision',
    title: 'Computer vision',
    answer:
      'His research detects AI generated images with a fine tuned EfficientNet B3: 96.96% test accuracy and 0.9971 AUC ROC, plus a control experiment showing what the detector was really reading. He also built a real time webcam face recognizer with OpenCV.',
    href: '/projects/ai-image-detection/',
    cta: 'Read the image detection case study',
    keys: 'vision computer cv image images cnn efficientnet deepfake detection opencv face camera pytorch gradcam',
  },
  {
    id: 'industry',
    title: 'Production experience',
    answer: gov
      ? `A year as a Software Developer Co-op with the Ontario Government (Co-op of the Year nominee). ${gov.description.join(' ')}`
      : '',
    href: '#journey',
    cta: 'See the journey',
    keys: 'production industry work experience job company government ontario coop co-op professional engineering backend sql',
  },
  {
    id: 'research',
    title: 'Research',
    answer: york ? `${york.title}, ${york.period}. ${york.description.join(' ')}` : '',
    href: '/projects/ai-image-detection/',
    cta: 'Read the research',
    keys: 'research researcher paper capstone professor academic study experiment calibration thesis',
  },
  {
    id: 'education',
    title: 'Education',
    answer: EDUCATION.map((e) => `${e.credential} at ${e.school} (${e.detail}).`).join(' '),
    href: '#about',
    cta: 'See education',
    keys: 'education school university degree study studying york lassonde gpa student diploma courses graduate',
  },
  {
    id: 'skills',
    title: 'Toolkit',
    answer: PIPELINE.map((s) => `${s.stage}: ${s.items.join(', ')}.`).join(' ') + ' Also Java and C++.',
    href: '#about',
    cta: 'See the toolkit',
    keys: 'skills stack tools tech technologies languages framework frameworks know python sql pytorch tensorflow',
  },
  {
    id: 'deploy',
    title: 'Deployment and MLOps',
    answer:
      'MedRisk ML serves a readmission model through FastAPI with a SHAP explanation on every prediction, MLflow tracking and Docker packaging. At the Ontario Government he built test suites and release automation that cut deployment time 40%.',
    href: '/projects/medrisk-ml/',
    cta: 'Read the MedRisk case study',
    keys: 'deploy deployment mlops production serve serving api fastapi docker mlflow ci cd pipeline monitoring devops',
  },
  {
    id: 'writing',
    title: 'Writing',
    answer:
      'He is the sole author of the book The Awakening Code and has written eight technical articles in publications including Level Up Coding and CodeX.',
    href: '#writing',
    cta: 'See the writing',
    keys: 'write writing writer author book blog articles medium publications awakening code',
  },
  {
    id: 'awards',
    title: 'Recognition',
    answer: RECOGNITION.map((r) => `${r.title} (${r.org})`).join(', ') + '.',
    href: '#recognition',
    cta: 'See recognition',
    keys: 'award awards recognition honours honors achievement achievements medal gold deans list nominee',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    answer: volunteerExperience.map((r) => `${r.title}, ${r.company} (${r.period}). ${r.description[0]}`).join(' '),
    href: '#journey',
    cta: 'See the journey',
    keys: 'leadership lead leader team mentor mentoring club volunteer executive manage',
  },
  {
    id: 'resume',
    title: 'Resume',
    answer: 'His full resume is on its own page, and you can print it or save it as a PDF from there.',
    href: '/resume/',
    cta: 'Open the resume',
    keys: 'resume cv pdf download print',
  },
  {
    id: 'approach',
    title: 'How he works',
    answer:
      'He cares about claims that hold up: calibrated confidence, honest baselines and control experiments, not just a headline accuracy number. His image detection research is the clearest example, where a control experiment overturned the first result.',
    href: '#method',
    cta: 'See the method',
    keys: 'approach philosophy different why should hire strength strengths unique evaluate evaluation honest calibration baseline',
  },
];

const PROJECT_CARDS: Card[] = projects.map((p) => ({
  id: `p-${p.slug}`,
  title: p.title,
  answer: `${p.shortDescription} ${p.outcome}`,
  href: `/projects/${p.slug}/`,
  cta: 'Read the case study',
  keys: `${p.title} ${p.tags.join(' ')} ${p.tech.join(' ')} project projects built build`,
}));

const ROLE_CARDS: Card[] = [...experiences, ...volunteerExperience].map((r) => ({
  id: `r-${r.company}`,
  title: `${r.company}`,
  answer: `${r.title}, ${r.period}. ${r.description.join(' ')}`,
  href: '#journey',
  cta: 'See the journey',
  keys: `${r.company} ${r.skills.join(' ')} ${r.location}`,
}));

export const CARDS = [...CURATED, ...PROJECT_CARDS, ...ROLE_CARDS].filter((c) => c.answer);

export const SUGGESTIONS = [
  'Is he available for Summer 2027?',
  'What has he built with RAG?',
  'Does he have production experience?',
  'What is his research about?',
  'How do I contact him?',
];

/* ---------- search ---------- */

const STOP = new Set(
  'a an and are as at be been by can could did do does for from had has have he her him his how i if in into is it its me my of on or our she so than that the their them then there these they this to was we were what when where which who why will with would you your about any some tell show give krishi shah krishis much many ever good great best really'.split(' '),
);

const SYN: Record<string, string[]> = {
  ml: ['machine', 'learning'],
  ai: ['ml', 'genai'],
  llm: ['rag', 'llms', 'generative'],
  chatgpt: ['gpt', 'llm'],
  gpt: ['llm'],
  hire: ['available', 'hiring'],
  job: ['role', 'available'],
  work: ['experience'],
  worked: ['experience'],
  experience: ['work'],
  intern: ['internship', 'available'],
  internship: ['available', 'intern'],
  coop: ['co-op', 'internship'],
  study: ['education'],
  school: ['education'],
  college: ['education', 'university'],
  degree: ['education'],
  graduate: ['graduation'],
  stack: ['skills', 'tools'],
  tools: ['skills', 'stack'],
  languages: ['skills'],
  cv: ['resume'],
  vision: ['image'],
  images: ['image'],
  deploy: ['deployment', 'production'],
  prod: ['production'],
  paper: ['research'],
  awards: ['award', 'recognition'],
  email: ['contact'],
  reach: ['contact'],
  located: ['location'],
  live: ['location'],
  based: ['location'],
};

function stem(w: string) {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 4 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

export function tokens(text: string) {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9+#.-]*/g) ?? [])
    .map((w) => w.replace(/[.-]+$/, ''))
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

type Doc = { card: Card; tf: Map<string, number>; len: number };

let index: { docs: Doc[]; df: Map<string, number>; avg: number } | null = null;

function build() {
  const docs: Doc[] = CARDS.map((card) => {
    const tf = new Map<string, number>();
    const add = (text: string, weight: number) => {
      for (const t of tokens(text)) tf.set(t, (tf.get(t) ?? 0) + weight);
    };
    add(card.keys, 3);
    add(card.title, 2);
    add(card.answer, 1);
    let len = 0;
    tf.forEach((v) => (len += v));
    return { card, tf, len };
  });
  const df = new Map<string, number>();
  for (const d of docs) d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1));
  const avg = docs.reduce((s, d) => s + d.len, 0) / docs.length;
  return { docs, df, avg };
}

export function ask(question: string, limit = 3) {
  if (!index) index = build();
  const { docs, df, avg } = index;
  const base = tokens(question);
  const terms = new Map<string, number>();
  for (const t of base) {
    terms.set(t, Math.max(terms.get(t) ?? 0, 1));
    for (const s of SYN[t] ?? []) for (const st of tokens(s)) terms.set(st, Math.max(terms.get(st) ?? 0, 0.5));
  }
  if (terms.size === 0) return [];
  const N = docs.length;
  const k1 = 1.2;
  const b = 0.6;
  const scored = docs
    .map((d) => {
      let score = 0;
      terms.forEach((w, t) => {
        const f = d.tf.get(t);
        if (!f) return;
        const n = df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += w * idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avg)));
      });
      // Curated answers are written to be read first
      if (!d.card.id.startsWith('p-') && !d.card.id.startsWith('r-')) score *= 1.15;
      return { card: d.card, score };
    })
    .filter((s) => s.score > 1.2)
    .sort((a, b) => b.score - a.score);
  // Keep related answers only when they are a reasonably close match
  const best = scored[0]?.score ?? 0;
  return scored.filter((s, i) => i === 0 || s.score >= best * 0.3).slice(0, limit);
}
