import type { IndustryData } from "../types/industry";

// ─── Registry ─────────────────────────────────────────────────────────────────
// Keys match the URL slugs already wired in the Header:
//   /industries/cgd
//   /industries/oil-gas
//   /industries/water-wastewater
//   /industries/power-utilities
//   /industries/renewable-energy
//   /industries/manufacturing-automation
//   /industries/logistics-transportation
//   /industries/smart-cities
//   /industries/infrastructure-utilities

export const industriesRegistry: IndustryData[] = [
  // ── 1. City Gas Distribution ─────────────────────────────────────────────
  {
    slug: "cgd",
    image: "/industries/cgd.jpg",
    name: "City Gas Distribution",
    hero: {
      tagline: "Digital Solutions for CGD Networks",
      heading:
        "Accelerating the Digital Transformation of City Gas Distribution Networks",
      description:
        "Altrex Tech provides comprehensive digital solutions for City Gas Distribution companies to monitor, control, optimize, and manage their entire gas distribution infrastructure from a centralized platform. Integrate field assets, communication networks, GIS mapping, SCADA systems, IoT devices, fleet operations, and enterprise applications into a unified operational ecosystem.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "18,000+", label: "Pipeline Nodes Supported" },
      { value: "99.99%", label: "Platform Availability" },
      { value: "24×7", label: "Operational Visibility" },
      { value: "< 800ms", label: "Alarm Response Latency" },
    ],
    overview:
      "With increasing network expansion, regulatory compliance requirements, and customer expectations, CGD operators require real-time visibility across PNG and CNG infrastructure. Altrex Tech helps organizations improve operational efficiency, reduce downtime, enhance safety, and make data-driven decisions through advanced monitoring and analytics — from city gate stations to the last-mile consumer connection.",
    challenges: [
      {
        title: "Distributed Infrastructure",
        items: [
          "CNG Stations & Mother Stations",
          "Daughter Booster & Online Stations",
          "Pressure Regulating Stations",
          "Pipeline Networks & Compressor Systems",
          "LNG Stations & City Gate Stations",
        ],
      },
      {
        title: "Operational Visibility",
        items: [
          "Delayed fault detection",
          "Unplanned downtime",
          "Inefficient maintenance activities",
          "Increased operational costs",
          "Reduced asset utilization",
        ],
      },
      {
        title: "Asset Management",
        items: [
          "Tracking thousands of field assets",
          "Monitoring equipment health",
          "Maintenance planning & spare inventory",
          "Asset lifecycle management",
        ],
      },
      {
        title: "Fleet & Cascade Monitoring",
        items: [
          "Cascade movement tracking",
          "Route optimization",
          "Delivery planning",
          "Fuel consumption monitoring",
          "Driver performance analysis",
        ],
      },
    ],
    modules: [
      {
        title: "Web SCADA",
        description:
          "Real-time monitoring and control of compressors, dispensers, flow meters, pressure transmitters, PLCs, RTUs, and energy meters from a centralized command center.",
        monitors: [
          "Compressors",
          "Dispensers",
          "Flow Meters",
          "Pressure Transmitters",
          "Temperature Sensors",
          "PLC Systems",
          "RTUs",
          "Energy Meters",
        ],
        features: [
          "Real-time dashboards",
          "Process visualization",
          "Trend charts",
          "Alarm management",
          "Event logging",
          "Historical data storage",
          "Remote operations",
          "Mobile access",
        ],
        benefits: [
          "Faster response to operational issues",
          "Reduced downtime",
          "Improved operational visibility",
        ],
      },
      {
        title: "Industrial IoT Platform",
        description:
          "Connect and monitor field devices using industry-standard protocols with secure edge processing and store-and-forward capability.",
        monitors: [
          "Modbus TCP / RTU",
          "OPC UA",
          "MQTT",
          "REST APIs",
          "IEC Protocols",
        ],
        features: [
          "Unified data collection",
          "Device connectivity",
          "Edge processing",
          "Store-and-forward capability",
          "Secure communication",
        ],
        benefits: [
          "Reduced communication costs",
          "Centralized data acquisition",
          "Seamless legacy device integration",
        ],
      },
      {
        title: "GIS-Based Network Management",
        description:
          "Digitize and manage the complete gas infrastructure on a geospatial platform for full network visualization and spatial analytics.",
        monitors: [
          "Steel & MDPE Pipeline Networks",
          "PNG Connections",
          "Valve Locations",
          "Regulating Stations",
          "CNG Stations",
          "Customer Locations",
        ],
        features: [
          "Interactive maps",
          "Asset search",
          "Layer management",
          "Route analysis",
          "Spatial analytics",
          "Network visualization",
        ],
        benefits: [
          "Better asset visibility",
          "Faster field response",
          "Improved maintenance planning",
        ],
      },
      {
        title: "CNG Station Monitoring",
        description:
          "Monitor complete station operations from a centralized command center — compressor status, running hours, motor current, and dispenser sales in real time.",
        monitors: [
          "Compressor Status",
          "Running Hours",
          "Motor Current",
          "Suction & Discharge Pressure",
          "Gas Flow",
          "Dispenser Sales",
          "Equipment Health",
        ],
        features: [
          "Faster issue detection",
          "Improved uptime",
          "Reduced maintenance cost",
          "Better station performance",
        ],
        benefits: [
          "Faster issue detection",
          "Improved uptime",
          "Reduced maintenance cost",
        ],
      },
      {
        title: "Cascade Management System",
        description:
          "Digitally manage mobile gas transportation operations with GPS tracking, live vehicle monitoring, and gas inventory tracking.",
        features: [
          "GPS Tracking",
          "Live Vehicle Monitoring",
          "Route Tracking",
          "Geofencing",
          "Trip Management",
          "Gas Inventory Tracking",
          "Delivery Verification",
        ],
        benefits: [
          "Improved fleet utilization",
          "Reduced transportation costs",
          "Better delivery planning",
          "Enhanced visibility",
        ],
      },
      {
        title: "Energy Management System",
        description:
          "Monitor and optimize energy consumption across all CGD facilities — compressors, chillers, air dryers, pumps, and auxiliary equipment.",
        monitors: [
          "Compressors",
          "Chillers",
          "Air Dryers",
          "Pumps",
          "Lighting Systems",
          "Auxiliary Equipment",
        ],
        features: [
          "Specific Energy Consumption analysis",
          "Cost analysis",
          "Peak demand monitoring",
          "Energy benchmarking",
          "Efficiency reports",
        ],
        benefits: [
          "Reduced energy costs",
          "Improved equipment efficiency",
          "Sustainability reporting",
        ],
      },
      {
        title: "Asset Management System",
        description:
          "Manage the complete lifecycle of infrastructure assets — from asset registry and maintenance scheduling to spare management and warranty tracking.",
        monitors: [
          "Compressors",
          "Dispensers",
          "Flow Meters",
          "PLCs",
          "RTUs",
          "Valves",
          "Pressure Regulators",
          "Electrical Equipment",
        ],
        features: [
          "Asset Registry",
          "Maintenance Scheduling",
          "Work Orders",
          "Spare Management",
          "Asset History",
          "Warranty Tracking",
        ],
        benefits: [
          "Increased asset reliability",
          "Reduced maintenance costs",
          "Extended asset lifespan",
        ],
      },
      {
        title: "CCTV & Video Analytics",
        description:
          "Enhance safety and security using intelligent video surveillance with AI-powered intrusion detection, ANPR, and safety compliance monitoring.",
        features: [
          "Station Surveillance",
          "Intrusion Detection",
          "ANPR",
          "Object Detection",
          "Unauthorized Access Alerts",
          "Safety Compliance Monitoring",
        ],
        benefits: [
          "Enhanced security",
          "Reduced operational risks",
          "Improved safety compliance",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Operational Efficiency",
        description:
          "Gain complete visibility across your CGD network and make informed decisions using real-time operational data.",
      },
      {
        title: "Increase Asset Availability",
        description:
          "Reduce downtime through proactive monitoring and predictive maintenance.",
      },
      {
        title: "Optimize Fleet Operations",
        description:
          "Improve cascade utilization and reduce transportation costs.",
      },
      {
        title: "Reduce Energy Consumption",
        description:
          "Monitor and optimize energy-intensive equipment across all stations.",
      },
      {
        title: "Enhance Safety",
        description:
          "Real-time alarms, surveillance systems, and operational monitoring improve overall network safety.",
      },
      {
        title: "Improve Regulatory Compliance",
        description:
          "Maintain complete operational records, audit trails, and compliance reports.",
      },
      {
        title: "Enable Data-Driven Decisions",
        description:
          "Leverage analytics and reporting to improve operational and business performance.",
      },
    ],
    whyAltrex: [
      "Strong domain expertise in CGD operations, station automation, and telemetry",
      "End-to-end solutions from field instrumentation to enterprise dashboards",
      "Open architecture supporting multi-vendor devices and standard protocols",
      "Scalable platform designed for thousands of assets, stations, and users",
      "Cloud-ready — deploy on-premise, cloud, or hybrid infrastructure",
      "Built-in support for AI, predictive analytics, and digital twins",
    ],
    cta: {
      heading: "Ready to Digitize Your CGD Operations?",
      description:
        "Whether you operate a regional gas network or a nationwide CGD infrastructure, Altrex Tech can help you achieve greater operational visibility, efficiency, safety, and scalability through our integrated digital transformation platform.",
    },
    architecture: {
      nodes: [
        { id: "b1", label: "Field Devices & Sensors", type: "source" },
        { id: "b2", label: "PLC / RTU / Edge Gateway", type: "layer" },
        { id: "b3", label: "Industrial IoT Platform", type: "layer" },
        { id: "b4", label: "Secure Communication Network", type: "layer" },
        { id: "b5", label: "Central Cloud Platform", type: "layer" },
        {
          id: "b6",
          label: "Platform Modules",
          type: "branch",
          children: ["SCADA", "GIS", "Analytics", "Mobile Applications"],
        },
        { id: "b7", label: "Operations Team / Management / Field Engineers", type: "output" },
      ],
    },
  },

  // ── 2. Oil & Gas ─────────────────────────────────────────────────────────
  {
    slug: "oil-gas",
    image: "/industries/oil-gas.jpg",
    name: "Oil & Gas",
    hero: {
      tagline: "Intelligent Monitoring & Asset Management",
      heading: "Digital Transformation Solutions for Oil & Gas Operations",
      description:
        "Altrex Tech provides comprehensive digital solutions for upstream, midstream, and downstream oil & gas operations. Our integrated platform combines Industrial IoT, SCADA, GIS, Asset Management, Smart Metering, Video Analytics, Fleet Tracking, and Advanced Analytics to help organizations improve operational efficiency, enhance safety, reduce downtime, and optimize asset performance.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "10,000+", label: "Connected Field Assets" },
      { value: "99.99%", label: "Inventory Data Availability" },
      { value: "24×7", label: "Operational Visibility" },
      { value: "< 2s", label: "Alert Response Time" },
    ],
    overview:
      "From oil and gas fields to pipelines, terminals, tank farms, depots, refineries, LNG facilities, and distribution networks, Altrex delivers real-time visibility across critical infrastructure. The Oil & Gas sector operates highly distributed and mission-critical infrastructure where operational visibility, safety, compliance, and reliability are paramount.",
    challenges: [
      {
        title: "Remote Asset Monitoring",
        items: [
          "Oil & Gas Wells",
          "Pipeline Networks",
          "Pumping & Compressor Stations",
          "LNG Facilities",
          "Tank Farms",
          "Fuel Terminals",
        ],
      },
      {
        title: "Operational Efficiency",
        items: [
          "Equipment downtime",
          "Unplanned maintenance",
          "Communication failures",
          "Manual data collection",
          "Limited field visibility",
        ],
      },
      {
        title: "Asset Integrity",
        items: [
          "Pipeline leak detection",
          "Corrosion monitoring",
          "Equipment health monitoring",
          "Asset lifecycle management",
        ],
      },
      {
        title: "Security & Compliance",
        items: [
          "Unauthorized access & asset theft",
          "Pipeline tampering",
          "Environmental reporting",
          "Safety compliance & audit trails",
        ],
      },
    ],
    modules: [
      {
        title: "Web SCADA & Real-Time Monitoring",
        description:
          "Monitor critical oil & gas infrastructure in real time from a centralized command center — pressure, flow, temperature, tank levels, pump and compressor status.",
        monitors: [
          "Pressure & Flow Rate",
          "Temperature & Tank Levels",
          "Pump & Compressor Status",
          "Valve Position",
          "Energy Consumption",
          "Pipeline Conditions",
        ],
        features: [
          "Real-Time Dashboards",
          "Historical Trending",
          "Alarm Management",
          "Event Logging",
          "KPI Monitoring",
          "Remote Operations",
          "Mobile Access",
        ],
        benefits: [
          "Faster response to operational issues",
          "Reduced downtime",
          "Improved operational visibility",
        ],
      },
      {
        title: "Industrial IoT & Edge Integration",
        description:
          "Connect field devices and remote assets using secure industrial communication technologies including Modbus, OPC UA, MQTT, DNP3, and IEC protocols.",
        features: [
          "Unified data acquisition",
          "Edge analytics",
          "Secure remote monitoring",
          "Reduced communication costs",
        ],
        benefits: [
          "Centralized data from remote wells and stations",
          "Store-and-forward for unreliable connectivity",
          "Reduced site visit frequency",
        ],
      },
      {
        title: "Pipeline Monitoring & Leak Detection",
        description:
          "Monitor pipeline infrastructure continuously to improve safety and operational reliability — flow, pressure, temperature, valve operations, and leak indicators.",
        monitors: [
          "Flow & Pressure",
          "Temperature",
          "Valve Operations",
          "Leak Indicators",
          "Cathodic Protection Systems",
        ],
        features: [
          "Real-Time Alerts",
          "Leak Detection Analytics",
          "Pipeline GIS Visualization",
          "Historical Event Analysis",
          "Remote Valve Monitoring",
        ],
        benefits: [
          "Improved safety",
          "Reduced product losses",
          "Faster incident response",
        ],
      },
      {
        title: "GIS-Based Asset Management",
        description:
          "Digitize and manage the complete oil & gas infrastructure using an integrated GIS platform for interactive mapping, route analysis, and maintenance planning.",
        monitors: [
          "Pipelines & Valve Stations",
          "Pumping & Compressor Stations",
          "Tank Farms & LNG Facilities",
          "Fuel Depots & Customer Connections",
        ],
        features: [
          "Interactive Maps",
          "Asset Search",
          "Route Analysis",
          "Maintenance Planning",
          "Risk Assessment",
          "Network Visualization",
        ],
        benefits: [
          "Improved asset visibility",
          "Better maintenance planning",
          "Faster field operations",
        ],
      },
      {
        title: "Tank Farm Management System",
        description:
          "Monitor and manage fuel storage facilities in real time — tank levels, product inventory, temperature, transfer operations, and pump performance.",
        monitors: [
          "Tank Levels & Product Inventory",
          "Temperature & Pressure",
          "Transfer Operations",
          "Pump Performance",
        ],
        features: [
          "Inventory Dashboards",
          "Product Movement Tracking",
          "Loss Monitoring",
          "Alarm Management",
          "Reporting & Analytics",
        ],
        benefits: [
          "Inventory accuracy",
          "Reduced losses",
          "Improved operational control",
        ],
      },
      {
        title: "Smart Metering & AMR",
        description:
          "Collect and analyze consumption and flow data automatically from custody transfer metering, gas metering stations, and LNG dispensing stations.",
        monitors: [
          "Custody Transfer Metering",
          "Gas Metering Stations",
          "Flow Meters & LNG Dispensing",
          "Industrial Consumer Meters",
        ],
        features: [
          "Remote Meter Reading",
          "Totalizer Monitoring",
          "Consumption Analytics",
          "Billing System Integration",
          "Tamper Detection",
        ],
        benefits: [
          "Improved billing accuracy",
          "Reduced manual intervention",
          "Faster reconciliation",
        ],
      },
      {
        title: "Fleet Management & Fuel Logistics",
        description:
          "Track and optimize transportation of tanker vehicles, LNG transport vehicles, and fuel distribution fleets with GPS tracking and route optimization.",
        monitors: [
          "Tanker & LNG Transport Vehicles",
          "Fuel Distribution Fleet",
          "Service Vehicles",
        ],
        features: [
          "GPS Tracking",
          "Route Optimization",
          "Geofencing",
          "Driver Monitoring",
          "Trip Management",
          "Fuel Consumption Analysis",
        ],
        benefits: [
          "Reduced logistics costs",
          "Improved delivery efficiency",
          "Enhanced fleet utilization",
        ],
      },
      {
        title: "Asset Performance Management",
        description:
          "Manage the complete lifecycle of oil & gas assets — pumps, compressors, valves, flow meters, storage tanks, PLCs, and RTUs.",
        monitors: [
          "Pumps & Compressors",
          "Valves & Flow Meters",
          "Storage Tanks & Motors",
          "PLCs & RTUs",
        ],
        features: [
          "Asset Registry",
          "Maintenance Planning",
          "Work Orders",
          "Asset Health Monitoring",
          "Spare Parts Management",
          "Warranty Tracking",
        ],
        benefits: [
          "Increased asset reliability",
          "Reduced maintenance costs",
          "Improved equipment availability",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Operational Visibility",
        description:
          "Monitor all assets and operations from a centralized platform across upstream, midstream, and downstream.",
      },
      {
        title: "Increase Asset Reliability",
        description:
          "Reduce downtime through proactive monitoring and maintenance.",
      },
      {
        title: "Enhance Safety & Security",
        description:
          "Protect critical infrastructure using intelligent monitoring systems.",
      },
      {
        title: "Reduce Operational Costs",
        description:
          "Optimize energy usage, maintenance activities, and logistics operations.",
      },
      {
        title: "Improve Compliance",
        description:
          "Maintain complete operational records and audit trails for regulatory requirements.",
      },
      {
        title: "Enable Data-Driven Decisions",
        description:
          "Leverage real-time analytics and reporting for better business outcomes.",
      },
    ],
    whyAltrex: [
      "End-to-end digital solutions from field instrumentation to enterprise dashboards",
      "Open architecture compatible with multi-vendor devices and industry-standard protocols",
      "Scalable platform for small facilities to nationwide infrastructure deployments",
      "Cloud & on-premise deployment for operational and security flexibility",
      "Future-ready technology supporting AI, predictive maintenance, and digital twins",
    ],
    cta: {
      heading: "Transform Your Oil & Gas Operations",
      description:
        "Altrex Tech helps oil & gas organizations modernize operations through intelligent monitoring, automation, asset management, and analytics solutions that improve efficiency, safety, reliability, and profitability.",
    },
  },

  // ── 3. Water & Wastewater ─────────────────────────────────────────────────
  {
    slug: "water-wastewater",
    image: "/industries/water-wastewater.jpg",
    name: "Water & Wastewater",
    hero: {
      tagline: "Smart Water Management & Automation",
      heading:
        "Smart Water Management, Monitoring & Automation for Sustainable Utility Operations",
      description:
        "Altrex Tech delivers end-to-end digital transformation solutions for water utilities, municipal corporations, industrial water systems, irrigation networks, and wastewater treatment facilities. Our integrated platform combines SCADA, Industrial IoT, GIS, Smart Metering (AMR/AMI), Asset Management, Analytics, and Mobile Applications to provide complete visibility and control over water infrastructure.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "30%", label: "Avg. NRW Reduction" },
      { value: "99.9%", label: "Platform Availability" },
      { value: "24×7", label: "Real-Time Monitoring" },
      { value: "< 1min", label: "Leak Alert Response" },
    ],
    overview:
      "From water sourcing and treatment to distribution and wastewater management, our solutions help organizations reduce water losses, improve operational efficiency, optimize energy consumption, and ensure regulatory compliance. Water utilities face increasing pressure to deliver reliable services while managing aging infrastructure, rising demand, and operational costs.",
    challenges: [
      {
        title: "Water Distribution Challenges",
        items: [
          "Non-Revenue Water (NRW)",
          "Water Leakages & Pipeline Bursts",
          "Pressure Imbalances",
          "Unauthorized Connections",
          "Manual Monitoring Processes",
        ],
      },
      {
        title: "Infrastructure Visibility",
        items: [
          "Water Treatment Plants (WTP)",
          "Sewage Treatment Plants (STP)",
          "Pumping Stations & Reservoirs",
          "Elevated Service Reservoirs (ESR)",
          "Pipelines & Consumer Connections",
        ],
      },
      {
        title: "Operational Challenges",
        items: [
          "Energy-intensive pumping operations",
          "Equipment failures & delayed fault detection",
          "Inefficient maintenance planning",
          "Limited field visibility",
        ],
      },
      {
        title: "Regulatory & Environmental",
        items: [
          "Water Quality Monitoring",
          "Wastewater Discharge Monitoring",
          "Environmental Reporting",
          "Audit Trail Requirements",
        ],
      },
    ],
    modules: [
      {
        title: "Web SCADA & Real-Time Monitoring",
        description:
          "Monitor the complete water and wastewater infrastructure from a centralized control center — flow, pressure, reservoir levels, water quality, and treatment process parameters.",
        monitors: [
          "Flow Rate & Pressure",
          "Reservoir Levels",
          "Pump Status & Water Quality",
          "Inlet/Outlet Flow (STP)",
          "Blower Performance",
          "Chemical Dosing Systems",
        ],
        features: [
          "Real-Time Dashboards",
          "Process Visualization",
          "Historical Trending",
          "Alarm Management",
          "Event Logging",
          "Mobile Access",
        ],
        benefits: [
          "Improved operational visibility",
          "Faster issue resolution",
          "Reduced downtime",
        ],
      },
      {
        title: "Smart Water Metering (AMR/AMI)",
        description:
          "Automate water consumption monitoring for residential, commercial, and industrial consumers — with tamper detection, leak detection, and consumer portal integration.",
        monitors: [
          "Residential Connections",
          "Apartment & Housing Complexes",
          "Commercial & Industrial Consumers",
        ],
        features: [
          "Automated Meter Reading (AMR)",
          "Advanced Metering Infrastructure (AMI)",
          "Remote Meter Monitoring",
          "Consumption Analytics",
          "Tamper & Leak Detection",
          "Consumer Portal",
        ],
        benefits: [
          "Reduced Non-Revenue Water",
          "Improved billing accuracy",
          "Reduced operational costs",
        ],
      },
      {
        title: "Industrial IoT & Remote Telemetry",
        description:
          "Connect remote infrastructure — reservoirs, pumping stations, borewells, canal systems — using LoRaWAN, NB-IoT, MQTT, and standard industrial protocols.",
        monitors: [
          "Remote Reservoirs & Boreholes",
          "Pumping Stations",
          "Canal & Lift Irrigation Systems",
          "Remote Treatment Facilities",
        ],
        features: [
          "Reduced manual inspections",
          "Improved data accuracy",
          "Real-time remote monitoring",
        ],
        benefits: [
          "Fewer site visits",
          "Lower operational cost",
          "Improved data completeness",
        ],
      },
      {
        title: "Leak Detection & NRW Management",
        description:
          "Reduce water losses through intelligent monitoring of district metering areas, pressure anomalies, and water balance analysis to pinpoint leaks and unauthorized connections.",
        monitors: [
          "Pipeline Leaks & Burst Detection",
          "Unauthorized Connections",
          "Excessive Consumption",
          "Pressure Anomalies",
        ],
        features: [
          "Real-Time Alerts",
          "DMA Monitoring",
          "Water Balance Analysis",
          "Leak Localization Support",
        ],
        benefits: [
          "Reduced water losses",
          "Improved resource utilization",
          "Increased revenue recovery",
        ],
      },
      {
        title: "GIS-Based Utility Asset Management",
        description:
          "Digitize and manage the complete water infrastructure on interactive maps — pipelines, valves, treatment plants, pumping stations, and consumer connections.",
        monitors: [
          "Pipelines & Valves",
          "Water Treatment Plants",
          "Pumping Stations & Reservoirs",
          "Consumer Connections & Smart Meters",
        ],
        features: [
          "Asset Search",
          "Utility Mapping",
          "Route Analysis",
          "Maintenance Planning",
          "Network Visualization",
        ],
        benefits: [
          "Better asset visibility",
          "Faster field response",
          "Improved planning",
        ],
      },
      {
        title: "Water Treatment Plant Automation",
        description:
          "Monitor and optimize water treatment operations — raw water intake, clarifiers, filters, chemical dosing, and pumping systems.",
        monitors: [
          "Raw Water Intake",
          "Clarifiers & Filters",
          "Chemical Dosing",
          "Pumps & Reservoir Levels",
        ],
        features: [
          "Process Automation",
          "Quality Monitoring",
          "Alarm Management",
          "Historical Reporting",
        ],
        benefits: [
          "Improved treatment efficiency",
          "Better water quality compliance",
          "Reduced operating costs",
        ],
      },
      {
        title: "Energy Management System",
        description:
          "Pumping operations account for a significant share of utility operating expenses. Monitor and optimize energy consumption across pumps, motors, blowers, and treatment equipment.",
        monitors: [
          "Pumps & Motors",
          "Blowers & Compressors",
          "Treatment Equipment",
        ],
        features: [
          "Energy Dashboards",
          "Demand Monitoring",
          "Equipment Efficiency Analysis",
          "Cost Analytics",
        ],
        benefits: [
          "Lower electricity costs",
          "Improved energy efficiency",
          "Reduced carbon footprint",
        ],
      },
      {
        title: "Mobile Workforce Management",
        description:
          "Empower field teams with real-time information — asset inspections, meter installations, leak reporting, maintenance activities, and GIS navigation.",
        features: [
          "Asset Inspection",
          "Meter Installation",
          "Leak Reporting",
          "Maintenance Activities",
          "GIS Navigation",
          "Work Order Management",
        ],
        benefits: [
          "Faster field operations",
          "Improved productivity",
          "Better service delivery",
        ],
      },
    ],
    benefits: [
      {
        title: "Reduce Non-Revenue Water (NRW)",
        description:
          "Identify leaks and unauthorized consumption before they impact revenue.",
      },
      {
        title: "Improve Service Reliability",
        description:
          "Monitor infrastructure continuously and respond faster to operational issues.",
      },
      {
        title: "Optimize Energy Consumption",
        description:
          "Reduce pumping and treatment costs through energy analytics.",
      },
      {
        title: "Improve Billing Efficiency",
        description:
          "Automate consumption data collection through smart metering.",
      },
      {
        title: "Enhance Asset Utilization",
        description: "Improve maintenance planning and asset performance.",
      },
      {
        title: "Strengthen Regulatory Compliance",
        description: "Maintain complete operational records and audit trails.",
      },
      {
        title: "Enable Smart Water Operations",
        description:
          "Build a scalable digital foundation for future smart city initiatives.",
      },
    ],
    whyAltrex: [
      "End-to-end water utility solutions from field instrumentation to enterprise dashboards",
      "Open & vendor-neutral architecture supporting multi-vendor meters, PLCs, RTUs, and sensors",
      "GIS-enabled utility management combining operational data with geospatial intelligence",
      "Scalable & secure platform for municipalities, utilities, and smart city projects",
      "Cloud, on-premise & hybrid deployment models to meet security requirements",
    ],
    cta: {
      heading: "Build the Future of Smart Water Management",
      description:
        "Whether you manage a municipal water network, industrial water system, irrigation infrastructure, or wastewater treatment facility, Altrex Tech provides the technology foundation for efficient, sustainable, and data-driven utility operations.",
    },
  },

  // ── 4. Power & Utilities ─────────────────────────────────────────────────
  {
    slug: "power-utilities",
    image: "/industries/power-utilities.jpg",
    name: "Power & Utilities",
    hero: {
      tagline: "Intelligent Monitoring & Smart Grid Solutions",
      heading:
        "Intelligent Monitoring, Energy Management & Smart Grid Solutions",
      description:
        "Altrex Tech provides comprehensive digital transformation solutions for power generation, transmission, distribution, renewable energy, and utility infrastructure. Our integrated platform combines SCADA, Industrial IoT, GIS, Smart Metering (AMR/AMI), Energy Management, Asset Management, Video Analytics, and Advanced Analytics to help utilities improve reliability, operational efficiency, and customer service.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "99.9%", label: "Grid Reliability Target" },
      { value: "< 5min", label: "Fault Detection Time" },
      { value: "24×7", label: "Network Monitoring" },
      { value: "100%", label: "AMR Billing Accuracy" },
    ],
    overview:
      "From substations and distribution networks to renewable energy plants and smart cities, Altrex enables utilities to achieve real-time visibility, faster decision-making, and smarter operations. Power utilities operate highly distributed and critical infrastructure where reliability, efficiency, and safety are essential.",
    challenges: [
      {
        title: "Grid Visibility",
        items: [
          "Distributed assets across large geographic areas",
          "Limited visibility of field equipment",
          "Delayed fault identification",
          "Manual monitoring processes",
          "Lack of centralized operational data",
        ],
      },
      {
        title: "Operational Challenges",
        items: [
          "Equipment failures & power outages",
          "Network losses & energy theft",
          "High maintenance costs",
          "Peak demand management",
        ],
      },
      {
        title: "Asset Management",
        items: [
          "Substations, Transformers & Feeders",
          "Switchgear, RMUs & Circuit Breakers",
          "Solar Plants & Wind Turbines",
          "Energy Meters across consumer base",
        ],
      },
      {
        title: "Regulatory Requirements",
        items: [
          "Power quality reporting",
          "Energy accounting",
          "Grid performance monitoring",
          "Asset maintenance compliance",
          "Consumer billing accuracy",
        ],
      },
    ],
    modules: [
      {
        title: "Web SCADA & Real-Time Grid Monitoring",
        description:
          "Monitor utility operations from a centralized command center — feeder status, transformer health, voltage and current levels, power factor, and frequency.",
        monitors: [
          "Feeder Status & Transformer Health",
          "Breaker Status & Voltage Levels",
          "Power Factor & Frequency",
          "Solar Inverters & Wind Turbine Performance",
          "Battery Energy Storage Systems (BESS)",
        ],
        features: [
          "Real-Time Dashboards",
          "Single Line Diagrams (SLD)",
          "Alarm Management",
          "Event Logging",
          "Historical Trending",
          "Remote Monitoring",
        ],
        benefits: [
          "Faster fault detection",
          "Improved network visibility",
          "Reduced downtime",
        ],
      },
      {
        title: "Smart Metering (AMR / AMI)",
        description:
          "Enable intelligent energy metering and automated data collection for residential, commercial, and industrial consumers — with tamper detection and billing integration.",
        monitors: [
          "Residential Smart Meters",
          "Commercial & Industrial Meters",
          "Net Metering Support",
        ],
        features: [
          "Automated Meter Reading (AMR)",
          "Advanced Metering Infrastructure (AMI)",
          "Consumption Analytics",
          "Demand Monitoring",
          "Tamper Detection",
          "Billing Integration",
        ],
        benefits: [
          "Accurate billing",
          "Energy theft detection",
          "Improved revenue assurance",
        ],
      },
      {
        title: "Energy Management System (EMS)",
        description:
          "Optimize energy consumption — monitor energy consumption, peak demand, load profiles, power quality, renewable generation, and energy efficiency KPIs.",
        monitors: [
          "Energy Consumption & Peak Demand",
          "Load Profiles & Power Quality",
          "Renewable Generation",
          "Energy Efficiency KPIs",
        ],
        features: [
          "Real-Time Energy Dashboards",
          "Demand Analysis",
          "Peak Load Management",
          "Energy Benchmarking",
          "Carbon Footprint Reporting",
        ],
        benefits: [
          "Reduced energy costs",
          "Improved operational efficiency",
          "Sustainability improvements",
        ],
      },
      {
        title: "Smart Grid Monitoring",
        description:
          "Digitally monitor and optimize modern utility networks — feeders, distribution transformers, RMUs, switchgear, and reclosers.",
        monitors: [
          "Feeders & Distribution Transformers",
          "Ring Main Units (RMUs)",
          "Switchgear & Reclosers",
        ],
        features: [
          "Fault Detection",
          "Network Analytics",
          "Load Balancing",
          "Power Flow Visualization",
          "Grid Performance Monitoring",
        ],
        benefits: [
          "Improved grid reliability",
          "Reduced outage duration",
          "Better asset utilization",
        ],
      },
      {
        title: "Renewable Energy Monitoring",
        description:
          "Monitor solar plants, wind energy assets, and battery energy storage systems from a centralized platform for maximum generation efficiency.",
        monitors: [
          "Solar Inverters & Strings",
          "Energy Generation & Irradiance",
          "Wind Turbine Performance",
          "BESS — SOC, SOH & Battery Health",
        ],
        features: [
          "Increased generation efficiency",
          "Improved asset availability",
          "Better ROI on renewable assets",
        ],
        benefits: [
          "Increased generation efficiency",
          "Improved asset availability",
          "Better return on renewable investment",
        ],
      },
      {
        title: "GIS-Based Utility Asset Management",
        description:
          "Digitize utility infrastructure on an interactive geospatial platform — substations, feeders, transformers, RMUs, consumer connections, and smart meters.",
        monitors: [
          "Substations & Feeders",
          "Transformers & RMUs",
          "Consumer Connections & Smart Meters",
          "Renewable Energy Assets",
        ],
        features: [
          "Asset Mapping",
          "Network Visualization",
          "Fault Localization",
          "Maintenance Planning",
          "Route Analysis",
        ],
        benefits: [
          "Better asset visibility",
          "Faster field response",
          "Improved maintenance planning",
        ],
      },
      {
        title: "Outage Management System (OMS)",
        description:
          "Improve outage response and restoration processes with real-time fault tracking, crew dispatching, consumer notifications, and incident reporting.",
        features: [
          "Outage Detection",
          "Fault Tracking",
          "Restoration Management",
          "Crew Dispatching",
          "Consumer Notifications",
          "Incident Reporting",
        ],
        benefits: [
          "Reduced outage duration",
          "Improved customer satisfaction",
          "Faster fault resolution",
        ],
      },
      {
        title: "Asset Performance Management",
        description:
          "Manage the complete lifecycle of utility assets — transformers, breakers, switchgear, meters, solar inverters, wind turbines, and batteries.",
        monitors: [
          "Transformers & Breakers",
          "Switchgear & RMUs",
          "Solar Inverters & Wind Turbines",
          "Batteries & Meters",
        ],
        features: [
          "Asset Registry",
          "Preventive Maintenance",
          "Work Orders",
          "Asset Health Monitoring",
          "Failure Analysis",
          "Spare Management",
        ],
        benefits: [
          "Improved reliability",
          "Reduced maintenance costs",
          "Extended asset life",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Grid Reliability",
        description:
          "Monitor and manage infrastructure proactively to reduce outages.",
      },
      {
        title: "Optimize Energy Usage",
        description:
          "Gain complete visibility into consumption and generation patterns.",
      },
      {
        title: "Improve Revenue Assurance",
        description: "Detect theft, tampering, and billing discrepancies.",
      },
      {
        title: "Enhance Asset Utilization",
        description: "Improve maintenance planning and asset performance.",
      },
      {
        title: "Support Renewable Integration",
        description: "Monitor and manage renewable energy assets efficiently.",
      },
      {
        title: "Improve Regulatory Compliance",
        description: "Maintain accurate operational records and reporting.",
      },
      {
        title: "Enable Smart Utility Operations",
        description:
          "Build a digital foundation for smart grids and future utility initiatives.",
      },
    ],
    whyAltrex: [
      "End-to-end utility solutions from field devices and telemetry to enterprise dashboards",
      "Open & vendor-neutral architecture supporting existing utility infrastructure",
      "Unified GIS + SCADA + AMI platform combining visibility, asset management, and metering",
      "Scalable deployment for city-level utilities to state-wide infrastructure",
      "Cloud, on-premise & hybrid support with flexible security configurations",
    ],
    cta: {
      heading: "Powering the Future of Smart Utilities",
      description:
        "Whether you operate a distribution utility, renewable energy facility, industrial power network, or smart city infrastructure, Altrex Tech provides the technology platform to build a reliable, efficient, and future-ready utility ecosystem.",
    },
  },

  // ── 5. Renewable Energy ──────────────────────────────────────────────────
  {
    slug: "renewable-energy",
    image: "/industries/renewable-energy.jpg",
    name: "Renewable Energy",
    hero: {
      tagline: "Intelligent Monitoring & Analytics for Renewables",
      heading:
        "Intelligent Monitoring, Asset Management & Analytics for Renewable Energy Operations",
      description:
        "Altrex Tech provides advanced digital solutions for solar, wind, hybrid renewable energy plants, battery energy storage systems (BESS), and distributed energy assets. Our integrated platform combines SCADA, Industrial IoT, GIS, Energy Management, Asset Management, Smart Metering, Video Analytics, and AI-driven analytics to maximize energy generation and optimize operational efficiency.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "15%+", label: "Avg. Generation Improvement" },
      { value: "99.9%", label: "Plant Data Availability" },
      { value: "< 100ms", label: "AGC Dispatch Cycle" },
      { value: "24×7", label: "Remote Visibility" },
    ],
    overview:
      "As renewable energy portfolios continue to expand, operators require real-time visibility, predictive insights, and centralized management across geographically distributed assets. Altrex Tech enables renewable energy companies, IPPs, utilities, and industrial energy consumers to operate smarter, safer, and more efficiently.",
    challenges: [
      {
        title: "Operational Challenges",
        items: [
          "Multiple geographically dispersed sites",
          "Limited visibility into asset performance",
          "Generation losses due to equipment failures",
          "Delayed fault detection",
          "Manual reporting processes",
        ],
      },
      {
        title: "Asset Performance Challenges",
        items: [
          "Solar inverter failures",
          "String-level performance degradation",
          "Wind turbine faults",
          "Battery performance issues",
          "Communication failures",
        ],
      },
      {
        title: "Energy Management",
        items: [
          "Grid synchronization",
          "Peak demand management",
          "Renewable generation forecasting",
          "Energy storage optimization",
        ],
      },
      {
        title: "Maintenance Challenges",
        items: [
          "Remote site management",
          "Preventive maintenance planning",
          "Spare parts management",
          "Field workforce coordination",
        ],
      },
    ],
    modules: [
      {
        title: "Renewable Energy SCADA Platform",
        description:
          "Monitor solar plants, wind energy plants, and BESS in real time — inverter status, string performance, turbine health, state of charge, and energy generation.",
        monitors: [
          "Solar Inverter Status & String Performance",
          "AC/DC Parameters, Irradiance, Module Temperature",
          "Wind Turbine Speed, Rotor, Gearbox & Generator",
          "BESS — SOC, SOH, Temperature, Charge Cycles",
        ],
        features: [
          "Real-Time Dashboards",
          "Multi-Site Monitoring",
          "Historical Trending",
          "Alarm Management",
          "Mobile Access",
          "Performance Analytics",
        ],
        benefits: [
          "Centralized visibility across all renewable assets",
          "Faster fault detection",
          "Reduced generation losses",
        ],
      },
      {
        title: "Solar Plant Monitoring System",
        description:
          "Optimize solar generation with string-level monitoring, inverter analytics, performance ratio analysis, and energy forecasting.",
        monitors: [
          "Daily, Monthly & Annual Generation",
          "Specific Yield & Plant Load Factor (PLF)",
          "Inverter Efficiency & String Performance",
          "Panel Health & Energy Loss Analysis",
        ],
        features: [
          "String-Level Monitoring",
          "Inverter Analytics",
          "Performance Ratio (PR) Analysis",
          "Energy Forecasting",
          "Generation Reporting",
        ],
        benefits: [
          "Increased generation efficiency",
          "Faster fault detection",
          "Reduced generation losses",
        ],
      },
      {
        title: "Wind Farm Monitoring System",
        description:
          "Monitor and optimize wind turbine performance — availability, wind speed/direction, power curves, turbine health, and mechanical parameters.",
        monitors: [
          "Turbine Availability & Wind Speed",
          "Wind Direction & Rotor Speed",
          "Power Curves & Gearbox Health",
          "Generator Performance",
        ],
        features: [
          "Turbine Performance Analytics",
          "Predictive Maintenance Support",
          "Fault Diagnostics",
          "Energy Production Reporting",
        ],
        benefits: [
          "Improved turbine availability",
          "Reduced maintenance costs",
          "Higher energy generation",
        ],
      },
      {
        title: "BESS Monitoring & Optimization",
        description:
          "Manage and optimize energy storage assets — battery capacity, charge/discharge cycles, state of charge/health, and cell-level parameters.",
        monitors: [
          "Battery Capacity & Charging Cycles",
          "State of Charge (SOC) & State of Health (SOH)",
          "Battery Temperature & Fault Conditions",
          "Cell-Level Parameters",
        ],
        features: [
          "Charge/Discharge Monitoring",
          "Energy Arbitrage Analytics",
          "Fault Detection",
          "Performance Reporting",
        ],
        benefits: [
          "Extended battery life",
          "Improved energy utilization",
          "Better storage performance",
        ],
      },
      {
        title: "Energy Management System (EMS)",
        description:
          "Optimize energy generation, storage, and consumption — solar/wind/hybrid analytics, peak demand analysis, load profiling, and energy dispatch planning.",
        monitors: [
          "Solar & Wind Generation",
          "Hybrid Plant Analytics",
          "Energy Consumption & Peak Demand",
          "Battery Utilization & Dispatch",
        ],
        features: [
          "Generation Analytics",
          "Consumption Analytics",
          "Storage Optimization",
          "Grid Integration Support",
        ],
        benefits: [
          "Improved energy efficiency",
          "Better grid integration",
          "Increased ROI",
        ],
      },
      {
        title: "Predictive Maintenance & Analytics",
        description:
          "Use operational data to identify potential failures before they occur — inverter health, turbine performance, battery degradation, and equipment failure prediction.",
        monitors: [
          "Inverter Health Analysis",
          "Turbine Performance Analysis",
          "Battery Degradation Monitoring",
          "Equipment Failure Prediction",
        ],
        features: [
          "Condition-Based Monitoring",
          "Failure Mode Analysis",
          "Maintenance Recommendations",
          "Equipment Health Scoring",
        ],
        benefits: [
          "Reduced downtime",
          "Lower maintenance costs",
          "Improved asset availability",
        ],
      },
      {
        title: "GIS-Based Renewable Asset Management",
        description:
          "Visualize and manage solar, wind, and storage assets geographically — from solar parks and combiner boxes to wind turbines and substations.",
        monitors: [
          "Solar Plants, Inverters & Combiner Boxes",
          "Wind Turbines & Substations",
          "Battery Systems & Control Centers",
        ],
        features: [
          "Asset Mapping",
          "Site Visualization",
          "Maintenance Planning",
          "Route Analysis",
          "Field Navigation",
        ],
        benefits: [
          "Faster asset identification",
          "Improved maintenance planning",
          "Better site management",
        ],
      },
      {
        title: "Smart Metering & Energy Accounting",
        description:
          "Automate energy measurement for renewable energy export metering, grid import/export monitoring, net metering, and captive power monitoring.",
        monitors: [
          "Renewable Energy Export Metering",
          "Grid Import/Export Monitoring",
          "Net Metering & Captive Power",
        ],
        features: [
          "Automated Meter Reading (AMR)",
          "Energy Accounting",
          "Export/Import Analytics",
          "Billing Integration",
        ],
        benefits: [
          "Accurate energy accounting",
          "Simplified regulatory reporting",
          "Better financial visibility",
        ],
      },
    ],
    benefits: [
      {
        title: "Maximize Energy Generation",
        description:
          "Improve plant performance through continuous monitoring and analytics.",
      },
      {
        title: "Increase Asset Availability",
        description:
          "Reduce downtime through proactive maintenance and real-time visibility.",
      },
      {
        title: "Improve Operational Efficiency",
        description:
          "Manage multiple renewable energy sites from a centralized platform.",
      },
      {
        title: "Optimize Energy Storage",
        description: "Enhance battery utilization and dispatch strategies.",
      },
      {
        title: "Improve Financial Performance",
        description:
          "Reduce operational costs and maximize return on investment.",
      },
      {
        title: "Enhance Security & Compliance",
        description:
          "Protect critical infrastructure and maintain regulatory compliance.",
      },
      {
        title: "Enable Data-Driven Decisions",
        description:
          "Leverage analytics to improve operational and business outcomes.",
      },
    ],
    whyAltrex: [
      "Proven domain expertise in solar, wind, hybrid, and energy storage monitoring",
      "Unified platform integrating SCADA, IoT, GIS, Energy Management, and Analytics",
      "Open & vendor-neutral architecture compatible with leading inverter and turbine OEMs",
      "Scalable from rooftop solar to utility-scale parks and wind farms",
      "Cloud, on-premise & hybrid deployment options based on operational requirements",
    ],
    cta: {
      heading: "Accelerate Your Renewable Energy Digital Journey",
      description:
        "Whether you manage a solar park, wind farm, hybrid energy project, or battery storage system, Altrex Tech provides the digital platform needed to operate efficiently, maximize generation, and scale confidently.",
    },
  },

  // ── 6. Manufacturing & Industrial Automation ──────────────────────────────
  {
    slug: "manufacturing-automation",
    image: "/industries/manufacturing-automation.jpg",
    name: "Manufacturing & Industrial Automation",
    hero: {
      tagline: "Industry 4.0 & Smart Factory Solutions",
      heading:
        "Industry 4.0, Smart Factory & Industrial Digital Transformation Platform",
      description:
        "Altrex Tech helps manufacturers transform traditional production facilities into connected, data-driven, and intelligent operations through Industrial IoT, SCADA, MES Integration, Energy Management, Asset Performance Management, GIS, Video Analytics, and Advanced Analytics. Our platform enables real-time monitoring of machines, production lines, utilities, and plant operations.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "85%+", label: "Average OEE Achieved" },
      { value: "20%", label: "Downtime Reduction" },
      { value: "15%", label: "Energy Cost Savings" },
      { value: "< 1s", label: "Machine Data Latency" },
    ],
    overview:
      "Whether you operate a process industry, discrete manufacturing facility, automotive plant, food processing unit, pharmaceutical factory, textile mill, steel plant, cement plant, or chemical facility, Altrex Tech provides the technology foundation for Industry 4.0 transformation. Manufacturers face increasing pressure to improve efficiency, reduce costs, ensure product quality, and maximize equipment availability.",
    challenges: [
      {
        title: "Production Challenges",
        items: [
          "Unplanned machine downtime",
          "Limited production visibility",
          "Production losses",
          "Manual data collection",
          "Inefficient resource utilization",
        ],
      },
      {
        title: "Maintenance Challenges",
        items: [
          "Reactive maintenance practices",
          "Unexpected equipment failures",
          "Poor asset visibility",
          "High maintenance costs",
        ],
      },
      {
        title: "Utility Management",
        items: [
          "High electricity consumption",
          "Excessive water usage",
          "Compressed air losses",
          "Steam inefficiencies",
          "Fuel consumption monitoring",
        ],
      },
      {
        title: "Quality & Management",
        items: [
          "Product rejection & process deviations",
          "Lack of real-time quality visibility",
          "Multiple disconnected systems",
          "Delayed reporting & limited operational KPIs",
        ],
      },
    ],
    modules: [
      {
        title: "Industrial SCADA & Real-Time Monitoring",
        description:
          "Monitor production processes and industrial assets from a centralized dashboard — CNC machines, packaging lines, assembly conveyors, boilers, compressors, and utility systems.",
        monitors: [
          "CNC Machines & Packaging Lines",
          "Assembly Lines & Conveyors",
          "Compressors, Boilers & Chillers",
          "DG Sets, Water & HVAC Systems",
          "Temperature, Pressure, Flow & Level",
        ],
        features: [
          "Real-Time Dashboards",
          "Process Visualization",
          "Historical Trending",
          "Alarm Management",
          "KPI Monitoring",
          "Mobile Access",
        ],
        benefits: [
          "Improved operational visibility",
          "Faster decision making",
          "Reduced downtime",
        ],
      },
      {
        title: "OEE Monitoring",
        description:
          "Measure manufacturing performance using industry-standard KPIs — Availability (downtime), Performance (cycle time), and Quality (yield) — to identify and eliminate production losses.",
        monitors: [
          "Availability — Downtime & Breakdowns",
          "Performance — Production Speed & Cycle Time",
          "Quality — Rejection, Rework & Yield",
        ],
        features: [
          "Identify production losses",
          "Improve machine utilization",
          "Increase manufacturing efficiency",
        ],
        benefits: [
          "Clear view of production losses by category",
          "Benchmark against world-class OEE",
          "Targeted improvement actions",
        ],
      },
      {
        title: "Production Monitoring System",
        description:
          "Track production performance in real time — output, shift production, machine utilization, targets, cycle times, and line efficiency.",
        monitors: [
          "Production Output & Shift Performance",
          "Machine Utilization & Cycle Times",
          "Production Targets & Line Efficiency",
        ],
        features: [
          "Real-Time Production Dashboard",
          "Shift Reports",
          "Production Analytics",
          "Downtime Tracking",
          "Production Loss Analysis",
        ],
        benefits: [
          "Increased productivity",
          "Better production planning",
          "Improved operational control",
        ],
      },
      {
        title: "Predictive Maintenance",
        description:
          "Move from reactive to proactive maintenance by monitoring vibration, temperature, motor current, and bearing health to predict failures before they occur.",
        monitors: [
          "Vibration & Temperature",
          "Motor Current & Bearing Health",
          "Equipment Runtime",
        ],
        features: [
          "Failure Prediction",
          "Equipment Health Scoring",
          "Maintenance Recommendations",
          "Condition-Based Monitoring",
        ],
        benefits: [
          "Reduced breakdowns",
          "Improved uptime",
          "Lower maintenance expenses",
        ],
      },
      {
        title: "Energy Management System (EMS)",
        description:
          "Reduce energy costs and improve sustainability — monitor electricity, compressed air, water, steam, and fuel consumption across the plant.",
        monitors: [
          "Electricity Consumption & Power Quality",
          "Peak Demand & Compressed Air Usage",
          "Water & Fuel Consumption",
        ],
        features: [
          "Energy Dashboards",
          "Peak Demand Analysis",
          "Cost Monitoring",
          "Energy Benchmarking",
          "Carbon Emission Tracking",
        ],
        benefits: [
          "Reduced utility costs",
          "Improved energy efficiency",
          "Sustainability reporting",
        ],
      },
      {
        title: "MES Integration",
        description:
          "Bridge the gap between shop floor operations and enterprise systems — integrate with ERP, SAP, production planning, quality management, and warehouse systems.",
        monitors: [
          "ERP & SAP Systems",
          "Production Planning Systems",
          "Quality Management Systems",
          "Warehouse Systems",
        ],
        features: [
          "Production Tracking",
          "Work Order Management",
          "Batch Tracking",
          "Material Traceability",
          "Process Monitoring",
        ],
        benefits: [
          "Unified shop floor to top floor visibility",
          "Elimination of data silos",
          "Faster decision-making",
        ],
      },
      {
        title: "Quality Monitoring & Process Analytics",
        description:
          "Improve product quality and process consistency — monitor process parameters, batch data, quality KPIs, and production deviations with statistical process control.",
        monitors: [
          "Process Parameters & Batch Data",
          "Quality KPIs & Production Deviations",
        ],
        features: [
          "Real-Time Quality Monitoring",
          "Statistical Process Control (SPC)",
          "Process Trend Analysis",
          "Quality Reporting",
        ],
        benefits: [
          "Reduced product rejection",
          "Improved product consistency",
          "Better compliance",
        ],
      },
      {
        title: "Asset Performance Management (APM)",
        description:
          "Manage industrial assets throughout their lifecycle — production machines, compressors, boilers, pumps, motors, and electrical systems.",
        monitors: [
          "Production Machines & Compressors",
          "Boilers & Pumps",
          "Motors & Electrical Systems",
          "Utility Equipment",
        ],
        features: [
          "Asset Registry",
          "Maintenance Scheduling",
          "Work Orders",
          "Asset Health Monitoring",
          "Spare Parts Management",
        ],
        benefits: [
          "Increased asset reliability",
          "Reduced maintenance costs",
          "Extended equipment life",
        ],
      },
    ],
    benefits: [
      {
        title: "Increase Production Efficiency",
        description:
          "Gain real-time visibility into production performance and bottlenecks.",
      },
      {
        title: "Reduce Downtime",
        description:
          "Implement predictive maintenance and proactive monitoring.",
      },
      {
        title: "Optimize Utility Costs",
        description:
          "Monitor electricity, water, gas, steam, and compressed air consumption.",
      },
      {
        title: "Improve Product Quality",
        description:
          "Track quality metrics and process performance continuously.",
      },
      {
        title: "Enhance Asset Reliability",
        description: "Manage assets throughout their lifecycle.",
      },
      {
        title: "Improve Workforce Productivity",
        description: "Digitize operations and maintenance workflows.",
      },
      {
        title: "Enable Industry 4.0 Transformation",
        description:
          "Build a connected and intelligent manufacturing ecosystem.",
      },
    ],
    whyAltrex: [
      "Deep expertise in industrial automation, SCADA, IoT, and digital transformation",
      "Open & vendor-neutral platform supporting multi-vendor PLCs, SCADA systems, and sensors",
      "End-to-end solution provider from shop floor connectivity to enterprise analytics",
      "Scalable architecture for single plants, multi-plant, and global enterprises",
      "Cloud, on-premise & hybrid deployment based on operational and security requirements",
    ],
    cta: {
      heading: "Transform Your Factory into a Smart Manufacturing Enterprise",
      description:
        "Whether you are modernizing an existing plant or building a next-generation smart factory, Altrex Tech provides the digital platform to improve productivity, reduce costs, and drive sustainable growth.",
    },
  },

  // ── 7. Logistics & Transportation ────────────────────────────────────────
  {
    slug: "logistics-transportation",
    image: "/industries/logistics-transportation.jpg",
    name: "Logistics & Transportation",
    hero: {
      tagline: "Smart Fleet Management & Logistics Intelligence",
      heading:
        "Smart Fleet Management, Vehicle Tracking, Asset Monitoring & Logistics Intelligence",
      description:
        "Altrex Tech provides comprehensive digital solutions for logistics companies, transportation operators, fleet owners, supply chain organizations, fuel distribution companies, CGD operators, and industrial logistics providers. Our integrated platform combines GPS Vehicle Tracking, Fleet Management, Industrial IoT, GIS Mapping, Fuel Monitoring, Video Telematics, CCTV Analytics, and Business Analytics.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "50,000+", label: "Vehicles Tracked" },
      { value: "30%", label: "Fuel Cost Reduction" },
      { value: "24×7", label: "Fleet Visibility" },
      { value: "< 10s", label: "Live Location Update" },
    ],
    overview:
      "Whether managing 50 vehicles or thousands of assets across multiple regions, Altrex Tech helps organizations improve operational efficiency, reduce transportation costs, enhance safety, and optimize fleet utilization. Modern logistics operations face increasing pressure to reduce costs, improve delivery performance, and ensure asset visibility.",
    challenges: [
      {
        title: "Fleet Visibility",
        items: [
          "Limited vehicle tracking visibility",
          "Route deviations",
          "Unauthorized vehicle usage",
          "Delayed deliveries",
          "Communication gaps",
        ],
      },
      {
        title: "Operational Challenges",
        items: [
          "Fuel theft and misuse",
          "Vehicle downtime",
          "Driver behavior issues",
          "Poor route planning",
          "Manual reporting processes",
        ],
      },
      {
        title: "Asset Tracking",
        items: [
          "Trucks, Tankers & Cascade Vehicles",
          "Containers & Trailers",
          "Heavy Equipment",
          "Portable & High-Value Assets",
        ],
      },
      {
        title: "Safety Challenges",
        items: [
          "Rash driving & driver fatigue",
          "Unauthorized access & cargo theft",
          "Security incidents during transit",
        ],
      },
    ],
    modules: [
      {
        title: "GPS Vehicle Tracking System (VTS)",
        description:
          "Track fleet movements in real time — vehicle location, speed, route history, travel distance, ignition status, running hours, and parking time.",
        monitors: [
          "Vehicle Location & Speed",
          "Route History & Travel Distance",
          "Ignition Status & Running Hours",
          "Parking Time",
        ],
        features: [
          "Live Vehicle Tracking",
          "Route Replay",
          "Historical Tracking",
          "Geofencing",
          "Trip Reports",
          "Driver Identification",
          "Mobile Tracking",
        ],
        benefits: [
          "Complete fleet visibility",
          "Improved dispatching",
          "Better operational control",
        ],
      },
      {
        title: "Fuel Monitoring & Analytics",
        description:
          "Monitor fuel consumption and identify losses — fuel filling events, consumption, efficiency, theft detection, and driver-wise fuel performance.",
        monitors: [
          "Fuel Filling Events",
          "Fuel Consumption & Efficiency",
          "Fuel Theft & Drain Events",
        ],
        features: [
          "Fuel Sensor Integration",
          "Fuel Usage Reports",
          "Mileage Analytics",
          "Fuel Cost Tracking",
          "Driver-wise Fuel Performance",
        ],
        benefits: [
          "Reduced fuel losses",
          "Improved fuel efficiency",
          "Better operational planning",
        ],
      },
      {
        title: "Route Optimization & Trip Management",
        description:
          "Improve delivery performance and transportation efficiency with route planning, multi-stop trip optimization, ETA calculation, and delivery tracking.",
        features: [
          "Route Planning & Optimization",
          "Multi-Stop Trip Planning",
          "ETA Calculation",
          "Delivery Tracking",
          "Trip Monitoring",
        ],
        benefits: [
          "Reduced travel time",
          "Lower fuel costs",
          "Improved customer service",
        ],
      },
      {
        title: "Video Telematics & Driver Safety",
        description:
          "Improve road safety using AI-powered video monitoring — driver monitoring system (DMS), fatigue detection, mobile usage detection, and harsh driving detection.",
        features: [
          "Driver Monitoring System (DMS)",
          "Advanced Driver Assistance System (ADAS)",
          "Fatigue Detection",
          "Mobile Usage Detection",
          "Seatbelt Monitoring",
          "Harsh Driving Detection",
        ],
        benefits: [
          "Improved driver safety",
          "Reduced accidents",
          "Lower insurance risks",
        ],
      },
      {
        title: "Fleet Management System",
        description:
          "Manage all fleet types — transportation, industrial, and CGD/energy logistics vehicles — with utilization analysis, maintenance tracking, and compliance monitoring.",
        monitors: [
          "Trucks, Tankers & Trailers",
          "Service & Utility Vehicles",
          "Cascade Vehicles & LNG Tankers",
          "Construction & Heavy Equipment",
        ],
        features: [
          "Fleet Dashboard",
          "Vehicle Utilization Analysis",
          "Maintenance Tracking",
          "Driver Management",
          "Fleet Cost Analysis",
          "Compliance Monitoring",
        ],
        benefits: [
          "Increased fleet utilization",
          "Reduced operating costs",
          "Improved fleet productivity",
        ],
      },
      {
        title: "Asset Tracking & Monitoring",
        description:
          "Track both powered and non-powered assets — containers, portable equipment, generators, compressors, and high-value assets — with GPS, RFID, and QR code tracking.",
        monitors: [
          "Containers & Portable Equipment",
          "Generators & Compressors",
          "Toolkits & High-Value Assets",
        ],
        features: [
          "GPS Tracking",
          "RFID & QR Code Integration",
          "Location History",
          "Asset Utilization Analytics",
        ],
        benefits: [
          "Reduced asset loss",
          "Improved asset visibility",
          "Better utilization tracking",
        ],
      },
      {
        title: "Cold Chain Monitoring",
        description:
          "Monitor temperature-sensitive logistics operations — food distribution, pharmaceutical logistics, dairy transportation, and cold storage.",
        monitors: ["Temperature & Humidity", "Door Status", "Vehicle Location"],
        features: [
          "Real-Time Alerts",
          "Compliance Reporting",
          "Temperature Analytics",
        ],
        benefits: [
          "Product quality assurance",
          "Regulatory compliance",
          "Reduced spoilage",
        ],
      },
      {
        title: "CCTV & Video Analytics",
        description:
          "Secure logistics infrastructure — warehouses, logistics hubs, transport yards, and fuel depots — with AI-powered intrusion detection, ANPR, and cargo monitoring.",
        features: [
          "Intrusion Detection",
          "Vehicle Counting",
          "ANPR",
          "Cargo Monitoring",
          "Unauthorized Access Detection",
        ],
        benefits: [
          "Improved security",
          "Reduced theft",
          "Enhanced operational oversight",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Fleet Visibility",
        description: "Track vehicles, drivers, and assets in real time.",
      },
      {
        title: "Reduce Transportation Costs",
        description: "Optimize routes, fuel usage, and vehicle utilization.",
      },
      {
        title: "Enhance Driver Safety",
        description:
          "Implement AI-powered driver monitoring and safety analytics.",
      },
      {
        title: "Improve Delivery Performance",
        description: "Increase on-time deliveries and customer satisfaction.",
      },
      {
        title: "Reduce Asset Losses",
        description: "Monitor high-value assets and equipment continuously.",
      },
      {
        title: "Increase Operational Efficiency",
        description: "Digitize logistics processes and automate reporting.",
      },
      {
        title: "Enable Data-Driven Operations",
        description:
          "Leverage analytics for better planning and decision-making.",
      },
    ],
    whyAltrex: [
      "Complete logistics digital platform: fleet tracking, IoT, GIS, video analytics, and reporting in one solution",
      "Vendor-neutral architecture supporting GPS devices, sensors, cameras, and telematics from multiple manufacturers",
      "Scalable deployment for small fleets, nationwide logistics networks, and enterprise transportation operations",
      "Strong experience in CGD logistics, industrial transportation, and fuel distribution",
      "Cloud, on-premise & hybrid deployment options based on customer requirements",
    ],
    cta: {
      heading: "Drive Smarter Logistics Operations",
      description:
        "Whether you manage delivery fleets, fuel transportation, industrial logistics, or nationwide transportation networks, Altrex Tech provides the digital platform to improve efficiency, safety, and profitability.",
    },
  },

  // ── 8. Smart Cities ──────────────────────────────────────────────────────
  {
    slug: "smart-cities",
    image: "/industries/smart-cities.jpg",
    name: "Smart Cities",
    hero: {
      tagline: "Integrated Smart City Platform",
      heading:
        "Integrated Smart City Platform for Connected, Efficient & Sustainable Urban Infrastructure",
      description:
        "Altrex Tech provides a unified Smart City platform that connects urban infrastructure, utilities, public services, transportation systems, environmental monitoring, surveillance networks, and citizen services into a centralized command and control ecosystem. Our solutions combine Industrial IoT, SCADA, GIS, Smart Metering, ITS, CCTV Analytics, Asset Management, and Advanced Analytics.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "20+", label: "City Systems Integrated" },
      { value: "99.9%", label: "Command Center Uptime" },
      { value: "24×7", label: "City-Wide Monitoring" },
      { value: "< 60s", label: "Incident Detection Time" },
    ],
    overview:
      "Whether implementing a new smart city initiative or modernizing existing urban infrastructure, Altrex Tech enables cities to become more connected, efficient, resilient, and citizen-centric. Urban areas face increasing pressure from population growth, infrastructure demands, environmental concerns, and resource constraints.",
    challenges: [
      {
        title: "Infrastructure Challenges",
        items: [
          "Multiple disconnected systems",
          "Aging infrastructure",
          "Limited operational visibility",
          "Inefficient resource utilization",
        ],
      },
      {
        title: "Utility & Transportation",
        items: [
          "Water losses & energy inefficiencies",
          "Utility service disruptions",
          "Traffic congestion",
          "Fleet management & public transport monitoring",
        ],
      },
      {
        title: "Public Safety",
        items: [
          "Crime prevention",
          "Infrastructure security",
          "Emergency response coordination",
          "Limited surveillance coverage",
        ],
      },
      {
        title: "Environmental Challenges",
        items: [
          "Air pollution monitoring",
          "Water quality management",
          "Waste management inefficiencies",
          "Sustainability targets",
        ],
      },
    ],
    modules: [
      {
        title: "Integrated Command & Control Center (ICCC)",
        description:
          "Create a centralized operational hub for city-wide monitoring and decision-making — real-time city dashboard, GIS-based monitoring, incident management, and operational analytics.",
        features: [
          "Real-Time City Dashboard",
          "GIS-Based Monitoring",
          "Incident Management",
          "Multi-System Integration",
          "Event Visualization",
          "Operational Analytics",
        ],
        benefits: [
          "Unified city operations",
          "Faster incident response",
          "Better interdepartmental coordination",
        ],
      },
      {
        title: "Smart Utility Management",
        description:
          "Digitally monitor and manage water utilities, gas networks, and power infrastructure — SCADA monitoring, leak detection, NRW analysis, and smart metering across all utilities.",
        monitors: [
          "Water Treatment Plants & Reservoirs",
          "PNG Networks & CNG Stations",
          "Substations & Distribution Networks",
          "Street Lighting & Smart Meters",
        ],
        features: [
          "SCADA Monitoring",
          "Leak Detection & NRW Analysis",
          "Pressure & Gas Management",
          "Energy Analytics & Outage Monitoring",
        ],
        benefits: [
          "Reduced utility losses",
          "Improved service reliability",
          "Optimized resource consumption",
        ],
      },
      {
        title: "Smart Metering (AMR / AMI)",
        description:
          "Enable automated utility data collection across the city — water, gas, and electricity meters — with consumption analytics, tamper detection, and billing integration.",
        monitors: ["Water Meters", "Gas Meters", "Electricity Meters"],
        features: [
          "Automated Meter Reading (AMR)",
          "Advanced Metering Infrastructure (AMI)",
          "Consumption Analytics",
          "Leak & Tamper Detection",
          "Consumer Portal",
          "Billing Integration",
        ],
        benefits: [
          "Improved billing accuracy",
          "Reduced manual operations",
          "Better resource management",
        ],
      },
      {
        title: "Intelligent Transportation System (ITS)",
        description:
          "Improve mobility with traffic flow analysis, public transport tracking, passenger information systems, and smart parking occupancy monitoring.",
        monitors: [
          "Traffic Flow & Congestion",
          "Bus Tracking & Fleet Monitoring",
          "Parking Occupancy",
        ],
        features: [
          "Traffic Signal Integration",
          "Passenger Information Systems",
          "Parking Guidance Systems",
          "Traffic Analytics",
        ],
        benefits: [
          "Reduced traffic congestion",
          "Improved transportation efficiency",
          "Better commuter experience",
        ],
      },
      {
        title: "GIS-Based Smart City Platform",
        description:
          "Map and manage all urban infrastructure — utility networks, municipal assets, citizen infrastructure, and emergency services — on a unified geospatial platform.",
        monitors: [
          "Water, Sewer & Gas Pipelines",
          "Electrical Infrastructure & Street Lights",
          "Public Buildings, Parks & Roads",
          "Schools, Hospitals & Emergency Services",
        ],
        features: [
          "Asset Mapping & Utility Network Visualization",
          "Service Area Mapping",
          "Infrastructure & Maintenance Planning",
        ],
        benefits: [
          "Better planning",
          "Improved asset visibility",
          "Faster field operations",
        ],
      },
      {
        title: "CCTV Surveillance & Video Analytics",
        description:
          "Enhance city security through AI-powered surveillance with ANPR, crowd analytics, vehicle counting, traffic analytics, and abandoned object detection.",
        monitors: [
          "Public Areas & Roads",
          "Government Buildings & Transport Hubs",
          "Utility Facilities",
        ],
        features: [
          "ANPR",
          "Intrusion Detection",
          "Crowd Analytics",
          "Vehicle Counting",
          "Traffic Analytics",
          "Object Detection",
          "Abandoned Object Detection",
        ],
        benefits: [
          "Improved public safety",
          "Better traffic enforcement",
          "Faster incident detection",
        ],
      },
      {
        title: "Environmental Monitoring",
        description:
          "Monitor air quality, water quality, weather conditions, and environmental metrics across the city for regulatory compliance and public health monitoring.",
        monitors: [
          "Air Quality — PM2.5, PM10, CO, NO₂, SO₂",
          "Water Quality — pH, Turbidity, Chlorine, DO",
          "Weather — Temperature, Humidity, Rainfall, Wind Speed",
        ],
        features: [
          "Real-Time Environmental Dashboards",
          "Compliance Alerts",
          "Historical Trending",
        ],
        benefits: [
          "Improved environmental compliance",
          "Better urban planning",
          "Public health monitoring",
        ],
      },
      {
        title: "Smart Street Lighting",
        description:
          "Monitor and control street lighting infrastructure remotely — remote ON/OFF, dimming control, energy monitoring, fault detection, and pole-level monitoring.",
        features: [
          "Remote ON/OFF Control",
          "Dimming Control",
          "Energy Monitoring",
          "Fault Detection",
          "Pole-Level Monitoring",
        ],
        benefits: [
          "Reduced energy consumption",
          "Lower maintenance costs",
          "Improved public safety",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Service Delivery",
        description: "Monitor and manage city infrastructure in real time.",
      },
      {
        title: "Optimize Resource Utilization",
        description: "Reduce water, energy, and operational losses.",
      },
      {
        title: "Enhance Public Safety",
        description:
          "Leverage AI-powered surveillance and incident management.",
      },
      {
        title: "Increase Operational Efficiency",
        description: "Integrate multiple city systems into a single platform.",
      },
      {
        title: "Improve Citizen Satisfaction",
        description: "Provide faster, more transparent public services.",
      },
      {
        title: "Support Sustainability Goals",
        description:
          "Monitor environmental performance and resource consumption.",
      },
      {
        title: "Enable Data-Driven Governance",
        description: "Use analytics to improve planning and decision-making.",
      },
    ],
    whyAltrex: [
      "Unified smart city platform: SCADA, IoT, GIS, Smart Metering, Video Analytics, and Citizen Services",
      "Open & vendor-neutral architecture integrating with existing utility systems and enterprise applications",
      "Scalable deployment for municipalities, smart city projects, and industrial townships",
      "Cloud, on-premise & hybrid support based on operational and security requirements",
      "Future-ready technology supporting AI Analytics, Digital Twins, and Smart Governance",
    ],
    cta: {
      heading: "Building Connected & Sustainable Cities",
      description:
        "Whether you are developing a new smart city initiative or modernizing existing urban infrastructure, Altrex Tech provides the technology foundation to build a smarter, safer, and more sustainable future.",
    },
  },

  // ── 9. Infrastructure & Utilities ────────────────────────────────────────
  {
    slug: "infrastructure-utilities",
    image: "/industries/infrastructure-utilities.jpg",
    name: "Infrastructure & Utilities",
    hero: {
      tagline: "Intelligent Monitoring for Critical Infrastructure",
      heading:
        "Intelligent Monitoring, Asset Management & Digital Operations for Critical Infrastructure",
      description:
        "Altrex Tech provides comprehensive digital transformation solutions for infrastructure operators, utility providers, industrial townships, commercial campuses, airports, ports, railways, metro systems, industrial parks, SEZs, and large-scale public infrastructure projects. Our integrated platform combines SCADA, Industrial IoT, GIS, Smart Metering, Energy Management, Asset Management, and CCTV Analytics.",
      ctas: ["Request Demo", "Talk to an Expert"],
    },
    metrics: [
      { value: "99.9%", label: "Platform Availability" },
      { value: "24×7", label: "Monitoring Coverage" },
      { value: "< 5min", label: "Incident Response Time" },
      { value: "25%", label: "Avg. Energy Savings" },
    ],
    overview:
      "From utility infrastructure and facility operations to transportation assets and critical services, Altrex Tech helps organizations improve reliability, optimize resource utilization, reduce operational costs, and enhance service delivery. Large infrastructure projects involve thousands of distributed assets, multiple stakeholders, and mission-critical operations.",
    challenges: [
      {
        title: "Asset Visibility",
        items: [
          "Buildings & Utility Networks",
          "Electrical & Water Infrastructure",
          "Transportation Assets",
          "Mechanical Equipment & Security Systems",
        ],
      },
      {
        title: "Operational Challenges",
        items: [
          "Multiple disconnected systems",
          "Reactive maintenance",
          "Manual inspections",
          "Limited real-time visibility",
          "Resource inefficiencies",
        ],
      },
      {
        title: "Utility Management",
        items: [
          "Energy wastage",
          "Water losses",
          "Utility downtime",
          "Inefficient consumption monitoring",
        ],
      },
      {
        title: "Security & Safety",
        items: [
          "Unauthorized access & infrastructure vandalism",
          "Operational safety compliance",
          "Emergency response coordination",
        ],
      },
    ],
    modules: [
      {
        title: "Infrastructure SCADA & Real-Time Monitoring",
        description:
          "Monitor critical infrastructure assets and utility systems from a centralized control center — electrical systems, water systems, mechanical systems, and facility operations.",
        monitors: [
          "Substations, Transformers & Switchgear",
          "DG Sets & UPS Systems",
          "Pumping Stations & Reservoirs",
          "HVAC, Chillers & Compressors",
          "Lighting & Fire/Safety Systems",
        ],
        features: [
          "Real-Time Dashboards",
          "Alarm Management",
          "Historical Trending",
          "Event Logging",
          "KPI Monitoring",
          "Mobile Access",
        ],
        benefits: [
          "Improved operational visibility",
          "Faster incident response",
          "Reduced downtime",
        ],
      },
      {
        title: "Utility Management System",
        description:
          "Digitally manage power, water, and gas utilities across infrastructure facilities — energy consumption, power quality, water consumption, reservoir levels, and PNG/LPG networks.",
        monitors: [
          "Energy Consumption & Power Quality",
          "Peak Demand & DG Performance",
          "Water Consumption & Pump Performance",
          "PNG & LPG Utility Networks",
        ],
        features: [
          "Resource Optimization",
          "Utility Cost Reduction",
          "Improved Sustainability",
        ],
        benefits: [
          "Resource optimization",
          "Utility cost reduction",
          "Improved sustainability",
        ],
      },
      {
        title: "Smart Metering (AMR / AMI)",
        description:
          "Automate utility consumption monitoring across infrastructure facilities — electricity, water, gas, and thermal energy meters with tenant billing and cost allocation.",
        monitors: [
          "Electricity, Water, Gas & Thermal Meters",
          "Tenant Sub-Metering",
          "Industrial Park Shared Resources",
        ],
        features: [
          "Automated Meter Reading (AMR)",
          "Advanced Metering Infrastructure (AMI)",
          "Consumption Analytics",
          "Tenant Billing Support",
          "Utility Cost Allocation",
          "Tamper Detection",
        ],
        benefits: [
          "Accurate billing",
          "Reduced manual operations",
          "Better resource management",
        ],
      },
      {
        title: "Energy Management System (EMS)",
        description:
          "Monitor and optimize energy consumption across infrastructure facilities — electrical consumption, power quality, peak demand, renewable energy systems, and DG performance.",
        monitors: [
          "Electrical Consumption & Power Quality",
          "Peak Demand & Renewable Energy Systems",
          "DG Performance",
        ],
        features: [
          "Energy Dashboards",
          "Demand Analytics",
          "Benchmarking",
          "Cost Allocation",
          "Carbon Reporting",
        ],
        benefits: [
          "Reduced energy costs",
          "Improved sustainability",
          "Better energy efficiency",
        ],
      },
      {
        title: "GIS-Based Infrastructure Asset Management",
        description:
          "Digitize infrastructure assets on a geospatial platform — buildings, utility networks, roads, pipelines, electrical networks, water infrastructure, and campus assets.",
        monitors: [
          "Buildings & Campus Assets",
          "Utility Networks & Pipelines",
          "Electrical & Water Infrastructure",
        ],
        features: [
          "Asset Mapping",
          "Utility Network Visualization",
          "Route Analysis",
          "Maintenance Planning",
          "Infrastructure Planning",
        ],
        benefits: [
          "Improved asset visibility",
          "Faster maintenance response",
          "Better planning",
        ],
      },
      {
        title: "BMS Integration",
        description:
          "Integrate building management systems — HVAC, lighting controls, fire alarm systems, and access control — into a unified operational platform.",
        monitors: [
          "HVAC Systems & Lighting Controls",
          "Fire Alarm Systems",
          "Access Control Systems",
          "Energy Meters",
        ],
        features: [
          "Centralized Facility Management",
          "Improved Operational Efficiency",
          "Reduced Maintenance Costs",
        ],
        benefits: [
          "Single pane of glass for facility operations",
          "Cross-system alarm correlation",
          "Improved energy efficiency",
        ],
      },
      {
        title: "CCTV & Video Analytics",
        description:
          "Enhance infrastructure security through AI-powered surveillance — intrusion detection, ANPR, perimeter monitoring, vehicle analytics, and PPE compliance monitoring.",
        monitors: [
          "Airports, Ports & Metro Stations",
          "Railway Stations & Industrial Parks",
          "Utility Corridors & Commercial Campuses",
        ],
        features: [
          "Intrusion Detection",
          "ANPR",
          "Perimeter Monitoring",
          "Vehicle Analytics",
          "Unauthorized Access Detection",
          "PPE Compliance Monitoring",
          "Crowd Monitoring",
        ],
        benefits: [
          "Improved security",
          "Enhanced operational safety",
          "Faster incident detection",
        ],
      },
      {
        title: "Asset Performance Management (APM)",
        description:
          "Manage infrastructure assets throughout their lifecycle — electrical equipment, mechanical systems, utility assets, buildings, and transportation assets.",
        monitors: [
          "Electrical Equipment & Mechanical Systems",
          "Utility Assets & Buildings",
          "Security Infrastructure & Transportation Assets",
        ],
        features: [
          "Asset Registry",
          "Preventive Maintenance",
          "Work Orders",
          "Asset Health Monitoring",
          "Warranty Tracking",
          "Spare Management",
        ],
        benefits: [
          "Increased asset reliability",
          "Reduced maintenance costs",
          "Extended asset lifespan",
        ],
      },
    ],
    benefits: [
      {
        title: "Improve Operational Visibility",
        description:
          "Monitor all infrastructure assets and utility systems from a centralized platform.",
      },
      {
        title: "Reduce Operating Costs",
        description: "Optimize energy, water, and maintenance expenses.",
      },
      {
        title: "Improve Asset Reliability",
        description:
          "Implement proactive maintenance and asset health monitoring.",
      },
      {
        title: "Enhance Security & Safety",
        description:
          "Protect critical infrastructure through AI-powered surveillance.",
      },
      {
        title: "Increase Workforce Productivity",
        description: "Digitize inspections, maintenance, and field operations.",
      },
      {
        title: "Improve Sustainability Performance",
        description: "Track utility consumption and environmental metrics.",
      },
      {
        title: "Enable Data-Driven Management",
        description:
          "Leverage analytics to improve planning and decision-making.",
      },
    ],
    whyAltrex: [
      "Complete infrastructure digital platform: SCADA, IoT, GIS, Smart Metering, Asset Management, and Reporting",
      "Open & vendor-neutral architecture supporting existing infrastructure and multi-vendor equipment",
      "Scalable for single facilities, multi-site projects, and large-scale utility networks",
      "Cloud, on-premise & hybrid deployment to meet operational and security requirements",
      "Future-ready: Digital Twins, AI Analytics, Predictive Maintenance, and Smart Facility Management",
    ],
    cta: {
      heading: "Building Smarter Infrastructure for the Future",
      description:
        "Whether you operate an airport, industrial park, railway network, commercial campus, utility infrastructure, or public facility, Altrex Tech provides the digital platform to modernize operations and maximize asset performance.",
    },
  },
];

// ─── Lookup helper ────────────────────────────────────────────────────────────
export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industriesRegistry.find((industry) => industry.slug === slug);
}
