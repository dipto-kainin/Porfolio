import type { CalendarCell } from '../types/desktop';

type CalendarFlyoutProps = {
  now: Date;
  calendarMonth: Date;
  calendarCells: CalendarCell[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

export function CalendarFlyout({
  now,
  calendarMonth,
  calendarCells,
  onPreviousMonth,
  onNextMonth,
}: CalendarFlyoutProps) {
  return (
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
        <button onClick={onPreviousMonth} type="button">
          ‹
        </button>
        <strong>
          {calendarMonth.toLocaleDateString([], {
            month: 'long',
            year: 'numeric',
          })}
        </strong>
        <button onClick={onNextMonth} type="button">
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
  );
}
