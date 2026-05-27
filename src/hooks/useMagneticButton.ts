import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";

const useMagneticButton = (
  ref: RefObject<HTMLElement | null>,
  strength = 0.3,
  radius = 50,
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const parent = element.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Only apply magnetic effect if within radius
      if (distance < radius) {
        const forceX = deltaX * strength;
        const forceY = deltaY * strength;

        gsap.to(element, {
          x: forceX,
          y: forceY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength, radius]);
};

export default useMagneticButton;
