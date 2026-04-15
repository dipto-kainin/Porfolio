import { FaWindows } from 'react-icons/fa6';
import type { DesktopWindow } from '../types/desktop';

type TaskbarProps = {
  windows: DesktopWindow[];
  openIds: string[];
  minimizedIds: string[];
  activeId: string;
  now: Date;
  calendarOpen: boolean;
  onToggleStart: () => void;
  onTaskbarWindowClick: (id: string) => void;
  onToggleCalendar: () => void;
};

export function Taskbar({
  windows,
  openIds,
  minimizedIds,
  activeId,
  now,
  calendarOpen,
  onToggleStart,
  onTaskbarWindowClick,
  onToggleCalendar,
}: TaskbarProps) {
  return (
    <footer className="taskbar">
      <button aria-label="Start" className="taskbar-start" onClick={onToggleStart} type="button">
        <FaWindows aria-hidden="true" className="taskbar-start-icon" />
      </button>

      <div className="taskbar-apps" aria-label="Opened apps">
        {openIds.map((id) => {
          const item = windows.find((entry) => entry.id === id);
          if (!item) {
            return null;
          }

          const isMinimized = minimizedIds.includes(id);
          const isActive = activeId === id && !isMinimized;

          return (
            <button
              className={`taskbar-app ${isActive ? 'taskbar-app-active' : ''}`}
              key={id}
              onClick={() => onTaskbarWindowClick(id)}
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
          onClick={onToggleCalendar}
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
  );
}
