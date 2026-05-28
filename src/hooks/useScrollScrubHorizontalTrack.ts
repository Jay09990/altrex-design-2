/**
 * Pins a section and scroll-scrubs a horizontal track (X-translation) using GSAP ScrollTrigger.
 * Keeps the animation responsive and automatically cleans up on unmount.
 */

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseScrollScrubHorizontalTrackOptions = {
  /**
   * Disable the pinned horizontal scroll below this viewport width (px).
   * This keeps mobile scrolling predictable.
   */
  minWidth?: number;
  /**
   * Additional pixels to scroll after the horizontal travel finishes.
   * Useful for breathing room at the end.
   */
  endPadding?: number;
};

export function useScrollScrubHorizontalTrack(
  sectionRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLElement | null>,
  options: UseScrollScrubHorizontalTrackOptions = {}
) {
  const { minWidth = 1024, endPadding = 0 } = options;

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    if (!sectionEl || !trackEl) return;

    const media = window.matchMedia(`(min-width: ${minWidth}px)`);

    const setup = () => {
      gsap.set(trackEl, { x: 0 });

      const getDistance = () => {
        const distance = trackEl.scrollWidth - window.innerWidth;
        return Math.max(0, distance);
      };

      const tween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${getDistance() + endPadding}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(trackEl, { clearProps: "transform" });
      };
    };

    let cleanup: (() => void) | undefined;

    const update = () => {
      cleanup?.();
      cleanup = undefined;

      if (!media.matches) {
        gsap.set(trackEl, { clearProps: "transform" });
        ScrollTrigger.refresh();
        return;
      }

      cleanup = setup();
      ScrollTrigger.refresh();
    };

    update();

    const onChange = () => update();
    const onResize = () => ScrollTrigger.refresh();

    media.addEventListener("change", onChange);
    window.addEventListener("resize", onResize);

    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
      cleanup?.();
    };
  }, [sectionRef, trackRef, minWidth, endPadding]);
}

