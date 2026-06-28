import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type BootScreenProps = {
  imageUrls: string[];
  onComplete: () => void;
};

export function BootScreen({ imageUrls, onComplete }: BootScreenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const preload = async () => {
      const promises = imageUrls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = url;
          }),
      );

      await Promise.all(promises);

      if (cancelled) return;

      const minDisplay = 2000;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplay - elapsed);

      await new Promise((resolve) => setTimeout(resolve, remaining));

      if (cancelled) return;

      const bootEl = window.__bootScreen as HTMLElement | null;
      if (bootEl) {
        bootEl.classList.add('boot-screen-hidden');
      }

      gsap.to(ref.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.35,
        ease: 'power3.out',
        onComplete: () => {
          if (!cancelled) onComplete();
        },
      });
    };

    const startTime = Date.now();
    preload();

    return () => {
      cancelled = true;
    };
  }, [imageUrls, onComplete]);

  return (
    <div className="boot-overlay" ref={ref}>
      <div className="boot-dots" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <p className="boot-label">Loading</p>
    </div>
  );
}
