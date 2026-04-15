import type { MouseEvent } from 'react';
import type { DesktopWindow as DesktopWindowModel, WindowPosition } from '../types/desktop';

type DesktopWindowProps = {
  id: string;
  item: DesktopWindowModel;
  index: number;
  isActive: boolean;
  isMaximized: boolean;
  position: WindowPosition;
  onFocus: (id: string) => void;
  onMinimize: (id: string) => void;
  onToggleMaximize: (id: string) => void;
  onClose: (id: string) => void;
  onTitleBarMouseDown: (event: MouseEvent, id: string) => void;
};

export function DesktopWindow({
  id,
  item,
  index,
  isActive,
  isMaximized,
  position,
  onFocus,
  onMinimize,
  onToggleMaximize,
  onClose,
  onTitleBarMouseDown,
}: DesktopWindowProps) {
  return (
    <article
      className={`window ${isActive ? 'window-active' : ''} ${isMaximized ? 'window-maximized' : ''}`}
      onMouseDown={() => onFocus(id)}
      style={
        isMaximized
          ? { zIndex: 200 + index }
          : { left: position.x, top: position.y, zIndex: 200 + index }
      }
    >
      <div className="window-titlebar" onMouseDown={(event) => onTitleBarMouseDown(event, id)}>
        <div className="window-title">
          <span aria-hidden="true">{item.icon}</span>
          <strong>{item.title}</strong>

          {item.kind === 'project' ? (
            <div className="window-title-links" onMouseDown={(event) => event.stopPropagation()}>
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
            onClick={() => onMinimize(id)}
            onMouseDown={(event) => event.stopPropagation()}
            type="button"
          >
            _
          </button>
          <button
            onClick={() => onToggleMaximize(id)}
            onMouseDown={(event) => event.stopPropagation()}
            type="button"
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button
            onClick={() => onClose(id)}
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
            <img alt={item.previewImageAlt ?? `${item.title} preview`} src={item.previewImage} />
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
}
