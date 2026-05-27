import { Quote, Star } from "lucide-react";

import { motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";

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

const companies = [
  "Nexora",
  "CloudSync",
  "Voltix",
  "Infrastack",
  "DataPulse",
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

  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Top violet stripe */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500" />

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
            <Badge
              variant="secondary"
              className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
            >
              Testimonials
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Trusted by Modern{" "}

            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
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
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-md lg:basis-3/5"
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
              className="relative z-10 mt-6 text-xl leading-9 text-gray-700"
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white"
              >
                {featured.initials}
              </motion.div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  {featured.name}
                </h4>

                <p className="text-sm text-gray-500">
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
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-md"
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-bold text-white"
                  >
                    <Quote className="h-4 w-4" />
                  </motion.div>
                </div>

                <p className="mt-4 text-base leading-7 text-gray-600">
                  &ldquo;{item.review}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-bold text-white"
                  >
                    {item.initials}
                  </motion.div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trusted by row */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-16 text-center"
        >
          <p className="text-sm font-medium text-gray-500">
            Trusted by 200+ teams worldwide
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {companies.map((co, i) => (
              <motion.div
                key={co}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.06,
                }}
                className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-400 shadow-sm"
              >
                {co}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;