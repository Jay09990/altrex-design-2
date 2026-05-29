import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProgressLine = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      animation: gsap.to(lineRef.current, {
        transform: "scaleY(1)",
        ease: "none",
      }),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-6 top-0 z-40 hidden h-screen w-0.5 origin-top md:block">
      <div
        ref={lineRef}
        className="h-full w-full origin-top bg-gradient-to-b from-[var(--accent-violet)] to-[var(--accent-fuchsia)]"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
};

export default ProgressLine;
