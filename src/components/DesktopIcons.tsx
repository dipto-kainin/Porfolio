import type { DesktopWindow } from '../types/desktop';

type DesktopIconsProps = {
  windows: DesktopWindow[];
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
};

export function DesktopIcons({ windows, onSelect, onOpen }: DesktopIconsProps) {
  return (
    <section className="desktop-icons" aria-label="Desktop shortcuts">
      {windows.map((windowItem) => (
        <button
          className="desktop-icon"
          key={windowItem.id}
          onClick={() => onSelect(windowItem.id)}
          onDoubleClick={() => onOpen(windowItem.id)}
          type="button"
        >
          <span className="desktop-icon-glyph" aria-hidden="true">
            {windowItem.icon}
          </span>
          <span>{windowItem.title}</span>
        </button>
      ))}
    </section>
  );
}
