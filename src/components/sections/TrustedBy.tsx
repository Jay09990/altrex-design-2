import { motion, type Variants } from "framer-motion";

import LogoLoop from "../LogoLoop";

const techLogos = [
  {
    node: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "React",
    href: "https://react.dev",
  },

  {
    node: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
        alt="Next.js"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Next.js",
    href: "https://nextjs.org",
  },

  {
    node: (
      <img
        src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
        alt="TypeScript"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },

  {
    node: (
      <img
        src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
        alt="Tailwind CSS"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },

  {
    node: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
        alt="Figma"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Figma",
    href: "https://figma.com",
  },

  {
    node: (
      <img
        src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg"
        alt="Docker"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Docker",
    href: "https://docker.com",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

const TrustedBy = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute left-1/2 top-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={fadeUpVariants}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600"
          >
            Trusted Infrastructure
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Trusted by Modern Technology Teams
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Powering scalable realtime applications,
            distributed systems, and next-generation
            infrastructure across modern platforms.
          </motion.p>
        </div>

        {/* Logo Loop */}
        <motion.div
          variants={fadeUpVariants}
          className="relative mt-16 overflow-hidden"
        >
          {/* Left Gradient */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />

          {/* Right Gradient */}
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            className="will-change-transform [transform:translate3d(0,0,0)]"
          >
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={60}
              gap={100}
              hoverSpeed={0}
              scaleOnHover={false}
              fadeOut={false}
              ariaLabel="Technology partners"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TrustedBy;