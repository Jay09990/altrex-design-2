import { motion } from "framer-motion";
import { ArrowRight, Play, Activity } from "lucide-react";
import InViewDecryptedText from "@/components/InViewDecryptedText";

function SolutionsHero() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,0,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,107,0,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Floating System Labels */}
      <div className="absolute left-10 top-24 hidden lg:block">
        <div className="font-mono text-xs text-muted-foreground">
          [REGION: AP-SOUTH-1]
        </div>
      </div>

      <div className="absolute right-12 top-40 hidden lg:block">
        <div className="font-mono text-xs text-green-500">● SYSTEM ONLINE</div>
      </div>

      <div className="absolute bottom-32 left-20 hidden lg:block">
        <div className="font-mono text-xs text-muted-foreground">
          LATENCY: 11ms
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-2"
          >
            <Activity className="h-4 w-4 text-orange-500" />

            <span className="font-mono text-xs tracking-[0.2em] text-orange-500 uppercase">
              Industry Solutions
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <InViewDecryptedText
              text="Realtime Infrastructure"
              className="text-5xl font-bold tracking-tight lg:text-7xl uppercase"
            />

            <InViewDecryptedText
              text="for Every Connected Industry"
              className="text-5xl font-bold tracking-tight text-orange-500 lg:text-7xl uppercase"
            />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground lg:text-xl"
          >
            From smart factories and connected fleets to energy grids and
            industrial IoT, Altrex provides the realtime infrastructure required
            to connect devices, stream data, process events, and deliver
            business-critical insights instantly.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <button
              className="group flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
              style={{ background: "linear-gradient(135deg,#ff6b00,#e05600)" }}
            >
              Explore Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <button
              className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-7 py-3.5 text-sm font-semibold text-[var(--text-primary)] backdrop-blur transition-all duration-200 hover:border-[var(--accent-violet)]/40 hover:shadow-md"
            >
              <Play className="mr-2 h-4 w-4" />
              Schedule Demo
            </button>
          </motion.div>

          {/* Live Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 grid gap-6 md:grid-cols-4"
          >
            {[
              ["10M+", "Events Daily"],
              ["99.99%", "Availability"],
              ["11ms", "Latency"],
              ["250K+", "Connected Devices"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-border/50 bg-background/40 p-6 backdrop-blur"
              >
                <div className="text-3xl font-bold text-orange-500">
                  {value}
                </div>

                <div className="mt-2 text-sm text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Solutions = () => {
  return (
    <div>
      <SolutionsHero />
    </div>
  );
};

export default Solutions;
