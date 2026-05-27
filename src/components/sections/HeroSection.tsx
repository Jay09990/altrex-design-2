import { ArrowRight, Play, Zap } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


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
      duration: 0.8,
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-40 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 pb-20 pt-28 text-center lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={fadeUpVariants}>
          <Badge variant="secondary" className="mb-12 border-gray-200 p-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white"
            >
              <Zap className="h-3 w-3" />
            </motion.div>

            Modern Realtime Infrastructure Platform
          </Badge>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUpVariants}
          className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
        >
          Build Powerful
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}
            Realtime Applications{" "}
          </span>
          Without Complexity
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          className="mt-10 max-w-4xl text-lg leading-8 text-gray-600 sm:text-xl"
        >
          Power scalable messaging, IoT communication, and distributed systems
          with enterprise-grade realtime infrastructure built for modern
          applications.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-20 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button className="p-6">
              Start Building
              <ArrowRight />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button variant="outline" className="p-6">
              <Play />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;