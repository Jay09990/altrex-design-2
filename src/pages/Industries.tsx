import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Compass,
  Flame,
  Layers,
  Cpu,
  Fuel,
  Wind,
  Sun,
  Leaf,
  Zap,
  AlertTriangle,
  Database,
  Network,
  Server,
  GitBranch,
  Shield,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import CharReveal from "@/components/CharReveal";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import StarBorder from "@/components/StarBorder";

import { INDUSTRIES } from "@/data/industriesData";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

const Industries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectorParam = searchParams.get("sector");
  const navigate = useNavigate();

  // Solution items per industry (from Solutions.tsx structure)
  const solutionItemsMap: Record<string, Array<{ number: string; title: string; bullets: string[] }>> = {
    cgd: [
      { number: "01", title: "Region / GA (Geographical Area)", bullets: ["Regionwise Stations", "Sales per Region", "Gas Demand", "Downtime Monitoring", "Reconciliation"] },
      { number: "02", title: "CGS (City Gate Station)", bullets: ["City Sales", "Gas Losses (LUAG)", "Availability", "CNG Demand", "PNG Demand", "Gas Parameters Monitoring", "Reconciliation"] },
      { number: "03", title: "Distribution Level", bullets: ["CNG – Online, Mother, Daughter Stations", "PNG – Industrial, Commercial, Domestic", "LCNG", "DRS", "AMR", "Reconciliation"] },
      { number: "04", title: "CNG Station Level", bullets: ["Equipments – Compressors, Boosters, Dispensers", "Cascade Monitoring", "Analytics", "Sales", "PAS", "Reconciliation"] },
      { number: "05", title: "GIS & VTS", bullets: ["Asset Management", "Cascade Tracking", "Route Optimization", "Automatic Allocation", "Pipeline Network"] },
    ],
    omc: [
      { number: "01", title: "Terminal / Refinery Monitoring", bullets: ["Terminal Automation", "Tank Levels", "Fuel Availability", "Dispatch Planning", "Pumps Status", "Loading Operations"] },
      { number: "02", title: "Depot Monitoring", bullets: ["Tank Levels", "Inward/Outward Fuel", "Pumps Status", "Fuel Quality", "Stock Reconciliation"] },
      { number: "03", title: "Tank Truck / Logistics Monitoring", bullets: ["Truck GPS Tracking", "Fuel Quantity", "Delivery Status", "ETA", "Route Optimization"] },
      { number: "04", title: "Fuel Station Monitoring", bullets: ["Tank Levels", "Sales", "Availability", "Station Performance", "Sales Tracking"] },
      { number: "05", title: "Fuel Dispenser Monitoring", bullets: ["Nozzle Sales", "Dispenser Health", "Remote Diagnostics", "Vehicle Counts", "Vehicle Density"] },
    ],
    steel: [
      { number: "01", title: "Blast Furnace Monitoring", bullets: ["Hot Metal Temperature", "Pressure Profiles", "Tapping Schedules", "Burden Distribution", "Energy Efficiency"] },
      { number: "02", title: "Steel Melt Shop", bullets: ["Heat Tracking", "Alloy Additions", "Ladle Temperature", "Casting Speed", "Quality Grading"] },
      { number: "03", title: "Rolling Mill Automation", bullets: ["Roll Gap Control", "Strip Thickness", "Cooling Water Flow", "Speed Synchronization", "Coil Tracking"] },
      { number: "04", title: "Utilities & Energy", bullets: ["Power Distribution", "Compressed Air", "Water Treatment", "Gas Recovery", "Steam Balancing"] },
      { number: "05", title: "Quality & Compliance", bullets: ["Lab Integration", "Mechanical Testing", "SPC Charts", "Traceability", "Regulatory Reporting"] },
    ],
    manufacturing: [
      { number: "01", title: "OEE & Production Tracking", bullets: ["Machine Availability", "Performance Rate", "Quality Rate", "Shift Reports", "Downtime Classification"] },
      { number: "02", title: "Predictive Maintenance", bullets: ["Vibration Analysis", "Bearing Wear Detection", "Oil Condition", "Thermal Imaging Integration", "Work Order Triggers"] },
      { number: "03", title: "Quality Management", bullets: ["SPC / SQC Charts", "Defect Tracking", "Root Cause Analysis", "First Pass Yield", "Customer Returns"] },
      { number: "04", title: "Supply Chain Visibility", bullets: ["Inventory Levels", "Material Flow", "WIP Tracking", "Supplier Performance", "Batch Traceability"] },
      { number: "05", title: "Energy Management", bullets: ["Per-machine Consumption", "Peak Demand Control", "Carbon Footprint", "ISO 50001 Reports", "Cost Allocation"] },
    ],
    wind: [
      { number: "01", title: "Turbine Performance Monitoring", bullets: ["Power Curve Analysis", "Rotor Speed", "Pitch Angle Control", "Nacelle Direction", "Availability Factor"] },
      { number: "02", title: "Condition Monitoring", bullets: ["Gearbox Vibration", "Generator Temperature", "Blade Structural Health", "Tower Oscillation", "Bearing Diagnostics"] },
      { number: "03", title: "SCADA & Control", bullets: ["Remote Start/Stop", "Fault Management", "Curtailment Control", "Park Controller", "Grid Compliance"] },
      { number: "04", title: "Generation & Revenue", bullets: ["Energy Production (MWh)", "Capacity Utilization Factor", "PLF Tracking", "Revenue Forecasting", "PPA Compliance"] },
      { number: "05", title: "Maintenance Planning", bullets: ["Scheduled Maintenance", "Crane Scheduling", "Spare Parts Inventory", "Technician Dispatch", "Safety Compliance"] },
    ],
    solar: [
      { number: "01", title: "Plant Performance Monitoring", bullets: ["Irradiance vs Generation", "PR Ratio", "CUF Tracking", "Inverter Efficiency", "String-level Analysis"] },
      { number: "02", title: "Inverter & Combiner Box", bullets: ["Real-time Fault Alerts", "MPPT Performance", "String Current Imbalance", "Temperature Monitoring", "Remote Reset"] },
      { number: "03", title: "Weather & Forecasting", bullets: ["GHI / DNI / DHI Sensors", "Soiling Loss Estimation", "Weather Forecasting Integration", "Shadow Analysis", "Cleaning Schedule"] },
      { number: "04", title: "Grid Integration", bullets: ["Export / Import Monitoring", "Power Quality", "Reactive Power Control", "Grid Fault Events", "SLDC Reporting"] },
      { number: "05", title: "O&M & Revenue", bullets: ["Ticket Management", "Preventive Maintenance", "Energy Generation Reports", "Revenue Tracking", "Carbon Credits"] },
    ],
    renewable: [
      { number: "01", title: "Hybrid Plant Management", bullets: ["Solar + Wind + Storage", "Source Switching Logic", "Combined Generation View", "Grid-Tied / Off-Grid Modes", "Dispatch Optimization"] },
      { number: "02", title: "Battery Energy Storage", bullets: ["State of Charge (SoC)", "Cycle Count Tracking", "Charge / Discharge Curves", "Thermal Management", "BMS Integration"] },
      { number: "03", title: "Power Forecasting & Trading", bullets: ["Day-Ahead Forecast", "Intra-day Balancing", "Market Price Integration", "Curtailment Scheduling", "Penalty Avoidance"] },
      { number: "04", title: "Multi-site Portfolio", bullets: ["Consolidated Dashboard", "Cross-site Benchmarking", "Normalized KPIs", "Executive Reports", "Investor Portals"] },
      { number: "05", title: "Sustainability & ESG", bullets: ["Carbon Emission Tracking", "Green Certificates", "ESG Reporting", "Scope 2 Reduction", "Net Zero Roadmap"] },
    ],
  };

  const getSolutionItems = (sectorId: string) => {
    return solutionItemsMap[sectorId] || [];
  };

  // Active sector selection
  const [activeSectorId, setActiveSectorId] = useState<string>(sectorParam || "cgd");

  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndustryIndex((prev) => (prev + 1) % INDUSTRIES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);



  // Sync state with URL parameter if it changes
  useEffect(() => {
    if (sectorParam && INDUSTRIES.some(s => s.id === sectorParam)) {
      setActiveSectorId(sectorParam);
    }
  }, [sectorParam]);

  // Active sector details
  const activeSector = useMemo(() => {
    return INDUSTRIES.find(s => s.id === activeSectorId) || INDUSTRIES[0];
  }, [activeSectorId]);

  const selectSector = (id: string) => {
    setActiveSectorId(id);
    setSearchParams({ sector: id });
  };

  // Maps custom sector icons
  const getSectorIcon = (id: string, className = "h-5 w-5") => {
    switch (id) {
      case "cgd":
        return <Flame className={className} />;
      case "steel":
        return <Layers className={className} />;
      case "manufacturing":
        return <Cpu className={className} />;
      case "omc":
        return <Fuel className={className} />;
      case "wind":
        return <Wind className={className} />;
      case "solar":
        return <Sun className={className} />;
      case "renewable":
        return <Leaf className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  // Navigate to projects page with corresponding industry sector selected
  const handleViewProjects = () => {
    navigate(`/projects?sector=${activeSector.id}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-void)] pt-24 pb-20 text-[var(--text-primary)]">
      {/* Decorative Glow Blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden">
        <div className="absolute -right-20 top-20 h-[380px] w-[380px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute -left-20 top-40 h-[380px] w-[380px] rounded-full bg-zinc-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="border-black/[0.08] bg-[var(--bg-surface)] shadow-sm mb-6">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <span className="font-mono text-sm text-[var(--text-primary)]">
              <InViewDecryptedText
                text="ENTERPRISE CORE INFRASTRUCTURE"
                speed={55}
                className="text-[var(--text-primary)]"
                encryptedClassName="text-[var(--text-muted)]"
              />
            </span>
          </Badge>

          <CharReveal
            as="h1"
            lines={["REALTIME ARCHITECTURE", "FOR EVERY SECTOR"]}
            className="text-4xl font-bold tracking-tight sm:text-6xl uppercase"
            immediate
            delay={0}
            stagger={0.03}
            lineGap="mt-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-[var(--text-secondary)]"
          >
            Discover how the Altrex decentralized stream broker simplifies legacy protocol gaps, 
            eliminates database queue latency, and balances critical data pipelines at the edge.
          </motion.p>
        </div>

        {/* Horizontal Navigation Selector Grid */}
        <div className="grid grid-cols-2 gap-3 mb-16 sm:grid-cols-4 lg:grid-cols-7">
          {INDUSTRIES.map((sector) => {
            const isActive = sector.id === activeSectorId;
            // Use short label: sector ID uppercased is already perfect for CGD, OMC etc.
            const shortLabel: Record<string, string> = {
              cgd: "CGD",
              steel: "Steel",
              manufacturing: "Mfg",
              omc: "OMC",
              wind: "Wind",
              solar: "Solar",
              renewable: "RE Grid"
            };
            return (
              <button
                key={sector.id}
                onClick={() => selectSector(sector.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "border-orange-500 bg-orange-500/5 shadow-[0_0_20px_rgba(255,126,26,0.15)] text-white"
                    : "border-white/5 bg-[var(--bg-surface)]/50 text-[var(--text-secondary)] hover:border-white/15 hover:bg-[var(--bg-surface)]"
                }`}
              >
                <span className={`p-2.5 rounded-xl transition-all mb-2.5 ${
                  isActive ? "bg-orange-500 text-white" : "bg-[var(--bg-raised)] text-[var(--text-muted)]"
                }`}>
                  {getSectorIcon(sector.id, "h-4 w-4")}
                </span>
                <span className="font-mono text-[10px] text-center font-bold tracking-wider uppercase leading-tight">
                  {shortLabel[sector.id] || sector.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Sector Split Panel */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column: Challenges & Solutions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Sector Title & Tagline */}
              <div>
                <span className="font-mono text-xs uppercase text-orange-500 tracking-widest flex items-center gap-2">
                  [ SECTOR PROFILE: ACTIVE ]
                </span>
                <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
                  {activeSector.name}
                </h2>
                <p className="font-mono text-sm text-orange-500/90 italic mt-2">
                  &ldquo;{activeSector.tagline}&rdquo;
                </p>
              </div>

              {/* Summary */}
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeSector.summary}
              </p>

              {/* Challenge Panel */}
              <div className="rounded-2xl border border-white/5 bg-[var(--bg-surface)]/30 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-lg bg-red-500/10 text-red-500 mt-1">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">
                      The Sector Ingest Challenge
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      {activeSector.challenge}
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution Panel */}
              <div className="rounded-2xl border border-orange-500/10 bg-orange-500/[0.01] p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-lg bg-[var(--data-green)]/10 text-[var(--data-green)] mt-1">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">
                      The Altrex Edge Solution
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {activeSector.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Benchmarks — Enhanced Metric Cards */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              {activeSector.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl bg-gradient-to-br from-[var(--bg-raised)] to-[var(--bg-surface)] border border-white/5 p-6 text-center hover:border-orange-500/20 transition-all"
                >
                  <span className="block font-mono text-[9px] uppercase text-[var(--text-muted)] tracking-wider mb-3">
                    {metric.label}
                  </span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-orange-500">
                      <ScrambleCounter
                        target={metric.target}
                        finalText={metric.value}
                        totalFrames={30}
                        intervalMs={25}
                      />
                    </span>
                  </div>
                  <span className="block font-mono text-[9px] text-[var(--text-muted)] mt-2 opacity-60">
                    {metric.suffix}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Pulsing SVG Blueprint */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[var(--bg-surface)]/40 p-8 shadow-xl backdrop-blur-md flex flex-col justify-between relative min-h-[500px]">
            
            {/* Header info bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                [ DIAGRAM: EVENT FLOW BLUEPRINT ]
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                <span className="font-mono text-[10px] text-orange-500">ACTIVE FLOW</span>
              </div>
            </div>

            {/* SVG Canvas and Node flow */}
            <div className="flex-1 flex items-center justify-center py-4">
              <svg viewBox="0 0 420 400" className="w-full h-full max-h-[360px] overflow-visible">
                
                {/* Wires (Connecting paths) */}
                <g id="schematic-wires">
                  {/* Wire 1: Node 1 -> Node 2 */}
                  <path d="M 210 65 L 210 135" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <path d="M 210 65 L 210 135" fill="none" stroke="#ff7e1a" strokeWidth="2.5" 
                    strokeDasharray="8 15" strokeDashoffset="0" className="stroke-pulse-animation-y" />

                  {/* Wire 2: Node 2 -> Node 3 */}
                  <path d="M 210 175 L 210 245" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <path d="M 210 175 L 210 245" fill="none" stroke="#ff7e1a" strokeWidth="2.5" 
                    strokeDasharray="8 15" strokeDashoffset="0" className="stroke-pulse-animation-y" />

                  {/* Wire 3: Node 3 -> Node 4 */}
                  <path d="M 210 285 L 210 355" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <path d="M 210 285 L 210 355" fill="none" stroke="#ff7e1a" strokeWidth="2.5" 
                    strokeDasharray="8 15" strokeDashoffset="0" className="stroke-pulse-animation-y" />
                </g>

                {/* Decorative labels */}
                <g fontStyle="monospace" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">
                  <text x="260" y="105">[ TELEMETRY INGEST ]</text>
                  <text x="260" y="215">[ BROADCAST EVENT ]</text>
                  <text x="260" y="325">[ COMPOSE PERSIST ]</text>
                </g>

                {/* Nodes (Circles with labels) */}
                <g id="schematic-nodes">
                  
                  {/* Node 1: Ingest Source */}
                  <g className="cursor-pointer group">
                    <circle cx="210" cy="45" r="24" fill="#0d0b1a" stroke="rgba(255,255,255,0.08)" strokeWidth="2" className="group-hover:stroke-orange-500/40 transition-all duration-300" />
                    <circle cx="210" cy="45" r="8" fill="rgba(255,255,255,0.15)" />
                    <text x="210" y="95" fill="rgba(243, 241, 255, 0.9)" fontSize="9" fontWeight="bold" textAnchor="middle" className="uppercase font-mono tracking-wide">
                      {activeSector.blueprintNodes.source}
                    </text>
                    <text x="210" y="10" fill="rgba(255,126,26,0.8)" fontSize="8" textAnchor="middle" className="font-mono tracking-widest">
                      [ STAGE_01: INGESTION ]
                    </text>
                  </g>

                  {/* Node 2: Gateway */}
                  <g className="cursor-pointer group">
                    <circle cx="210" cy="155" r="24" fill="#0d0b1a" stroke="rgba(255,255,255,0.08)" strokeWidth="2" className="group-hover:stroke-orange-500/40 transition-all duration-300" />
                    <rect x="202" y="147" width="16" height="16" rx="2" fill="none" stroke="#ff7e1a" strokeWidth="2" />
                    <text x="210" y="205" fill="rgba(243, 241, 255, 0.9)" fontSize="9" fontWeight="bold" textAnchor="middle" className="uppercase font-mono tracking-wide">
                      {activeSector.blueprintNodes.gateway}
                    </text>
                  </g>

                  {/* Node 3: Altrex Event Broker */}
                  <g className="cursor-pointer group">
                    {/* Glowing aura */}
                    <circle cx="210" cy="265" r="30" fill="rgba(255,126,26,0.05)" className="animate-pulse" />
                    <circle cx="210" cy="265" r="24" fill="#0d0b1a" stroke="#ff7e1a" strokeWidth="2" className="shadow-[0_0_15px_rgba(255,126,26,0.4)]" />
                    <polygon points="210,253 222,271 198,271" fill="#ff7e1a" />
                    <text x="210" y="315" fill="#ff7e1a" fontSize="10" fontWeight="bold" textAnchor="middle" className="uppercase font-mono tracking-widest animate-pulse">
                      {activeSector.blueprintNodes.broker}
                    </text>
                  </g>

                  {/* Node 4: Storage / Central Core */}
                  <g className="cursor-pointer group">
                    <circle cx="210" cy="375" r="24" fill="#0d0b1a" stroke="rgba(255,255,255,0.08)" strokeWidth="2" className="group-hover:stroke-orange-500/40 transition-all duration-300" />
                    <circle cx="210" cy="375" r="6" fill="#4ade80" />
                    <text x="210" y="360" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle" className="font-mono tracking-widest">
                      [ STORAGE / MES OUT ]
                    </text>
                    <text x="210" y="415" fill="rgba(243, 241, 255, 0.9)" fontSize="9" fontWeight="bold" textAnchor="middle" className="uppercase font-mono tracking-wide">
                      {activeSector.blueprintNodes.storage}
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Bottom details block */}
            <div className="mt-8 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)]">
                <Compass className="h-3.5 w-3.5 text-orange-500" />
                EDGE SYNC STATUS: NOMINAL (EU-WEST-1)
              </div>
              
              <button
                onClick={handleViewProjects}
                className="group flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-mono text-xs font-bold text-white transition-all hover:bg-orange-600 active:scale-95 shadow-md hover:shadow-lg"
              >
                EXPLORE DEPLOYMENTS
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Solution Items Accordion */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <Accordion type="single" collapsible className="w-full">
                {getSolutionItems(activeSector.id)?.map((item) => (
                  <AccordionItem key={item.number} value={item.number} className="border-b border-white/5 last:border-0">
                    <AccordionTrigger className="py-4 hover:no-underline hover:text-orange-500 transition-colors group">
                      <div className="flex items-center gap-4 text-left">
                        <span
                          className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border text-sm font-bold"
                          style={{
                            borderColor: "#ff7e1a40",
                            backgroundColor: "#ff7e1a15",
                            color: "#f97316",
                          }}
                        >
                          {item.number}
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] group-hover:text-orange-500 transition-colors">
                          {item.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-14">
                      <div className="space-y-2">
                        {item.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500/60 mt-1.5 flex-shrink-0" />
                            <span className="text-sm text-[var(--text-secondary)]">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

{/* ── SECTION 4: WHY CHOOSE US ── */}
      <div className="border-t border-white/5 bg-[var(--bg-void)]">
        <WhyChooseUs />
      </div>

      {/* ── SECTION 3: ALTREX SOLUTION PILLARS ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 border-t border-white/5 pt-8 pb-8"
        >
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">[ CORE ARCHITECTURE ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Three Pillars of Edge Intelligence
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-secondary)]">
              Every Altrex deployment is built on the same three-layer architecture — regardless of industry, protocol, or scale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                icon: <Cpu className="h-7 w-7" />,
                step: "01",
                title: "Edge Broker",
                subtitle: "Process at the Source",
                points: [
                  "Runs as a 18 MB WebAssembly module on any industrial PC or gateway",
                  "No cloud dependency — full functionality during WAN outage",
                  "Sub-150μs local event routing between co-located controllers",
                  "Hot-reload configuration without service interruption"
                ]
              },
              {
                icon: <GitBranch className="h-7 w-7" />,
                step: "02",
                title: "Protocol Adapters",
                subtitle: "Speak Every Industrial Language",
                points: [
                  "Native support: Modbus RTU/TCP, OPC-UA, DNP3, IEC 61850, BACnet",
                  "Push-based MQTT Sparkplug B with birth/death certificate management",
                  "gRPC streaming for high-throughput microservice integration",
                  "Custom binary payload parsers via WASM plugin interface"
                ]
              },
              {
                icon: <Shield className="h-7 w-7" />,
                step: "03",
                title: "Resilient Buffering",
                subtitle: "Zero Data Loss, Guaranteed",
                points: [
                  "Persistent local queue survives edge node restarts",
                  "Chronological replay on reconnect with at-least-once delivery",
                  "Configurable buffer window: minutes to 30-day offline operation",
                  "TLS 1.3 end-to-end with certificate-based device authentication"
                ]
              }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-3xl border border-white/10 bg-[var(--bg-surface)]/50 p-8 flex flex-col gap-6 backdrop-blur-md relative overflow-hidden"
              >
                {/* Step number watermark */}
                <span className="absolute right-6 top-4 font-mono text-6xl font-black text-white/[0.03] select-none leading-none">
                  {pillar.step}
                </span>

                <div className="flex items-center gap-4">
                  <span className="p-3 rounded-xl bg-orange-500 text-white flex-shrink-0">
                    {pillar.icon}
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-widest">{pillar.subtitle}</span>
                    <h3 className="text-xl font-bold uppercase text-[var(--text-primary)]">{pillar.title}</h3>
                  </div>
                </div>

                <ul className="space-y-3 flex-1">
                  {pillar.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/5 pt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--data-green)] animate-pulse" />
                  <span className="font-mono text-[10px] text-[var(--data-green)] uppercase tracking-wider">
                    ACTIVE IN ALL {INDUSTRIES.length} SECTORS
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* ── SECTION 1: LIVE PLATFORM STATS BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 border-t border-white/5 pt-8"
        >
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">[ PLATFORM SCALE ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Deployed Across Every Scale
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-secondary)]">
              From a single distribution station to a national utility grid — Altrex adapts to your operational footprint without re-architecture.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Industrial Devices Connected", value: "2.4M+", sub: "Across all 7 sectors", icon: <Network className="h-5 w-5" />, color: "text-orange-500" },
              { label: "Protocols Natively Supported", value: "14+", sub: "Modbus, OPC-UA, DNP3, MQTT…", icon: <GitBranch className="h-5 w-5" />, color: "text-[var(--data-green)]" },
              { label: "Platform Uptime SLA", value: "99.999%", sub: "Five-nines guaranteed", icon: <Shield className="h-5 w-5" />, color: "text-blue-400" },
              { label: "Data Points / Day", value: "18 Billion", sub: "Processed at the edge", icon: <Database className="h-5 w-5" />, color: "text-purple-400" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-[var(--bg-surface)]/50 p-6 flex flex-col gap-3 backdrop-blur-sm"
              >
                <span className={`p-2 rounded-lg bg-[var(--bg-raised)] w-fit ${stat.color}`}>
                  {stat.icon}
                </span>
                <span className={`text-3xl font-bold tracking-tight ${stat.color}`}>
                  <ScrambleCounter target={parseFloat(stat.value.replace(/[^0-9.]/g, "")) || 0} finalText={stat.value} totalFrames={35} intervalMs={28} />
                </span>
                <div>
                  <span className="block text-sm font-semibold text-[var(--text-primary)]">{stat.label}</span>
                  <span className="block font-mono text-[10px] text-[var(--text-muted)] mt-0.5">{stat.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION 2: CROSS-INDUSTRY CHALLENGES GRID ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-24 border-t border-white/5 py-20"
        >
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">[ UNIVERSAL PAIN POINTS ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Challenges We Eliminate
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-secondary)]">
              These four systemic failures appear in every sector. Altrex was architected from the ground up to make each one obsolete.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <GitBranch className="h-6 w-6" />,
                title: "Protocol Fragmentation",
                body: "Legacy sites run Modbus RTU, OPC-DA, DNP3, and proprietary BACnet simultaneously with no common data layer. Integration projects take months and create brittle point-to-point bridges.",
                fix: "Altrex normalises all protocols onto a single unified event stream at the edge — no middleware rewrites required.",
                accent: "text-orange-500",
                border: "border-orange-500/15",
                bg: "bg-orange-500/[0.02]"
              },
              {
                icon: <AlertTriangle className="h-6 w-6" />,
                title: "Data Loss on Disconnect",
                body: "GPRS/4G links to remote sites drop unexpectedly. Standard MQTT without persistent sessions loses all telemetry during the outage window, creating compliance and safety blind spots.",
                fix: "Altrex edge buffers queue events locally and replay them in chronological order the instant connectivity resumes.",
                accent: "text-yellow-400",
                border: "border-yellow-400/15",
                bg: "bg-yellow-400/[0.02]"
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Latency Jitter in Control Loops",
                body: "Cloud-routed SCADA polling introduces variable round-trip latency that causes robotic offsets, turbine interlock trips, and inaccurate grid dispatch set-points.",
                fix: "Local Altrex broker nodes resolve events within 150μs — entirely immune to WAN latency fluctuations.",
                accent: "text-blue-400",
                border: "border-blue-400/15",
                bg: "bg-blue-400/[0.02]"
              },
              {
                icon: <Server className="h-6 w-6" />,
                title: "Historian Overload",
                body: "Centralised time-series databases choke when thousands of devices push raw samples simultaneously, causing write backlogs and delayed dashboards during peak production hours.",
                fix: "Altrex edge nodes pre-filter and delta-compress telemetry, forwarding only significant state changes to the historian.",
                accent: "text-[var(--data-green)]",
                border: "border-green-400/15",
                bg: "bg-green-400/[0.02]"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-2xl border ${item.border} ${item.bg} p-6 flex flex-col gap-4 backdrop-blur-sm`}
              >
                <span className={`p-2.5 rounded-xl bg-[var(--bg-raised)] w-fit ${item.accent}`}>
                  {item.icon}
                </span>
                <h3 className={`text-base font-bold uppercase tracking-tight ${item.accent}`}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)] flex-1">
                  {item.body}
                </p>
                <div className="border-t border-white/5 pt-4">
                  <span className="block font-mono text-[9px] uppercase text-[var(--text-muted)] mb-1">ALTREX FIX</span>
                  <p className="text-xs text-[var(--text-primary)] leading-relaxed">{item.fix}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
        {/* Global style injection for stroke-dashoffset animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes strokePulseY {
            to {
              stroke-dashoffset: -100;
            }
          }
          .stroke-pulse-animation-y {
            animation: strokePulseY 4s linear infinite;
          }
        `}} />
      </div>

      {/* ── SECTION 5: PAGE-LEVEL CTA ── */}
      <section className="relative overflow-hidden bg-transparent mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--bg-surface)] px-10 py-9 text-[var(--text-primary)] shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="font-bold text-3xl sm:text-4xl text-[var(--text-primary)] leading-snug">
                Ready to deploy Altrex in your{" "}
                <span className="inline-flex text-orange-500 overflow-hidden align-bottom" style={{ height: "1.3em" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIndustryIndex}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      {INDUSTRIES[currentIndustryIndex].name}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                network?
              </h2>
              <p className="mt-1.5 text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Talk to our engineering team to see a live demo of the Altrex decentralized stream broker tailored for your use case.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <StarBorder
                as="button"
                className="w-full sm:w-auto"
                innerClassName="bg-[var(--bg-void)] border border-orange-500/20 text-white text-sm font-semibold py-3 px-8 transition-colors flex items-center justify-center"
                color="#ff7e1a"
              >
                Book Demo
              </StarBorder>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto h-[46px] border-white/10 bg-[var(--bg-void)] hover:bg-[var(--bg-raised)] hover:text-white px-8"
              >
                <Link to={`/projects?sector=${activeSector.id}`}>
                  View Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
