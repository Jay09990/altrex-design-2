export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  industry: 'energy' | 'manufacturing' | 'logistics' | 'aerospace' | 'public';
  status: 'operational' | 'scaling' | 'beta';
  scale: string;
  latency: string;
  uptime: string;
  techStack: string[];
  initialData: number[];
  logTemplates: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "gridpulse",
    title: "GridPulse",
    subtitle: "Smart Utilities & Grid Balancing",
    description: "A nationwide smart energy distribution telemetry network managing power grid load, tracking substation health, and coordinating microgrid injection feeds in real-time.",
    industry: "energy",
    status: "operational",
    scale: "12.8M events/day",
    latency: "6.2ms",
    uptime: "99.999%",
    techStack: ["OPC-UA", "Altrex Edge Broker", "Kafka Bridge", "TimescaleDB"],
    initialData: [45, 48, 52, 49, 43, 40, 42, 47, 50, 49, 53, 56, 52, 48, 51, 55],
    logTemplates: [
      "ESTABLISHING SECURE TLS HANDSHAKE WITH SUBSTATION-IND-042",
      "INGESTING ENERGY WAVEFORM SAMPLES FROM NODE #4819",
      "ANOMALY DETECTION SYSTEM: PHASE LAG AT TERMINAL C NOMINAL [V_LAG: 0.002%]",
      "EMERGENCY SCADA LOAD BALANCING SIGNAL BROADCASTED -> AP-SOUTH-1 EDGE",
      "DESERIALIZED PROTOBUF PAYLOAD IN 0.12ms",
      "FLUSHING METRIC BUFFER (142 MESSAGES) -> COMPOSITE DATA WAREHOUSE",
      "SYS UPTIME SLA VERIFIED: 99.9995%"
    ]
  },
  {
    id: "fleetmotion",
    title: "FleetMotion",
    subtitle: "Connected Vehicle Telemetry Bus",
    description: "High-throughput live route tracking, fuel analytics, and real-time engine diagnostics streaming from thousands of heavy commercial logistics trucks and transport vans.",
    industry: "logistics",
    status: "scaling",
    scale: "250K+ vehicles",
    latency: "14.5ms",
    uptime: "99.99%",
    techStack: ["MQTT Broker", "Protobuf", "Geospatial Indexer", "Rust SDK"],
    initialData: [110, 115, 120, 118, 112, 108, 114, 122, 126, 121, 119, 123, 128, 132, 127, 122],
    logTemplates: [
      "MQTT INGESTION SUBSCRIBED: altrex/fleet/+/diagnostics",
      "RECEIVED GPS COORDINATE PACKET - LAT: 23.0225, LNG: 72.5714",
      "WARNING: CONTAINER #904 TEMPERATURE DEVIATION (+1.8°C) - ALERT SENT",
      "GEOSHARD INDEX RE-SYNCED FOR REGION: WEST-IN-1",
      "VEHICLE ENGINE DIAGNOSTICS: OBD-II INGEST nominal",
      "STREAM INTEGRITY CHECK PASS - PACKET LOSS: 0.001%"
    ]
  },
  {
    id: "optifact",
    title: "OptiFact",
    subtitle: "Robotic Sync & Industry 4.0 Factory",
    description: "Microsecond-accurate conveyor and robotic arm synchronization telemetry for multi-stage automotive welding and assembly lines with automated backpressure mitigation.",
    industry: "manufacturing",
    status: "operational",
    scale: "48K nodes",
    latency: "2.8ms",
    uptime: "99.9999%",
    techStack: ["Modbus TCP", "Edge WebSockets", "High-Priority Queue", "Wasm Compiler"],
    initialData: [22, 24, 25, 23, 22, 21, 24, 26, 27, 25, 23, 24, 26, 28, 25, 23],
    logTemplates: [
      "SYNCHRONIZING PLC ACTUATOR CLOCKS VIA PTP (IEEE 1588)",
      "ROBOTIC WELDING LOOP SYNC ACTIVE - TICK #8491824",
      "FEEDBACK LOOP INTERLOCK SIGNAL SENT -> KUKA-ARM-09",
      "CONVEYOR POSITION CALIBRATION: SENSOR #883 DETECTED ANOMALY [FIXED 1.2ms]",
      "LOCAL EDGE GATEWAY MEMORY CONSUMPTION NOMINAL [SYS_MEM: 18.2MB]",
      "TRANSLATED MODBUS REGISTERS TO JSON IN 45 MICROSECONDS"
    ]
  },
  {
    id: "skyroute",
    title: "SkyRoute",
    subtitle: "Autonomous Drone UTM Cluster",
    description: "Unmanned Traffic Management (UTM) routing platform calculating collision-avoidance maps, 3D corridor constraints, and flight paths for urban freight delivery drones.",
    industry: "aerospace",
    status: "beta",
    scale: "15K concurrent drones",
    latency: "4.1ms",
    uptime: "99.99%",
    techStack: ["gRPC Stream", "WebRTC Telemetry", "Go Broker", "WebAssembly"],
    initialData: [85, 89, 93, 91, 86, 82, 85, 90, 94, 93, 97, 102, 98, 94, 96, 100],
    logTemplates: [
      "ESTABLISHED WEBRTC AGENT AUDIO-VIDEO DATA CHANNEL: DRONE-DR-418",
      "COMPUTING 3D TRAJECTORY CORRIDOR FOR URBAN QUADCOPTER CLUSTER",
      "COLLISION RISK AVOIDANCE SYSTEM PING: RTT = 3.8ms",
      "FAA FLIGHT PLAN STATUS SYNC RESOLVED - ACTIVE FLIGHT ZONE ID: 9",
      "WASM CONSOLE: RENDERED DYNAMIC RADAR MAP AT 60FPS",
      "WEATHER RADAR VECTOR CORRECTION SIGNALS TRANSMITTED"
    ]
  },
  {
    id: "aquasense",
    title: "AquaSense",
    subtitle: "Urban Water Resource Telemetry",
    description: "A smart municipal plumbing and water quality telemetry system monitoring pressure drops, leakage alerts, and flow rates across hundreds of kilometers of underground piping.",
    industry: "public",
    status: "operational",
    scale: "1.2M smart nodes",
    latency: "24.2ms",
    uptime: "99.95%",
    techStack: ["LoRaWAN Gateway", "Webhooks", "Node SDK", "Serverless Ingest"],
    initialData: [68, 70, 74, 72, 67, 63, 65, 69, 72, 71, 75, 78, 73, 69, 71, 74],
    logTemplates: [
      "RECEIVED LORAWAN UPLINK FROM VALVE #09281 [BATTERY: 94%]",
      "FLOW PRESSURE DECREASE ON SECTOR-B DUAL PIPELINE",
      "leak-detector AI neural net: leaks probability calculated: 0.04% (nominal)",
      "MUNICIPAL SCADA DB COMMIT: SUCCESSFUL (32 BYTES SAVED)",
      "CALIBRATED FLOW RATE SENSOR AT STATION 14 - TEMPERATURE IS 22.4°C",
      "RE-KEYING LORAWAN NODE SESSIONS FOR ENTERPRISE SECURITY SLA"
    ]
  }
];
