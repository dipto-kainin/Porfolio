export type WindowKind = 'project' | 'about' | 'contact';

export type DesktopWindow = {
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

export type WindowPosition = {
  x: number;
  y: number;
};

export type CalendarCell = {
  key: string;
  label: number;
  muted: boolean;
  today: boolean;
};

export type WallpaperOption = {
  name: string;
  label: string;
  className: string;
};
