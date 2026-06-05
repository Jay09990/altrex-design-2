export interface IndustryMetric {
  label: string;
  value: string;
  target: number;
  suffix: string;
}

export interface IndustrySector {
  id: 'cgd' | 'steel' | 'manufacturing' | 'omc' | 'wind' | 'solar' | 'renewable';
  name: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: IndustryMetric[];
  blueprintNodes: {
    source: string;
    gateway: string;
    broker: string;
    storage: string;
  };
}

export const INDUSTRIES: IndustrySector[] = [
  {
    id: "cgd",
    name: "City Gas Distribution",
    tagline: "Real-Time Monitoring & Intelligence Across the Gas Distribution Network",
    summary: "Monitor CGS, DRS, CNG stations, pipelines, and distribution networks through a unified platform combining SCADA, telemetry, GIS, asset management, alarms, and operational analytics.",
    challenge: "Managing geographically distributed gas infrastructure requires continuous monitoring of pressure, flow, equipment health, and operational events across thousands of assets.",
    solution: "Altrex provides end-to-end visibility across the CGD network, integrating field telemetry, GIS mapping, asset management, alarm monitoring, dashboards, and enterprise reporting within a single operational platform.",
    metrics: [
      { label: "Pipeline Nodes", value: "18,000+", target: 18, suffix: "K+" },
      { label: "Operational Visibility", value: "24x7", target: 800, suffix: "ms" },
      { label: "Platform Availability", value: "99.99%", target: 99.998, suffix: "%" }
    ],
    blueprintNodes: {
      source: "DRS Pressure / Flow RTUs",
      gateway: "Altrex Modbus Edge Node",
      broker: "Altrex Pipeline Event Bus",
      storage: "CGD SCADA Historian"
    }
  },
  {
    id: "steel",
    name: "Steel & Metal Processing",
    tagline: "Operational Visibility Across Production, Utilities, and Energy Systems",
    summary: "Monitor production processes, utility systems, energy consumption, equipment health, and plant performance through centralized industrial intelligence.",
    challenge: "Steel plants operate highly interconnected production processes where downtime, energy inefficiencies, and equipment failures directly impact productivity and profitability.",
    solution: "Altrex unifies plant telemetry, energy monitoring, asset performance, alarms, analytics, and production KPIs into a centralized operational intelligence platform.",
    metrics: [
      { label: "Production Assets", value: "500+", target: 200, suffix: "μs" },
      { label: "Energy Optimization", value: "15%", target: 3, suffix: "ms" },
      { label: "Operational Availability", value: "99.9%", target: 2, suffix: "%" }
    ],
    blueprintNodes: {
      source: "Blast Furnace / Caster PLCs",
      gateway: "OPC-UA TSN Edge Node",
      broker: "Altrex Steel Process Bus",
      storage: "MES Production Historian"
    }
  },
  {
    id: "manufacturing",
    name: "Discrete Manufacturing",
    tagline: "Smart Manufacturing Through Connected Operations & Real-Time Intelligence",
    summary: "Monitor production lines, machines, utilities, and quality processes through a unified platform that delivers real-time visibility, operational analytics, and asset performance intelligence.",
    challenge: "Manufacturing facilities require continuous visibility into production, equipment health, quality metrics, and operational performance to minimize downtime and maximize productivity.",
    solution: "Altrex integrates machine data, production KPIs, asset monitoring, quality management, alarms, analytics, and reporting into a single industrial operations platform.",
    metrics: [
      { label: "Average OEE", value: "85%+", target: 150, suffix: "μs" },
      { label: "Downtime Reduction", value: "20%", target: 2, suffix: "ms" },
      { label: "Efficiency Improvement", value: "15%", target: 99.9999, suffix: "%" }
    ],
    blueprintNodes: {
      source: "KUKA / Fanuc Welding Arms",
      gateway: "Local Modbus TCP Node",
      broker: "Altrex Factory Edge Cluster",
      storage: "MES Analytics Core"
    }
  },
  {
    id: "omc",
    name: "Oil & Fuel Distribution",
    tagline: "Real-Time Network Intelligence Across Depots, Terminals & Retail Fuel Networks",
    summary: "Oil Marketing Companies operate extensive networks of refineries, terminals, depots, tank farms, transportation fleets, and retail fuel stations requiring continuous operational visibility, inventory control, and asset monitoring.",
    challenge: "Managing fuel inventory, retail operations, logistics movements, and distributed infrastructure across thousands of locations requires reliable real-time monitoring, reconciliation, and centralized operational control.",
    solution: "Altrex unifies tank monitoring, ATG integration, fuel station operations, fleet tracking, asset management, alarms, analytics, and enterprise reporting into a single operational platform.",
    metrics: [
      { label: "Connected Fuel Assets", value: "10,000+", target: 12, suffix: "K+" },
      { label: "Operational Visibility", value: "24x7", target: 2, suffix: "s" },
      { label: "Inventory Data Availability", value: "99.99%", target: 99.97, suffix: "%" }
    ],
    blueprintNodes: {
      source: "ATG / Dispenser Controllers",
      gateway: "Station Edge Buffer Node",
      broker: "Altrex OMC Event Mesh",
      storage: "Central Inventory Ledger"
    }
  },
  {
    id: "wind",
    name: "Wind Energy Operations",
    tagline: "Real-Time Wind Farm Performance & Asset Intelligence",
    summary: "Monitor wind turbines, substations, and generation assets through a centralized platform delivering real-time visibility, performance analytics, condition monitoring, and operational intelligence.",
    challenge: "Wind farm operators must manage geographically distributed assets, maximize energy production, reduce unplanned downtime, and ensure continuous visibility into turbine performance and equipment health.",
    solution: "Altrex integrates SCADA systems, condition monitoring, generation analytics, asset management, alarms, and predictive maintenance into a unified renewable energy operations platform.",
    metrics: [
      { label: "Operational Availability", value: "99.9%", target: 3, suffix: "K+" },
      { label: "Reduction in Unplanned Downtime", value: "15%", target: 500, suffix: "ms" },
      { label: "Remote Operational Visibility", value: "24x7", target: 72, suffix: " hrs" }
    ],
    blueprintNodes: {
      source: "Turbine CMS / SCADA PLC",
      gateway: "Turbine Edge IPC Node",
      broker: "Altrex Wind Farm Bus",
      storage: "Asset Performance Manager"
    }
  },
  {
    id: "solar",
    name: "Solar Energy Operations",
    tagline: "Optimizing Solar Generation Through Connected Operations",
    summary: "Monitor solar plants, inverters, weather stations, and grid interconnections through a unified platform delivering real-time visibility, performance analytics, and operational intelligence.",
    challenge: "Solar plant operators must maximize energy generation, identify underperforming assets, manage distributed equipment, and ensure continuous operational visibility across large-scale facilities.",
    solution: "Altrex integrates plant telemetry, inverter monitoring, weather analytics, asset management, alarms, reporting, and performance optimization into a single operational platform.",
    metrics: [
      { label: "Plant Data Availability", value: "99.9%", target: 280, suffix: "K+" },
      { label: "Remote Operational Visibility", value: "24x7", target: 1, suffix: "s" },
      { label: "Improvement in Operational Efficiency", value: "15%", target: 1, suffix: "%" }
    ],
    blueprintNodes: {
      source: "String Inverter Gateways",
      gateway: "MQTT Push Edge Node",
      broker: "Altrex Solar Event Bus",
      storage: "Plant Performance Dashboard"
    }
  },
  {
    id: "renewable",
    name: "Renewable Energy Grid",
    tagline: "Unified Multi-Source Dispatch & Grid Stability for Hybrid Renewable Plants",
    summary: "Hybrid renewable plants combining solar, wind, BESS, and diesel DG sets require a unified telemetry backbone to coordinate automatic generation control and grid stability responses in real time.",
    challenge: "Each generation source uses a different protocol (Modbus, DNP3, IEC 61850, CAN), making unified state awareness nearly impossible for existing SCADA systems, causing delayed dispatch and grid instability.",
    solution: "Altrex's multi-protocol edge adapters normalize data from all sources onto a unified event stream. A central AGC optimizer subscribes to the combined state feed and dispatches set-points within a single 100ms control cycle.",
    metrics: [
      { label: "Protocols Bridged", value: "6 Active", target: 6, suffix: "" },
      { label: "AGC Dispatch Cycle", value: "< 100ms", target: 100, suffix: "ms" },
      { label: "Grid Frequency Deviation", value: "±0.02 Hz", target: 0, suffix: " Hz" }
    ],
    blueprintNodes: {
      source: "Solar / Wind / BESS / DG",
      gateway: "Multi-Protocol Edge Bridge",
      broker: "Altrex Unified Energy Bus",
      storage: "EMS / SCADA Dispatch Core"
    }
  }
];
