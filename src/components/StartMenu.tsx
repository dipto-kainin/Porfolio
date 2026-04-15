import type { DesktopWindow, WallpaperOption } from '../types/desktop';

type StartMenuProps = {
  windows: DesktopWindow[];
  selectedWallpaperName: string;
  wallpaperOptions: WallpaperOption[];
  onOpenWindow: (id: string) => void;
  onSelectWallpaper: (name: string) => void;
};

export function StartMenu({
  windows,
  selectedWallpaperName,
  wallpaperOptions,
  onOpenWindow,
  onSelectWallpaper,
}: StartMenuProps) {
  return (
    <aside className="start-menu" aria-label="Start menu">
      <div className="start-profile">
        <span>Dev Profile</span>
        <strong>Creative Frontend</strong>
      </div>

      <div className="start-apps">
        {windows.map((item) => (
          <button key={item.id} onClick={() => onOpenWindow(item.id)} type="button">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      <div className="start-tiles" aria-label="Featured tiles">
        <button onClick={() => onOpenWindow('kai-framework')} type="button">
          Featured Project
        </button>
        <button onClick={() => onOpenWindow('contact')} type="button">
          Let's Collaborate
        </button>
      </div>

      <section className="wallpaper-picker" aria-label="Wallpaper presets">
        <header className="wallpaper-picker-head">
          <span>Wallpaper</span>
          <strong>Static Presets</strong>
        </header>
        <div className="wallpaper-picker-grid">
          {wallpaperOptions.map((option) => {
            const isActive = option.name === selectedWallpaperName;

            return (
              <button
                className={`wallpaper-option ${isActive ? 'wallpaper-option-active' : ''}`}
                key={option.name}
                onClick={() => onSelectWallpaper(option.name)}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7, 18, 38, 0.16), rgba(7, 18, 38, 0.36)), url("${option.imageUrl}")`,
                }}
                type="button"
              >
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
