import * as React from "react";
import {
  Contact,
} from "lucide-react";

import { Button } from "../ui/button";

type CTAAction = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
};

type CTAProps = {
  title?: string;
  description?: string;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction;
  accent?: "orange" | "teal";
};

const CTA = ({
  title = "Ready to Modernize Your Operations?",
  description = "See how Altrex can help you connect assets, visualize operations, and make smarter decisions.",
  primaryAction,
  secondaryAction,
  accent = "orange",
}: CTAProps) => {
  const primary = primaryAction ?? {
    label: "Schedule Demo",
    href: "#contact",
    icon: <Contact className="h-3.5 w-3.5" />,
    variant: "default",
  };

  const secondary = secondaryAction ?? {
    label: "Contact Sales",
    href: "#contact",
    variant: "outline",
  };

  const accentClasses = accent === "teal" ? "border-teal-500/20" : "border";

  const primaryClass =
    accent === "teal"
      ? "gap-2 bg-teal-500 text-white border-none hover:bg-teal-400"
      : "gap-2 bg-violet-500 text-white border-none hover:bg-violet-400";

  const secondaryClass =
    accent === "teal"
      ? "gap-2 border border-teal-500/30 bg-transparent text-teal-100 hover:bg-teal-500/10"
      : "gap-2 border border-white/10 bg-transparent text-white/80 hover:bg-white/10";

  const renderAction = (action: CTAAction, className: string) => {
    return action.href ? (
      <Button asChild className={className}>
        <a href={action.href}>
          {action.icon}
          {action.label}
        </a>
      </Button>
    ) : (
      <Button className={className}>
        {action.icon}
        {action.label}
      </Button>
    );
  };

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

      <div
        className={`relative mb-14 overflow-hidden rounded-4xl border px-10 py-9 text-foreground shadow-sm ${accentClasses}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-4xl text-foreground leading-snug">
              {title}
            </h2>
            <p className="mt-1.5 text-lg text-muted-foreground max-w-md leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {renderAction(primary, primaryClass)}
            {secondary && renderAction(secondary, secondaryClass)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
