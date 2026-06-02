import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

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

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          width: 32,
          height: 32,
          backgroundColor: "rgba(216, 162, 101, 0.29)",
          borderColor: "#b1b1b1",
          boxShadow: "0 0 20px rgb(255, 255, 255)",
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          width: 12,
          height: 12,
         backgroundColor: "rgba(216, 162, 101, 0.29)",
          borderColor: "#b1b1b1",
          boxShadow: "0 0 20px rgb(255, 255, 255)",
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
      className="pointer-events-none fixed z-[10000] rounded-full"
      style={{
        left: 0,
        top: 0,
        width: "12px",
        height: "12px",
        backgroundColor: "#dfdfdf",
        border: "1px solid #ffffff",
        boxShadow: "0 0 12px rgba(255, 255, 255, 0.65)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;
