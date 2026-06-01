import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Search,
  Filter,
  AlertTriangle,
  Wifi,
  ExternalLink,
  Globe,
  Zap,
  Layers,
  Lock,
  Shield,
  Cpu,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import CharReveal from "@/components/CharReveal";
import StarBorder from "@/components/StarBorder";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import SystemDataTicker from "@/components/SystemDataTicker";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

import { PROJECTS } from "@/data/projectsData";
import { INDUSTRIES } from "@/data/industriesData";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectorParam = searchParams.get("sector");

  // Filter States
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    sectorParam || "all",
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync selected sector if the URL search param changes
  useEffect(() => {
    if (sectorParam) {
      setSelectedIndustry(sectorParam);
    }
  }, [sectorParam]);

  // Telemetry Console Active Project
  const [activeProjectId, setActiveProjectId] = useState<string>(
    PROJECTS[0].id,
  );

  // Live Telemetry states for the Active Project
  const [telemetryHistory, setTelemetryHistory] = useState<number[]>(
    PROJECTS[0].initialData,
  );
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isPinging, setIsPinging] = useState(false);

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const cardTilt = useMagneticTilt({ maxRotate: 8, perspective: 800 });

  // Get active project details
  const activeProject = useMemo(() => {
    return PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];
  }, [activeProjectId]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchIndustry =
        selectedIndustry === "all" || p.industry === selectedIndustry;
      const matchStatus =
        selectedStatus === "all" || p.status === selectedStatus;
      const matchSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchIndustry && matchStatus && matchSearch;
    });
  }, [selectedIndustry, selectedStatus, searchQuery]);

  // Automatically switch active project if current active project gets filtered out
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.some((p) => p.id === activeProjectId);
      if (!exists) {
        setActiveProjectId(filteredProjects[0].id);
      }
    }
  }, [filteredProjects, activeProjectId]);

  // Sync telemetry history initial state on active project change
  useEffect(() => {
    setTelemetryHistory(activeProject.initialData);

    // Seed initial logs
    const seedLogs = [
      `[SYSTEM] READY // REGION: ${activeProject.id === "gridpulse" ? "AP-SOUTH-1" : activeProject.id === "fleetmotion" ? "US-WEST-2" : "EU-CENTRAL-1"}`,
      `[INGEST] NODE ACTIVE AND SYNCED TO MAIN TELEMETRY CHANNEL`,
      `[SECURITY] TLS v1.3 HANDSHAKE COMPLETED SUCCESSFULLY`,
      `[LOG] LISTENING TO LIVE METRICS FOR DEVICE MATRIX...`,
    ];
    setConsoleLogs(seedLogs);
  }, [activeProject]);

  // Telemetry loop: Appends data point and updates chart every 700ms
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryHistory((prev) => {
        const lastVal = prev[prev.length - 1];
        // Create a random walk: value drifts but stays in visual limits
        let change = (Math.random() - 0.5) * 12;
        let nextVal = Math.round(lastVal + change);
        nextVal = Math.max(10, Math.min(160, nextVal)); // clamp
        return [...prev.slice(1), nextVal];
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  // System Log Loop: Appends simulated node logs every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const templates = activeProject.logTemplates;
      const randomLog = templates[Math.floor(Math.random() * templates.length)];
      const timestamp = new Date().toLocaleTimeString();

      setConsoleLogs((prev) => {
        const next = [...prev, `[${timestamp}] ${randomLog}`];
        if (next.length > 30) return next.slice(next.length - 30);
        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [activeProject]);

  // Autoscroll terminal
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop =
        terminalContainerRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Ping Test simulation
  const handlePingTest = () => {
    if (isPinging) return;
    setIsPinging(true);

    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [
      ...prev,
      `[${timestamp}] [PING] BROADCASTING ECHO PACKETS TO ALL EDGE REPLICAS...`,
    ]);

    setTimeout(() => {
      const latency = parseFloat((Math.random() * 4 + 2).toFixed(2)); // 2ms - 6ms
      setIsPinging(false);
      setConsoleLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [PING] ECHO OK // 64 BYTES RECEIVED // RTT = ${latency}ms`,
        `[${new Date().toLocaleTimeString()}] [SYSTEM] DEPLOYMENT INTEGRITY CHECKS NOMINAL.`,
      ]);
    }, 850);
  };

  // Convert telemetry points to SVG string
  const chartPath = useMemo(() => {
    const width = 500;
    const height = 150;
    const step = width / (telemetryHistory.length - 1);

    // Coordinates
    const points = telemetryHistory.map((val, index) => {
      const x = index * step;
      // Invert Y because SVG coordinates start from top-left (0,0)
      const y = height - val;
      return { x, y };
    });

    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

    // Closed path for fill gradient
    const fillPath = `${linePath} L 500 150 L 0 150 Z`;

    return { linePath, fillPath, points };
  }, [telemetryHistory]);

  const clearFilters = () => {
    setSelectedIndustry("all");
    setSelectedStatus("all");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[var(--bg-void)] pt-24 pb-20 text-[var(--text-primary)]">
      {/* Decorative Blur BG */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden">
        <div className="absolute -left-20 top-20 h-[380px] w-[380px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute -right-20 top-40 h-[380px] w-[380px] rounded-full bg-zinc-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)] mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2 animate-pulse" />
            <InViewDecryptedText
              text="LIVE SYSTEM IMPLEMENTATIONS"
              speed={50}
              className="text-[var(--data-green)]"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>

          <CharReveal
            as="h1"
            lines={["EXPLORE REALTIME", "DEPLOYMENT BLUEPRINTS"]}
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
            Explore real-world industrial deployments built on Altrex realtime
            core network infrastructure. Click any deployment card to initialize
            the live metrics diagnostic console and streams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-10 max-w-4xl"
          >
            <SystemDataTicker
              items={[
                "ACTIVE_CONNS: 2,492,891",
                "TOTAL_THROUGHPUT: 18.2 GB/S",
                "GLOBAL_EDGE_NODES: 148",
                "AVG_PROPAGATION: 8.5MS",
                "SYS_INTEGRITY: 100%",
                "ACCELERATION: NOMINAL",
              ]}
            />
          </motion.div>
        </div>

        {/* Real-time Diagnostics Terminal Dashboard Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {/* Active Project Info */}
          <div className="rounded-3xl border border-white/10 bg-[var(--bg-surface)]/75 p-8 lg:col-span-5 flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">
                    [ ACTIVE CHANNEL ]
                  </span>
                  <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
                    {activeProject.title}
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeProject.description}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/5 py-6">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
                    Ingest Scale
                  </span>
                  <span className="mt-1 block text-lg font-bold text-orange-500">
                    {activeProject.scale}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
                    Avg Latency
                  </span>
                  <span className="mt-1 block text-lg font-bold text-[var(--text-primary)]">
                    {activeProject.latency}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
                    Uptime SLA
                  </span>
                  <span className="mt-1 block text-lg font-bold text-[var(--data-green)]">
                    {activeProject.uptime}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                  Edge SDK & Protocol Integration:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/5 bg-[var(--bg-raised)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
              <Link
                to={`/industries?sector=${activeProject.industry}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-orange-500 hover:text-orange-400 transition-colors group"
              >
                VIEW INDUSTRY SATELLITE
                <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--data-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--data-green)]"></span>
                </span>
                <span className="font-mono text-xs uppercase text-[var(--data-green)]">
                  TELEMETRY ON
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Diagnostics Terminal */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 lg:col-span-7 flex flex-col justify-between shadow-2xl overflow-hidden relative min-h-[460px]">
            {/* Terminal Top bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-zinc-400 tracking-wider">
                  ALTREX_CONSOLE_V2.0.4.sh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePingTest}
                  disabled={isPinging}
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-50"
                >
                  <Wifi className="h-3 w-3 text-orange-500" />
                  {isPinging ? "PINGING..." : "PING TEST"}
                </button>
              </div>
            </div>

            {/* SVG Interactive Live Chart */}
            <div className="relative mb-6 h-36 w-full overflow-hidden border border-zinc-900 rounded-xl bg-zinc-950">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-[0.03]">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="border-t border-l border-zinc-100" />
                ))}
              </div>

              {/* Dynamic Path render */}
              <svg
                viewBox="0 0 500 150"
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff7e1a" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ff7e1a" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Fill Path */}
                <path d={chartPath.fillPath} fill="url(#chartGrad)" />

                {/* Line Path */}
                <path
                  d={chartPath.linePath}
                  fill="none"
                  stroke="#ff7e1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Glowing Active Telemetry Dot */}
                {chartPath.points.length > 0 && (
                  <circle
                    cx={chartPath.points[chartPath.points.length - 1].x}
                    cy={chartPath.points[chartPath.points.length - 1].y}
                    r="4"
                    fill="#ff7e1a"
                    className="animate-pulse"
                  />
                )}
              </svg>

              <div className="absolute right-4 top-4 font-mono text-[10px] uppercase text-zinc-400 bg-zinc-900/60 px-2 py-1 rounded">
                LIVE_THROUGHPUT:{" "}
                <span className="font-bold text-orange-500">
                  {telemetryHistory[telemetryHistory.length - 1]} Event/s
                </span>
              </div>
            </div>

            {/* Terminal output */}
            <div
              ref={terminalContainerRef}
              className="flex-1 overflow-y-auto max-h-56 pr-2 font-mono text-[11px] text-green-500/90 leading-relaxed custom-scrollbar bg-black/40 p-4 rounded-xl border border-zinc-900/60"
            >
              {consoleLogs.map((log, index) => {
                let textClass = "text-green-500/90";
                if (log.includes("WARNING") || log.includes("ANOMALY"))
                  textClass = "text-yellow-400";
                if (log.includes("ECHO OK"))
                  textClass = "text-orange-400 font-bold";
                if (log.includes("[SYSTEM] READY")) textClass = "text-cyan-400";
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-1 py-0.5 ${textClass}`}
                  >
                    <span className="text-zinc-600 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                );
              })}
              {isPinging && (
                <div className="flex items-center gap-1.5 text-orange-400">
                  <span className="text-zinc-600 select-none">&gt;</span>
                  <span className="animate-pulse">
                    PING TRANSMIT IN PROGRESS...
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filters Header block */}
        <div className="border-t border-white/5 pt-12 mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-orange-500" />
            <h3 className="font-mono text-sm uppercase tracking-widest text-[var(--text-secondary)]">
              FILTER DEPLOYMENTS
            </h3>
            {(selectedIndustry !== "all" ||
              selectedStatus !== "all" ||
              searchQuery.trim() !== "") && (
              <button
                onClick={clearFilters}
                className="font-mono text-xs text-orange-500 hover:text-orange-400 underline transition-all ml-4"
              >
                [ RESET ALL ]
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="relative max-w-sm w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search stack, title, parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-white/10 bg-[var(--bg-surface)]/60 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/30 transition-all"
            />
          </div>
        </div>

        {/* Filter Selection Panel */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Sector / Industry tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase mr-3">
              SECTORS:
            </span>
            <button
              onClick={() => {
                setSelectedIndustry("all");
                setSearchParams({});
              }}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all duration-200 border ${
                selectedIndustry === "all"
                  ? "bg-orange-500 border-orange-500 text-white font-bold"
                  : "bg-[var(--bg-surface)]/50 border-white/5 text-[var(--text-secondary)] hover:border-white/10"
              }`}
            >
              ALL SECTORS
            </button>
            {INDUSTRIES.map((sector) => (
              <button
                key={sector.id}
                onClick={() => {
                  setSelectedIndustry(sector.id);
                  setSearchParams({ sector: sector.id });
                }}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all duration-200 border ${
                  selectedIndustry === sector.id
                    ? "bg-orange-500 border-orange-500 text-white font-bold"
                    : "bg-[var(--bg-surface)]/50 border-white/5 text-[var(--text-secondary)] hover:border-white/10"
                }`}
              >
                {sector.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Status Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase mr-3">
              STATUS:
            </span>
            <button
              onClick={() => setSelectedStatus("all")}
              className={`rounded-lg px-3 py-1 font-mono text-[10px] transition-all duration-200 border ${
                selectedStatus === "all"
                  ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-void)] font-bold"
                  : "bg-[var(--bg-surface)]/50 border-white/5 text-[var(--text-secondary)] hover:border-white/10"
              }`}
            >
              ALL STATUS
            </button>
            {[
              { id: "operational", name: "OPERATIONAL" },
              { id: "scaling", name: "SCALING" },
              { id: "beta", name: "BETA / LAB" },
            ].map((stat) => (
              <button
                key={stat.id}
                onClick={() => setSelectedStatus(stat.id)}
                className={`rounded-lg px-3 py-1 font-mono text-[10px] transition-all duration-200 border ${
                  selectedStatus === stat.id
                    ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-void)] font-bold"
                    : "bg-[var(--bg-surface)]/50 border-white/5 text-[var(--text-secondary)] hover:border-white/10"
                }`}
              >
                {stat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Deployments grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-white/10 bg-[var(--bg-surface)]/30 p-20 text-center"
            >
              <AlertTriangle className="mx-auto h-10 w-10 text-yellow-500/80 mb-4" />
              <h3 className="text-xl font-bold uppercase text-[var(--text-primary)]">
                NO SYSTEMS REGISTERED
              </h3>
              <p className="mt-2 text-[var(--text-secondary)]">
                No active deployments match the selected filters or search
                telemetry parameters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 rounded-xl border border-white/10 bg-[var(--bg-surface)] px-5 py-2 font-mono text-xs text-orange-500 hover:bg-[var(--bg-raised)]"
              >
                [ RESET FILTER SYSTEM ]
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, i) => {
                const isActive = project.id === activeProjectId;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <StarBorder
                      as="div"
                      color={isActive ? "#ff7e1a" : "transparent"}
                      speed="10s"
                      thickness={isActive ? 1.2 : 0}
                      className="w-full"
                      innerClassName={`h-full border transition-all duration-300 rounded-[18px] cursor-pointer ${
                        isActive
                          ? "border-orange-500/20 bg-orange-500/[0.02]"
                          : "border-white/5 bg-[var(--bg-surface)]/50 hover:border-white/10 hover:shadow-lg"
                      }`}
                    >
                      <div
                        onClick={() => setActiveProjectId(project.id)}
                        onMouseMove={cardTilt.onMouseMove}
                        onMouseLeave={cardTilt.onMouseLeave}
                        className="p-6 flex flex-col justify-between h-[280px] w-full"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div>
                          {/* Card Top section */}
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
                              [ ID: {project.id.toUpperCase()}-EDGE ]
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  project.status === "operational"
                                    ? "bg-[var(--data-green)]"
                                    : project.status === "scaling"
                                      ? "bg-blue-400 animate-pulse"
                                      : "bg-[var(--data-amber)]"
                                }`}
                              />
                              <span className="font-mono text-[9px] text-[var(--text-secondary)] uppercase">
                                {project.status}
                              </span>
                            </div>
                          </div>

                          {/* Titles */}
                          <h3 className="mt-4 text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
                            {project.title}
                          </h3>
                          <span className="block font-mono text-[11px] text-orange-500 uppercase tracking-wide mt-1">
                            {project.subtitle}
                          </span>

                          {/* Summary text */}
                          <p className="mt-4 text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Card bottom section */}
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-[var(--text-muted)]">
                            SCALE: {project.scale}
                          </span>
                          <span className="font-mono text-[10px] text-orange-500 group-hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                            {isActive ? "ACTIVE STREAM" : "START DIAGNOSTIC"}
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </StarBorder>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        {/* ── SECTION 4: EDGE NODE ARCHITECTURE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 border-t border-white/5 pt-20"
        >
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">[ HARDWARE ABSTRACTION ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Inside an Altrex Edge Node
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-secondary)]">
              Discover the microservices that power sub-millisecond data routing at the edge, packaged in a lightweight 18MB WebAssembly runtime.
            </p>
          </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Protocol Normalizer",
                desc: "Ingests raw Modbus, OPC-UA, and MQTT streams, instantly converting them into a unified, high-speed binary format.",
                color: "text-blue-400"
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Event Router",
                desc: "Evaluates rules and routes messages locally at 150μs latency, ensuring mission-critical logic executes even without cloud access.",
                color: "text-orange-500"
              },
              {
                icon: <Layers className="h-6 w-6" />,
                title: "Persistent Buffer",
                desc: "Caches events during network dropouts using an embedded, lightning-fast append-only log, guaranteeing zero data loss.",
                color: "text-[var(--data-green)]"
              },
              {
                icon: <Lock className="h-6 w-6" />,
                title: "Zero-Trust Proxy",
                desc: "Secures all outbound connections using mutual TLS (mTLS) and hardware-backed cryptographic identity verification.",
                color: "text-purple-400"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[var(--bg-surface)]/60 p-6 flex flex-col gap-4 backdrop-blur-md relative overflow-hidden group hover:border-orange-500/30 transition-colors"
              >
                <div className={`p-3 rounded-xl bg-zinc-900 w-fit ${feature.color} shadow-inner`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {feature.desc}
                </p>
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  {feature.icon}
                </div>
              </motion.div>
            ))}
          </div>

</motion.div>

        {/* ── SECTION 5: THREAT & ANOMALY MATRIX ── */}
        <motion.div
    initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 border-t border-white/5 pt-20 mb-12"
        >

<div className="text-center mb-12">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">[ SECURITY POSTURE ]</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Global Threat Matrix
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-secondary)]">
              Real-time visualization of intercepted anomalies and automated security responses across the Altrex global infrastructure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl border border-red-500/20 bg-red-950/10 p-1 shadow-2xl backdrop-blur-md">
             <div className="rounded-[22px] border border-white/5 bg-zinc-950/80 p-6 flex flex-col md:flex-row gap-8">
               
               {/* Stats Column */}
               <div className="flex flex-col gap-6 w-full md:w-1/3">
                 <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/50">
                    <span className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] uppercase mb-2">
                      <Shield className="h-3 w-3 text-red-500" />
                      Anomalies Blocked (24h)
                    </span>
<span className="text-3xl font-bold text-red-500">14,289</span>
                 </div>
                 <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/50">
                    <span className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] uppercase mb-2">
                      <Cpu className="h-3 w-3 text-orange-500" />
                      ML Analysis Latency
                    </span>
                    <span className="text-3xl font-bold text-orange-500">4.2ms</span>
                 </div>
               </div>

{/* Log Column */}
               <div className="flex-1 rounded-xl border border-zinc-900 bg-black/60 p-4 font-mono text-[10px] sm:text-xs overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/80 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  
                  <div className="space-y-3 opacity-80 animate-pulse">
                    <div className="flex gap-4">
                      <span className="text-zinc-600">[12:44:01]</span>
                      <span className="text-red-500">[WARN] DDoS Signature detected at EU-Frankfurt</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-600">[12:44:02]</span>
                      <span className="text-orange-500">[ACTN] Routing traffic to mitigation sinkhole...</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-600">[12:44:05]</span>
                      <span className="text-[var(--data-green)]">[OK] Threat neutralized. Edge node stable.</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-600">[12:47:11]</span>
                      <span className="text-blue-400">[INFO] Rotating mTLS certificates for SG-Node-4</span>
                    </div>
                     <div className="flex gap-4">
                      <span className="text-zinc-600">[12:48:33]</span>
                      <span className="text-yellow-500">[WARN] Malformed Modbus payload rejected</span>
                    </div>
                  </div>
               </div>

 </div>
          </div>

</motion.div>

      </div>
    </div>
  );
};

export default Projects;
