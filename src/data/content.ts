// Facts come from LinkedIn (Nov 2026), the CV (June 2026) and the project READMEs on GitHub.

export const GITHUB_USER = "FranckEP";

export const links = {
  email: "franck200402@gmail.com",
  linkedin: "https://www.linkedin.com/in/franck02",
  github: "https://github.com/FranckEP",
  cv: "/CurriculumFranckEP.pdf",
};

export type Category = "Data engineering" | "Analysis" | "Dashboards" | "Web & backend";

export const categories: Category[] = ["Data engineering", "Analysis", "Dashboards", "Web & backend"];

export type Project = {
  id: string;
  title: string;
  categories: Category[];
  summary: string;
  stack: string[];
  repo: string;
  live?: { label: string; href: string };
  figure: "reddit" | "banks" | "retail" | "api";
};

export const projects: Project[] = [
  {
    id: "reddit",
    title: "Reddit trend tracker",
    categories: ["Data engineering", "Dashboards"],
    summary:
      "A daily ETL that pulls the top posts from r/technology through the Reddit API, cleans and timestamps them, deduplicates against what is already stored, and loads them into BigQuery. A public Looker Studio dashboard reads straight from the table.",
    stack: ["Python", "PRAW", "Pandas", "BigQuery", "Looker Studio"],
    repo: "https://github.com/FranckEP/Reddit-Trend-Tracker-ETL-Pipeline-to-Google-BigQuery-and-Looker-Studio",
    live: {
      label: "Open the dashboard",
      href: "https://lookerstudio.google.com/reporting/11114bb5-c170-4a6a-8f0d-9542a85e8578",
    },
    figure: "reddit",
  },
  {
    id: "banks",
    title: "Banks market cap ETL",
    categories: ["Data engineering"],
    summary:
      "Scrapes the world's largest banks by market capitalisation from an archived Wikipedia page, converts every figure into GBP, EUR and INR from an exchange-rate file, and loads the result into CSV and SQLite for querying.",
    stack: ["Python", "BeautifulSoup", "Pandas", "SQLite", "Seaborn"],
    repo: "https://github.com/FranckEP/Banks-Market-Capitalization-ETL-Project",
    figure: "banks",
  },
  {
    id: "retail",
    title: "Online retail clean-up",
    categories: ["Analysis"],
    summary:
      "Cleaning and exploratory analysis of the UCI Online Retail dataset, about 540,000 transactions from a UK shop. Duplicates and impossible prices out, a revenue column in, then the questions: who buys, what sells, and when.",
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Colab"],
    repo: "https://github.com/FranckEP/Data-Cleaning-EDA-Online-Retail-Sales-Data",
    figure: "retail",
  },
  {
    id: "api",
    title: "GitHub API extraction kit",
    categories: ["Data engineering", "Analysis"],
    summary:
      "A reusable Python module for the GitHub REST API: token authentication, repository search, commits and contents, with pagination, rate-limit checks and error handling, plus endpoint documentation and a troubleshooting guide.",
    stack: ["Python", "Requests", "GitHub REST API", "Colab"],
    repo: "https://github.com/FranckEP/Data-Source-API-Analyst",
    figure: "api",
  },
];

export type MoreItem = {
  name: string;
  line: string;
  stack: string;
  categories: Category[];
  href: string;
};

export const moreWork: MoreItem[] = [
  {
    name: "Telco operational monitoring",
    line: "Simulated performance analysis for a telecom operation, flagging anomalies to shorten response times.",
    stack: "Python · SQL · Looker Studio",
    categories: ["Analysis", "Dashboards"],
    href: "https://github.com/FranckEP/telco_monitoring_project",
  },
  {
    name: "Mallas Atlanta",
    line: "Freelance landing page for a safety-net installer in Barranquilla.",
    stack: "React · TypeScript · Mantine",
    categories: ["Web & backend"],
    href: "https://github.com/FranckEP/MallasAtlantaLanding",
  },
  {
    name: "World Cup 2026 sticker API",
    line: "REST API for a collectible sticker album: collections, cards and owners.",
    stack: "NestJS · TypeORM · PostgreSQL",
    categories: ["Web & backend"],
    href: "https://github.com/FranckEP/Panini-World-Cup-2026-API-NestJS-TypeORM-PostgreSQL",
  },
  {
    name: "Neibor",
    line: "Web platform for payments and messages between residents and administrators of a housing complex.",
    stack: "TypeScript",
    categories: ["Web & backend"],
    href: "https://github.com/FranckEP/Neibor",
  },
  {
    name: "Sistema de Abonos",
    line: "Instalment and cash-control system for a small business.",
    stack: "JavaScript",
    categories: ["Web & backend"],
    href: "https://github.com/FranckEP/Sistema-de-Abonos",
  },
];

