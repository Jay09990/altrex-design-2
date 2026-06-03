import {
  BookOpen,
  Contact,
  Zap,
} from "lucide-react";

import { Button } from "../ui/button";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-32 mx-auto max-w-7xl px-6 pt-16 pb-0 lg:px-8">
      <style>{`
        @keyframes cta-bg {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .cta-gradient {
          background: linear-gradient(
            135deg,
            #7c2d12 0%,
            #ea580c 25%,
            #ff6b00 50%,
            #ea580c 75%,
            #431407 100%
          );

          background-size: 300% 300%;

          animation: cta-bg 8s ease infinite;
        }

        .headline-glow {
          text-shadow:
            0 0 60px rgba(196,181,253,0.4),
            0 0 120px rgba(196,181,253,0.15);
        }
      `}</style>

      <div className="relative mb-14 overflow-hidden rounded-4xl border px-10 py-9 text-[var(--text-primary)] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-bold text-4xl text-[var(--text-primary)] leading-snug">
                Start building with{" "}
                <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  Altrex
                </span>{" "}
                today
              </h2>
              <p className="mt-1.5 text-lg text-[var(--text-secondary)] max-w-md leading-relaxed">
                Deploy realtime infrastructure in minutes. No credit card required for the free tier.
              </p>
            </div>
            <div className="flex gap-2.5">
              <Button className="gap-2 bg-violet-500 text-white border-none">
                <Contact className="h-3.5 w-3.5" /> Contact Us
              </Button>
            </div>
          </div>
        </div>
    </section>
  );
};

export default CTA;
