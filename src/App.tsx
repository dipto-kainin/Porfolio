import { useEffect, useMemo, useRef, useState } from 'react';
import { FaWindows } from 'react-icons/fa6';
import './App.css';
type WindowKind = 'project' | 'about' | 'contact';

type DesktopWindow = {
  id: string;
  kind: WindowKind;
  title: string;
  icon: string;
  summary: string;
  details: string;
  stack?: string[];
  link?: string;
  repoLink?: string;
  projectLink?: string;
  previewImage?: string;
  previewImageAlt?: string;
  previewFrameUrl?: string;
  previewBlockedMessage?: string;
};

type WindowPosition = {
  x: number;
  y: number;
};

const desktopWindows: DesktopWindow[] = [
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

const initialPositions: Record<string, WindowPosition> = {
  'about-me': { x: 120, y: 92 },
  'kai-framework': { x: 280, y: 126 },
  'league-of-coders': { x: 220, y: 174 },
  'finflow-dashboard': { x: 360, y: 106 },
  contact: { x: 360, y: 106 },
};

function App() {
  const [openIds, setOpenIds] = useState<string[]>(['about-me']);
  const [activeId, setActiveId] = useState<string>('about-me');
  const [minimizedIds, setMinimizedIds] = useState<string[]>([]);
  const [maximizedWindowId, setMaximizedWindowId] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [positions, setPositions] = useState<Record<string, WindowPosition>>(initialPositions);

  const dragState = useRef<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const activeWindows = useMemo(
    () => openIds.filter((id) => !minimizedIds.includes(id)),
    [minimizedIds, openIds],
  );

  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const cells: Array<{ key: string; label: number; muted: boolean; today: boolean }> = [];

    for (let index = firstDay - 1; index >= 0; index -= 1) {
      const label = daysInPrevMonth - index;
      cells.push({
        key: `prev-${label}`,
        label,
        muted: true,
        today: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const today = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();

      cells.push({
        key: `current-${day}`,
        label: day,
        muted: false,
        today,
      });
    }

    while (cells.length < 42) {
      const label = cells.length - (firstDay + daysInMonth) + 1;
      cells.push({
        key: `next-${label}`,
        label,
        muted: true,
        today: false,
      });
    }

    return cells;
  }, [calendarMonth, now]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1_000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!dragState.current) {
        return;
      }

      const nextX = Math.max(
        16,
        Math.min(event.clientX - dragState.current.offsetX, window.innerWidth - 520),
      );
      const nextY = Math.max(
        24,
        Math.min(event.clientY - dragState.current.offsetY, window.innerHeight - 220),
      );

      setPositions((prev) => ({
        ...prev,
        [dragState.current!.id]: { x: nextX, y: nextY },
      }));
    };

    const handleUp = () => {
      dragState.current = null;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  useEffect(() => {
    const closePanels = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('.start-menu') && !target.closest('.taskbar-start')) {
        setStartOpen(false);
      }

      if (!target.closest('.calendar-flyout') && !target.closest('.taskbar-clock')) {
        setCalendarOpen(false);
      }
    };

    window.addEventListener('mousedown', closePanels);
    return () => window.removeEventListener('mousedown', closePanels);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && maximizedWindowId) {
        setMaximizedWindowId(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [maximizedWindowId]);

  const openWindow = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id).concat(id) : prev.concat(id),
    );
    setMinimizedIds((prev) => prev.filter((entry) => entry !== id));
    setActiveId(id);
    setStartOpen(false);
    setCalendarOpen(false);
  };

  const closeWindow = (id: string) => {
    setOpenIds((prev) => {
      const next = prev.filter((entry) => entry !== id);
      if (activeId === id) {
        setActiveId(next.at(-1) ?? '');
      }
      return next;
    });
    setMinimizedIds((prev) => prev.filter((entry) => entry !== id));
    if (maximizedWindowId === id) {
      setMaximizedWindowId(null);
    }
  };

  const focusWindow = (id: string) => {
    setOpenIds((prev) => prev.filter((entry) => entry !== id).concat(id));
    setMinimizedIds((prev) => prev.filter((entry) => entry !== id));
    setActiveId(id);
  };

  const minimizeWindow = (id: string) => {
    setMinimizedIds((prev) => (prev.includes(id) ? prev : prev.concat(id)));
    if (activeId === id) {
      const fallbackId = activeWindows.filter((entry) => entry !== id).at(-1) ?? '';
      setActiveId(fallbackId);
    }
    if (maximizedWindowId === id) {
      setMaximizedWindowId(null);
    }
  };

  const toggleMaximizeWindow = (id: string) => {
    setMaximizedWindowId((prev) => (prev === id ? null : id));
    setActiveId(id);
    setOpenIds((prev) => prev.filter((entry) => entry !== id).concat(id));
  };

  const handleTitleBarMouseDown = (event: React.MouseEvent, id: string) => {
    if (window.innerWidth <= 900 || maximizedWindowId === id) {
      return;
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    dragState.current = {
      id,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
  };

  return (
    <main className="desktop-shell">
      <header className="desktop-brand">
        <h1>Portfolio OS</h1>
        <p>Windows 10 style workspace</p>
      </header>

      <section className="desktop-icons" aria-label="Desktop shortcuts">
        {desktopWindows.map((windowItem) => (
          <button
            className="desktop-icon"
            key={windowItem.id}
            onClick={() => setActiveId(windowItem.id)}
            onDoubleClick={() => openWindow(windowItem.id)}
            type="button"
          >
            <span className="desktop-icon-glyph" aria-hidden="true">
              {windowItem.icon}
            </span>
            <span>{windowItem.title}</span>
          </button>
        ))}
      </section>

      {openIds.map((id, index) => {
        if (minimizedIds.includes(id)) {
          return null;
        }

        const item = desktopWindows.find((entry) => entry.id === id);
        if (!item) {
          return null;
        }

        const position = positions[id] ?? { x: 100 + index * 24, y: 100 + index * 24 };
        const isActive = activeId === id;
        const isMaximized = maximizedWindowId === id;

        return (
          <article
            className={`window ${isActive ? 'window-active' : ''} ${isMaximized ? 'window-maximized' : ''}`}
            key={id}
            onMouseDown={() => focusWindow(id)}
            style={
              isMaximized
                ? { zIndex: 200 + index }
                : { left: position.x, top: position.y, zIndex: 200 + index }
            }
          >
            <div
              className="window-titlebar"
              onMouseDown={(event) => handleTitleBarMouseDown(event, id)}
            >
              <div className="window-title">
                <span aria-hidden="true">{item.icon}</span>
                <strong>{item.title}</strong>

                {item.kind === 'project' ? (
                  <div
                    className="window-title-links"
                    onMouseDown={(event) => event.stopPropagation()}
                  >
                    {item.repoLink ? (
                      <a href={item.repoLink} rel="noreferrer" target="_blank">
                        Open repo
                      </a>
                    ) : null}
                    {item.projectLink ? (
                      <a href={item.projectLink} rel="noreferrer" target="_blank">
                        Project link
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="window-actions">
                <button
                  onClick={() => minimizeWindow(id)}
                  onMouseDown={(event) => event.stopPropagation()}
                  type="button"
                >
                  _
                </button>
                <button
                  onClick={() => toggleMaximizeWindow(id)}
                  onMouseDown={(event) => event.stopPropagation()}
                  type="button"
                >
                  {isMaximized ? '❐' : '□'}
                </button>
                <button
                  onClick={() => closeWindow(id)}
                  onMouseDown={(event) => event.stopPropagation()}
                  type="button"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="window-body">
              <h2>{item.summary}</h2>
              <p>{item.details}</p>

              {item.previewImage ? (
                <figure className="project-preview">
                  <img
                    alt={item.previewImageAlt ?? `${item.title} preview`}
                    src={item.previewImage}
                  />
                </figure>
              ) : null}

              {item.previewFrameUrl ? (
                <div className="project-webview">
                  <div className="project-webview-toolbar">
                    <span>Live Preview</span>
                  </div>
                  <iframe
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    src={item.previewFrameUrl}
                    title={`${item.title} web view`}
                  />
                </div>
              ) : null}

              {item.previewBlockedMessage ? (
                <div className="project-webview-blocked" role="note">
                  <strong>Preview unavailable in-app</strong>
                  <p>{item.previewBlockedMessage}</p>
                </div>
              ) : null}

              {item.stack ? (
                <ul className="window-tags" aria-label="Project technologies">
                  {item.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : null}

              {item.kind === 'contact' && item.link ? (
                <a className="window-link" href={item.link} rel="noreferrer" target="_self">
                  Open email client
                </a>
              ) : null}
            </div>
          </article>
        );
      })}

      {startOpen ? (
        <aside className="start-menu" aria-label="Start menu">
          <div className="start-profile">
            <span>Dev Profile</span>
            <strong>Creative Frontend</strong>
          </div>

          <div className="start-apps">
            {desktopWindows.map((item) => (
              <button key={item.id} onClick={() => openWindow(item.id)} type="button">
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          <div className="start-tiles" aria-label="Featured tiles">
            <button onClick={() => openWindow('kai-framework')} type="button">
              Featured Project
            </button>
            <button onClick={() => openWindow('contact')} type="button">
              Let's Collaborate
            </button>
          </div>
        </aside>
      ) : null}

      <footer className="taskbar">
        <button
          aria-label="Start"
          className="taskbar-start"
          onClick={() => {
            setStartOpen((prev) => !prev);
            setCalendarOpen(false);
          }}
          type="button"
        >
          <FaWindows aria-hidden="true" className="taskbar-start-icon" />
        </button>

        <div className="taskbar-apps" aria-label="Opened apps">
          {openIds.map((id) => {
            const item = desktopWindows.find((entry) => entry.id === id);
            if (!item) {
              return null;
            }

            const isMinimized = minimizedIds.includes(id);
            const isActive = activeId === id && !isMinimized;

            return (
              <button
                className={`taskbar-app ${isActive ? 'taskbar-app-active' : ''}`}
                key={id}
                onClick={() => {
                  if (isMinimized) {
                    focusWindow(id);
                    return;
                  }

                  if (isActive) {
                    minimizeWindow(id);
                    return;
                  }

                  focusWindow(id);
                }}
                type="button"
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="taskbar-tray" aria-label="System tray">
          <button className="taskbar-tray-icon" title="Internet access" type="button">
            <span className="wifi-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <button
            aria-expanded={calendarOpen}
            className="taskbar-clock"
            onClick={() => {
              setCalendarOpen((prev) => !prev);
              setStartOpen(false);
            }}
            type="button"
          >
            <strong>
              {now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </strong>
            <span>
              {now.toLocaleDateString([], {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </span>
          </button>
        </div>
      </footer>

      {calendarOpen ? (
        <aside className="calendar-flyout" aria-label="Calendar panel">
          <header className="calendar-top">
            <h2>{now.toLocaleDateString([], { weekday: 'long' })}</h2>
            <p>
              {now.toLocaleDateString([], {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </header>

          <div className="calendar-month-row">
            <button
              onClick={() =>
                setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
              }
              type="button"
            >
              ‹
            </button>
            <strong>
              {calendarMonth.toLocaleDateString([], {
                month: 'long',
                year: 'numeric',
              })}
            </strong>
            <button
              onClick={() =>
                setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
              }
              type="button"
            >
              ›
            </button>
          </div>

          <div className="calendar-weekdays" aria-hidden="true">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="calendar-grid" role="grid">
            {calendarCells.map((cell) => (
              <span
                className={`calendar-cell ${cell.muted ? 'calendar-muted' : ''} ${cell.today ? 'calendar-today' : ''}`}
                key={cell.key}
                role="gridcell"
              >
                {cell.label}
              </span>
            ))}
          </div>
        </aside>
      ) : null}
    </main>
  );
}

export default App;
