import { Check } from "lucide-react";

import { motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    description:
      "Perfect for startups and small realtime applications.",

    features: [
      "100K Messages / month",
      "Realtime APIs",
      "MQTT Support",
      "Basic Analytics",
      "Email Support",
    ],

    popular: false,
  },

  {
    name: "Pro",
    price: "$99",
    popular: true,

    description:
      "Advanced infrastructure for growing realtime platforms.",

    features: [
      "10M Messages / month",
      "Distributed Clustering",
      "Advanced Analytics",
      "WebSocket APIs",
      "Priority Support",
    ],
  },

  {
    name: "Enterprise",
    price: "Custom",

    description:
      "Enterprise-grade infrastructure designed for scale.",

    features: [
      "Unlimited Throughput",
      "Global Infrastructure",
      "Dedicated Clusters",
      "Advanced Security",
      "24/7 Dedicated Support",
    ],

    popular: false,
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

const Pricing = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .shimmer-badge {
          background: linear-gradient(
            90deg,
            rgba(109,40,217,0.08) 0%,
            rgba(109,40,217,0.22) 40%,
            rgba(109,40,217,0.08) 80%
          );

          background-size: 200% auto;

          animation: shimmer 2.4s linear infinite;
        }

        .pro-glow-light {
          box-shadow:
            0 0 0 1.5px rgba(109,40,217,0.4),
            0 8px 40px rgba(109,40,217,0.12);
        }
      `}</style>

      {/* Ambient glows */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

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
              className="border border-violet-500/20 bg-violet-500/10 p-4 text-sm font-medium text-violet-300"
            >
              Pricing
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
          >
            Flexible Pricing for{" "}

            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Modern Infrastructure
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-lg text-[var(--text-secondary)]"
          >
            Start free, scale as you grow. No hidden fees.
          </motion.p>

          {/* Monthly / Annual toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[var(--bg-surface)]/70 p-1.5 shadow-sm">
            <button className="rounded-full bg-[var(--accent-violet)] px-5 py-2 text-sm font-semibold text-white">
              Monthly
            </button>
            <button className="rounded-full px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              Annual
              <span className="ml-1.5 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-400">
                –20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariants}
              whileHover={{
                y: -6,
                scale: 1.01,
              }}
              transition={{
                duration: 0.25,
              }}
              className={`relative flex flex-col overflow-hidden rounded-3xl border bg-[var(--bg-surface)]/75 p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                    ? "border-violet-400/40 pro-glow-light"
                    : "border-white/10 hover:border-violet-400/30 hover:shadow-lg"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="absolute right-5 top-5"
                >
                  <div className="shimmer-badge rounded-full border border-violet-400/20 px-4 py-1.5 text-xs font-semibold text-violet-200">
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Plan name */}
              <motion.p
                variants={fadeUpVariants}
                className="text-xs font-bold uppercase tracking-widest text-violet-500"
              >
                {plan.name}
              </motion.p>

              {/* Price */}
              <motion.div
                variants={fadeUpVariants}
                className="mt-5 flex items-end gap-2"
              >
                <span className="text-6xl font-bold text-[var(--text-primary)]">
                  {plan.price}
                </span>

                {plan.price !== "Custom" && (
                  <span className="mb-2 text-sm text-[var(--text-muted)]">
                    / month
                  </span>
                )}
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeUpVariants}
                className="mt-4 text-sm leading-7 text-[var(--text-secondary)]"
              >
                {plan.description}
              </motion.p>

              {/* Divider */}
              <div className="my-6 h-px bg-white/5" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {plan.features.map((feature, j) => (
                  <motion.li
                    key={j}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: j * 0.05,
                    }}
                    className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 4,
                      }}
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        plan.popular
                          ? "bg-violet-500/15"
                          : "bg-white/5"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          plan.popular
                            ? "text-violet-300"
                            : "text-[var(--text-muted)]"
                        }`}
                      />
                    </motion.div>

                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileTap={{
                  scale: 0.96,
                }}
                className={`mt-8 w-full rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md hover:opacity-90"
                    : plan.name === "Starter"
                      ? "border border-white/10 bg-[var(--bg-surface)]/70 text-[var(--text-primary)] hover:border-violet-400/30 hover:text-violet-200"
                      : "border border-white/10 bg-[var(--bg-surface)]/70 text-[var(--text-primary)] hover:border-violet-400/30 hover:text-violet-200"
                }`}
              >
                {plan.price === "Custom"
                  ? "Contact Sales"
                  : "Get Started"}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          variants={fadeUpVariants}
          className="mt-8 text-center text-sm text-[var(--text-muted)]"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Pricing;
