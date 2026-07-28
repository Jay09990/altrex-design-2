import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface CTAData {
  title: string;
  description: string;
  primaryButton: { label: string; href: string };
  secondaryButton: { label: string; href: string };
  badge?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CTASection = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  badge = "[ READY TO START ]",
}: CTAData) => {
  return (
    <section className="my-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="mx-auto max-w-7xl px-6 lg:px-8 py-16 text-center border border-border rounded-4xl"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono font-semibold text-xs text-muted-foreground tracking-[0.25em] uppercase mb-6"
        >
          {badge}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl max-w-3xl mx-auto"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl mx-auto text-base text-muted-foreground font-medium leading-7"
        >
          {description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link to={primaryButton.href}>
            <Button className="bg-orange-500 hover:bg-primary text-white h-11 px-8 rounded-lg font-medium">
              {primaryButton.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to={secondaryButton.href}>
            <Button
              variant="ghost"
              className="h-11 px-8 rounded-lg border border-border text-foreground hover:bg-card"
            >
              {secondaryButton.label}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
