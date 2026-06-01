import { motion } from "framer-motion";
import { 
  Zap,
  Activity,
  ArrowRight,
  Network,
  ShieldCheck,
  Server,
  Layers,
  Settings,
  GitMerge,
  CloudLightning,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import CharReveal from "@/components/CharReveal";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import SystemDataTicker from "@/components/SystemDataTicker";
import StarBorder from "@/components/StarBorder";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

const SOLUTIONS_DATA = [
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance",
    desc: "Ingest high-frequency vibration and acoustic data. Run local ML inference at the edge to detect mechanical anomalies before critical failures occur.",
    icon: <Activity className="h-6 w-6" />,
    color: "text-orange-500",
    glow: "rgba(255, 126, 26, 0.5)",
  },
  {
    id: "digital-twins",
    title: "Real-time Digital Twins",
    desc: "Synchronize physical asset states with virtual 3D models in sub-10ms. Enable remote operators to monitor and control factories from anywhere.",
    icon: <Layers className="h-6 w-6" />,
    color: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.5)",
  },
  {
    id: "unified-namespace",
    title: "Unified OT/IT Namespace",
    desc: "Bridge operational technology (Modbus, OPC-UA) with enterprise IT (Kafka, Cloud) using a centralized, event-driven MQTT broker architecture.",
    icon: <Network className="h-6 w-6" />,
    color: "text-[var(--data-green)]",
    glow: "rgba(74, 222, 128, 0.5)",
  },
  {
    id: "automated-compliance",
    title: "Immutable Historian",
    desc: "Guarantee zero data loss with edge buffering. Automatically log environmental and safety telemetry to immutable storage for strict regulatory audits.",
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "text-purple-400",
    glow: "rgba(192, 132, 252, 0.5)",
  }
];