// Experience, education and certificates updated from LinkedIn (November 2026).
export const experience = [
  {
    role: "Data Engineer",
    org: "OMBIA",
    when: "Jul 2026 – now",
    points: [
      "Migrating the legacy SQL reporting catalogue to a new commercial platform: reports ranked by run volume and difficulty, scripts rewritten, overlapping order reports merged into two.",
      "Tuning Azure Synapse dedicated SQL pool workloads with CTAS, hash distribution on join keys and clustered columnstore indexes.",
      "Analysed 30+ legacy workflows against production logs (up to 354K runs per flow) and cut an approval flow from 13 tasks to 6; rebuilt the flows in BPMN on Camunda 7 and a .NET C# backend.",
      "Power BI reporting and Power Apps data capture; ramping up on Microsoft Fabric ahead of the move.",
    ],
  },
  {
    role: "Team Lead, Data Analyst",
    org: "Verizon account · Quantica BPO, then Allied Global",
    when: "Mar 2024 – Jul 2026",
    points: [
      "Led three analysts in Risk & Assurance for Verizon, planning the work in Asana with Scrum.",
      "Daily KPI monitoring in Python and SQL, surfacing about 2 incidents a day and 20 fraud cases a week for escalation.",
      "Built and ran about 30 dashboards, reports and monitors in Looker Studio on multi-source and streaming data.",
      "Automated recurring reports and ETL in Mobileum RAID, cutting the hours spent on them by about 90%.",
      "Promoted to team lead.",
    ],
  },
  {
    role: "Freelance Web Developer",
    org: "Mallas Atlanta",
    when: "May – Aug 2024",
    points: [
      "Designed, built and shipped the company's website alone, in React, TypeScript and Mantine. It is live.",
    ],
  },
  {
    role: "Data Analyst",
    org: "Verizon account · Quantica BPO",
    when: "Sept 2023 – Feb 2024",
    points: [
      "Business assurance and fraud management for Verizon in Python, SQL, Power BI and Excel.",
      "Traced data paths across databases to find the root of anomalies before they became incidents.",
    ],
  },
  {
    role: "Technical Support, Tier 1 to Tier 3",
    org: "Quantica BPO",
    when: "Aug 2022 – Aug 2023",
    points: ["Three promotions in a year, from first-line support to the corporate Tier 3 desk."],
  },
];


export const publication = {
  title:
    "Dynamic Models of Knowledge-Based Growth: Evidence of Bidirectional Causality Between GDP and R&D Efficiency in Latin America",
  venue: "Procedia Computer Science, Elsevier",
  year: "2026",
  methods: "Granger causality, VAR/VECM, ARDL and 2SLS/3SLS",
  href: "https://www.sciencedirect.com/science/article/pii/S1877050926011762",
};

export const education = [
  { name: "BSc Systems Engineering, with merit", where: "Universidad de la Costa (CUC)", when: "2022 – 2026" },
  { name: "Software development programme, MinTIC", where: "Universidad del Norte", when: "2021" },
  { name: "English as a second language, B2", where: "Universidad del Atlántico", when: "2018 – 2021" },
  { name: "Technical degree, payroll and social benefits", where: "SENA", when: "2018 – 2020" },
];

export const certifications = [
  { name: "Fabric Foundations — Microsoft", when: "Sept 2026" },
  { name: "Fundamentals of Azure Databricks — Packt", when: "Aug 2026" },
  { name: "Building RAG Apps Using MongoDB — MongoDB", when: "Mar 2026" },
  { name: "BI Dashboards with IBM Cognos Analytics and Google Looker — IBM", when: "Oct 2025" },
  { name: "Data Warehouse Fundamentals — IBM", when: "Aug 2025" },
  { name: "ETL and Data Pipelines with Shell, Airflow and Kafka — IBM", when: "May 2025" },
  { name: "Relational Database Administration — IBM", when: "Mar 2025" },
  { name: "Linux Commands and Shell Scripting — IBM", when: "Feb 2025" },
  { name: "Databases and SQL for Data Science with Python — IBM", when: "Feb 2025" },
  { name: "Introduction to Relational Databases — IBM", when: "Jan 2025" },
];

// Career as a dataset: months counted from Aug 2022 (0). Drawn as a timeline in Experience.
export const CAREER_START = { year: 2022, month: 8 };
export const CAREER_MONTHS = 52; // Aug 2022 through Nov 2026

export const timeline = [
  { role: "Data Engineer", where: "OMBIA", from: 47, to: 52, kind: "now" },
  { role: "Team Lead, Data Analyst", where: "Verizon account", from: 19, to: 47, kind: "data" },
  { role: "Freelance web developer", where: "Mallas Atlanta", from: 21, to: 25, kind: "side" },
  { role: "Data Analyst", where: "Verizon account", from: 13, to: 19, kind: "data" },
  { role: "Support, Tier 3", where: "Quantica BPO", from: 10, to: 13, kind: "support" },
  { role: "Support, Tier 2", where: "Quantica BPO", from: 4, to: 10, kind: "support" },
  { role: "Support, Tier 1", where: "Quantica BPO", from: 0, to: 4, kind: "support" },
] as const;
