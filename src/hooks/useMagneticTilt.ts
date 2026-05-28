/**
 * Provides cursor-driven 3D tilt handlers (magnetic card tilt) powered by GSAP.
 * Intended for card-like containers with `transform-style: preserve-3d`.
 */

import { useCallback } from "react";
import { gsap } from "gsap";

type MagneticTiltOptions = {
  maxRotate?: number;
  perspective?: number;
};

export function useMagneticTilt(options: MagneticTiltOptions = {}) {
  const { maxRotate = 12, perspective = 800 } = options;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateX: -y * maxRotate,
        rotateY: x * maxRotate,
        transformPerspective: perspective,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [maxRotate, perspective]
  );

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.6)",
    });
  }, []);

  return { onMouseMove, onMouseLeave };
}

