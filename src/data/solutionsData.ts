// ─── Architecture Types ───────────────────────────────────────────────────────

/**
 * A single node in a solution's architecture diagram.
 *
 * `type` controls rendering:
 *   - "source"   → input devices / data sources (top of the chain)
 *   - "layer"    → a named processing / platform layer
 *   - "branch"   → a group of parallel outputs rendered side-by-side
 *   - "output"   → final sinks (ERP, dashboards, etc.)
 *
 * `children` inside a "branch" node are rendered horizontally as pills.
 */
export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string; // e.g. "(RBAC + MFA + SSO)"
  type: "source" | "layer" | "branch" | "output";
  children?: string[]; // used by "branch" nodes
}

export interface ArchitectureData {
  nodes: ArchNode[];
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SolutionCapability {
  title: string;
  description: string;
  items: string[];
}

export interface SolutionFeature {
  title: string;
  description: string;
  benefits: string[];
}

export interface SolutionIndustry {
  name: string;
  items: string[];
}

export interface SolutionBenefit {
  title: string;
  description: string;
}

export interface SolutionMetric {
  value: string;
  label: string;
}

export interface Solution {
  slug: string;
  name: string;
  hero: {
    tagline: string;
    heading: string;
    description: string;
    ctas: string[];
  };
  overview: string;
  capabilities: SolutionCapability[];
  features: SolutionFeature[];
  industries: SolutionIndustry[];
  benefits: SolutionBenefit[];
  metrics: SolutionMetric[];
  whyAltrex: string[];
  ctaHeading: string;
  ctaDescription: string;
  /** Structured architecture diagram data sourced from the Word document. */
  architecture?: ArchitectureData;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const SOLUTIONS: Solution[] = [
  {
    slug: "connectivity",
    name: "Connectivity & Data Acquisition",
    hero: {
      tagline: "Connect Any Device. Collect Any Data.",
      heading: "Unified Industrial Connectivity for Real-Time Operations",
      description:
        "Altrex provides secure and scalable connectivity across industrial assets, field devices, SCADA systems, PLCs, RTUs, flow computers, analyzers, energy meters, and enterprise applications.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Modern industrial operations rely on data from thousands of distributed devices and systems.",
    capabilities: [
      {
        title: "Industrial Protocol Support",
        description:
          "Connect to virtually any industrial device through standard and custom communication protocols.",
        items: [
          "Modbus TCP",
          "Modbus RTU",
          "OPC UA",
          "MQTT",
          "BACnet",
          "IEC-60870-5-104",
          "DNP3",
          "REST APIs",
          "SQL Databases",
          "Custom Drivers",
        ],
      },
      {
        title: "Edge Data Collection",
        description:
          "Deploy lightweight edge collectors near field devices to reduce network traffic and improve reliability.",
        items: [
          "Local data buffering",
          "Store-and-forward architecture",
          "Edge processing",
          "Protocol conversion",
          "Secure remote management",
        ],
      },
      {
        title: "Enterprise Integration",
        description: "Bridge operational data with enterprise systems.",
        items: [
          "ERP Systems",
          "SAP",
          "MES Platforms",
          "CMMS Solutions",
          "Cloud Applications",
          "Data Lakes",
          "Business Intelligence Platforms",
        ],
      },
    ],
    features: [
      {
        title: "Device Connectivity",
        description:
          "Connect thousands of field devices through centralized device management.",
        benefits: [
          "Faster deployment",
          "Reduced engineering effort",
          "Unified device administration",
        ],
      },
      {
        title: "Data Normalization",
        description:
          "Convert raw device data into structured operational information.",
        benefits: [
          "Consistent naming conventions",
          "Standardized asset models",
          "Improved analytics",
        ],
      },
      {
        title: "Real-Time Data Streaming",
        description: "Deliver operational information instantly across systems.",
        benefits: [
          "Faster decision making",
          "Reduced latency",
          "Improved operational awareness",
        ],
      },
      {
        title: "Store & Forward",
        description:
          "Ensure data availability even during network disruptions.",
        benefits: [
          "Zero data loss",
          "Reliable remote operations",
          "Improved resiliency",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution",
        items: [
          "DRS Monitoring",
          "CGS Monitoring",
          "CNG Stations",
          "Pipeline Networks",
        ],
      },
      {
        name: "Manufacturing",
        items: [
          "PLC Connectivity",
          "Production Monitoring",
          "Utility Monitoring",
        ],
      },
      {
        name: "Renewable Energy",
        items: ["Solar Inverters", "Wind Turbines", "Weather Stations"],
      },
      {
        name: "Oil & Gas",
        items: ["Tank Farms", "ATG Systems", "Fuel Stations"],
      },
    ],
    benefits: [
      {
        title: "Reduce Integration Complexity",
        description: "Connect multiple systems through a single platform.",
      },
      {
        title: "Accelerate Deployment",
        description: "Reduce engineering time and implementation costs.",
      },
      {
        title: "Improve Operational Visibility",
        description: "Access data from all connected assets in real time.",
      },
      {
        title: "Enable Digital Transformation",
        description:
          "Create a foundation for analytics, automation, and AI initiatives.",
      },
    ],
    metrics: [
      { value: "500K+", label: "Connected Devices" },
      { value: "50M+", label: "Data Points Processed Daily" },
      { value: "99.99%", label: "Data Availability" },
      { value: "200+", label: "Industrial Deployments" },
    ],
    whyAltrex: [
      "Vendor-independent architecture",
      "Edge-to-cloud deployment",
      "Enterprise scalability",
      "Secure industrial connectivity",
      "Proven industrial protocols",
      "High availability architecture",
    ],
    ctaHeading: "Ready to Connect Your Industrial Infrastructure?",
    ctaDescription:
      "Discover how Altrex can simplify connectivity and unlock real-time operational intelligence across your enterprise.",
    architecture: {
      nodes: [
        { id: "a1", label: "Field Devices", type: "source" },
        { id: "a2", label: "Edge Gateway", type: "layer" },
        { id: "a3", label: "Altrex Connectivity Layer", type: "layer" },
        {
          id: "a4",
          label: "Platform Services",
          type: "branch",
          children: [
            "Real-Time Monitoring",
            "Historian",
            "Analytics",
            "GIS",
            "Fleet Management",
            "Enterprise Applications",
          ],
        },
      ],
    },
  },

  {
    slug: "iiot-platform",
    name: "Industrial IoT Platform",
    hero: {
      tagline: "Connect. Monitor. Optimize. Scale.",
      heading: "Industrial IoT Platform for Connected Operations",
      description:
        "Altrex Industrial IoT Platform enables organizations to connect industrial assets, collect real-time telemetry, monitor operations, and transform operational data into actionable intelligence.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Industrial organizations generate vast amounts of data from machines, sensors, PLCs, RTUs, meters, analyzers, and operational systems.",
    capabilities: [
      {
        title: "Device Connectivity",
        description:
          "Connect industrial devices and systems through standard protocols and secure communication channels.",
        items: [
          "PLC Connectivity",
          "RTU Connectivity",
          "Sensor Integration",
          "Flow Computer Integration",
          "Energy Meter Connectivity",
          "Industrial Gateway Integration",
          "Modbus TCP/RTU",
          "OPC UA",
          "MQTT",
          "IEC-104",
          "DNP3",
        ],
      },
      {
        title: "Edge Computing",
        description:
          "Process data closer to the source for improved reliability and reduced latency.",
        items: [
          "Edge Data Collection",
          "Local Data Processing",
          "Store & Forward",
          "Edge Analytics",
          "Protocol Conversion",
          "Offline Operation Support",
        ],
      },
      {
        title: "Real-Time Data Acquisition",
        description:
          "Capture operational data continuously from connected assets and infrastructure.",
        items: [
          "High-Speed Data Collection",
          "Telemetry Streaming",
          "Event Collection",
          "Alarm Acquisition",
          "Status Monitoring",
          "Historical Data Collection",
        ],
      },
      {
        title: "Device & Asset Management",
        description:
          "Manage connected devices and operational assets from a centralized platform.",
        items: [
          "Device Registry",
          "Asset Hierarchy",
          "Remote Configuration",
          "Firmware Management",
          "Asset Tracking",
          "Health Monitoring",
        ],
      },
      {
        title: "Data Processing & Analytics",
        description:
          "Transform raw telemetry into meaningful operational insights.",
        items: [
          "Data Normalization",
          "KPI Calculation",
          "Event Processing",
          "Operational Analytics",
          "Trend Analysis",
          "Predictive Insights",
        ],
      },
      {
        title: "Cloud & Enterprise Integration",
        description:
          "Integrate operational data with enterprise applications and cloud services.",
        items: [
          "ERP Integration",
          "SAP Integration",
          "CMMS Integration",
          "Cloud Platforms",
          "Data Lakes",
          "Business Intelligence Tools",
        ],
      },
    ],
    features: [
      {
        title: "Connectivity Layer",
        description:
          "Provides secure communication between field devices and enterprise applications.",
        benefits: [
          "Protocol Drivers",
          "Gateway Management",
          "Device Connectivity",
          "Communication Monitoring",
        ],
      },
      {
        title: "Edge Intelligence Layer",
        description:
          "Enables local decision-making and operational resilience.",
        benefits: [
          "Edge Analytics",
          "Local Rules Engine",
          "Data Compression",
          "Store & Forward",
        ],
      },
      {
        title: "Operational Intelligence Layer",
        description:
          "Transforms operational data into actionable business insights.",
        benefits: ["Dashboards", "KPIs", "Analytics", "Reporting"],
      },
      {
        title: "Enterprise Integration Layer",
        description: "Connects industrial operations with business systems.",
        benefits: [
          "ERP Integration",
          "Business Analytics",
          "Enterprise Reporting",
          "Workflow Automation",
        ],
      },
    ],
    industries: [
      {
        name: "Industrial IoT",
        items: [
          "Machine Monitoring",
          "Equipment Tracking",
          "Process Automation",
          "Remote Operations",
        ],
      },
      {
        name: "Smart Utilities",
        items: [
          "Water Distribution",
          "Gas Distribution",
          "Power Monitoring",
          "Utility Analytics",
        ],
      },
      {
        name: "Connected Manufacturing",
        items: [
          "OEE Monitoring",
          "Production Analytics",
          "Predictive Maintenance",
          "Quality Monitoring",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Solar Plants",
          "Wind Farms",
          "Substations",
          "Energy Analytics",
        ],
      },
      {
        name: "Fleet & Mobile Assets",
        items: [
          "Vehicle Tracking",
          "Route Optimization",
          "Fuel Monitoring",
          "Driver Analytics",
        ],
      },
    ],
    benefits: [
      {
        title: "Accelerate Digital Transformation",
        description:
          "Create a connected foundation for modern industrial operations.",
      },
      {
        title: "Improve Operational Visibility",
        description: "Access real-time information across all connected assets.",
      },
      {
        title: "Reduce Downtime",
        description:
          "Identify and resolve issues before they impact operations.",
      },
      {
        title: "Increase Efficiency",
        description:
          "Optimize resource utilization and operational performance.",
      },
      {
        title: "Enable Predictive Operations",
        description:
          "Leverage data analytics to anticipate operational issues.",
      },
      {
        title: "Scale Without Limits",
        description:
          "Support growth from a single site to enterprise-wide deployments.",
      },
    ],
    metrics: [
      { value: "500K+", label: "Connected Assets" },
      { value: "50M+", label: "Daily Telemetry Records" },
      { value: "99.99%", label: "Platform Availability" },
      { value: "200+", label: "Industrial Deployments" },
      { value: "24x7", label: "Operational Monitoring" },
      { value: "Edge-to-Cloud", label: "Unified Architecture" },
    ],
    whyAltrex: [
      "Industrial Protocol Connectivity",
      "Edge-to-Cloud Architecture",
      "Enterprise Scalability",
      "Real-Time Monitoring",
      "Built-In Analytics",
      "GIS & Asset Management Integration",
      "Fleet & Mobile Asset Tracking",
      "Enterprise Security",
      "Cloud, On-Premise & Hybrid Deployment",
    ],
    ctaHeading: "Transform Industrial Data into Operational Intelligence",
    ctaDescription:
      "Connect assets, monitor operations, analyze performance, and drive smarter decisions through a unified Industrial IoT Platform built for modern industrial enterprises.",
    architecture: {
      nodes: [
        { id: "b1", label: "Field Devices & Sensors", type: "source" },
        { id: "b2", label: "Industrial Gateways / Edge Nodes", type: "layer" },
        { id: "b3", label: "Altrex IoT Platform", type: "layer" },
        {
          id: "b4",
          label: "Platform Modules",
          type: "branch",
          children: ["SCADA", "GIS", "Analytics", "Asset Mgmt"],
        },
        { id: "b5", label: "ERP / SAP / CMMS / BI Systems", type: "output" },
      ],
    },
  },

  {
    slug: "web-scada",
    name: "Web SCADA & Real-Time Monitoring",
    hero: {
      tagline: "Operational Visibility Without Boundaries",
      heading: "Web-Based SCADA for Real-Time Industrial Operations",
      description:
        "Altrex Web-SCADA provides centralized monitoring, control, visualization, and operational intelligence across distributed industrial assets.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Modern industrial operations require instant access to operational data across geographically distributed assets and facilities.",
    capabilities: [
      {
        title: "Real-Time Monitoring",
        description:
          "Monitor operational parameters, equipment status, process values, and infrastructure assets in real time.",
        items: [
          "Live process visualization",
          "Real-time data updates",
          "Equipment status monitoring",
          "Operational dashboards",
          "Multi-site monitoring",
          "Mobile accessibility",
        ],
      },
      {
        title: "SCADA Dashboards",
        description:
          "Build rich, interactive dashboards tailored to operational requirements.",
        items: [
          "Custom dashboards",
          "Mimic diagrams",
          "KPI visualization",
          "Asset views",
          "Performance monitoring",
          "Executive dashboards",
        ],
      },
      {
        title: "Alarm Management",
        description:
          "Detect, prioritize, and respond to operational events instantly.",
        items: [
          "Real-time alarm notifications",
          "Alarm prioritization",
          "Event acknowledgment",
          "Escalation workflows",
          "Alarm analytics",
          "Alarm history",
        ],
      },
      {
        title: "Historical Data & Trends",
        description:
          "Analyze operational performance through historical data and trend analysis.",
        items: [
          "Historical trending",
          "Data playback",
          "Event analysis",
          "Performance benchmarking",
          "Comparative analysis",
          "Long-term reporting",
        ],
      },
      {
        title: "GIS-Based Monitoring",
        description:
          "Visualize geographically distributed infrastructure on interactive maps.",
        items: [
          "Asset mapping",
          "Pipeline monitoring",
          "Station monitoring",
          "Fleet tracking",
          "Infrastructure visualization",
          "Geospatial analytics",
        ],
      },
      {
        title: "Remote Operations",
        description:
          "Access operational information securely from anywhere.",
        items: [
          "Web-based access",
          "Mobile responsive interface",
          "Multi-user access",
          "Role-based permissions",
          "Secure connectivity",
          "Remote diagnostics",
        ],
      },
    ],
    features: [
      {
        title: "Operations Dashboard",
        description: "Monitor all critical operational parameters in one view.",
        benefits: [
          "Process parameters",
          "Production status",
          "Equipment health",
          "Operational KPIs",
          "Asset performance",
        ],
      },
      {
        title: "Alarm & Event Center",
        description: "Manage all critical alarms and events from one place.",
        benefits: [
          "Critical alarms",
          "Warning conditions",
          "Event notifications",
          "Incident tracking",
          "Response workflows",
        ],
      },
      {
        title: "Historical Trends",
        description: "Analyze operational history across any time range.",
        benefits: [
          "Pressure trends",
          "Flow trends",
          "Energy consumption",
          "Production metrics",
          "Equipment performance",
        ],
      },
      {
        title: "GIS Operations Center",
        description: "Monitor all infrastructure on a live geospatial map.",
        benefits: [
          "Pipeline networks",
          "Stations",
          "Utility assets",
          "Vehicle locations",
          "Infrastructure health",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution",
        items: [
          "CGS Stations",
          "DRS Stations",
          "CNG Stations",
          "Pipeline Networks",
          "PNG Infrastructure",
        ],
      },
      {
        name: "Oil & Gas",
        items: [
          "Terminals",
          "Depots",
          "Tank Farms",
          "Retail Fuel Stations",
          "Fuel Logistics",
        ],
      },
      {
        name: "Manufacturing",
        items: [
          "Production Lines",
          "Machines",
          "Utilities",
          "Quality Processes",
          "Energy Consumption",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Solar Plants",
          "Wind Farms",
          "Inverters",
          "Turbines",
          "Grid Infrastructure",
        ],
      },
      {
        name: "Utilities",
        items: [
          "Water Networks",
          "Pumping Stations",
          "Reservoirs",
          "Distribution Systems",
          "Energy Assets",
        ],
      },
    ],
    benefits: [
      {
        title: "Centralized Operations",
        description:
          "Manage multiple sites and assets through a single platform.",
      },
      {
        title: "Improved Operational Visibility",
        description: "Gain real-time insight into every critical process and asset.",
      },
      {
        title: "Faster Decision Making",
        description:
          "Access actionable information instantly through dashboards and alarms.",
      },
      {
        title: "Reduced Downtime",
        description:
          "Identify operational issues early through alarms and analytics.",
      },
      {
        title: "Increased Efficiency",
        description: "Optimize operations using real-time performance data.",
      },
      {
        title: "Enhanced Collaboration",
        description:
          "Enable operations, maintenance, and management teams to work from the same operational view.",
      },
    ],
    metrics: [
      { value: "500K+", label: "Connected Assets" },
      { value: "50M+", label: "Data Points Processed Daily" },
      { value: "99.99%", label: "Platform Availability" },
      { value: "200+", label: "Industrial Deployments" },
      { value: "24x7", label: "Operational Visibility" },
      { value: "Multi-Site", label: "Enterprise Monitoring" },
    ],
    whyAltrex: [
      "100% Web-Based Architecture",
      "Real-Time Operational Monitoring",
      "Enterprise Alarm Management",
      "GIS Integration",
      "Historical Trending & Analytics",
      "Mobile & Remote Access",
      "Role-Based Security",
      "Cloud, On-Premise & Hybrid Deployment",
      "Scalable from Single Site to Enterprise Operations",
    ],
    ctaHeading: "Transform Your Operations with Real-Time Visibility",
    ctaDescription:
      "Empower operators, maintenance teams, and decision-makers with a modern Web-SCADA platform built for industrial operations.",
  },

  {
    slug: "gis-asset-management",
    name: "GIS & Asset Management",
    hero: {
      tagline: "Visualize Assets. Optimize Operations.",
      heading: "GIS & Asset Management for Intelligent Infrastructure Operations",
      description:
        "Altrex GIS & Asset Management provides a unified view of geographically distributed infrastructure, enabling organizations to visualize, monitor, maintain, and optimize assets throughout their lifecycle.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Modern industrial and utility operations depend on thousands of distributed assets including pipelines, stations, equipment, vehicles, facilities, and field infrastructure.",
    capabilities: [
      {
        title: "GIS-Based Asset Visualization",
        description:
          "Visualize all operational assets on interactive geospatial maps.",
        items: [
          "Interactive GIS Maps",
          "Multi-Layer Mapping",
          "Satellite & Street Views",
          "Asset Location Tracking",
          "Network Visualization",
          "Geofencing",
        ],
      },
      {
        title: "Asset Registry & Hierarchy",
        description:
          "Maintain a centralized repository of all operational assets.",
        items: [
          "Asset Registration",
          "Asset Classification",
          "Hierarchical Asset Structures",
          "Asset Relationships",
          "Asset Documentation",
          "QR/Barcode Integration",
        ],
      },
      {
        title: "Asset Lifecycle Management",
        description: "Track assets from installation to retirement.",
        items: [
          "Asset Commissioning",
          "Lifecycle Tracking",
          "Warranty Management",
          "Depreciation Tracking",
          "Asset History",
          "Replacement Planning",
        ],
      },
      {
        title: "Maintenance Management",
        description:
          "Manage preventive and corrective maintenance activities.",
        items: [
          "Preventive Maintenance",
          "Corrective Maintenance",
          "Maintenance Scheduling",
          "Maintenance History",
          "Resource Planning",
          "Maintenance Analytics",
        ],
      },
      {
        title: "Work Order Management",
        description: "Digitize maintenance and field service operations.",
        items: [
          "Work Order Creation",
          "Task Assignment",
          "Field Workforce Management",
          "Mobile Work Orders",
          "Progress Tracking",
          "Closure Verification",
        ],
      },
      {
        title: "Asset Performance Monitoring",
        description: "Monitor asset health and operational performance.",
        items: [
          "Equipment Status Monitoring",
          "Asset KPIs",
          "Utilization Analytics",
          "Health Monitoring",
          "Alarm Integration",
          "Performance Dashboards",
        ],
      },
    ],
    features: [
      {
        title: "GIS Operations Center",
        description:
          "Centralized geospatial monitoring of infrastructure assets.",
        benefits: [
          "Pipelines",
          "Stations",
          "Plants",
          "Vehicles",
          "Utility Networks",
          "Field Equipment",
        ],
      },
      {
        title: "Asset Information Management",
        description: "Central repository for asset records and documentation.",
        benefits: [
          "Asset Profiles",
          "Technical Specifications",
          "Drawings & Documents",
          "Inspection Records",
          "Service History",
        ],
      },
      {
        title: "Maintenance Management System",
        description: "Streamline maintenance planning and execution.",
        benefits: [
          "Maintenance Schedules",
          "Work Orders",
          "Resource Allocation",
          "Spare Parts",
          "Service Logs",
        ],
      },
      {
        title: "Asset Analytics & Reporting",
        description: "Generate insights from operational and maintenance data.",
        benefits: [
          "Asset Reliability",
          "Equipment Utilization",
          "Maintenance Performance",
          "Lifecycle Costs",
          "Operational KPIs",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "CGS Stations",
          "DRS Stations",
          "MRS Stations",
          "CNG Stations",
          "Steel Pipelines",
          "PE Pipeline Networks",
          "Isolation Valves",
          "Customer Connections",
        ],
      },
      {
        name: "Oil & Gas",
        items: [
          "Tank Farms",
          "Depots",
          "Terminals",
          "Pipelines",
          "Fuel Stations",
          "Loading Facilities",
        ],
      },
      {
        name: "Utilities",
        items: [
          "Water Networks",
          "Reservoirs",
          "Pump Stations",
          "Distribution Infrastructure",
          "Power Assets",
        ],
      },
      {
        name: "Manufacturing",
        items: [
          "Production Equipment",
          "Utility Assets",
          "Plant Infrastructure",
          "Warehouse Assets",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Solar Plants",
          "Wind Turbines",
          "Inverters",
          "Substations",
          "Transmission Infrastructure",
        ],
      },
    ],
    benefits: [
      {
        title: "Complete Asset Visibility",
        description:
          "Access real-time information for every operational asset.",
      },
      {
        title: "Improved Asset Utilization",
        description: "Optimize performance and maximize asset value.",
      },
      {
        title: "Reduced Downtime",
        description: "Identify issues early through monitoring and analytics.",
      },
      {
        title: "Streamlined Maintenance",
        description: "Digitize maintenance workflows and field operations.",
      },
      {
        title: "Better Decision-Making",
        description: "Combine GIS intelligence with operational analytics.",
      },
      {
        title: "Lower Operational Costs",
        description:
          "Improve resource allocation and maintenance planning.",
      },
    ],
    metrics: [
      { value: "500K+", label: "Managed Assets" },
      { value: "100K+", label: "GIS Objects & Network Elements" },
      { value: "99.99%", label: "Asset Data Availability" },
      { value: "50M+", label: "Operational Events Processed Monthly" },
      { value: "24x7", label: "Infrastructure Monitoring" },
      { value: "Enterprise Scale", label: "Multi-Site Asset Management" },
    ],
    whyAltrex: [
      "Integrated GIS & Asset Registry",
      "Asset Lifecycle Management",
      "Preventive Maintenance Management",
      "Work Order & Field Service Management",
      "Real-Time Asset Monitoring",
      "Geospatial Analytics",
      "Mobile Workforce Support",
      "Enterprise Reporting",
      "Cloud, On-Premise & Hybrid Deployment",
    ],
    ctaHeading: "Transform Infrastructure into Intelligent Assets",
    ctaDescription:
      "Gain complete visibility into your infrastructure, streamline maintenance operations, and maximize asset performance with Altrex GIS & Asset Management.",
    architecture: {
      nodes: [
        { id: "c1", label: "Field Assets & Infrastructure", type: "source" },
        { id: "c2", label: "GIS Mapping Layer", type: "layer" },
        { id: "c3", label: "Asset Registry & Hierarchy", type: "layer" },
        {
          id: "c4",
          label: "Operations",
          type: "branch",
          children: ["Maintenance Management", "Work Orders", "Monitoring & Alarms"],
        },
        { id: "c5", label: "Analytics & Reporting", type: "layer" },
        { id: "c6", label: "ERP / SAP / CMMS Integration", type: "output" },
      ],
    },
  },

  {
    slug: "fleet-management",
    name: "Fleet Management & VTS",
    hero: {
      tagline: "Connected Vehicles. Intelligent Operations.",
      heading:
        "Fleet Management & Vehicle Tracking System (VTS) for Real-Time Operational Visibility",
      description:
        "Altrex Fleet Management & VTS enables organizations to monitor vehicle movements, optimize fleet utilization, improve driver safety, and gain complete visibility across transportation and field operations.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Managing vehicle fleets across large geographical areas requires continuous visibility into vehicle locations, driver behavior, fuel usage, route performance, and operational efficiency.",
    capabilities: [
      {
        title: "Real-Time Vehicle Tracking",
        description:
          "Track vehicles and mobile assets with live location updates.",
        items: [
          "Live GPS Tracking",
          "Vehicle Location Monitoring",
          "Route Playback",
          "Trip History",
          "ETA Calculation",
          "Multi-Vehicle Monitoring",
        ],
      },
      {
        title: "Route Optimization & Dispatch Management",
        description: "Optimize fleet utilization and operational efficiency.",
        items: [
          "Route Planning",
          "Route Optimization",
          "Trip Scheduling",
          "Dispatch Management",
          "Dynamic Routing",
          "Delivery Tracking",
        ],
      },
      {
        title: "Geofencing & Alerts",
        description:
          "Monitor vehicle activity within designated operational zones.",
        items: [
          "Geofence Creation",
          "Entry/Exit Notifications",
          "Unauthorized Movement Alerts",
          "Route Deviation Alerts",
          "Idle Time Alerts",
          "Speed Violation Alerts",
        ],
      },
      {
        title: "Driver Performance Monitoring",
        description:
          "Enhance safety and operational efficiency through driver analytics.",
        items: [
          "Driver Scorecards",
          "Harsh Braking Detection",
          "Overspeed Monitoring",
          "Acceleration Monitoring",
          "Driver Behavior Analytics",
          "Safety Reporting",
        ],
      },
      {
        title: "Fuel Management",
        description:
          "Monitor fuel usage and identify optimization opportunities.",
        items: [
          "Fuel Consumption Monitoring",
          "Fuel Efficiency Analysis",
          "Fuel Theft Detection",
          "Fuel Transaction Tracking",
          "Mileage Analytics",
          "Fuel Reporting",
        ],
      },
      {
        title: "Fleet Maintenance Management",
        description: "Improve vehicle reliability and reduce downtime.",
        items: [
          "Maintenance Scheduling",
          "Service Reminders",
          "Maintenance History",
          "Vehicle Health Monitoring",
          "Breakdown Tracking",
          "Asset Lifecycle Management",
        ],
      },
    ],
    features: [
      {
        title: "Fleet Operations Center",
        description:
          "Centralized monitoring and management of fleet operations.",
        benefits: [
          "Vehicle Locations",
          "Fleet Status",
          "Active Trips",
          "Operational Alerts",
          "Route Performance",
        ],
      },
      {
        title: "Driver Management",
        description: "Manage drivers and monitor performance.",
        benefits: [
          "Driver Profiles",
          "Driver Assignments",
          "Driver Safety Scores",
          "Compliance Tracking",
          "Driver Performance Analytics",
        ],
      },
      {
        title: "Fuel & Cost Management",
        description: "Track fleet operating expenses and fuel performance.",
        benefits: [
          "Fuel Consumption",
          "Fuel Efficiency",
          "Fuel Costs",
          "Mileage Tracking",
          "Operating Costs",
        ],
      },
      {
        title: "Fleet Analytics & Reporting",
        description: "Generate actionable insights from fleet operations.",
        benefits: [
          "Fleet Utilization",
          "Vehicle Productivity",
          "Driver Performance",
          "Fuel Efficiency",
          "Fleet KPIs",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "CNG Cascade Vehicles",
          "LNG Transportation",
          "Maintenance Vehicles",
          "Emergency Response Vehicles",
          "Field Service Teams",
        ],
      },
      {
        name: "Oil Marketing Companies (OMC)",
        items: [
          "Fuel Tankers",
          "Distribution Vehicles",
          "Depot Logistics",
          "Retail Supply Operations",
          "Fleet Compliance",
        ],
      },
      {
        name: "Logistics & Transportation",
        items: [
          "Delivery Vehicles",
          "Freight Operations",
          "Distribution Networks",
          "Last-Mile Delivery",
          "Route Efficiency",
        ],
      },
      {
        name: "Utilities",
        items: [
          "Service Vehicles",
          "Maintenance Fleets",
          "Inspection Teams",
          "Emergency Response Units",
        ],
      },
      {
        name: "Infrastructure & Construction",
        items: [
          "Heavy Equipment",
          "Mobile Assets",
          "Construction Vehicles",
          "Project Logistics",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Fleet Utilization",
        description: "Maximize vehicle productivity and reduce idle time.",
      },
      {
        title: "Reduce Operating Costs",
        description:
          "Optimize routes, fuel consumption, and maintenance schedules.",
      },
      {
        title: "Enhance Driver Safety",
        description: "Monitor driving behavior and improve compliance.",
      },
      {
        title: "Improve Customer Service",
        description:
          "Provide accurate delivery tracking and ETA visibility.",
      },
      {
        title: "Strengthen Security",
        description:
          "Protect vehicles through real-time monitoring and geofencing.",
      },
      {
        title: "Increase Operational Efficiency",
        description:
          "Make informed decisions using real-time fleet intelligence.",
      },
    ],
    metrics: [
      { value: "50K+", label: "Connected Vehicles" },
      { value: "10M+", label: "GPS Events Processed Daily" },
      { value: "99.99%", label: "Fleet Data Availability" },
      { value: "24x7", label: "Real-Time Vehicle Monitoring" },
      { value: "500M+", label: "Kilometers Tracked Annually" },
      { value: "Enterprise Scale", label: "Multi-Region Fleet Management" },
    ],
    whyAltrex: [
      "Real-Time GPS Tracking",
      "Route Optimization",
      "Driver Behavior Analytics",
      "Geofencing & Alerts",
      "Fuel Monitoring",
      "Fleet Maintenance Management",
      "Mobile Workforce Tracking",
      "GIS-Based Visualization",
      "Cloud, On-Premise & Hybrid Deployment",
    ],
    ctaHeading: "Transform Fleet Operations with Real-Time Intelligence",
    ctaDescription:
      "Improve visibility, optimize fleet performance, enhance safety, and reduce operational costs through a unified Fleet Management & Vehicle Tracking System.",
    architecture: {
      nodes: [
        { id: "d1", label: "GPS Devices / Telematics Units", type: "source" },
        { id: "d2", label: "Cellular / Satellite Network", type: "layer" },
        { id: "d3", label: "Altrex Fleet Platform", type: "layer" },
        {
          id: "d4",
          label: "Fleet Modules",
          type: "branch",
          children: ["VTS", "Fleet Analytics", "GIS Maps"],
        },
        {
          id: "d5",
          label: "Operations",
          type: "branch",
          children: ["Fuel Mgmt", "Maintenance", "Reporting"],
        },
        { id: "d6", label: "ERP / SAP / Logistics Systems", type: "output" },
      ],
    },
  },

  {
    slug: "amr",
    name: "Automatic Meter Reading (AMR)",
    hero: {
      tagline: "Collect. Analyze. Optimize.",
      heading:
        "Automated Meter Reading (AMR) for Smart Utility & Energy Operations",
      description:
        "Altrex AMR enables utilities, industrial facilities, and infrastructure operators to automatically collect, monitor, and analyze consumption data from gas, water, electricity, steam, and utility meters.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Traditional meter reading processes are labor-intensive, error-prone, and often provide limited visibility into consumption patterns.",
    capabilities: [
      {
        title: "Automated Meter Data Collection",
        description:
          "Collect consumption data automatically from field meters.",
        items: [
          "Scheduled Meter Reading",
          "Remote Data Collection",
          "Multi-Vendor Meter Support",
          "Historical Data Storage",
          "Data Validation",
          "Exception Handling",
        ],
      },
      {
        title: "Multi-Utility Meter Integration",
        description: "Support various utility metering systems.",
        items: [
          "Gas Meters",
          "Water Meters",
          "Energy Meters",
          "Steam Meters",
          "Flow Meters",
          "BTU Meters",
          "LoRaWAN",
          "NB-IoT",
          "GSM/GPRS/4G/5G",
          "RF Mesh",
          "MQTT",
          "M-Bus",
        ],
      },
      {
        title: "Real-Time Consumption Monitoring",
        description: "Monitor utility consumption continuously.",
        items: [
          "Consumption Dashboards",
          "Live Meter Values",
          "Daily Usage Analysis",
          "Monthly Trends",
          "Demand Monitoring",
          "Usage Comparisons",
        ],
      },
      {
        title: "Billing & Revenue Management",
        description: "Improve billing accuracy and efficiency.",
        items: [
          "Automated Billing Data",
          "Consumption Validation",
          "Billing Reports",
          "Customer Usage History",
          "Tariff Calculations",
          "Revenue Analytics",
        ],
      },
      {
        title: "Loss Detection & Analytics",
        description: "Identify abnormal consumption patterns.",
        items: [
          "Leakage Detection",
          "Theft Detection",
          "Consumption Anomaly Detection",
          "Non-Revenue Resource Analysis",
          "Pressure & Flow Correlation",
          "Utilization Analytics",
        ],
      },
      {
        title: "Alerts & Notifications",
        description: "Receive notifications for abnormal conditions.",
        items: [
          "Consumption Threshold Alerts",
          "Meter Failure Alerts",
          "Communication Loss Alerts",
          "Leakage Notifications",
          "Low Battery Alerts",
          "Exception Reporting",
        ],
      },
    ],
    features: [
      {
        title: "Meter Data Management (MDM)",
        description:
          "Centralized management of meter information and consumption data.",
        benefits: [
          "Meter Registry",
          "Customer Mapping",
          "Meter Configuration",
          "Reading History",
          "Meter Health Monitoring",
        ],
      },
      {
        title: "Consumption Analytics",
        description: "Analyze resource utilization patterns.",
        benefits: [
          "Daily Consumption",
          "Monthly Consumption",
          "Seasonal Trends",
          "Peak Usage Analysis",
          "Demand Profiles",
        ],
      },
      {
        title: "Billing Integration",
        description: "Streamline revenue management processes.",
        benefits: [
          "Billing Systems",
          "ERP Platforms",
          "SAP Systems",
          "CRM Applications",
          "Revenue Management Systems",
        ],
      },
      {
        title: "GIS-Based Meter Visualization",
        description: "View meters geographically.",
        benefits: [
          "Meter Locations",
          "Consumption Zones",
          "Distribution Areas",
          "Network Mapping",
          "Service Territories",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "Domestic PNG Meter Reading",
          "Commercial PNG Meter Reading",
          "Industrial Gas Meter Monitoring",
          "Consumption Analytics",
          "Revenue Assurance",
        ],
      },
      {
        name: "Water Utilities",
        items: [
          "Smart Water Metering",
          "Consumption Monitoring",
          "Leakage Detection",
          "District Metering Areas (DMA)",
          "Water Loss Management",
        ],
      },
      {
        name: "Energy Utilities",
        items: [
          "Electricity Meter Monitoring",
          "Smart Energy Metering",
          "Demand Management",
          "Consumption Analytics",
        ],
      },
      {
        name: "Commercial Buildings",
        items: [
          "Tenant Metering",
          "Utility Billing",
          "Consumption Allocation",
          "Sustainability Monitoring",
        ],
      },
      {
        name: "Industrial Facilities",
        items: [
          "Utility Consumption Monitoring",
          "Process Metering",
          "Energy Management",
          "Cost Allocation",
        ],
      },
    ],
    benefits: [
      {
        title: "Reduce Operational Costs",
        description:
          "Eliminate manual meter reading and field visits.",
      },
      {
        title: "Improve Billing Accuracy",
        description: "Generate accurate and timely consumption data.",
      },
      {
        title: "Increase Revenue Assurance",
        description:
          "Identify losses, leaks, and unauthorized consumption.",
      },
      {
        title: "Enhance Customer Service",
        description: "Provide transparent consumption visibility.",
      },
      {
        title: "Improve Resource Management",
        description: "Optimize utility distribution and consumption.",
      },
      {
        title: "Enable Smart Utility Operations",
        description: "Support digital transformation initiatives.",
      },
    ],
    metrics: [
      { value: "1M+", label: "Connected Meters" },
      { value: "100M+", label: "Meter Readings Processed Monthly" },
      { value: "99.99%", label: "Data Availability" },
      { value: "Real-Time", label: "Consumption Monitoring" },
      { value: "Multi-Utility", label: "Unified Meter Management" },
      { value: "Enterprise Scale", label: "Millions of Meter Endpoints" },
    ],
    whyAltrex: [
      "Multi-Vendor Meter Integration",
      "Automated Data Collection",
      "Meter Data Management (MDM)",
      "Billing System Integration",
      "Consumption Analytics",
      "GIS-Based Visualization",
      "Alarm & Event Management",
      "Cloud, On-Premise & Hybrid Deployment",
      "Enterprise Security & Scalability",
    ],
    ctaHeading: "Transform Utility Data into Business Intelligence",
    ctaDescription:
      "Automate meter reading, improve billing accuracy, reduce losses, and gain real-time visibility into utility consumption with Altrex Automated Meter Reading (AMR).",
    architecture: {
      nodes: [
        {
          id: "j1",
          label: "Meter Sources",
          type: "source",
          sublabel: "Gas Meters • Water Meters • Energy Meters",
        },
        {
          id: "j2",
          label: "Communication Network",
          type: "layer",
          sublabel: "LoRaWAN / NB-IoT / GSM / RF Network",
        },
        { id: "j3", label: "Altrex AMR Data Collection Layer", type: "layer" },
        { id: "j4", label: "Meter Data Management Platform", type: "layer" },
        {
          id: "j5",
          label: "Platform Services",
          type: "branch",
          children: ["Analytics", "Billing", "GIS Maps"],
        },
        {
          id: "j6",
          label: "Delivery",
          type: "branch",
          children: ["Dashboards", "Reports", "Alerts", "Mobile Apps"],
        },
        { id: "j7", label: "ERP / SAP / CRM / Utility Systems", type: "output" },
      ],
    },
  },

  {
    slug: "energy-management",
    name: "Energy Management",
    hero: {
      tagline: "Measure. Optimize. Sustain.",
      heading: "Enterprise Energy Management for Smarter Operations",
      description:
        "Altrex Energy Management empowers organizations to monitor, analyze, and optimize energy consumption across facilities, industrial plants, utilities, and infrastructure assets.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Energy is one of the largest operational expenses for industrial and commercial organizations.",
    capabilities: [
      {
        title: "Real-Time Energy Monitoring",
        description:
          "Monitor electricity, gas, water, steam, and utility consumption across facilities and operations.",
        items: [
          "Live Energy Monitoring",
          "Multi-Utility Monitoring",
          "Consumption Dashboards",
          "Energy Flow Visualization",
          "Asset-Level Monitoring",
          "Site-Level Monitoring",
        ],
      },
      {
        title: "Demand & Load Management",
        description:
          "Identify and manage demand peaks to reduce energy costs.",
        items: [
          "Maximum Demand Monitoring",
          "Peak Load Detection",
          "Demand Forecasting",
          "Load Profiling",
          "Demand Alerts",
          "Load Optimization",
        ],
      },
      {
        title: "Power Quality Monitoring",
        description:
          "Ensure reliable and efficient electrical system performance.",
        items: [
          "Voltage Monitoring",
          "Current Monitoring",
          "Harmonic Analysis",
          "Power Factor Monitoring",
          "Frequency Monitoring",
          "Power Quality Events",
        ],
      },
      {
        title: "Energy Analytics & KPIs",
        description:
          "Transform energy data into actionable business intelligence.",
        items: [
          "Energy Dashboards",
          "Consumption Trends",
          "Energy KPIs",
          "Benchmarking",
          "Performance Analysis",
          "Cost Analytics",
        ],
      },
      {
        title: "Carbon & Sustainability Management",
        description:
          "Support environmental and sustainability initiatives.",
        items: [
          "Carbon Footprint Tracking",
          "Emission Calculations",
          "ESG Reporting",
          "Sustainability Dashboards",
          "Environmental KPIs",
          "Compliance Reporting",
        ],
      },
      {
        title: "Automated Reporting",
        description:
          "Generate comprehensive energy reports automatically.",
        items: [
          "Daily Reports",
          "Monthly Reports",
          "Energy Cost Reports",
          "Demand Reports",
          "Sustainability Reports",
          "Regulatory Reports",
        ],
      },
    ],
    features: [
      {
        title: "Energy Operations Center",
        description:
          "Centralized monitoring of energy performance across facilities.",
        benefits: [
          "Energy Consumption",
          "Utility Usage",
          "Energy Costs",
          "Operational KPIs",
          "Site Performance",
        ],
      },
      {
        title: "Power Quality Dashboard",
        description: "Monitor electrical network performance.",
        benefits: [
          "Voltage Profiles",
          "Current Profiles",
          "Power Factor",
          "Harmonics",
          "Energy Losses",
        ],
      },
      {
        title: "Demand Management Center",
        description: "Manage peak loads and optimize energy utilization.",
        benefits: [
          "Peak Demand",
          "Load Balancing",
          "Demand Forecasts",
          "Consumption Targets",
        ],
      },
      {
        title: "Sustainability Dashboard",
        description: "Track environmental performance and emissions.",
        benefits: [
          "Carbon Emissions",
          "Energy Intensity",
          "Sustainability KPIs",
          "ESG Metrics",
        ],
      },
    ],
    industries: [
      {
        name: "Manufacturing",
        items: [
          "Production Energy Consumption",
          "Machine Energy Usage",
          "Utility Systems",
          "Process Efficiency",
          "Plant Performance",
        ],
      },
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "Compressor Energy Consumption",
          "Station Utilities",
          "CNG Operations",
          "Facility Energy Performance",
        ],
      },
      {
        name: "Commercial Buildings",
        items: [
          "HVAC Systems",
          "Lighting Systems",
          "Electrical Distribution",
          "Building Efficiency",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Energy Generation",
          "Grid Export",
          "Self-Consumption",
          "Storage Systems",
        ],
      },
      {
        name: "Utilities & Infrastructure",
        items: [
          "Pump Stations",
          "Water Treatment Plants",
          "Distribution Networks",
          "Critical Infrastructure",
        ],
      },
    ],
    benefits: [
      {
        title: "Reduce Energy Costs",
        description:
          "Identify inefficiencies and optimize energy consumption.",
      },
      {
        title: "Improve Operational Efficiency",
        description:
          "Monitor and benchmark energy performance across facilities.",
      },
      {
        title: "Increase Equipment Reliability",
        description:
          "Detect power quality issues before they impact operations.",
      },
      {
        title: "Achieve Sustainability Goals",
        description: "Track carbon emissions and environmental performance.",
      },
      {
        title: "Improve Regulatory Compliance",
        description:
          "Generate audit-ready reports and compliance documentation.",
      },
      {
        title: "Enable Data-Driven Decisions",
        description:
          "Use real-time analytics to improve energy management strategies.",
      },
    ],
    metrics: [
      { value: "100K+", label: "Connected Energy Points" },
      { value: "50M+", label: "Energy Data Records Processed Monthly" },
      { value: "99.99%", label: "Data Availability" },
      { value: "20%", label: "Potential Energy Cost Reduction" },
      { value: "24x7", label: "Energy Monitoring" },
      { value: "Enterprise Scale", label: "Multi-Site Energy Management" },
    ],
    whyAltrex: [
      "Real-Time Energy Monitoring",
      "Multi-Utility Management",
      "Demand & Load Optimization",
      "Power Quality Analytics",
      "Carbon & Sustainability Tracking",
      "Automated Reporting",
      "KPI Dashboards & Analytics",
      "GIS Integration",
      "Cloud, On-Premise & Hybrid Deployment",
    ],
    ctaHeading: "Optimize Energy. Reduce Costs. Drive Sustainability.",
    ctaDescription:
      "Transform energy data into operational intelligence and build a more efficient, sustainable, and cost-effective enterprise with Altrex Energy Management.",
    architecture: {
      nodes: [
        {
          id: "e1",
          label: "Data Sources",
          type: "source",
          sublabel: "Energy Meters • Power Analyzers • Gas Meters • Utility Systems",
        },
        { id: "e2", label: "Altrex Connectivity Layer", type: "layer" },
        { id: "e3", label: "Energy Management Platform", type: "layer" },
        {
          id: "e4",
          label: "Analytics",
          type: "branch",
          children: ["Energy KPIs & Analytics", "Power Quality Monitoring", "Sustainability Reporting"],
        },
        {
          id: "e5",
          label: "Delivery",
          type: "branch",
          children: ["Reports", "Dashboards", "Alerts", "Mobile Apps"],
        },
        { id: "e6", label: "ERP / SAP / BI / ESG Systems", type: "output" },
      ],
    },
  },

  {
    slug: "alarm-management",
    name: "Alarm & Event Management",
    hero: {
      tagline: "Detect. Notify. Respond.",
      heading:
        "Intelligent Alarm & Event Management for Critical Operations",
      description:
        "Altrex Alarm & Event Management helps organizations detect operational anomalies, prioritize critical events, automate notifications, and accelerate response times.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Industrial operations generate thousands of events and alarms daily across equipment, processes, infrastructure, and communication networks.",
    capabilities: [
      {
        title: "Real-Time Alarm Monitoring",
        description:
          "Monitor operational alarms and critical events as they occur.",
        items: [
          "Live Alarm Dashboard",
          "Alarm Prioritization",
          "Alarm Categorization",
          "Alarm Filtering",
          "Multi-Site Alarm Monitoring",
          "Mobile Alarm Access",
        ],
      },
      {
        title: "Alarm Notification & Escalation",
        description: "Ensure critical alarms are never missed.",
        items: [
          "SMS Notifications",
          "Email Notifications",
          "Mobile Push Notifications",
          "Escalation Matrix",
          "Shift-Based Notifications",
          "Role-Based Alerts",
        ],
      },
      {
        title: "Alarm Acknowledgement & Workflow",
        description: "Manage alarm response processes efficiently.",
        items: [
          "Alarm Acknowledgement",
          "Alarm Comments",
          "Incident Tracking",
          "Corrective Action Tracking",
          "Closure Verification",
          "Operator Notes",
        ],
      },
      {
        title: "Event Management",
        description:
          "Capture and analyze operational events across the enterprise.",
        items: [
          "System Events",
          "Communication Events",
          "Device Events",
          "User Activity Events",
          "Security Events",
          "Process Events",
        ],
      },
      {
        title: "Alarm Analytics & KPI Monitoring",
        description: "Analyze alarm performance and operational behavior.",
        items: [
          "Alarm Frequency Analysis",
          "Alarm Distribution Analysis",
          "Nuisance Alarm Identification",
          "Alarm Response Time Tracking",
          "Alarm KPI Dashboards",
          "Historical Analysis",
        ],
      },
      {
        title: "Event Correlation & Intelligence",
        description: "Identify relationships between operational events.",
        items: [
          "Event Correlation Engine",
          "Root Cause Analysis",
          "Pattern Detection",
          "Event Grouping",
          "Incident Analysis",
          "Operational Insights",
        ],
      },
    ],
    features: [
      {
        title: "Alarm Operations Center",
        description:
          "Centralized monitoring and management of operational alarms.",
        benefits: [
          "Critical Alarms",
          "Warning Conditions",
          "Equipment Faults",
          "Process Deviations",
          "Infrastructure Events",
        ],
      },
      {
        title: "Notification Management",
        description: "Automate alarm delivery and escalation.",
        benefits: [
          "Notification Rules",
          "Escalation Policies",
          "User Groups",
          "Shift Schedules",
          "Alert Preferences",
        ],
      },
      {
        title: "Incident Management",
        description: "Track alarm resolution activities.",
        benefits: [
          "Incident Records",
          "Action Plans",
          "Corrective Actions",
          "Resolution Tracking",
          "Incident Reporting",
        ],
      },
      {
        title: "Analytics & Reporting",
        description: "Generate actionable insights from alarm and event data.",
        benefits: [
          "Alarm KPIs",
          "Event Statistics",
          "Response Performance",
          "Compliance Metrics",
          "Operational Reports",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "Low Pressure Alarms",
          "High Pressure Alarms",
          "Gas Leak Events",
          "Compressor Faults",
          "Communication Failures",
          "Emergency Shutdown Events",
        ],
      },
      {
        name: "Oil & Gas",
        items: [
          "Tank Level Alarms",
          "Product Loss Events",
          "Equipment Faults",
          "Pipeline Events",
          "Terminal Operations",
          "Safety Events",
        ],
      },
      {
        name: "Manufacturing",
        items: [
          "Machine Faults",
          "Production Deviations",
          "Utility Failures",
          "Quality Events",
          "Equipment Alarms",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Turbine Faults",
          "Inverter Alarms",
          "Grid Events",
          "Generation Loss Events",
          "Communication Issues",
        ],
      },
      {
        name: "Utilities & Infrastructure",
        items: [
          "Pump Failures",
          "Power Outages",
          "Network Faults",
          "Environmental Events",
          "Infrastructure Alarms",
        ],
      },
    ],
    benefits: [
      {
        title: "Reduce Downtime",
        description:
          "Respond quickly to operational issues before they impact production.",
      },
      {
        title: "Improve Operational Reliability",
        description:
          "Ensure critical events are identified and managed effectively.",
      },
      {
        title: "Enhance Safety",
        description:
          "Monitor safety-critical alarms and emergency events in real time.",
      },
      {
        title: "Increase Accountability",
        description:
          "Track alarm ownership, response actions, and incident resolution.",
      },
      {
        title: "Improve Compliance",
        description:
          "Maintain complete audit trails for regulatory and operational requirements.",
      },
      {
        title: "Minimize Alarm Fatigue",
        description:
          "Identify nuisance alarms and improve alarm system performance.",
      },
    ],
    metrics: [
      { value: "1M+", label: "Alarms Processed Daily" },
      { value: "< 1 Second", label: "Alarm Detection & Notification" },
      { value: "99.99%", label: "Alarm Availability" },
      { value: "24x7", label: "Continuous Monitoring" },
      { value: "Multi-Channel", label: "SMS, Email & Mobile Notifications" },
      { value: "Enterprise Scale", label: "Multi-Site Alarm Management" },
    ],
    whyAltrex: [
      "Real-Time Alarm Monitoring",
      "Advanced Alarm Prioritization",
      "Multi-Channel Notifications",
      "Escalation Workflows",
      "Incident Management",
      "Event Correlation & Analytics",
      "Historical Alarm Analysis",
      "Mobile Accessibility",
      "Enterprise Security & Audit Trails",
    ],
    ctaHeading: "Turn Operational Events into Actionable Intelligence",
    ctaDescription:
      "Empower operators, maintenance teams, and management with a centralized Alarm & Event Management platform that improves response times, enhances reliability, and ensures continuous operational awareness.",
    architecture: {
      nodes: [
        {
          id: "f1",
          label: "Data Sources",
          type: "source",
          sublabel: "Field Devices • PLCs • RTUs • SCADA Systems",
        },
        { id: "f2", label: "Altrex Alarm Engine", type: "layer" },
        {
          id: "f3",
          label: "Processing",
          type: "branch",
          children: ["Alarm Rules", "Event Processing", "Correlation"],
        },
        { id: "f4", label: "Notification Engine", type: "layer" },
        {
          id: "f5",
          label: "Channels",
          type: "branch",
          children: ["SMS", "Email", "Mobile App", "Dashboard"],
        },
        { id: "f6", label: "Incident Management & Analytics", type: "output" },
      ],
    },
  },

  {
    slug: "analytics-reporting",
    name: "Analytics & Reporting",
    hero: {
      tagline: "Transform Data into Actionable Intelligence",
      heading:
        "Operational Analytics & Reporting for Data-Driven Decisions",
      description:
        "Altrex Analytics & Reporting empowers organizations to convert operational data into meaningful insights through real-time dashboards, KPI monitoring, advanced analytics, and automated reporting.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Industrial organizations generate massive volumes of operational data every day.",
    capabilities: [
      {
        title: "Real-Time Operational Dashboards",
        description:
          "Visualize critical operational information through interactive dashboards.",
        items: [
          "Executive Dashboards",
          "Operations Dashboards",
          "Asset Performance Dashboards",
          "Energy Dashboards",
          "Fleet Dashboards",
          "GIS-Based Dashboards",
        ],
      },
      {
        title: "KPI Monitoring & Scorecards",
        description:
          "Track operational performance through configurable KPIs.",
        items: [
          "KPI Configuration",
          "Real-Time KPI Monitoring",
          "Performance Scorecards",
          "Benchmarking",
          "Goal Tracking",
          "SLA Monitoring",
        ],
      },
      {
        title: "Advanced Analytics",
        description:
          "Discover trends, patterns, and opportunities hidden within operational data.",
        items: [
          "Trend Analysis",
          "Comparative Analysis",
          "Root Cause Analysis",
          "Performance Analytics",
          "Predictive Insights",
          "Operational Intelligence",
        ],
      },
      {
        title: "Automated Reporting",
        description: "Generate and distribute reports automatically.",
        items: [
          "Scheduled Reports",
          "Event-Based Reports",
          "PDF Reports",
          "Excel Reports",
          "Email Distribution",
          "Regulatory Reports",
        ],
      },
      {
        title: "Historical Data Analysis",
        description: "Analyze historical operational performance.",
        items: [
          "Trend Analysis",
          "Data Playback",
          "Historical Comparisons",
          "Event History Analysis",
          "Asset Performance History",
          "Long-Term KPI Tracking",
        ],
      },
      {
        title: "Predictive & AI-Driven Insights",
        description:
          "Leverage advanced analytics to identify future opportunities and risks.",
        items: [
          "Predictive Maintenance Analytics",
          "Energy Optimization Analytics",
          "Asset Health Scoring",
          "Operational Forecasting",
          "Anomaly Detection",
          "AI-Based Recommendations",
        ],
      },
    ],
    features: [
      {
        title: "Executive Intelligence Center",
        description:
          "Provide leadership teams with strategic operational visibility.",
        benefits: [
          "Enterprise KPIs",
          "Business Performance",
          "Asset Utilization",
          "Financial Indicators",
          "Operational Trends",
        ],
      },
      {
        title: "Operations Analytics",
        description: "Analyze day-to-day operational performance.",
        benefits: [
          "Production Performance",
          "Equipment Utilization",
          "Process Efficiency",
          "Operational Events",
          "Resource Utilization",
        ],
      },
      {
        title: "Asset Analytics",
        description: "Monitor asset health and reliability.",
        benefits: [
          "Asset Availability",
          "Equipment Reliability",
          "Maintenance Performance",
          "Lifecycle Costs",
          "Asset Utilization",
        ],
      },
      {
        title: "Energy Analytics",
        description:
          "Optimize energy performance and sustainability initiatives.",
        benefits: [
          "Energy Consumption",
          "Demand Patterns",
          "Energy Costs",
          "Carbon Emissions",
          "Efficiency Metrics",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "Gas Sales Analytics",
          "Network Performance Analytics",
          "Pressure Trend Analysis",
          "CNG Station Performance",
          "Asset Utilization Analytics",
        ],
      },
      {
        name: "Oil & Gas",
        items: [
          "Inventory Analytics",
          "Terminal Performance",
          "Fleet Logistics Analytics",
          "Depot Operations Analytics",
          "Retail Network Performance",
        ],
      },
      {
        name: "Manufacturing",
        items: [
          "OEE Analytics",
          "Production Performance",
          "Quality Analytics",
          "Downtime Analysis",
          "Maintenance Performance",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Generation Analytics",
          "Turbine Performance",
          "Inverter Analytics",
          "Forecasting",
          "Availability Analysis",
        ],
      },
      {
        name: "Utilities",
        items: [
          "Consumption Analytics",
          "Distribution Performance",
          "Infrastructure Reliability",
          "Service Quality Metrics",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Decision-Making",
        description:
          "Provide stakeholders with accurate, timely, and actionable information.",
      },
      {
        title: "Increase Operational Efficiency",
        description:
          "Identify bottlenecks and optimization opportunities.",
      },
      {
        title: "Reduce Operational Costs",
        description:
          "Monitor performance drivers and eliminate inefficiencies.",
      },
      {
        title: "Enhance Asset Performance",
        description:
          "Improve reliability through data-driven maintenance strategies.",
      },
      {
        title: "Improve Regulatory Compliance",
        description:
          "Generate audit-ready reports and compliance documentation.",
      },
      {
        title: "Enable Predictive Operations",
        description:
          "Move from reactive to proactive operational management.",
      },
    ],
    metrics: [
      { value: "100M+", label: "Data Points Analyzed Monthly" },
      { value: "10,000+", label: "Reports Generated Monthly" },
      { value: "500+", label: "Configurable KPIs" },
      { value: "Real-Time", label: "Operational Dashboards" },
      { value: "AI-Driven", label: "Predictive Insights" },
      { value: "Enterprise Scale", label: "Multi-Site Analytics" },
    ],
    whyAltrex: [
      "Unified Operational Intelligence",
      "Real-Time KPI Dashboards",
      "Advanced Analytics Engine",
      "Automated Reporting",
      "Historical Data Analysis",
      "Predictive Analytics",
      "GIS-Based Analytics",
      "Mobile & Web Access",
      "Enterprise Security & Governance",
    ],
    ctaHeading: "Turn Operational Data into Strategic Advantage",
    ctaDescription:
      "Empower your teams with real-time insights, intelligent analytics, and automated reporting to improve efficiency, reliability, and business performance across your enterprise.",
    architecture: {
      nodes: [
        {
          id: "g1",
          label: "Data Sources",
          type: "source",
          sublabel: "SCADA • IoT • GIS • Fleet • Energy • Asset Management",
        },
        { id: "g2", label: "Altrex Data Platform", type: "layer" },
        {
          id: "g3",
          label: "Engines",
          type: "branch",
          children: ["Analytics Engine", "KPI Engine", "Report Engine"],
        },
        {
          id: "g4",
          label: "Output",
          type: "branch",
          children: ["Dashboards", "Reports", "Alerts", "Forecasts"],
        },
        {
          id: "g5",
          label: "Consumers",
          type: "output",
          sublabel: "Management • Operations • Maintenance • Executives",
        },
      ],
    },
  },

  {
    slug: "cybersecurity",
    name: "Cybersecurity & Access Control",
    hero: {
      tagline: "Secure. Protect. Govern.",
      heading:
        "Cybersecurity & Access Control for Critical Industrial Infrastructure",
      description:
        "Altrex Cybersecurity & Access Control provides comprehensive protection for industrial operations, critical infrastructure, and enterprise systems.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "As industrial operations become increasingly connected, cybersecurity has become a critical business requirement.",
    capabilities: [
      {
        title: "Identity & Access Management (IAM)",
        description:
          "Control who can access systems, applications, and operational data.",
        items: [
          "Role-Based Access Control (RBAC)",
          "User & Group Management",
          "Permission Management",
          "Hierarchical Access Control",
          "Site-Based Access Policies",
          "Department-Based Access Control",
        ],
      },
      {
        title: "Multi-Factor Authentication (MFA)",
        description:
          "Enhance login security with multiple authentication methods.",
        items: [
          "OTP Authentication",
          "Email Verification",
          "Mobile Authentication",
          "Time-Based Authentication",
          "Single Sign-On (SSO) Support",
          "Identity Provider Integration",
        ],
      },
      {
        title: "Secure Communication",
        description: "Protect data during transmission across networks.",
        items: [
          "TLS/SSL Encryption",
          "HTTPS Communication",
          "Secure API Access",
          "VPN Integration",
          "MQTT Security",
          "Certificate-Based Authentication",
        ],
      },
      {
        title: "Audit Trails & Activity Monitoring",
        description: "Track every user action and system event.",
        items: [
          "User Activity Logs",
          "Login History",
          "Configuration Change Logs",
          "Alarm Acknowledgment Logs",
          "Report Access Logs",
          "System Event Tracking",
        ],
      },
      {
        title: "Security Event Monitoring",
        description: "Identify and respond to security incidents quickly.",
        items: [
          "Failed Login Detection",
          "Unauthorized Access Alerts",
          "Security Event Logs",
          "Access Violation Detection",
          "Device Security Monitoring",
          "Real-Time Security Alerts",
        ],
      },
      {
        title: "Data Protection & Governance",
        description: "Protect critical operational and business data.",
        items: [
          "Data Encryption",
          "Backup & Recovery",
          "Secure Data Storage",
          "Retention Policies",
          "Data Governance Controls",
          "Disaster Recovery Support",
        ],
      },
    ],
    features: [
      {
        title: "User Access Management",
        description:
          "Manage users, roles, and permissions across the platform.",
        benefits: [
          "Users",
          "Groups",
          "Roles",
          "Permissions",
          "Authentication Policies",
        ],
      },
      {
        title: "Security Operations Center",
        description: "Monitor cybersecurity events and access activities.",
        benefits: [
          "Login Activities",
          "Security Events",
          "Access Violations",
          "System Health",
          "Threat Indicators",
        ],
      },
      {
        title: "Governance & Compliance",
        description: "Maintain security standards and audit readiness.",
        benefits: [
          "Security Policies",
          "Audit Records",
          "Compliance Reports",
          "User Certifications",
          "Access Reviews",
        ],
      },
      {
        title: "Security Analytics",
        description: "Analyze security posture and operational risks.",
        benefits: [
          "Access Trends",
          "User Activity",
          "Security Incidents",
          "Compliance Status",
          "Risk Indicators",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "SCADA Systems",
          "DRS Monitoring",
          "CGS Operations",
          "Pipeline Infrastructure",
          "Field Devices",
        ],
      },
      {
        name: "Oil & Gas",
        items: [
          "Tank Farms",
          "Terminals",
          "Fuel Depots",
          "Retail Networks",
          "Operational Assets",
        ],
      },
      {
        name: "Manufacturing",
        items: [
          "Production Systems",
          "Industrial Networks",
          "Plant Operations",
          "Operational Data",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Wind Farms",
          "Solar Plants",
          "Substations",
          "Grid Infrastructure",
        ],
      },
      {
        name: "Utilities",
        items: [
          "Water Networks",
          "Pump Stations",
          "Distribution Infrastructure",
          "Critical Assets",
        ],
      },
    ],
    benefits: [
      {
        title: "Protect Critical Infrastructure",
        description:
          "Reduce exposure to cyber threats targeting industrial operations.",
      },
      {
        title: "Improve Operational Security",
        description:
          "Ensure only authorized users access critical systems and data.",
      },
      {
        title: "Maintain Regulatory Readiness",
        description:
          "Support security audits and compliance requirements.",
      },
      {
        title: "Strengthen Data Protection",
        description: "Safeguard operational and business information.",
      },
      {
        title: "Enhance Business Continuity",
        description:
          "Reduce risks associated with cyber incidents and system failures.",
      },
      {
        title: "Enable Secure Digital Transformation",
        description:
          "Adopt Industrial IoT, SCADA, Cloud, and Analytics solutions securely.",
      },
    ],
    metrics: [
      { value: "100%", label: "Encrypted Communications" },
      { value: "Role-Based", label: "Granular Access Control" },
      { value: "Multi-Factor", label: "Authentication Support" },
      { value: "Complete", label: "Audit Trail & Activity Logging" },
      { value: "Real-Time", label: "Security Monitoring" },
      { value: "Enterprise", label: "Multi-Site Security Governance" },
    ],
    whyAltrex: [
      "Role-Based Access Control (RBAC)",
      "Multi-Factor Authentication (MFA)",
      "Secure API & Protocol Communications",
      "Comprehensive Audit Trails",
      "User Activity Monitoring",
      "Security Event Detection",
      "Data Encryption & Protection",
      "Compliance-Ready Architecture",
      "Cloud, On-Premise & Hybrid Deployment",
    ],
    ctaHeading: "Secure Industrial Operations with Confidence",
    ctaDescription:
      "Protect critical infrastructure, operational data, and enterprise systems with a cybersecurity framework built specifically for Industrial IoT, SCADA, GIS, Fleet Management, and mission-critical operations.",
    architecture: {
      nodes: [
        { id: "h1", label: "Users & Devices", type: "source" },
        {
          id: "h2",
          label: "Authentication Layer",
          type: "layer",
          sublabel: "RBAC + MFA + SSO",
        },
        { id: "h3", label: "Access Control Engine", type: "layer" },
        {
          id: "h4",
          label: "Protected Systems",
          type: "branch",
          children: ["SCADA", "GIS", "Fleet", "Analytics"],
        },
        { id: "h5", label: "Audit & Security Monitoring", type: "layer" },
        {
          id: "h6",
          label: "Outputs",
          type: "output",
          sublabel: "Reports • Alerts • Compliance",
        },
      ],
    },
  },

  {
    slug: "cctv-surveillance",
    name: "CCTV & Video Surveillance Management",
    hero: {
      tagline: "See More. Respond Faster. Secure Better.",
      heading:
        "Intelligent CCTV & Video Surveillance for Operational Security",
      description:
        "Altrex CCTV & Video Surveillance Management enables organizations to monitor facilities, assets, operations, and critical infrastructure through a centralized video management platform.",
      ctas: ["Request Demo", "Explore Platform"],
    },
    overview:
      "Modern industrial and infrastructure operations require more than traditional surveillance.",
    capabilities: [
      {
        title: "Centralized Video Monitoring",
        description:
          "Monitor live video streams from multiple locations through a unified dashboard.",
        items: [
          "Live Camera Monitoring",
          "Multi-Screen Video Walls",
          "PTZ Camera Control",
          "Camera Group Management",
          "Multi-Site Monitoring",
          "Mobile Video Access",
        ],
      },
      {
        title: "Video Recording & Playback",
        description: "Securely record and retrieve video footage.",
        items: [
          "Continuous Recording",
          "Event-Based Recording",
          "Scheduled Recording",
          "Video Playback",
          "Timeline Search",
          "Incident Bookmarking",
        ],
      },
      {
        title: "AI-Based Video Analytics",
        description:
          "Transform video streams into actionable intelligence.",
        items: [
          "Motion Detection",
          "Intrusion Detection",
          "Line Crossing Detection",
          "Object Detection",
          "Vehicle Detection",
          "People Counting",
        ],
      },
      {
        title: "Alarm & Video Integration",
        description: "Link operational alarms directly with video feeds.",
        items: [
          "Alarm-Triggered Video Popups",
          "Video Verification",
          "Event Correlation",
          "Incident Recording",
          "Alarm-Based Notifications",
          "Investigation Tools",
        ],
      },
      {
        title: "GIS-Based Video Monitoring",
        description:
          "Visualize camera locations and surveillance coverage on GIS maps.",
        items: [
          "Camera Mapping",
          "Coverage Visualization",
          "Asset-Based Camera Linking",
          "Geographic Event Monitoring",
          "Remote Site Surveillance",
        ],
      },
      {
        title: "Remote Monitoring & Control",
        description: "Access surveillance systems from anywhere.",
        items: [
          "Web-Based Access",
          "Mobile Applications",
          "Remote PTZ Control",
          "Multi-User Access",
          "Secure Connectivity",
          "Role-Based Permissions",
        ],
      },
    ],
    features: [
      {
        title: "Security Operations Center (SOC)",
        description: "Centralized monitoring of all surveillance activities.",
        benefits: [
          "Live Cameras",
          "Security Events",
          "Alarms",
          "Facility Status",
          "Incident Activity",
        ],
      },
      {
        title: "Video Management System (VMS)",
        description: "Manage cameras and video infrastructure.",
        benefits: [
          "Camera Configuration",
          "Recording Policies",
          "Storage Management",
          "User Permissions",
          "Video Archives",
        ],
      },
      {
        title: "Video Analytics Center",
        description: "Generate actionable intelligence from surveillance data.",
        benefits: [
          "Intrusion Events",
          "Movement Patterns",
          "Occupancy Trends",
          "Vehicle Activity",
          "Security KPIs",
        ],
      },
      {
        title: "Reporting & Compliance",
        description: "Generate surveillance and security reports.",
        benefits: [
          "Incident Reports",
          "Camera Health Reports",
          "Event Logs",
          "Audit Reports",
          "Compliance Reports",
        ],
      },
    ],
    industries: [
      {
        name: "City Gas Distribution (CGD)",
        items: [
          "CNG Stations",
          "CGS Facilities",
          "DRS Stations",
          "Pipeline Infrastructure",
          "Utility Facilities",
        ],
      },
      {
        name: "Oil & Gas",
        items: [
          "Tank Farms",
          "Fuel Depots",
          "Refineries",
          "Loading Bays",
          "Retail Fuel Stations",
        ],
      },
      {
        name: "Manufacturing",
        items: [
          "Production Areas",
          "Warehouses",
          "Entry/Exit Points",
          "Utility Infrastructure",
          "Safety Zones",
        ],
      },
      {
        name: "Renewable Energy",
        items: [
          "Solar Plants",
          "Wind Farms",
          "Substations",
          "Control Rooms",
          "Remote Assets",
        ],
      },
      {
        name: "Smart Cities & Infrastructure",
        items: [
          "Public Facilities",
          "Transportation Hubs",
          "Utility Infrastructure",
          "Traffic Areas",
          "Critical Assets",
        ],
      },
    ],
    benefits: [
      {
        title: "Enhance Security",
        description: "Protect critical assets and infrastructure.",
      },
      {
        title: "Improve Safety",
        description:
          "Monitor safety-sensitive areas and operational activities.",
      },
      {
        title: "Accelerate Incident Response",
        description: "Verify and respond to incidents faster.",
      },
      {
        title: "Reduce Security Costs",
        description:
          "Leverage intelligent analytics and centralized monitoring.",
      },
      {
        title: "Improve Compliance",
        description: "Maintain video evidence and audit trails.",
      },
      {
        title: "Increase Operational Visibility",
        description: "Combine video intelligence with operational data.",
      },
    ],
    metrics: [
      { value: "10,000+", label: "Connected Cameras" },
      { value: "24x7", label: "Continuous Monitoring" },
      { value: "AI-Powered", label: "Video Analytics" },
      { value: "Multi-Site", label: "Centralized Surveillance" },
      { value: "Real-Time", label: "Alarm & Video Correlation" },
      { value: "Enterprise Scale", label: "Distributed Video Management" },
    ],
    whyAltrex: [
      "Enterprise Video Management System (VMS)",
      "AI-Based Video Analytics",
      "GIS & CCTV Integration",
      "Alarm & Video Correlation",
      "Web-Based Monitoring",
      "Mobile Accessibility",
      "Multi-Site Surveillance",
      "Secure Video Storage",
      "Cloud, On-Premise & Hybrid Deployment",
    ],
    ctaHeading: "Transform Surveillance into Operational Intelligence",
    ctaDescription:
      "Move beyond traditional CCTV monitoring with a unified surveillance platform that combines video, analytics, alarms, GIS, and operational intelligence to protect people, assets, and critical infrastructure.",
    architecture: {
      nodes: [
        {
          id: "i1",
          label: "Video Sources",
          type: "source",
          sublabel: "IP Cameras • NVRs • Video Servers • Edge AI Devices",
        },
        { id: "i2", label: "Altrex Video Management Platform", type: "layer" },
        {
          id: "i3",
          label: "Video Processing",
          type: "branch",
          children: ["Live Monitoring", "Video Analytics", "Recording"],
        },
        {
          id: "i4",
          label: "Integration Layer",
          type: "branch",
          children: ["SCADA", "GIS", "Alarm Management", "Asset Management"],
        },
        { id: "i5", label: "Security Operations Center (SOC)", type: "output" },
      ],
    },
  },
];

// Helper to find a solution by slug
export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}