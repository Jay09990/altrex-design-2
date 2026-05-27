import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  useEffect(() => {
    // Disable custom cursor on touch / coarse-pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouch) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    // Get all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, .interactive"
    );

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      // Use GSAP quickTo for smooth following
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          left: mouseX.current,
          top: mouseY.current,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    const handleMouseEnter = (e: Event) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          width: 32,
          height: 32,
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "rgba(139, 92, 246, 0.6)",
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          width: 8,
          height: 8,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.6)",
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          width: 4,
          height: 4,
          duration: 0.1,
        });
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          width: 32,
          height: 32,
          duration: 0.2,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      document.documentElement.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[10000] w-2 h-2 rounded-full border border-white/60 bg-transparent mix-blend-screen"
      style={{
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;
