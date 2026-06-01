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
    tagline: "Real-Time Pipeline Pressure & Leak Detection at the Distribution Edge",
    summary: "City Gas Distribution networks span thousands of kilometres of pipelines feeding domestic, commercial, and CNG stations. Altrex streams live pressure sensor telemetry and alarm states from every district regulating station (DRS) to a central SCADA core, ensuring zero-event data loss.",
    challenge: "Legacy RTU-based SCADA systems operate on polling cycles of 5–30 seconds, creating dangerous blind spots when pressure anomalies or leak events occur. High-volume meter pulse data from thousands of domestic connections overwhelms centralized historians.",
    solution: "Altrex deploys edge brokers at each DRS to continuously stream real-time pressure, flow, and leak-sensor data using Modbus RTU over TCP. Edge compression eliminates 97% of redundant state reports while forwarding critical alarm events with sub-second latency.",
    metrics: [
      { label: "Pipeline Nodes", value: "18,000+", target: 18, suffix: "K+" },
      { label: "Alarm Propagation", value: "< 800ms", target: 800, suffix: "ms" },
      { label: "Data Availability", value: "99.998%", target: 99.998, suffix: "%" }
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
    tagline: "Blast Furnace Telemetry & Rolling Mill Synchronization at Microsecond Precision",
    summary: "Integrated steel plants operate blast furnaces, converters, continuous casters, and rolling mills as tightly coupled processes. Altrex synchronizes machine telemetry across every unit to prevent cascade failures and optimize yield.",
    challenge: "Blast furnace hot-metal temperature and converter lance position data must be shared across process control systems with sub-5ms latency. Legacy OPC-DA servers introduce cumulative delays that trigger interlock trips on rolling mills.",
    solution: "Altrex deploys OPC-UA over TSN (Time-Sensitive Networking) edge nodes at each process unit. Data is published on shared deterministic topics, giving every downstream controller access to upstream state within a single control cycle.",
    metrics: [
      { label: "Process Control Jitter", value: "< 200μs", target: 200, suffix: "μs" },
      { label: "Cross-Unit Sync Lag", value: "3.2ms", target: 3, suffix: "ms" },
      { label: "Yield Improvement", value: "+ 2.4%", target: 2, suffix: "%" }
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
    tagline: "Microsecond Robotic Synchronization & PLC Orchestration on the Factory Floor",
    summary: "High-speed assembly lines require sub-5ms feedback loops to synchronize robotic welding arms, high-precision conveyors, and machine-vision quality gates in real time.",
    challenge: "Traditional message brokers introduce unpredictable queue jitter that causes robotic arm offsets, conveyor mis-feeds, and costly safety interlock trips on high-throughput production lines.",
    solution: "Altrex edge brokers run as lightweight WebAssembly modules directly on industrial PCs. All inter-machine events are routed locally with deterministic sub-millisecond delivery, completely independent of WAN connectivity.",
    metrics: [
      { label: "Control Loop Jitter", value: "< 150μs", target: 150, suffix: "μs" },
      { label: "Feedback Ingest RTT", value: "2.8ms", target: 2, suffix: "ms" },
      { label: "Message Reliability", value: "99.9999%", target: 99.9999, suffix: "%" }
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
    name: "Oil Marketing Companies",
    tagline: "Tank Farm Monitoring, ATG Integration & Petrol Station Telemetry at Scale",
    summary: "OMCs operate networks of fuel depots, pipeline terminals, and thousands of retail petrol stations, each requiring continuous monitoring of tank levels, pump throughput, and dispenser health.",
    challenge: "Automatic Tank Gauge (ATG) data from remote petrol stations is collected over GPRS links with frequent dropouts, causing gaps in inventory records and compliance reporting failures.",
    solution: "Altrex's resilient edge buffer queues ATG and dispenser events locally at the station. On reconnection, data is replayed in timestamp-ordered sequence to the central inventory management system, guaranteeing zero data loss.",
    metrics: [
      { label: "Petrol Stations Online", value: "12,000+", target: 12, suffix: "K+" },
      { label: "Reconnect Replay SLA", value: "< 2s", target: 2, suffix: "s" },
      { label: "Inventory Accuracy", value: "99.97%", target: 99.97, suffix: "%" }
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
    name: "Wind Energy",
    tagline: "Turbine SCADA Streaming & Predictive Fault Detection Across Wind Farms",
    summary: "Utility-scale wind farms distribute hundreds of turbines across large terrain. Altrex streams CMS vibration data, SCADA parameters, and meteorological feeds from every turbine to enable real-time predictive maintenance.",
    challenge: "Each turbine generates dozens of high-frequency CMS (Condition Monitoring System) signals per second. Centralizing these signals over standard OPC connections creates data storms that overload historians and delay fault alerts.",
    solution: "Altrex edge nodes at each turbine controller perform first-pass signal processing, publishing only delta-significant CMS events while maintaining 100% fidelity for SCADA operational parameters on a separate priority channel.",
    metrics: [
      { label: "Turbines Monitored", value: "3,500+", target: 3, suffix: "K+" },
      { label: "CMS Signal Latency", value: "< 500ms", target: 500, suffix: "ms" },
      { label: "Fault Detection Lead", value: "72 hrs", target: 72, suffix: " hrs" }
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
    name: "Solar Power",
    tagline: "String-Level Inverter Telemetry & Grid Synchronization for Utility Solar",
    summary: "Utility-scale solar plants monitor thousands of inverter strings and weather stations continuously. Altrex aggregates string-level performance data and irradiance feeds to detect underperforming strings and dispatch reactive power accurately.",
    challenge: "String-level monitoring generates millions of data points per hour. Legacy SCADA polling cycles miss brief shadow-induced current dips that cause string mismatches and long-term hotspot degradation.",
    solution: "Altrex deploys push-based MQTT edge connectors on each inverter gateway, streaming string current and voltage in real time. Anomaly detection rules run directly on the edge to flag deviations without cloud round-trips.",
    metrics: [
      { label: "Inverter Strings Live", value: "280K+", target: 280, suffix: "K+" },
      { label: "String Event Latency", value: "< 1.2s", target: 1, suffix: "s" },
      { label: "Performance Ratio Gain", value: "+ 1.8%", target: 1, suffix: "%" }
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
