/**
 * ArchitectureMobile
 *
 * Standalone export of the mobile-view architecture diagram originally defined
 * inside Architecture.tsx. Design, layout, styling, colors, nodes, connectors,
 * and interactions are identical to the ArchitectureMobile component in that
 * file — only the logo imports and data arrays are co-located here so the
 * component can be used independently on solution pages.
 */

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  Car,
  Cloud,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  Globe,
  Layers3,
  Monitor,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Users,
  Wifi,
  Zap,
  Plug,
  Settings,
  Activity,
  Cable,
  Code,
  ArrowDown,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import darklogo from "@/assets/altrex-logo-bg-black-removebg-blackbg.png";
import lightlogo from "@/assets/altrex-logo-bg-white-removebg-whitebg.png";

// ── Color palette (mirrors Architecture.tsx) ─────────────────────────────────
const C = {
  source: "#10b981",
  device: "#3b82f6",
  connectivity: "#d946ef",
  platform: "#ff6b00",
  cloud: "#06b6d4",
  system: "#6366f1",
} as const;

// ── Data arrays (mirrors Architecture.tsx) ────────────────────────────────────
const industries = [
  { icon: Factory, label: "Oil & Gas" },
  { icon: Building2, label: "Power & Energy" },
  { icon: Zap, label: "Renewables" },
  { icon: FlaskConical, label: "Manufacturing" },
  { icon: Car, label: "Transportation" },
  { icon: Globe, label: "Smart Cities" },
];

const devices = [
  { icon: Cpu, label: "PLCs / RTUs" },
  { icon: Wifi, label: "Sensors / Rectifiers" },
  { icon: Monitor, label: "HMIs" },
  { icon: Layers3, label: "SCADA / DCS" },
];

const connectivity = [
  { icon: Plug, label: "MODBUS" },
  { icon: Settings, label: "OPC-UA" },
  { icon: Network, label: "ETHERNET" },
  { icon: Activity, label: "DNPC3" },
  { icon: Cable, label: "IEC-104" },
  { icon: Radio, label: "MQTT" },
  { icon: Code, label: "REST API" },
  { icon: Database, label: "SQL/NOSQL" },
];

const platform = [
  { icon: Globe, label: "Web SCADA" },
  { icon: Database, label: "Visualization" },
  { icon: ShieldCheck, label: "Alerting" },
  { icon: Layers3, label: "Assets" },
  { icon: Network, label: "Reporting" },
  { icon: ShieldCheck, label: "Security" },
  { icon: Radio, label: "Analytics" },
  { icon: Cpu, label: "AI & ML" },
];

const hosting = [
  { icon: Server, label: "On-Premise Server", color: C.device },
  { icon: Cloud, label: "Private Cloud", color: C.cloud },
  { icon: Cloud, label: "Public Cloud", color: C.platform },
];

const services = [
  { icon: BriefcaseBusiness, label: "SAP", color: C.platform },
  { icon: Database, label: "ERP", color: C.cloud },
  { icon: Users, label: "CRM", color: C.source },
];

// ── Component ─────────────────────────────────────────────────────────────────
const ArchitectureMobile = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;

  const steps = [
    { title: "Industries", items: industries, color: C.system },
    { title: "Devices", items: devices, color: C.device },
    { title: "Connectivity", items: connectivity, color: C.connectivity },
    {
      title: "Altrex Platform",
      items: platform,
      color: C.platform,
      isPlatform: true,
    },
    {
      title: "Enterprise Systems",
      items: [...hosting, ...services],
      color: C.cloud,
    },
  ];

  return (
    <div className="mt-12 flex flex-col items-center gap-12 px-4">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="relative flex w-full max-w-sm flex-col items-center"
        >
          {/* Progress line between steps */}
          {idx < steps.length - 1 && (
            <div
              className="absolute top-full left-1/2 h-12 w-0.5 -translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, ${step.color}, ${
                  steps[idx + 1].color
                }40)`,
              }}
            />
          )}

          <div
            className="flex w-full flex-col rounded-2xl border bg-card p-6 shadow-sm"
            style={{
              borderColor: `${step.color}30`,
              borderTop: `4px solid ${step.color}`,
            }}
          >
            <h3
              className="mb-4 text-center text-xs font-bold uppercase tracking-widest"
              style={{ color: step.color }}
            >
              {step.title}
            </h3>

            {step.isPlatform ? (
              <div className="flex flex-col items-center">
                <motion.img
                  src={logo}
                  alt="Altrex"
                  className="mb-6 w-24"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="grid grid-cols-2 gap-3 w-full">
                  {step.items.slice(0, 4).map((item: any, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-muted p-2"
                    >
                      <item.icon size={16} color={step.color} />
                      <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {step.items.map((item: any, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-border bg-muted p-2"
                  >
                    <item.icon size={14} color={step.color} strokeWidth={2} />
                    <span className="text-[10px] font-semibold text-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Arrow connector */}
          {idx < steps.length - 1 && (
            <div
              className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-card border shadow-sm"
              style={{ borderColor: `${step.color}40` }}
            >
              <ArrowDown size={14} className="text-muted-foreground" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ArchitectureMobile;
