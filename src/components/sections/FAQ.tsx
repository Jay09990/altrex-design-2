import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import {
  Mail,
  MessageCircleQuestion,
} from "lucide-react";

import {
  motion,
  type Variants,
} from "framer-motion";

import { Badge } from "../ui/badge";

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
    <section className="relative overflow-hidden bg-white py-28">
      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-0 top-0 -z-10 h-[350px] w-[350px] rounded-full bg-violet-100/50 blur-3xl"
      />

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
              <Badge
                variant="secondary"
                className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
              >
                FAQ
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Frequently{" "}

              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Asked Questions
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mt-5 text-lg leading-8 text-gray-600"
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
              className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:border-violet-300 hover:shadow-md"
            >
              <motion.div
                whileHover={{
                  rotate: 4,
                  scale: 1.08,
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md"
              >
                <Mail className="h-4 w-4" />
              </motion.div>

              <div>
                <span className="block text-gray-900 transition-colors group-hover:text-violet-700">
                  Still have questions?
                </span>

                <span className="block text-xs font-normal text-gray-500">
                  support@altrex.dev
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
              className="mt-12 hidden h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 lg:flex"
            >
              <MessageCircleQuestion className="h-10 w-10 text-violet-400" />
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
                    className="border-b border-gray-100 py-1"
                  >
                    <AccordionTrigger className="py-6 text-left text-lg font-semibold text-gray-900">
                      <div className="flex w-full items-center justify-between gap-4 pr-1">
                        <span>{faq.question}</span>

                        <motion.div
                          whileHover={{
                            scale: 1.08,
                          }}
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-all group-data-[state=open]/accordion-trigger:border-violet-300 group-data-[state=open]/accordion-trigger:bg-violet-50 group-data-[state=open]/accordion-trigger:text-violet-600"
                        >
                          <span className="select-none text-lg font-light leading-none group-data-[state=open]/accordion-trigger:hidden">
                            +
                          </span>

                          <span className="hidden select-none text-lg font-light leading-none group-data-[state=open]/accordion-trigger:inline">
                            −
                          </span>
                        </motion.div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-6 text-base leading-8 text-gray-600">
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
                        className="border-l-2 border-violet-500 pl-4"
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