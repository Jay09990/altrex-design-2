import { Quote, Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { SectionBadge } from "../ui/section-badge";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

const testimonials = [
  {
    name: "Rajesh Patel",
    role: "CTO, Nexora Systems",
    initials: "RP",
    review:
      "The infrastructure performance and realtime scalability completely transformed our IoT platform.",
  },
  {
    name: "Emily Carter",
    role: "Lead Engineer, CloudSync",
    initials: "EC",
    review:
      "Developer experience is exceptional. APIs are clean, fast, and production-ready from day one.",
  },
  {
    name: "Daniel Kim",
    role: "Platform Architect, Voltix",
    initials: "DK",
    review:
      "Reliable, scalable, and incredibly fast. Perfect for modern realtime communication systems.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const Testimonials = () => {
  const [featured, ...compact] = testimonials;
  const tilt = useMagneticTilt({ maxRotate: 10, perspective: 900 });

  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUpVariants}>
            <SectionBadge
              title="TESTIMONIALS"
              dot={true}
              dotColor="bg-emerald-500"
              className="mb-6"
            />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Trusted by Modern{" "}
            <span className="text-[var(--accent-violet)]">
              Engineering Teams
            </span>
          </motion.h2>
        </div>

        {/* Asymmetric layout */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-16 flex flex-col gap-6 lg:flex-row"
        >
          {/* Featured testimonial */}
          <motion.div
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-md lg:basis-3/5"
          >
            {/* Giant quote mark */}
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="pointer-events-none absolute -top-4 left-6 select-none text-[120px] font-serif leading-none text-violet-100"
            >
              &ldquo;
            </motion.div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.div
                  key={s}
                  whileHover={{
                    scale: 1.15,
                    rotate: 8,
                  }}
                >
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>

            {/* Review */}
            <motion.p
              variants={fadeUpVariants}
              className="relative z-10 mt-6 text-lg font-semibold leading-relaxed text-muted-foreground"
            >
              &ldquo;{featured.review}&rdquo;
            </motion.p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-sm font-bold text-white"
              >
                {featured.initials}
              </motion.div>

              <div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-foreground">
                  {featured.name}
                </h4>

                <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {featured.role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Compact testimonials */}
          <div className="flex flex-col gap-6 lg:basis-2/5">
            {compact.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                transition={{
                  duration: 0.25,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <motion.div
                        key={s}
                        whileHover={{
                          scale: 1.12,
                          rotate: 6,
                        }}
                      >
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl  bg-orange-700 text-xs font-bold text-white"
                  >
                    <Quote className="h-4 w-4" />
                  </motion.div>
                </div>

                <p className="mt-4 text-sm font-semibold leading-relaxed text-muted-foreground">
                  &ldquo;{item.review}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full  bg-primary text-xs font-bold text-white"
                  >
                    {item.initials}
                  </motion.div>

                  <div>
                    <h4 className="text-xl font-bold uppercase tracking-tight text-accent">
                      {item.name}
                    </h4>

                    <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
