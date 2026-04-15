import type { DesktopWindow, WindowPosition } from '../types/desktop';

export const desktopWindows: DesktopWindow[] = [
  {
    id: 'about-me',
    kind: 'about',
    title: 'About Me',
    icon: '👤',
    summary: 'Full Stack Developer | Go Backend Enthusiast | React & React Native Developer',
    details:
      'Final-year CSE student at RCCIIT with strong backend expertise in Go and scalable systems. Experienced in building real-time applications, API-driven systems, and polished frontend dashboards. Passionate about system design, performance optimization, and building impactful products. Currently interning at WhatBytes as a React Native developer.',
  },
  {
    id: 'kai-framework',
    kind: 'project',
    title: 'Kai Framework',
    icon: '⚙️',
    summary:
      'A lightweight Go HTTP framework built from scratch with routing, middleware chaining, and production-style utilities.',
    details:
      'A custom Go HTTP framework with method-based routing, path parameters, middleware chaining with control flow, and built-in logging, recovery, CORS, and rate limiting. Designed for building scalable API services.',
    stack: ['Go', 'net/http', 'Middleware', 'Routing'],
    repoLink: 'https://github.com/dipto-kainin/kai',
    projectLink: 'https://pkg.go.dev/github.com/dipto-kainin/kai',
    previewImage: '/Kai.png',
    previewImageAlt: 'Kai package documentation screenshot',
  },
  {
    id: 'league-of-coders',
    kind: 'project',
    title: 'League of Coders',
    icon: '🎮',
    summary:
      'A real-time 1v1 coding platform with matchmaking, code execution, and competitive gameplay.',
    details:
      'Real-time matchmaking system with code execution using Judge0, PostgreSQL + Redis architecture, JWT and OAuth authentication. Built as a full-stack competitive coding challenge platform.',
    stack: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'Judge0'],
    repoLink: 'https://github.com/dipto-kainin/Leauge-of-Coders',
  },
  {
    id: 'finflow-dashboard',
    kind: 'project',
    title: 'FinFlow Dashboard',
    icon: '💰',
    summary:
      'A responsive finance dashboard with analytics, transaction management, and data visualization.',
    details:
      'Modern finance dashboard featuring role-based views, interactive charts and analytics (KPIs), search/filter/pagination, and CSV/Excel import support. Built with React and Vite for optimal performance.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'ECharts'],
    repoLink: 'https://github.com/dipto-kainin/FinFlow-Dashboard',
    projectLink: 'https://fin-flow-dashboard-nine.vercel.app/',
    previewFrameUrl: 'https://fin-flow-dashboard-nine.vercel.app/',
  },
  {
    id: 'contact',
    kind: 'contact',
    title: 'Contact',
    icon: '✉️',
    summary:
      'Full stack developer open to full-time roles, freelance projects, and collaborations.',
    details:
      'Reach out for full-stack development opportunities, backend system design discussions, or product collaborations. Phone: +91-7044932097 | Location: Kolkata, India',
    link: 'mailto:kaininhop@gmail.com?subject=Portfolio%20Inquiry',
  },
];

export const initialPositions: Record<string, WindowPosition> = {
  'about-me': { x: 120, y: 92 },
  'kai-framework': { x: 280, y: 126 },
  'league-of-coders': { x: 220, y: 174 },
  'finflow-dashboard': { x: 360, y: 106 },
  contact: { x: 360, y: 106 },
};
