import type { WallpaperOption } from '../types/desktop';

export const wallpaperOptions: WallpaperOption[] = [
  {
    name: 'sunset-valley',
    label: 'Sunset Valley',
    className: 'wallpaper-sunset-valley',
  },
  {
    name: 'teal-mountains',
    label: 'Teal Mountains',
    className: 'wallpaper-teal-mountains',
  },
  {
    name: 'arch-blue',
    label: 'Arch Blue',
    className: 'wallpaper-arch-blue',
  },
  {
    name: 'midnight-unix',
    label: 'Midnight Unix',
    className: 'wallpaper-midnight-unix',
  },
  {
    name: 'win11-bloom',
    label: 'Win 11 Bloom',
    className: 'wallpaper-win11-bloom',
  },
];

export const defaultWallpaper = wallpaperOptions[0];
