# Design

## Visual Theme & Colors
The project utilizes a glassmorphic Windows 11/Spotlight-inspired dark tech aesthetic with neutral dark elements and a primary blue/light blue accent.

- **Backgrounds**: Wallpaper presets (linear gradient + background image)
- **Glass surfaces**: `rgba(246, 250, 255, 0.96)` for windows, `rgba(12, 16, 28, 0.9)` for taskbar, `rgba(13, 27, 49, 0.45)` for search bar
- **Borders**: Layered thin borders (`rgba(20, 52, 92, 0.36)`) for windows, `rgba(255, 255, 255, 0.15)` for search input
- **Accents**: Primary blue (`#0078d7`), light blue (`#4fc2ff`)
- **Typography Ink**: Dark blue/grey (`#10253f`) for window body text, soft grey-blue (`#3e5679`) for summaries

## Typography
- **Headings**: `Segoe UI`, `Trebuchet MS`, sans-serif
- **Body**: `Segoe UI`, sans-serif (line length capped at 65-75ch, leading-relaxed)
- **Monospace**: `Consolas`, `Fira Code`, monospace for tags and technical details

## Components & Shape Locks
- **Corner Radii**:
  - Windows: `8px`
  - Search Bar: `8px`
  - Desktop Icons: `6px`
  - Wallpaper pickers: `8px`
  - Buttons / Tags: `4px` or `20px` (pills)
- **Buttons / Interactives**:
  - Tactile feedback: `transform: scale(0.97)` on `:active` press.
  - Hover states: `background: rgba(220, 238, 255, 0.2)` or filters.

## Icons
- **Icon Family**: Phosphor Icons (`react-icons/pi`)
- **Stroke Width**: `regular` (filled/regular weight)

## Motion & Transitions
- **Easing**: Custom `power3.out` for GSAP window animations, `ease-out` for hover states
- **Durations**:
  - Button states: `160ms`
  - Windows toggle: `250ms`
  - Command palette slide: `250ms`
