import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarFlyout } from './components/CalendarFlyout';
import { DesktopIcons } from './components/DesktopIcons';
import { DesktopWindow } from './components/DesktopWindow';
import { StartMenu } from './components/StartMenu';
import { Taskbar } from './components/Taskbar';
import { desktopWindows, initialPositions } from './data/desktopWindows';
import { defaultWallpaper, wallpaperOptions } from './data/wallpapers';
import './App.css';
import type { CalendarCell, WindowPosition } from './types/desktop';

const WALLPAPER_STORAGE_KEY = 'portfolio.wallpaper';

function App() {
  const [selectedWallpaperName, setSelectedWallpaperName] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultWallpaper.name;
    }

    const saved = window.localStorage.getItem(WALLPAPER_STORAGE_KEY);
    return wallpaperOptions.some((option) => option.name === saved)
      ? saved!
      : defaultWallpaper.name;
  });
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

  const calendarCells = useMemo<CalendarCell[]>(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const cells: CalendarCell[] = [];

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

  const selectedWallpaper = useMemo(
    () =>
      wallpaperOptions.find((option) => option.name === selectedWallpaperName) ?? defaultWallpaper,
    [selectedWallpaperName],
  );

  useEffect(() => {
    window.localStorage.setItem(WALLPAPER_STORAGE_KEY, selectedWallpaperName);
  }, [selectedWallpaperName]);

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

  const handleTaskbarWindowClick = (id: string) => {
    const isMinimized = minimizedIds.includes(id);
    const isActive = activeId === id && !isMinimized;

    if (isMinimized) {
      focusWindow(id);
      return;
    }

    if (isActive) {
      minimizeWindow(id);
      return;
    }

    focusWindow(id);
  };

  return (
    <main className={`desktop-shell ${selectedWallpaper.className}`}>
      <header className="desktop-brand">
        <h1>Portfolio OS</h1>
        <p>Windows style workspace</p>
      </header>

      <DesktopIcons windows={desktopWindows} onOpen={openWindow} onSelect={setActiveId} />

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
          <DesktopWindow
            id={id}
            index={index}
            isActive={isActive}
            isMaximized={isMaximized}
            item={item}
            key={id}
            onClose={closeWindow}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onTitleBarMouseDown={handleTitleBarMouseDown}
            onToggleMaximize={toggleMaximizeWindow}
            position={position}
          />
        );
      })}

      {startOpen ? (
        <StartMenu
          onOpenWindow={openWindow}
          onSelectWallpaper={setSelectedWallpaperName}
          selectedWallpaperName={selectedWallpaperName}
          wallpaperOptions={wallpaperOptions}
          windows={desktopWindows}
        />
      ) : null}

      <Taskbar
        activeId={activeId}
        calendarOpen={calendarOpen}
        minimizedIds={minimizedIds}
        now={now}
        onTaskbarWindowClick={handleTaskbarWindowClick}
        onToggleCalendar={() => {
          setCalendarOpen((prev) => !prev);
          setStartOpen(false);
        }}
        onToggleStart={() => {
          setStartOpen((prev) => !prev);
          setCalendarOpen(false);
        }}
        openIds={openIds}
        windows={desktopWindows}
      />

      {calendarOpen ? (
        <CalendarFlyout
          calendarCells={calendarCells}
          calendarMonth={calendarMonth}
          now={now}
          onNextMonth={() =>
            setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
          }
          onPreviousMonth={() =>
            setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
          }
        />
      ) : null}
    </main>
  );
}

export default App;
