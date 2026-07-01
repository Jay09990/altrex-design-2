import { useEffect, useState } from "react";
// import DecryptedText from "./DecryptedText";
import { useTheme } from "@/hooks/useTheme";
// import darklogo from "@/assets/altrex-logo-bg-black-removebg-blackbg.png";
// import lightlogo from "@/assets/altrex-logo-bg-white-removebg-whitebg.png";
import logo from "@/assets/W!_icon_round.png";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [canExit, setCanExit] = useState(false);

  const loadingMessages = [
    "CONNECTING TO EDGE NETWORK...",
    "CALIBRATING LATENCY SENSORS...",
    "INITIALIZING NODE WEB...",
    "MOUNTING REALTIME INTERFACE...",
    "SYSTEMS NOMINAL.",
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random increment between 5-15%
        const increment = Math.random() * 10 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    // Exit loading screen after minimum 1.8s
    const exitTimer = setTimeout(() => {
      setCanExit(true);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    if (!canExit || progress < 90 || isExiting) return;

    setIsExiting(true);
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 1150);

    return () => clearTimeout(completeTimer);
  }, [canExit, progress, isExiting, onComplete]);

  useEffect(() => {
    // Force exit after 3.5s regardless of progress so the app cannot stall on the splash screen.
    const forceExitTimer = setTimeout(() => {
      if (!isExiting) {
        setIsExiting(true);
        setTimeout(() => {
          onComplete?.();
        }, 1100);
      }
    }, 3500);

    return () => clearTimeout(forceExitTimer);
  }, [isExiting, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 1100ms cubic-bezier(0.85, 0, 0.15, 1)",
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      <div 
        className="flex flex-col items-center justify-center gap-12"
        style={{
          transform: isExiting ? "translateY(-100px)" : "translateY(0)",
          opacity: isExiting ? 0 : 1,
          transition: "transform 1000ms cubic-bezier(0.85, 0, 0.15, 1), opacity 800ms cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      >
        {/* Logo Mark */}
        <div className="animate-fade-in mb-4">
          <img
            src={logo}
            alt="Altrex Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <p className="mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            INITIALIZING SYSTEMS
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 space-y-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-card border border-border">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-fuchsia)] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right font-mono text-xs text-muted-foreground">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Status Message */}
        <div className="h-6 text-center">
          <p className="animate-pulse font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {loadingMessages[currentMessage]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
