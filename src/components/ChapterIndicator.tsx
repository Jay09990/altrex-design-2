import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Chapter {
  number: string;
  name: string;
  startPercent: number;
  endPercent: number;
}

const chapters: Chapter[] = [
  { number: "01", name: "THE GATEWAY", startPercent: 0, endPercent: 18 },
  { number: "02", name: "CORE PULSE", startPercent: 18, endPercent: 36 },
  { number: "03", name: "THE BLUEPRINT", startPercent: 36, endPercent: 52 },
  { number: "04", name: "VELOCITY", startPercent: 52, endPercent: 68 },
  { number: "05", name: "SCALE", startPercent: 68, endPercent: 85 },
  { number: "06", name: "THE CONTRACT", startPercent: 85, endPercent: 100 },
];

const ChapterIndicator = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const currentChapterRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      // Find current chapter
      const newChapter = chapters.findIndex(
        (ch) => scrollPercent >= ch.startPercent && scrollPercent < ch.endPercent
      );

      if (newChapter !== currentChapterRef.current && newChapter !== -1) {
        currentChapterRef.current = newChapter;
        setCurrentChapter(newChapter);

        // Animate out current number
        if (numberRef.current) {
          gsap.to(numberRef.current, {
            opacity: 0,
            y: 6,
            duration: 0.18,
            onComplete: () => {
              gsap.fromTo(
                numberRef.current,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 0.22 }
              );
            },
          });
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapter = chapters[currentChapter];

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden md:block">
      <div ref={numberRef} className="mb-2">
        <div className="font-mono text-6xl font-bold text-muted-foreground">
          {chapter.number}
        </div>
      </div>
      <div ref={nameRef} className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {chapter.name}
      </div>
    </div>
  );
};

export default ChapterIndicator;
