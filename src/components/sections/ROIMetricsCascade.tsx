import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, DollarSign, Zap, Clock, Shield, Layers } from "lucide-react";

import { SectionBadge } from "@/components/ui/section-badge";

const metrics = [
    {
        id: "roi_001",
        label: "FINANCIAL ROI",
        headline: "10–25%",
        icon: DollarSign,
        color: "#f97316",
        bullets: [
            "Lower Operational Expenditure (OPEX) through automation",
            "Energy optimization and consumption reduction",
            "Reduced engineering & integration costs",
        ],
    },
    {
        id: "roi_002",
        label: "ASSET PERFORMANCE",
        headline: "20%",
        icon: Zap,
        color: "#3b82f6",
        bullets: [
            "Early fault detection extends equipment life",
            "Reduced emergency repairs and spare usage",
            "Reduced lifecycle maintenance cost",
        ],
    },
    {
        id: "roi_003",
        label: "OPERATIONAL EFFICIENCY",
        headline: "15–30%",
        icon: Clock,
        color: "#8b5cf6",
        bullets: [
            "Reduce unplanned shutdowns and downtime",
            "Faster decision making",
            "Lower travel and manpower dependency",
        ],
    },
    {
        id: "roi_004",
        label: "RISK & COMPLIANCE",
        headline: "IEC-62443",
        icon: Shield,
        color: "#06b6d4",
        bullets: [
            "IEC-62443 architecture reduces operational risk exposure",
            "Compliance and audit reporting generated automatically",
            "Alarm correlation reduces incident response time",
        ],
    },
    {
        id: "roi_005",
        label: "STRATEGIC ROI",
        headline: "1 Platform",
        icon: Layers,
        color: "#22c55e",
        bullets: [
            "Single platform replaces multiple fragmented tools",
            "Expand from single site to multi-region infrastructure without redesign",
            "Analytics and enterprise integrations ready from day one",
        ],
    },
];

const ROIMetricsCascade = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="relative overflow-hidden bg-transparent py-28">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionBadge
                        title="ROI & BUSINESS OUTCOMES"
                        dot={true}
                        dotColor="bg-emerald-500"
                        decryptedTextClassName="text-emerald-500"
                    />

                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Typical outcomes across industries
                        <span className="block text-[#f97316]">Altrex Platform</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Real-world ROI impacts from early adopters in Oil & Gas, Manufacturing, Power, and Healthcare verticals.
                    </p>
                </div>

                <div ref={containerRef} className="mt-16 space-y-4">
                    {metrics.map((metric) => {
                        const Icon = metric.icon;
                        const isExpanded = expandedId === metric.id;

                        return (
                            <motion.button
                                key={metric.id}
                                type="button"
                                onClick={() => toggleExpand(metric.id)}
                                onHoverStart={() => !isMobile && setExpandedId(metric.id)}
                                onHoverEnd={() => !isMobile && setExpandedId(null)}
                                className="w-full text-left transition-all duration-300"
                            >
                                <motion.div
                                    className="overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border"
                                    style={{
                                        boxShadow: isExpanded ? "0 20px 40px -15px rgba(249, 115, 22, 0.1)" : "none",
                                    }}
                                >
                                    {/* Collapsed Content */}
                                    <div className="flex items-center justify-between gap-6">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div
                                                className="flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0"
                                                style={{
                                                    backgroundColor: `${metric.color}20`,
                                                }}
                                            >
                                                <Icon
                                                    className="h-6 w-6"
                                                    style={{ color: metric.color }}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                                                    [{metric.id}]
                                                </div>
                                                <div className="text-sm font-semibold text-foreground">
                                                    {metric.label}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 flex-shrink-0">
                                            <div className="font-mono text-3xl font-bold" style={{ color: metric.color }}>
                                                {metric.headline}
                                            </div>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-muted-foreground"
                                            >
                                                <ChevronDown className="h-5 w-5" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    <AnimatePresence mode="wait">
                                        {isExpanded && (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{
                                                    opacity: 1,
                                                    height: "auto",
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    height: 0,
                                                    transition: {
                                                        when: "afterChildren",
                                                        duration: 0.4,
                                                        ease: [0.16, 1, 0.3, 1],
                                                    },
                                                }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                className="mt-6 overflow-hidden border-t border-border pt-6"
                                            >
                                                <div className="space-y-3">
                                                    <AnimatePresence>
                                                        {metric.bullets.map((bullet, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: -10 }}
                                                                transition={{
                                                                    delay: i * 0.05,
                                                                    duration: 0.25,
                                                                    ease: [0.16, 1, 0.3, 1],
                                                                }}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <span
                                                                    className="mt-2 h-2 w-2 rounded-full flex-shrink-0"
                                                                    style={{ backgroundColor: metric.color }}
                                                                />
                                                                <span className="text-sm leading-relaxed text-muted-foreground">
                                                                    {bullet}
                                                                </span>
                                                            </motion.div>
                                                        ))}
                                                    </AnimatePresence>
                                                </div>

                                                <div className="mt-4 border-t border-border pt-4 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                                                    [ REGION: EU-WEST / INDUSTRY: GLOBAL / SLA: 99.99% ]
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ROIMetricsCascade;
