import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface CTAData {
  title: string;
  description: string;
  primaryButton: { label: string; href: string };
  secondaryButton?: { label: string; href: string };
}

const CTASection = ({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CTAData) => {
  return (
    <section className="relative mb-14 overflow-hidden rounded-3xl border border-border px-10 py-9 text-foreground max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="font-bold text-4xl text-foreground leading-snug">
            {title}
          </h2>
          <p className="mt-1.5 text-lg text-muted-foreground font-semibold max-w-xl leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link to={primaryButton.href}>
            <Button className="bg-accent cursor-pointer">{primaryButton.label}</Button>
          </Link>
          <Link to={secondaryButton.href}>
            <Button variant="outline" className="cursor-pointer">{secondaryButton.label}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