const Solutions = () => {
  const cardTilt = useMagneticTilt({ maxRotate: 5, perspective: 1000 });

  return (
    <div className="min-h-screen bg-[var(--bg-void)] pt-24 pb-20 text-[var(--text-primary)] overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden">
        <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />
        <div className="absolute left-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ── SECTION 1: HERO ── */}
        <div className="text-center mb-20 mt-10">
          <Badge variant="secondary" className="border-black/[0.08] bg-[var(--bg-surface)] shadow-sm mb-8">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <span className="font-mono text-sm text-[var(--text-primary)]">
              <InViewDecryptedText
                text="ENTERPRISE USE CASES"
                speed={40}
                className="text-[var(--text-primary)]"
                encryptedClassName="text-[var(--text-muted)]"
              />
            </span>
          </Badge>

          <CharReveal
            as="h1"
            lines={["THE REALTIME", "IMPERATIVE"]}
            className="text-4xl font-bold tracking-tight sm:text-6xl uppercase"
            immediate
            delay={0}
            stagger={0.03}
            lineGap="mt-2"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-8 max-w-3xl text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            From smart factories to national energy grids, Altrex provides the unyielding infrastructure required to capture, route, and analyze industrial events instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <SystemDataTicker
              items={[
                "SYS_ROUTING: DISTRIBUTED",
                "THROUGHPUT: 18.2 GB/S",
                "AVG_LATENCY: 4.2ms",
                "PACKET_LOSS: 0.0000001%",
                "ENCRYPTION: mTLS ACTIVE",
              ]}
            />
          </motion.div>
        </div>

        {/* ── SECTION 2: CORE CAPABILITIES MATRIX ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">[ CAPABILITY MATRIX ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Transformative Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SOLUTIONS_DATA.map((solution, i) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <StarBorder
                  as="div"
                  color={solution.glow}
                  speed="5s"
                  thickness={1.5}
                  className="w-full h-full"
                  innerClassName="h-full rounded-[20px] bg-[var(--bg-surface)]/40 border border-white/5 backdrop-blur-md p-8 sm:p-10 transition-all hover:bg-[var(--bg-surface)] hover:border-white/10"
                >
                  <div
                    onMouseMove={cardTilt.onMouseMove}
                    onMouseLeave={cardTilt.onMouseLeave}
                    style={{ transformStyle: "preserve-3d" }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-2xl bg-zinc-900 shadow-inner border border-white/5 ${solution.color}`}>
                        {solution.icon}
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight leading-none text-[var(--text-primary)]">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed flex-1">
                      {solution.desc}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] group cursor-pointer hover:text-orange-500 transition-colors">
                      <span>Explore Reference Architecture</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </StarBorder>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION 3: INTERACTIVE DATA PIPELINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-32 relative"
        >
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">[ EVENT TOPOLOGY ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              The Edge-to-Cloud Pipeline
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-secondary)]">
              Watch how raw machine telemetry is ingested, normalized, and securely routed to enterprise applications with zero data loss.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              
              {/* Step 1: Edge Ingest */}
              <div className="flex flex-col items-center text-center gap-4 relative">
                <div className="h-20 w-20 rounded-2xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center relative z-10 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(255,126,26,0.3)]">
                  <Settings className="h-8 w-8 text-orange-500 animate-[spin_4s_linear_infinite]" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight">1. Edge Ingest</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">Modbus / OPC-UA / MQTT</p>
                </div>
                
                {/* Connecting Line (Desktop only) */}
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-white/10 z-0">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50 animate-[shimmer_2s_infinite]" />
                </div>
              </div>

              {/* Step 2: Altrex Broker */}
              <div className="flex flex-col items-center text-center gap-4 relative">
                <div className="h-24 w-24 rounded-3xl border-2 border-[var(--data-green)] bg-zinc-950 flex items-center justify-center relative z-10 shadow-[0_0_40px_-5px_rgba(74,222,128,0.4)]">
                  <GitMerge className="h-10 w-10 text-[var(--data-green)]" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight">2. Altrex Broker</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">Filter / Buffer / Route</p>
                </div>
                
                {/* Connecting Line (Desktop only) */}
                <div className="hidden md:block absolute top-12 left-[65%] w-full h-[2px] bg-white/10 z-0">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--data-green)] to-transparent opacity-50 animate-[shimmer_2s_infinite_0.5s]" />
                </div>
              </div>

              {/* Step 3: Cloud / Enterprise */}
              <div className="flex flex-col items-center text-center gap-4 relative">
                <div className="h-20 w-20 rounded-2xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center relative z-10 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)]">
                  <CloudLightning className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight">3. Enterprise</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">Kafka / Cloud / Historian</p>
                </div>
              </div>
            </div>

            {/* Simulated Data Packets (Dots) */}
            <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
               <motion.div 
                 className="absolute h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_#ff7e1a] top-[calc(50%-44px)] left-[25%]"
                 animate={{ x: [0, 200, 400], opacity: [0, 1, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
               <motion.div 
                 className="absolute h-2 w-2 rounded-full bg-[var(--data-green)] shadow-[0_0_10px_#4ade80] top-[calc(50%-36px)] left-[50%]"
                 animate={{ x: [0, 150, 300], opacity: [0, 1, 0] }}
                 transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.8 }}
               />
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 4: LEGACY VS ALTREX ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">[ ARCHITECTURE COMPARISON ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              The Evolution of Industrial IT
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Legacy Approach */}
            <div className="flex-1 rounded-[24px] border border-red-500/20 bg-red-950/10 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <span className="p-2 rounded-full bg-red-500/20">
                  <Server className="h-5 w-5 text-red-500" />
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white/80">Legacy Polling</h3>
              </div>
              <ul className="space-y-6">
                {[
                  { label: "Architecture", val: "Centralized SCADA Pull", color: "text-zinc-400" },
                  { label: "Avg Latency", val: "500ms - 2s", color: "text-red-400 font-bold" },
                  { label: "Offline Resilience", val: "Total Data Loss", color: "text-red-400 font-bold" },
                  { label: "Hardware Req", val: "Heavy Edge Server", color: "text-zinc-400" }
                ].map((stat, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-red-500/10 pb-4">
                    <span className="font-mono text-xs text-[var(--text-muted)] uppercase">{stat.label}</span>
                    <span className={`text-sm ${stat.color}`}>{stat.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VS Divider */}
            <div className="flex items-center justify-center lg:flex-col gap-2 opacity-50">
               <div className="w-12 h-px lg:w-px lg:h-12 bg-white/20" />
               <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">VS</span>
               <div className="w-12 h-px lg:w-px lg:h-12 bg-white/20" />
            </div>

            {/* Altrex Approach */}
            <div className="flex-1 rounded-[24px] border border-orange-500/30 bg-orange-500/[0.02] p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500" />
              <div className="flex items-center gap-3 mb-8">
                <span className="p-2 rounded-full bg-orange-500/20 shadow-[0_0_20px_-2px_#ff7e1a]">
                  <Zap className="h-5 w-5 text-orange-500" />
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">Altrex Event Streaming</h3>
              </div>
              <ul className="space-y-6">
                {[
                  { label: "Architecture", val: "Decentralized Edge Push", color: "text-zinc-200" },
                  { label: "Avg Latency", val: "1.2ms (Sub-millisecond)", color: "text-[var(--data-green)] font-bold" },
                  { label: "Offline Resilience", val: "100% Immutable Buffering", color: "text-[var(--data-green)] font-bold" },
                  { label: "Hardware Req", val: "18MB WASM Runtime", color: "text-zinc-200" }
                ].map((stat, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-orange-500/10 pb-4">
                    <span className="font-mono text-xs text-[var(--text-muted)] uppercase">{stat.label}</span>
                    <span className={`text-sm ${stat.color}`}>{stat.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 5: CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-transparent p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl mb-6 relative z-10">
            Ready to modernize?
          </h2>
          <p className="mx-auto max-w-xl text-sm text-[var(--text-secondary)] mb-10 relative z-10 leading-relaxed">
            Stop losing telemetry data and dealing with massive integration delays. Deploy the Altrex runtime to your industrial gateways in under 5 minutes.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 font-mono text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95 shadow-[0_0_40px_-10px_#ff7e1a] relative z-10"
          >
            VIEW LIVE DEPLOYMENTS
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Solutions;