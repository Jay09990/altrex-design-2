import { useMemo, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import InViewDecryptedText from "@/components/InViewDecryptedText";

const industryOptions = [
  "Oil & Gas",
  "Power & Energy",
  "Manufacturing",
  "Transportation",
  "Healthcare",
  "Smart Cities",
  "Renewables",
] as const;

const orange = "#f97316";

function formatCurrency(value: number) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value).toLocaleString("en-US")}`;
  }
  return `$${Math.round(value)}`;
}

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

const ROICalculator = () => {
  const [industry, setIndustry] = useState<typeof industryOptions[number]>("Oil & Gas");
  const [assets, setAssets] = useState(500);
  const [opex, setOpex] = useState(1_000_000);
  const [deployment, setDeployment] = useState<"CLOUD" | "ON-PREMISE">("CLOUD");

  const multipliers = useMemo<Record<string, number>>(() => ({
    "Oil & Gas": 0.18,
    Manufacturing: 0.15,
    Healthcare: 0.12,
    default: 0.14,
  }), []);

  const industryMultiplier = useMemo(
    () => multipliers[industry] ?? multipliers.default,
    [industry, multipliers]
  );

  const industryDowntimeBonus = useMemo(() => {
    if (industry === "Oil & Gas") return 10;
    if (industry === "Manufacturing") return 8;
    return 5;
  }, [industry]);

  const industryComplianceBonus = useMemo(() => {
    if (industry === "Healthcare") return 8;
    if (industry === "Oil & Gas") return 6;
    return 3;
  }, [industry]);

  const financialSavings = useMemo(
    () => opex * industryMultiplier,
    [opex, industryMultiplier]
  );

  const financialFill = useMemo(
    () => Math.min(100, (financialSavings / opex) * 100),
    [financialSavings, opex]
  );

  const utilizationGain = useMemo(
    () => 18 + (assets / 5000) * 8,
    [assets]
  );

  const downtimeReduction = useMemo(
    () => 20 + industryDowntimeBonus + (deployment === "CLOUD" ? 3 : 0),
    [industryDowntimeBonus, deployment]
  );

  const complianceScore = useMemo(
    () => 
      Math.min(100, 85 + (deployment === "CLOUD" ? 10 : 5) + industryComplianceBonus),
    [deployment, industryComplianceBonus]
  );

  const toolsConsolidated = useMemo(
    () => Math.min(8, Math.floor(assets / 200)),
    [assets]
  );

  const toolsFill = useMemo(() => (toolsConsolidated / 8) * 100, [toolsConsolidated]);

  const annualSavingsSpring = useSpring(financialSavings, {
    stiffness: 120,
    damping: 24,
  });

  const utilizationSpring = useSpring(utilizationGain, {
    stiffness: 120,
    damping: 24,
  });

  const downtimeSpring = useSpring(downtimeReduction, {
    stiffness: 120,
    damping: 24,
  });

  const complianceSpring = useSpring(complianceScore, {
    stiffness: 120,
    damping: 24,
  });

  const toolsSpring = useSpring(toolsConsolidated, {
    stiffness: 120,
    damping: 24,
  });

  const threeYearROI = useMemo(() => financialSavings * 3, [financialSavings]);
  const threeYearSpring = useSpring(threeYearROI, {
    stiffness: 80,
    damping: 20,
  });

  const displayThreeYear = useTransform(threeYearSpring, (value) => formatCurrency(value));
  const displayFinancialSavings = useTransform(annualSavingsSpring, (value) => formatCurrency(value));
  const displayUtilization = useTransform(utilizationSpring, (value) => `${value.toFixed(1)}%`);
  const displayDowntime = useTransform(downtimeSpring, (value) => `${value.toFixed(1)}%`);
  const displayCompliance = useTransform(complianceSpring, (value) => `${Math.round(value)}/100`);
  const displayTools = useTransform(toolsSpring, (value) => `${Math.round(value)} tools consolidated`);

  const sliderPercent = useMemo(
    () => Math.round(((assets - 50) / (5000 - 50)) * 100),
    [assets]
  );

  const sharedLabelClasses =
    "font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]";

  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="border border-white/10 bg-[var(--bg-surface)]/80 p-4 text-sm font-medium text-[var(--data-green)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
            <InViewDecryptedText
              text="ROI CALCULATOR"
              speed={60}
              maxIterations={12}
              className="text-[var(--data-green)]"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Measure your business impact
            <span className="block text-[#f97316]">Before you commit to anything</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Estimate realtime ROI across financial, operational, and strategic dimensions based on your deployment profile.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6">
            <div className="mb-6 border-b border-white/10 pb-4">
              <div className={sharedLabelClasses}>[INPUT PARAMETERS]</div>
            </div>

            <div className="space-y-6">
              <div>
                <div className={sharedLabelClasses}>INDUSTRY VERTICAL</div>
                <select
                  value={industry}
                  onChange={(event) => setIndustry(event.target.value as typeof industryOptions[number])}
                  className="mt-3 w-full rounded-lg border border-white/10 bg-[var(--bg-raised)] px-4 py-3 font-mono text-sm text-[var(--text-primary)] outline-none"
                >
                  {industryOptions.map((option) => (
                    <option key={option} value={option} className="bg-[var(--bg-raised)] text-[var(--text-primary)]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className={sharedLabelClasses}>CONNECTED ASSETS</div>
                <div className="mt-4 font-mono text-3xl font-bold text-[var(--text-primary)]">
                  {formatNumber(assets)}
                </div>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={assets}
                  onChange={(event) => setAssets(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--bg-raised)]"
                  style={{
                    background: `linear-gradient(90deg, ${orange} ${sliderPercent}%, rgba(255,255,255,0.08) ${sliderPercent}%)`,
                    accentColor: orange,
                  }}
                />
              </div>

              <div>
                <div className={sharedLabelClasses}>ANNUAL OPEX (USD)</div>
                <input
                  type="number"
                  min={100000}
                  max={50000000}
                  step={50000}
                  value={opex}
                  onChange={(event) => setOpex(Number(event.target.value))}
                  className="mt-3 w-full rounded-lg border border-white/10 bg-[var(--bg-raised)] px-4 py-3 font-mono text-sm text-[var(--text-primary)] outline-none"
                />
              </div>

              <div>
                <div className={sharedLabelClasses}>DEPLOYMENT MODEL</div>
                <div className="mt-3 flex gap-3">
                  {(["CLOUD", "ON-PREMISE"] as const).map((option) => {
                    const active = deployment === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setDeployment(option)}
                        className={`min-w-[120px] rounded-lg px-4 py-3 text-sm font-mono transition-all duration-200 ${
                          active
                            ? "bg-[#f97316] text-white"
                            : "bg-[var(--bg-raised)] text-[var(--text-muted)] border border-white/10"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6">
            <div className="mb-6 border-b border-white/10 pb-4">
              <div className={sharedLabelClasses}>[ROI PROJECTIONS]</div>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Financial ROI",
                  display: displayFinancialSavings,
                  fill: financialFill,
                  insight: "Estimated annual savings from reduced OPEX.",
                },
                {
                  label: "Asset Performance",
                  display: displayUtilization,
                  fill: utilizationGain,
                  insight: "Improved utilization from realtime operations.",
                },
                {
                  label: "Operational Efficiency",
                  display: displayDowntime,
                  fill: downtimeReduction,
                  insight: "Reduced downtime through predictive workflows.",
                },
                {
                  label: "Risk & Compliance",
                  display: displayCompliance,
                  fill: complianceScore,
                  insight: "Compliance score based on deployment model.",
                },
                {
                  label: "Strategic ROI",
                  display: displayTools,
                  fill: toolsFill,
                  insight: "Fewer systems, tighter workflows, simpler stack.",
                },
              ].map((metric) => {
                return (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {metric.label}
                      </span>
                      <motion.span className="font-mono text-sm font-bold text-[#f97316]">
                        {metric.display}
                      </motion.span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-raised)]">
                      <motion.div
                        className="h-full rounded-full bg-[#f97316]"
                        animate={{ width: `${Math.min(100, metric.fill)}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">
                      {metric.insight}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-xl border border-[#f97316]/20 bg-[#f97316]/08 p-4">
              <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                ESTIMATED 3-YEAR ROI
              </div>
              <motion.div className="mt-3 text-3xl font-bold text-[var(--text-primary)]">
                <motion.span>{displayThreeYear}</motion.span>
              </motion.div>
              <div className="mt-2 font-mono text-[10px] text-[var(--text-muted)]">
                Based on {formatNumber(assets)} assets across {industry} vertical
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
