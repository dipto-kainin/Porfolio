import type { DesktopWindow, WindowPosition } from "../types/desktop";

export const desktopWindows: DesktopWindow[] = [
  {
    id: "about-me",
    kind: "about",
    title: "About Me",
    icon: "user",
    summary:
      "Full Stack Developer | Go Backend Enthusiast | React & React Native Developer",
    details:
      "Final-year CSE student at RCCIIT with strong backend expertise in Go and scalable systems. Currently interning at WhatBytes as a React Native developer building production mobile modules. Previously interned at Capsule Labs as a Full Stack Developer working on React dashboards, FastAPI services, and PostgreSQL systems. Passionate about system design, performance optimization, and building impactful products.",
  },
  {
    id: "bistro-chains",
    kind: "project",
    title: "BistroChains",
    icon: "utensils",
    summary:
      "Full-stack restaurant management platform with 37+ REST API endpoints and 13+ frontend screens supporting bookings, orders, billing, and role-based operations.",
    details:
      "Built JWT-based authentication, reservation overlap management, and concurrent table workflows supporting 20+ booking scenarios across Admin, Staff, and Customer roles. Integrated Razorpay payment systems with backend-controlled order initialization and HMAC-SHA256 verification for secure payment handling. Designed real-time kitchen and reservation workflows using Go background workers and MongoDB embedded document architecture. Deployed frontend and backend services on Vercel with Swagger/OpenAPI documentation.",
    stack: [
      "Go",
      "MongoDB",
      "React 19",
      "TypeScript",
      "TanStack Query",
      "JWT",
      "Razorpay API",
    ],
    projectLink: "https://bistro-chains.vercel.app/",
    previewFrameUrl: "https://bistro-chains.vercel.app/",
    repoLink: "https://github.com/dipto-kainin/RestroManager",
    extraLinks: [
      {
        label: "Backend repo",
        url: "https://github.com/dipto-kainin/learn-go",
      },
    ],
  },
  {
    id: "raggame",
    kind: "project",
    title: "RagGame",
    icon: "dice-five",
    summary:
      "A multi-agent RAG-powered terminal game integrating LLM agents, evaluation engines, and reasoning workflows for dynamic gameplay generation.",
    details:
      "Built embedding-based retrieval pipelines with on-device document retrieval latency of approximately 50ms. Implemented conversational memory and reasoning systems for AI-driven move validation and contextual decision generation.",
    stack: ["Python", "LangChain", "RAG", "Vector Databases", "LLMs"],
    repoLink: "https://github.com/dipto-kainin/Terminal-Tactician",
  },
  {
    id: "kai-framework",
    kind: "project",
    title: "Kai Framework",
    icon: "gear",
    summary:
      "A lightweight Go HTTP framework built from scratch with routing, middleware chaining, and production-style utilities.",
    details:
      "A custom Go HTTP framework with method-based routing, path parameters, middleware chaining with control flow, and built-in logging, recovery, CORS, and rate limiting. Designed for building scalable API services.",
    stack: ["Go", "net/http", "Middleware", "Routing"],
    repoLink: "https://github.com/dipto-kainin/kai",
    projectLink: "https://pkg.go.dev/github.com/dipto-kainin/kai",
    previewImage: "/Kai.png",
    previewImageAlt: "Kai package documentation screenshot",
  },
  {
    id: "league-of-coders",
    kind: "project",
    title: "League of Coders",
    icon: "game-controller",
    summary:
      "A real-time 1v1 coding platform with matchmaking, code execution, and competitive gameplay.",
    details:
      "Real-time matchmaking system with code execution using Judge0, PostgreSQL + Redis architecture, JWT and OAuth authentication. Built as a full-stack competitive coding challenge platform.",
    stack: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Redis", "Judge0"],
    repoLink: "https://github.com/dipto-kainin/Leauge-of-Coders",
  },
  {
    id: "finflow-dashboard",
    kind: "project",
    title: "FinFlow Dashboard",
    icon: "chart-pie",
    summary:
      "A responsive finance dashboard with analytics, transaction management, and data visualization.",
    details:
      "Modern finance dashboard featuring role-based views, interactive charts and analytics (KPIs), search/filter/pagination, and CSV/Excel import support. Built with React and Vite for optimal performance.",
    stack: ["React", "Vite", "Tailwind CSS", "ECharts"],
    repoLink: "https://github.com/dipto-kainin/FinFlow-Dashboard",
    projectLink: "https://fin-flow-dashboard-nine.vercel.app/",
    previewFrameUrl: "https://fin-flow-dashboard-nine.vercel.app/",
  },
  {
    id: "super-tic-tac-toe",
    kind: "project",
    title: "Super Tic Tac Toe",
    icon: "grid-nine",
    summary:
      "A browser-based Super Tic Tac Toe game embedded directly into the portfolio as a live web view.",
    details:
      "Live Vercel deployment of Super Tic Tac Toe Arena, added as an in-desktop app so visitors can launch the game preview inside the portfolio window and jump to the source code from the title bar.",
    stack: ["Web Game", "SPA", "Vercel"],
    repoLink: "https://github.com/dipto-kainin/super-tic-tac-toe",
    projectLink: "https://super-tic-tac-toe-chi-topaz.vercel.app/",
    previewFrameUrl: "https://super-tic-tac-toe-chi-topaz.vercel.app/",
  },
  {
    id: "contact",
    kind: "contact",
    title: "Contact",
    icon: "envelope",
    summary:
      "Full stack developer open to full-time roles, freelance projects, and collaborations.",
    details:
      "Reach out for full-stack development opportunities, backend system design discussions, or product collaborations. Phone: +91-7044932097 | Location: Kolkata, India",
    link: "mailto:kaininhop@gmail.com?subject=Portfolio%20Inquiry",
  },
];

export const initialPositions: Record<string, WindowPosition> = {
  "about-me": { x: 120, y: 92 },
  "bistro-chains": { x: 160, y: 100 },
  raggame: { x: 280, y: 130 },
  "kai-framework": { x: 200, y: 160 },
  "league-of-coders": { x: 320, y: 100 },
  "finflow-dashboard": { x: 240, y: 180 },
  "super-tic-tac-toe": { x: 380, y: 140 },
  contact: { x: 360, y: 106 },
};
