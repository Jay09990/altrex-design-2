import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import {
  Mail,
  MessageCircleQuestion,
  Minus,
  Plus,
} from "lucide-react";

import {
  motion,
  type Variants,
} from "framer-motion";

import { SectionBadge } from "../ui/section-badge";

const faqs = [
  {
    question: "How scalable is the infrastructure?",

    answer:
      "Our platform is built for distributed realtime systems and supports millions of concurrent connections globally.",
  },

  {
    question: "Do you support MQTT and WebSocket?",

    answer:
      "Yes. We provide production-ready MQTT, WebSocket, and REST infrastructure optimized for realtime communication.",
  },

  {
    question: "Is the platform enterprise ready?",

    answer:
      "Absolutely. Enterprise-grade security, global infrastructure, high availability, and advanced analytics are included.",
  },

  {
    question: "Can I integrate with existing systems?",

    answer:
      "Yes. We provide SDKs, APIs, and integrations for modern frameworks and infrastructure stacks.",
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

const FAQ = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* Left */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start"
          >
            <motion.div variants={fadeUpVariants}>
               <SectionBadge
                title="FAQ"
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-4"
              />
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
            className="mt-5 text-lg leading-8 text-muted-foreground font-semibold"
            >
              Can't find what you're looking for? Reach out to our team and
              we'll get back to you within one business day.
            </motion.p>

            {/* CTA */}
            <motion.a
              variants={fadeUpVariants}
              whileTap={{
                scale: 0.98,
              }}
              href="mailto:support@altrex.dev"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary"
            >
              <motion.div
                whileHover={{
                  rotate: 4,
                  scale: 1.08,
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-md"
              >
                <Mail className="h-4 w-4" />
              </motion.div>

              <div>
                <span className="block text-accent">
                  Still have questions?
                </span>

                <span className="block text-xs font-medium text-muted-foreground">
                  info@altrextech.com
                </span>
              </div>
            </motion.a>

            {/* Decoration */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={{
                scale: 1.05,
                rotate: 4,
              }}
              className="mt-12 hidden h-20 w-20 items-center justify-center rounded-3xl bg-secondary lg:flex"
            >
              <MessageCircleQuestion className="h-10 w-10 text-accent" />
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={fadeUpVariants}
            className="flex-1 lg:w-3/5"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-0"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-b border-border py-1"
                  >
                    <AccordionTrigger className="py-6 text-left text-lg font-semibold text-foreground">
                      <div className="flex w-full items-center justify-between gap-4 pr-1">
                        <span>{faq.question}</span>

                        <div
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border bg-primary/10 text-muted-foreground transition-all group-data-[state=open]/accordion-trigger:border-accent group-data-[state=open]/accordion-trigger:bg-secondary group-data-[state=open]/accordion-trigger:text-accent"
                        >
                          <span className="select-none group-data-[state=open]/accordion-trigger:hidden">
                            <Plus size={16} strokeWidth={3} />
                          </span>

                          <span className="hidden select-none group-data-[state=open]/accordion-trigger:inline">
                            <Minus size={16} strokeWidth={3} />
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-6 text-base leading-8 text-muted-foreground">
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: -8,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="border-l-2 border-accent pl-4 font-medium"
                      >
                        {faq.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;
