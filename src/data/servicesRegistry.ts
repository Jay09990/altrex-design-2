import type { ServiceData } from '../types/service';

export const servicesRegistry: Record<string, ServiceData> = {
  'saas-platform': {
    slug: 'saas-platform',
    title: 'SaaS Platform Services',
    hero: {
      title: 'SaaS Platform Services',
      subtitle: 'Accelerate Your Digital Transformation with Altrex SaaS Platform',
      description: "Deploy powerful industrial monitoring, asset management, analytics, and operational intelligence solutions without the complexity of managing infrastructure. Altrex's cloud-hosted SaaS platform provides secure, scalable, and always-available access to your operational data, enabling organizations to monitor assets, optimize performance, and make data-driven decisions from anywhere. Available for Industrial IoT, SCADA, GIS, Fleet Management, Energy Management, CCTV Analytics, and Enterprise Reporting Applications.",
      ctas: ['Request Demo', 'Talk to an Expert']
    },
    keyBenefits: [
      'Rapid Deployment', 'Subscription-Based Pricing', 'No Infrastructure Investment',
      'Automatic Updates & Upgrades', 'Enterprise-Grade Security', 'Multi-Location Accessibility',
      'High Availability Architecture', 'Scalable from 1 Site to Thousands of Assets'
    ],
    overview: {
      title: 'Overview',
      subtitle: 'Modern Industrial Software Without Infrastructure Complexity',
      paragraphs: [
        'Traditional industrial software deployments often require significant investments in servers, networking equipment, software licensing, and IT resources. Altrex SaaS Platform eliminates these challenges by delivering a fully managed cloud-based solution that enables organizations to focus on operations rather than infrastructure management.',
        'Our SaaS platform provides a secure and scalable environment for collecting, processing, visualizing, and analyzing data from industrial assets, field devices, remote sites, and enterprise systems.',
        'Whether you operate a city gas distribution network, manufacturing facility, utility infrastructure, fleet operation, or energy management system, Altrex provides a centralized platform accessible anytime and from anywhere.'
      ]
    },
    whatWeDeliver: [
      { title: 'Cloud Hosted Platform', description: 'Secure hosting on enterprise-grade cloud infrastructure with high availability, automated backups, disaster recovery, and continuous monitoring.' },
      { title: 'Multi-Tenant Architecture', description: 'Efficiently manage multiple business units, geographical locations, projects, or customer accounts from a single centralized platform while maintaining complete data segregation and security.' },
      { title: 'Real-Time Monitoring', description: 'Monitor operational data, equipment status, alarms, events, and performance indicators in real time through intuitive dashboards and mobile-friendly interfaces.' },
      { title: 'Historical Data Management', description: 'Store and access historical operational data for reporting, compliance, auditing, trend analysis, and business intelligence applications.' },
      { title: 'Analytics & Reporting', description: 'Transform raw operational data into actionable insights through advanced analytics, KPI monitoring, automated reports, and executive dashboards.' },
      { title: 'Mobile & Web Access', description: 'Access operational information from desktops, tablets, and mobile devices with secure role-based authentication and authorization controls.' }
    ],
    platformCapabilities: [
      { title: 'Industrial IoT & Data Acquisition', items: ['PLCs', 'RTUs', 'Flow Computers', 'Energy Meters', 'Sensors', 'SCADA Systems', 'DCS Systems', 'Edge Gateways', 'Third-Party Applications', 'MQTT', 'Modbus TCP', 'Modbus RTU', 'OPC UA', 'REST APIs', 'Web Services', 'Database Connectors'] },
      { title: 'Web SCADA & Remote Monitoring', items: ['Real-Time Process Visualization', 'Alarm Monitoring', 'Event Management', 'Historical Trending', 'KPI Dashboards', 'Remote Diagnostics', 'Equipment Performance Monitoring'] },
      { title: 'GIS & Asset Management', items: ['Asset Mapping', 'Pipeline Monitoring', 'Utility Network Visualization', 'Geospatial Analytics', 'Asset Lifecycle Tracking', 'Location-Based Reporting'] },
      { title: 'Fleet Management & Vehicle Tracking', items: ['Real-Time GPS Tracking', 'Route Monitoring', 'Geofencing', 'Vehicle Utilization Reports', 'Driver Performance Monitoring', 'Fleet Analytics'] },
      { title: 'Energy Management', items: ['Energy Monitoring', 'Consumption Analysis', 'Cost Allocation', 'Demand Management', 'Energy Efficiency Reporting', 'Sustainability Metrics'] },
      { title: 'CCTV & Video Analytics Integration', items: ['CCTV Monitoring', 'Event-Based Recording', 'AI Video Analytics', 'ANPR Integration', 'Security Alerts', 'Incident Investigation Support'] }
    ],
    securityAndCompliance: {
      title: 'Enterprise-Grade Security',
      description: 'Security is built into every layer of the Altrex SaaS Platform.',
      features: ['Secure HTTPS Communication', 'Role-Based Access Control (RBAC)', 'Multi-Level User Permissions', 'Encrypted Data Transmission', 'Audit Trails', 'Secure Authentication', 'Backup & Recovery Policies', 'Infrastructure Monitoring']
    },
    scalability: {
      title: 'Built for Growth',
      description: 'The platform is designed to scale seamlessly from small deployments to enterprise-wide implementations.',
      suitableFor: ['Single Facility Monitoring', 'Multi-Site Operations', 'Utility Networks', 'City-Wide Infrastructure', 'National Asset Networks', 'Enterprise Deployments'],
      summary: 'Scale from a few hundred tags to millions of data points without changing the platform architecture.'
    },
    whyChoose: {
      title: 'Why Choose Altrex SaaS Platform',
      items: [
        { title: 'Faster Time-to-Value', description: 'Deploy new projects in weeks rather than months.' },
        { title: 'Lower Total Cost of Ownership', description: 'Eliminate capital expenditure associated with servers, software maintenance, and infrastructure management.' },
        { title: 'Continuous Innovation', description: 'Benefit from regular feature enhancements, security improvements, and platform upgrades without operational disruption.' },
        { title: 'Centralized Operations', description: 'Manage all assets, sites, users, and operational information from a unified platform.' },
        { title: 'Proven Industrial Expertise', description: 'Built specifically for industrial operations, utilities, energy companies, city gas distribution networks, manufacturing plants, and smart infrastructure projects.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Utilities', 'Manufacturing', 'Smart Cities', 'Water & Wastewater', 'Transportation & Logistics', 'Energy & Renewables', 'Infrastructure Projects', 'Industrial Parks'],
    callToAction: {
      title: 'Ready to Transform Your Operations?',
      description: 'Whether you need Industrial IoT, Web SCADA, GIS, Fleet Management, Energy Monitoring, CCTV Analytics, or a complete digital operations platform, Altrex SaaS Services provide a secure, scalable, and cost-effective solution to accelerate your digital transformation journey. Contact our experts today to schedule a platform demonstration and discuss your operational requirements.',
      ctas: ['Request Demo', 'Talk to an Expert']
    }
  },
  'turnkey-implementation': {
    slug: 'turnkey-implementation',
    title: 'Turnkey Project Implementation Services',
    hero: {
      title: 'Turnkey Project Implementation Services',
      subtitle: 'End-to-End Digital Transformation Projects – From Design to Commissioning',
      description: 'Altrex delivers complete turnkey project implementation services for industrial automation, Industrial IoT, Web SCADA, GIS, Fleet Management, Energy Monitoring, CCTV Analytics, and enterprise digitalization initiatives. From initial engineering and hardware deployment to software implementation, integration, commissioning, training, and long-term support, we provide a single point of responsibility for successful project execution.',
      badge: 'One Partner. One Solution. Complete Project Ownership.',
      ctas: ['Request Consultation', 'Discuss Your Project', 'Schedule a Technical Meeting']
    },
    keyBenefits: ['Single Point of Accountability', 'Engineering to Commissioning', 'Hardware + Software Integration', 'Reduced Project Risk', 'Faster Deployment Timelines', 'Multi-Vendor Coordination', 'Training & Documentation', 'Post-Go-Live Support'],
    overview: {
      title: 'Overview',
      subtitle: 'Complete Project Execution Under One Roof',
      paragraphs: [
        'Large-scale industrial digitalization projects involve multiple technologies, vendors, contractors, and stakeholders. Managing these components independently often results in delays, integration challenges, cost overruns, and operational risks.',
        'Altrex simplifies project execution through comprehensive turnkey implementation services that cover every stage of the project lifecycle. Our team manages engineering, procurement, deployment, integration, testing, commissioning, and support, ensuring seamless delivery and successful outcomes.',
        'Whether deploying a Web SCADA system across hundreds of locations, implementing Industrial IoT infrastructure, establishing a GIS platform, or integrating field devices with enterprise applications, Altrex ensures smooth execution from concept to operation.'
      ]
    },
    approachSteps: [
      {
        title: '1. Requirement Analysis & Project Planning',
        activities: ['Business Requirement Analysis', 'Technical Requirement Gathering', 'Site Surveys', 'Existing Infrastructure Assessment', 'Gap Analysis', 'Risk Identification', 'Deployment Strategy Planning', 'Project Scheduling'],
        deliverables: ['Requirement Specification Document', 'Project Execution Plan', 'Architecture Design', 'Deployment Roadmap']
      },
      {
        title: '2. Engineering & System Design',
        activities: ['Solution Architecture Design', 'Network Architecture', 'Communication Design', 'Database Design', 'Cybersecurity Architecture', 'Cloud Infrastructure Design', 'GIS Architecture', 'High Availability Design'],
        deliverables: ['System Architecture Diagrams', 'Network Layouts', 'Device Communication Plans', 'Security Design Documents', 'Implementation Blueprints']
      },
      {
        title: '3. Supply & Procurement',
        activities: [],
        typicalComponents: {
          'Industrial Hardware': ['RTUs', 'PLCs', 'Data Concentrator Units (DCU)', 'Edge Gateways', 'Industrial PCs', 'Protocol Converters'],
          'Communication Infrastructure': ['Industrial Switches', 'Routers', 'Cellular Gateways', 'VPN Devices', 'Fiber Connectivity Components'],
          'Field Equipment': ['Sensors', 'Energy Meters', 'Flow Computers', 'Pressure Transmitters', 'Environmental Monitoring Devices'],
          'IT Infrastructure': ['Servers', 'Storage Systems', 'Backup Solutions', 'Network Security Appliances']
        }
      },
      {
        title: '4. Installation & Deployment',
        activities: [],
        servicesInclude: ['Hardware Installation', 'Panel Installation', 'Cable Routing & Termination', 'Communication Setup', 'Network Configuration', 'Power System Integration', 'Site Acceptance Preparation'],
        deploymentTypes: ['Greenfield Projects', 'Brownfield Integrations', 'Multi-Site Rollouts', 'Remote Asset Deployments']
      },
      {
        title: '5. Software Configuration & Development',
        activities: [],
        solutionsDelivered: ['Web SCADA', 'Industrial IoT Platform', 'GIS & Asset Management', 'Fleet Management & VTS', 'Energy Management System', 'Alarm Management', 'CCTV Analytics', 'Reporting Dashboards', 'Mobile Applications'],
        customizationServices: ['Dashboard Design', 'KPI Development', 'Workflow Automation', 'Custom Reports', 'API Development', 'Data Integration']
      }
    ],
    integrationCapabilities: [
      { title: 'Industrial Systems', items: ['PLC Integration', 'SCADA Integration', 'RTU Integration', 'DCS Integration', 'Metering Systems', 'Telemetry Systems'] },
      { title: 'Enterprise Systems', items: ['ERP Integration', 'SAP Integration', 'CRM Integration', 'Billing Systems', 'Ticketing Platforms', 'Third-Party Applications'] },
      { title: 'Communication Protocols', items: ['MQTT', 'OPC UA', 'Modbus TCP', 'Modbus RTU', 'REST API', 'Web Services', 'SQL Databases'] }
    ],
    commissioningActivities: {
      activities: ['Functional Testing', 'Communication Testing', 'Integration Testing', 'Performance Testing', 'Cybersecurity Validation', 'User Acceptance Testing (UAT)', 'Site Acceptance Testing (SAT)'],
      verificationAreas: ['Device Connectivity', 'Data Accuracy', 'Alarm Functionality', 'Reporting Accuracy', 'Dashboard Performance', 'Failover Testing']
    },
    trainingPrograms: [
      { title: 'Operator Training', topics: ['Dashboard Usage', 'Alarm Management', 'Report Generation', 'Asset Monitoring'] },
      { title: 'Administrator Training', topics: ['User Management', 'System Configuration', 'Security Administration', 'Backup Procedures'] },
      { title: 'Technical Training', topics: ['Device Integration', 'Troubleshooting', 'Maintenance Procedures', 'Upgrade Management'] }
    ],
    whatWeDeliver: [
      { title: 'Web SCADA & Remote Monitoring', description: 'Real-time monitoring and control of industrial assets and infrastructure.' },
      { title: 'Industrial IoT Platforms', description: 'Data acquisition, analytics, and operational intelligence solutions.' },
      { title: 'GIS & Asset Management', description: 'Geospatial asset visibility and lifecycle management.' },
      { title: 'Fleet Management & VTS', description: 'Vehicle tracking, route optimization, and logistics monitoring.' },
      { title: 'Energy Management Systems', description: 'Energy monitoring, optimization, and sustainability reporting.' },
      { title: 'CCTV & Video Analytics', description: 'Security monitoring, ANPR, AI-based analytics, and incident management.' },
      { title: 'Smart Utility Platforms', description: 'Integrated management of gas, water, power, and utility infrastructure.' }
    ],
    whyChoose: {
      title: 'Why Choose Altrex for Turnkey Projects?',
      items: [
        { title: 'Single Point of Responsibility', description: 'One partner managing the complete project lifecycle.' },
        { title: 'Proven Industrial Expertise', description: 'Deep understanding of industrial automation, telemetry, and digital transformation.' },
        { title: 'Technology-Agnostic Approach', description: 'Integration with equipment and systems from multiple vendors.' },
        { title: 'Scalable Solutions', description: 'Designed for growth from pilot projects to enterprise-wide deployments.' },
        { title: 'Reduced Project Risk', description: 'Structured project management, engineering standards, and quality assurance practices.' },
        { title: 'Long-Term Partnership', description: 'Ongoing support, upgrades, and managed services to maximize project value.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Utilities', 'Manufacturing', 'Smart Cities', 'Transportation & Logistics', 'Energy & Renewables', 'Water & Wastewater', 'Infrastructure Development', 'Industrial Parks'],
    callToAction: {
      title: 'Transform Your Vision into a Fully Operational Digital Ecosystem',
      description: 'Whether you are planning a Web SCADA deployment, Industrial IoT implementation, GIS platform, Fleet Management system, Energy Monitoring solution, or a complete digital transformation initiative, Altrex delivers turnkey execution from concept to commissioning. Partner with Altrex for reliable, scalable, and future-ready digital infrastructure solutions.',
      ctas: ['Request Consultation', 'Discuss Your Project', 'Schedule a Technical Meeting']
    }
  },
  'system-integration': {
    slug: 'system-integration',
    title: 'System Integration Services',
    hero: {
      title: 'System Integration Services',
      subtitle: 'Connecting Systems, Data, and Operations into One Unified Digital Ecosystem',
      description: 'Modern industrial and enterprise environments rely on multiple systems, devices, applications, and technologies operating across different locations. Altrex System Integration Services enable seamless communication between operational technology (OT) and information technology (IT), creating a centralized and intelligent platform for monitoring, control, analytics, and business decision-making. Integrate PLCs, SCADA, RTUs, IoT Devices, GIS, CCTV, ERP, SAP, Cloud Platforms, and Enterprise Applications into a Single Unified Solution.',
      ctas: ['Discuss Your Integration Requirements', 'Schedule a Technical Consultation', 'Request a Solution Assessment']
    },
    keyBenefits: ['Eliminate Data Silos', 'Real-Time Data Visibility', 'Unified Operations Dashboard', 'Multi-Vendor Compatibility', 'Improved Decision Making', 'Reduced Manual Processes', 'Enhanced Data Accuracy', 'Scalable Integration Architecture'],
    overview: {
      title: 'Overview',
      subtitle: 'Bridging the Gap Between Operational Technology and Business Systems',
      paragraphs: [
        'Most organizations operate a mix of legacy systems, industrial equipment, enterprise software, cloud platforms, and third-party applications. These systems often work independently, making it difficult to obtain a complete view of operations.',
        'Altrex helps organizations overcome these challenges by integrating data from multiple sources into a centralized platform, enabling real-time visibility, automated workflows, and data-driven decision-making.',
        'Whether you need to connect field devices to a SCADA system, integrate operational data with SAP, synchronize GIS assets with maintenance systems, or create enterprise-wide dashboards, our integration experts ensure secure and reliable data exchange across your ecosystem.'
      ]
    },
    approachSteps: [
      {
        title: 'Assessment & Discovery',
        activities: ['Existing System Assessment', 'Data Flow Analysis', 'Communication Protocol Review', 'Infrastructure Evaluation', 'Cybersecurity Assessment', 'Integration Strategy Development'],
        deliverables: ['Integration Architecture', 'Communication Matrix', 'Data Mapping Documents', 'Project Execution Plan']
      },
      {
        title: 'Integration Architecture Design',
        activities: [],
        deliverables: ['High Availability', 'Scalability', 'Performance Optimization', 'Cybersecurity', 'Data Integrity', 'Future Expandability'],
        servicesInclude: ['Data Acquisition Layer', 'Edge Processing Layer', 'Communication Layer', 'Integration Middleware', 'Application Layer', 'Analytics Layer', 'Security Framework']
      }
    ],
    platformCapabilities: [
      { title: 'PLC Integration', items: ['Siemens', 'Schneider Electric', 'Rockwell Automation', 'Mitsubishi Electric', 'Delta Electronics', 'ABB'] },
      { title: 'RTU Integration', items: ['City Gas Distribution Networks', 'Water Distribution Systems', 'Utility Infrastructure', 'Pipeline Monitoring', 'Remote Stations'] },
      { title: 'SCADA Integration', items: ['Data Synchronization', 'Historical Data Collection', 'Alarm Consolidation', 'Centralized Monitoring', 'Multi-Site Management'] },
      { title: 'Supported Protocols', items: ['Modbus RTU', 'Modbus TCP', 'OPC UA', 'OPC DA', 'Secure MQTT', 'Sparkplug B', 'Profinet', 'EtherNet/IP', 'REST APIs', 'SOAP Services', 'Webhooks', 'SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Oracle'] },
      { title: 'SAP Integration Examples', items: ['Asset Master Synchronization', 'Maintenance Workflows', 'Equipment Status Updates', 'Inventory Management', 'Material Tracking', 'Operational Reporting'] },
      { title: 'Cloud Platforms', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Private Cloud Environments'] }
    ],
    whatWeDeliver: [
      { title: 'Industrial System Integration', description: 'Connecting Industrial Assets and Control Systems across plants, utilities, infrastructure, and remote environments.' },
      { title: 'Enterprise System Integration', description: 'Bringing Operational Data into Business Processes (ERP, SAP, CRM, Billing, and Helpdesk platforms).' },
      { title: 'Cloud & Hybrid Integration', description: 'Connecting Edge, On-Premise, and Cloud Environments seamlessly for reduced infrastructure costs.' },
      { title: 'GIS & Asset Integration', description: 'Connecting Operational Assets with Geospatial Intelligence for utility network mapping.' },
      { title: 'CCTV & Video Analytics Integration', description: 'Transforming Surveillance into Operational Intelligence for verification and compliance.' },
      { title: 'API Development & Middleware Services', description: 'Enabling Custom Data Exchange using REST APIs, Gateways, and Webhooks.' }
    ],
    whyChoose: {
      title: 'Why Choose Altrex for System Integration?',
      items: [
        { title: 'Vendor-Neutral Expertise', description: 'Integration across diverse technologies and manufacturers.' },
        { title: 'Industrial & Enterprise Experience', description: 'Deep understanding of both OT and IT environments.' },
        { title: 'Scalable Architecture', description: 'Designed to support future growth and expansion.' },
        { title: 'Real-Time Visibility', description: 'Unified operational intelligence across all connected systems.' },
        { title: 'Reduced Operational Complexity', description: 'Single source of truth for data, alarms, and reporting.' }
      ]
    },
    industries: ['Oil & Gas', 'City Gas Distribution (CGD)', 'Utilities', 'Manufacturing', 'Transportation & Logistics', 'Smart Cities'],
    callToAction: {
      title: 'Unlock the Full Value of Your Data',
      description: 'Break down silos, connect critical systems, and create a unified digital ecosystem that delivers real-time visibility, operational efficiency, and business intelligence. Whether integrating industrial equipment, enterprise software, cloud platforms, GIS systems, CCTV infrastructure, or fleet management solutions, Altrex provides the expertise to make your systems work together seamlessly.',
      ctas: ['Discuss Your Integration Requirements', 'Schedule a Technical Consultation', 'Request a Solution Assessment']
    }
  },
  'industrial-iot-edge': {
    slug: 'industrial-iot-edge',
    title: 'Industrial IoT & Edge Integration Services',
    hero: {
      title: 'Industrial IoT & Edge Integration Services',
      subtitle: 'Transform Industrial Data into Real-Time Operational Intelligence',
      description: 'Connect, collect, process, and analyze data from field devices, industrial equipment, remote assets, and operational systems through Altrex Industrial IoT & Edge Integration Services. We help organizations bridge the gap between physical operations and digital intelligence by enabling secure, reliable, and scalable connectivity across industrial environments. From Sensors to Cloud – Delivering End-to-End Industrial Connectivity and Intelligence.',
      ctas: ['Request an Industrial IoT Assessment', 'Schedule a Technical Consultation', 'Talk to Our Experts']
    },
    keyBenefits: ['Real-Time Data Acquisition', 'Remote Asset Monitoring', 'Edge Computing Architecture', 'Multi-Protocol Connectivity', 'Reduced Communication Costs', 'Store & Forward Capability', 'Cloud & Enterprise Integration', 'Scalable Industrial Infrastructure'],
    overview: {
      title: 'Overview',
      subtitle: 'Building the Foundation for Industry 4.0',
      paragraphs: [
        'Industrial organizations generate massive amounts of operational data from equipment, sensors, control systems, and remote assets. However, without proper connectivity and processing infrastructure, valuable insights remain trapped within isolated systems.',
        'Altrex Industrial IoT solutions enable organizations to collect, process, and securely transmit operational data from the edge to centralized platforms, enabling real-time monitoring, predictive maintenance, operational optimization, and business intelligence.'
      ]
    },
    platformCapabilities: [
      { title: 'Field Layer Supported Devices', items: ['PLCs', 'RTUs', 'Flow Computers', 'Pressure Transmitters', 'Temperature Sensors', 'Energy Meters', 'VFDs', 'Tank Gauges', 'Gas Analyzers', 'Environmental Sensors', 'GPS Devices', 'CCTV Systems'] },
      { title: 'Intelligent Edge Capabilities', items: ['Data Collection', 'Data Filtering', 'Protocol Conversion', 'Local Analytics', 'Event Detection', 'Alarm Generation', 'Local Storage', 'Store & Forward Processing'] },
      { title: 'Supported Industrial Protocols', items: ['Modbus RTU', 'Modbus TCP', 'OPC UA', 'OPC DA', 'MQTT', 'BACnet', 'DNP3', 'IEC 60870-5-104', 'REST API', 'HTTP/HTTPS', 'Web Services', 'TCP/IP', 'UDP'] }
    ],
    useCases: [
      { title: 'City Gas Distribution (CGD)', items: ['Mother Station Monitoring', 'Daughter Booster Station Monitoring', 'Pressure Monitoring', 'Flow Monitoring', 'Gas Consumption Analytics', 'Fleet Monitoring', 'Alarm Management'] },
      { title: 'Manufacturing', items: ['Machine Monitoring', 'OEE Monitoring', 'Production Tracking', 'Energy Monitoring', 'Predictive Maintenance'] },
      { title: 'Utilities', items: ['Water Network Monitoring', 'Power Distribution Monitoring', 'Remote Site Monitoring', 'Asset Performance Tracking'] },
      { title: 'Energy & Renewables', items: ['Solar Plant Monitoring', 'Energy Metering', 'Battery Monitoring', 'Renewable Asset Management'] }
    ],
    securityAndCompliance: {
      title: 'Cybersecurity for Industrial IoT',
      description: 'Security Built into Every Layer. Industrial IoT deployments require robust cybersecurity measures to protect critical infrastructure.',
      features: ['Encrypted Communication', 'Secure Device Authentication', 'VPN Connectivity', 'Certificate-Based Security', 'Role-Based Access Control', 'Audit Logging', 'Network Segmentation']
    },
    whyChoose: {
      title: 'Why Choose Altrex for Industrial IoT?',
      items: [
        { title: 'Industrial Expertise', description: 'Deep experience in industrial automation, telemetry, and operational technology environments.' },
        { title: 'Multi-Vendor Compatibility', description: 'Support for equipment and protocols from diverse manufacturers.' },
        { title: 'Scalable Architecture', description: 'From a single site to thousands of distributed assets.' },
        { title: 'Reliable Edge Computing', description: 'Local intelligence ensures continuous operation even during communication failures.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Utilities', 'Manufacturing', 'Smart Cities', 'Transportation & Logistics', 'Water & Wastewater', 'Energy & Renewables', 'Infrastructure Projects', 'Industrial Parks'],
    callToAction: {
      title: 'Connect Your Operations. Unlock Actionable Intelligence.',
      description: 'Whether you need to connect a few field devices or build a large-scale Industrial IoT ecosystem spanning thousands of assets, Altrex delivers secure, scalable, and future-ready Industrial IoT & Edge Integration solutions.',
      ctas: ['Request an Industrial IoT Assessment', 'Schedule a Technical Consultation', 'Talk to Our Experts']
    }
  },
  'cloud-infrastructure': {
    slug: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure Services',
    hero: {
      title: 'Cloud & Infrastructure Services',
      subtitle: 'Secure, Scalable, and High-Performance Infrastructure for Digital Operations',
      description: 'Modern industrial and enterprise applications require reliable, secure, and scalable infrastructure capable of supporting real-time operations, analytics, remote monitoring, and business-critical workloads. Altrex Cloud & Infrastructure Services help organizations design, deploy, manage, and optimize cloud and hybrid infrastructures.',
      ctas: ['Schedule a Cloud Assessment', 'Discuss Infrastructure Requirements', 'Request a Consultation']
    },
    keyBenefits: ['Cloud-Ready Architecture', 'High Availability & Reliability', 'Enterprise-Grade Security', 'Scalable Infrastructure', 'Reduced Operational Costs', 'Disaster Recovery & Backup', 'Hybrid Cloud Solutions', '24x7 Infrastructure Monitoring'],
    overview: {
      title: 'Overview',
      subtitle: 'Infrastructure That Supports Business Growth',
      paragraphs: [
        'As organizations adopt Industrial IoT, cloud applications, analytics platforms, and enterprise systems, traditional IT infrastructure often struggles to meet growing demands for performance, scalability, and security.',
        'Altrex provides comprehensive cloud and infrastructure services that enable organizations to modernize their technology landscape while ensuring operational continuity, cybersecurity, and future scalability.'
      ]
    },
    whatWeDeliver: [
      { title: 'Cloud Strategy & Consulting', description: 'Cloud Readiness Assessment, Migration Roadmaps, and Spend Optimization.' },
      { title: 'Cloud Infrastructure Design', description: 'Public, Private, and Hybrid Cloud Architecture tailored for critical utility loads.' },
      { title: 'High Availability & Continuity', description: 'Redundant Architecture, Database Replication, and Failover Architecture configuration.' },
      { title: 'Backup & Disaster Recovery', description: 'Automated snapshots, database replication backups, and disaster recovery plan testing.' }
    ],
    whyChoose: {
      title: 'Why Choose Altrex Cloud Services?',
      items: [
        { title: 'Cloud & Industrial Expertise', description: 'Strong experience across cloud technologies, industrial systems, and enterprise applications.' },
        { title: 'Vendor-Neutral Approach', description: 'Solutions designed around business requirements rather than vendor limitations.' },
        { title: 'Security-First Design', description: 'Cybersecurity standards integrated natively into every cloud infrastructure deployment.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Utilities', 'Manufacturing', 'Smart Cities', 'Transportation & Logistics', 'Energy & Renewables'],
    callToAction: {
      title: 'Build a Secure and Scalable Digital Foundation',
      description: "Whether you're deploying Industrial IoT platforms, Web SCADA systems, GIS applications, Fleet Management solutions, CCTV Analytics, or enterprise workloads, Altrex provides the cloud and infrastructure expertise required to ensure performance, security, and reliability.",
      ctas: ['Schedule a Cloud Assessment', 'Discuss Infrastructure Requirements', 'Request a Consultation']
    }
  },
  'gis-asset-digitization': {
    slug: 'gis-asset-digitization',
    title: 'GIS & Asset Digitization Services',
    hero: {
      title: 'GIS & Asset Digitization Services',
      subtitle: 'Transform Physical Assets into Intelligent Digital Assets',
      description: 'Gain complete visibility of your infrastructure, equipment, and field assets through advanced Geographic Information System (GIS) and Asset Digitization solutions. Altrex helps organizations create a centralized geospatial view of their assets, enabling better planning, monitoring, maintenance, and operational decision-making.',
      ctas: ['Schedule a GIS Consultation', 'Request Asset Digitization Assessment', 'Talk to Our GIS Experts']
    },
    keyBenefits: ['Centralized Asset Visibility', 'GIS-Based Decision Making', 'Improved Asset Utilization', 'Faster Maintenance Response', 'Accurate Asset Records', 'Digital Twin Readiness', 'Mobile Workforce Enablement', 'Enhanced Regulatory Compliance'],
    overview: {
      title: 'Overview',
      subtitle: 'From Paper Records to Intelligent Digital Infrastructure',
      paragraphs: [
        'Many organizations still manage critical assets using spreadsheets, paper drawings, disconnected databases, and legacy systems. This often leads to inaccurate information, operational inefficiencies, delayed maintenance, and increased costs.',
        'Altrex GIS & Asset Digitization Services help organizations create a comprehensive digital inventory of assets by combining geospatial technology, asset management, field surveys, and operational intelligence into a single integrated platform.'
      ]
    },
    platformCapabilities: [
      { title: 'Digitized Asset Categories', items: ['Pipelines', 'Stations', 'Pressure Regulating Stations', 'Compressors', 'Meters', 'Valves', 'Storage Tanks', 'Utility Infrastructure', 'Buildings', 'Vehicles', 'CCTV Systems', 'Energy Assets'] },
      { title: 'Core GIS Platform Features', items: ['Interactive Maps', 'Multi-Layer Visualization', 'Asset Search', 'Asset Categorization', 'Spatial Analytics', 'Geofencing', 'Route Analysis', 'GIS Dashboards', 'Real-Time Asset Monitoring', 'SCADA & IoT Integration', 'Mobile GIS', 'Historical Playback', 'Asset Lifecycle Tracking'] }
    ],
    whyChoose: {
      title: 'Why Choose Altrex for GIS?',
      items: [
        { title: 'Industry-Specific Expertise', description: 'Deep understanding of linear pipeline execution, asset validation, and utility network topography.' },
        { title: 'Real-Time Operational Integration', description: 'Natively connect enterprise GIS architecture with active Web SCADA and IoT streams.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Utilities', 'Smart Cities', 'Manufacturing', 'Transportation & Logistics', 'Infrastructure Development'],
    callToAction: {
      title: 'Build a Digital Map of Your Entire Infrastructure',
      description: 'Whether you manage pipelines, utility networks, industrial facilities, transportation assets, or smart city infrastructure, Altrex GIS & Asset Digitization Services provide the visibility, intelligence, and control needed to optimize operations.',
      ctas: ['Schedule a GIS Consultation', 'Request Asset Digitization Assessment', 'Talk to Our GIS Experts']
    }
  },
  'cctv-video-analytics': {
    slug: 'cctv-video-analytics',
    title: 'CCTV & Video Analytics Services',
    hero: {
      title: 'CCTV & Video Analytics Services',
      subtitle: 'Transform Video Surveillance into Actionable Intelligence',
      description: 'Traditional CCTV systems record events. Altrex CCTV & Video Analytics Solutions go beyond surveillance by converting video streams into real-time operational, safety, and security intelligence. Using AI-powered analytics, intelligent monitoring, and centralized management, organizations can proactively detect incidents, improve safety, enhance security, and optimize operations.',
      ctas: ['Schedule a CCTV Assessment', 'Request a Video Analytics Demo', 'Talk to Our Security Experts']
    },
    keyBenefits: ['Centralized CCTV Monitoring', 'AI-Based Video Analytics', 'Automatic Incident Detection', 'ANPR (Automatic Number Plate Recognition)', 'Safety & Compliance Monitoring', 'Real-Time Alerts & Notifications', 'Remote Monitoring & Investigation', 'Integration with SCADA, GIS & IoT Platforms'],
    overview: {
      title: 'Overview',
      subtitle: 'Intelligent Video Surveillance for Modern Operations',
      paragraphs: [
        'Modern infrastructure facilities generate enormous amounts of video data. Manual monitoring of multiple cameras is inefficient and often leads to missed incidents and delayed response times.',
        'Altrex provides intelligent CCTV and Video Analytics solutions that automatically analyze video feeds, detect events, generate alerts, and integrate with operational systems for faster and more informed decision-making.'
      ]
    },
    platformCapabilities: [
      { title: 'AI-Powered Capabilities', items: ['Intrusion Detection', 'Perimeter Monitoring', 'Loitering Detection', 'Object Detection', 'Abandoned Object Detection', 'Unauthorized Access Detection'] },
      { title: 'Safety Monitoring Engine', items: ['PPE Detection', 'Helmet Detection', 'Safety Vest Detection', 'Restricted Area Entry Detection', 'Unsafe Behavior Identification', 'Workforce Monitoring'] },
      { title: 'ANPR Use Cases', items: ['Vehicle Number Recognition', 'Entry & Exit Monitoring', 'Blacklist / Whitelist Management', 'Cascade Truck Monitoring at CNG Stations'] }
    ],
    whyChoose: {
      title: 'Why Choose Altrex Security Systems?',
      items: [
        { title: 'AI-Powered Intelligence', description: 'Transition your deployment beyond manual feeds toward automated real-time computer vision logic.' },
        { title: 'Integrated Command Centers', description: 'Merge live video infrastructure feeds natively inside interactive spatial layouts and SCADA views.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Manufacturing', 'Transportation & Logistics', 'Smart Cities', 'Utilities'],
    callToAction: {
      title: 'Turn Your CCTV Infrastructure into a Smart Intelligence Platform',
      description: 'Whether you need centralized monitoring, AI-powered video analytics, ANPR, safety compliance monitoring, or a complete command-and-control solution, Altrex delivers scalable and intelligent CCTV solutions.',
      ctas: ['Schedule a CCTV Assessment', 'Request a Video Analytics Demo', 'Talk to Our Security Experts']
    }
  },
  'managed-services-amc': {
    slug: 'managed-services-amc',
    title: 'Managed Services & AMC',
    hero: {
      title: 'Managed Services & AMC',
      subtitle: 'Keep Your Digital Operations Running 24×7 with Expert Support',
      description: 'Deploying a digital platform is only the beginning. Continuous monitoring, maintenance, optimization, security management, and technical support are critical for ensuring long-term reliability and performance. Altrex Managed Services & Annual Maintenance Contracts (AMC) provide proactive support and operational management to maximize system uptime, reduce risks, and ensure uninterrupted business operations.',
      ctas: ['Request AMC Proposal', 'Discuss Support Requirements', 'Schedule a Service Consultation']
    },
    keyBenefits: ['24×7 Technical Support', 'Proactive System Monitoring', 'Preventive Maintenance', 'Reduced Downtime', 'Faster Incident Resolution', 'Software Updates & Upgrades', 'Infrastructure Management', 'SLA-Based Support Services'],
    overview: {
      title: 'Overview',
      subtitle: 'Beyond Implementation – A Long-Term Technology Partner',
      paragraphs: [
        'Industrial and enterprise systems require continuous attention to maintain performance, security, and reliability. Without proper support, organizations face challenges such as unexpected downtime, security vulnerabilities, system degradation, and increased operational costs.',
        'Altrex provides comprehensive Managed Services and AMC solutions that ensure your platforms, applications, infrastructure, and connected assets remain operational, secure, and optimized throughout their lifecycle.'
      ]
    },
    serviceLevels: [
      { title: 'Standard Support', coverage: ['Business Hours Support', 'Email & Ticket Support', 'Remote Assistance'], suitableFor: 'Small Deployments / Non-Critical Applications' },
      { title: 'Enhanced Support', coverage: ['Extended Business Hours', 'Priority Ticket Handling', 'Faster Response Times'], suitableFor: 'Multi-Site Operations / Medium-Sized Enterprises' },
      { title: '24x7 Critical Support', coverage: ['Round-the-Clock Monitoring', 'Emergency Support', 'Dedicated Escalation Path', 'Priority Resolution'], suitableFor: 'Utility Operations / CGD Networks / Critical Infrastructure / Large Enterprises' }
    ],
    amcPackages: [
      { title: 'Software AMC', coverage: ['Technical Support', 'Bug Fixes', 'Updates', 'Performance Reviews'] },
      { title: 'Infrastructure AMC', coverage: ['Server Maintenance', 'Network Maintenance', 'Database Support', 'Security Management'] },
      { title: 'Industrial IoT AMC', coverage: ['Gateway Maintenance', 'Device Monitoring', 'Communication Support', 'Configuration Management'] },
      { title: 'Comprehensive AMC', coverage: ['Applications', 'Infrastructure', 'Security', 'Edge Devices', 'Integration Services'] }
    ],
    whyChoose: {
      title: 'Why Choose Altrex Managed Services?',
      items: [
        { title: 'Proactive Approach', description: 'Identify and resolve infrastructure issues before they disrupt production loads.' },
        { title: 'End-to-End Coverage', description: 'Full architectural visibility scaling across applications, networking layers, down to field components.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Utilities', 'Manufacturing', 'Smart Cities', 'Transportation & Logistics'],
    callToAction: {
      title: 'Focus on Your Operations While We Manage the Technology',
      description: 'Altrex Managed Services & AMC ensure your critical digital platforms remain secure, reliable, and optimized throughout their lifecycle. From proactive monitoring and preventive maintenance to emergency support and continuous improvements, our experts become an extension of your operational team.',
      ctas: ['Request AMC Proposal', 'Discuss Support Requirements', 'Schedule a Service Consultation']
    }
  },
  'training-consulting': {
    slug: 'training-consulting',
    title: 'Training & Consulting Services',
    hero: {
      title: 'Training & Consulting Services',
      subtitle: 'Empower Your Teams. Accelerate Digital Transformation.',
      description: 'Technology investments deliver maximum value only when people, processes, and systems work together effectively. Altrex Training & Consulting Services help organizations build the knowledge, skills, and strategies required to successfully adopt, operate, and optimize digital technologies across industrial, utility, infrastructure, and enterprise environments.',
      ctas: ['Schedule a Consultation', 'Request a Training Program', 'Talk to Our Experts']
    },
    keyBenefits: ['Accelerate Digital Transformation', 'Improve User Adoption', 'Enhance Operational Efficiency', 'Reduce Project Risks', 'Build Internal Competency', 'Increase Return on Investment (ROI)', 'Industry-Specific Expertise', 'Practical, Hands-On Learning'],
    overview: {
      title: 'Overview',
      subtitle: 'Turning Technology Investments into Business Outcomes',
      paragraphs: [
        'Organizations today face increasing pressure to improve efficiency, enhance visibility, reduce operational costs, and make data-driven decisions. However, successful transformation requires more than implementing software and infrastructure—it requires a clear strategy, skilled teams, and well-defined processes.',
        'Altrex provides consulting and training services that help organizations plan, implement, optimize, and sustain digital transformation initiatives.'
      ]
    },
    trainingPrograms: [
      { title: 'Operator Training Topics', topics: ['Dashboard Navigation', 'Alarm Management', 'Report Generation', 'Asset Monitoring', 'Mobile Application Usage', 'Incident Response'] },
      { title: 'Administrator Training Topics', topics: ['User Management', 'Security Configuration', 'System Administration', 'Backup Management', 'Configuration Management', 'Performance Monitoring'] },
      { title: 'Technical Training Topics', topics: ['PLC Communication', 'RTU Integration', 'Industrial Protocols', 'SCADA Systems', 'Industrial IoT Platforms', 'API Integration', 'Database Management', 'Cloud Platforms', 'Cybersecurity Fundamentals'] }
    ],
    whyChoose: {
      title: 'Why Choose Altrex Consulting?',
      items: [
        { title: 'Industry-Focused Expertise', description: 'Deep domain understanding of industrial, utility, and infrastructure operational workflows.' },
        { title: 'Knowledge Transfer Focus', description: 'Structured blueprints engineered to maximize long-term internal operational autonomy.' }
      ]
    },
    industries: ['City Gas Distribution (CGD)', 'Oil & Gas', 'Utilities', 'Manufacturing', 'Transportation & Logistics', 'Smart Cities'],
    callToAction: {
      title: 'Build the Skills and Strategy for Long-Term Success',
      description: 'Whether you are planning a digital transformation initiative, deploying Industrial IoT solutions, modernizing SCADA systems, implementing GIS platforms, or building internal technical expertise, Altrex Training & Consulting Services help you achieve your goals with confidence.',
      ctas: ['Schedule a Consultation', 'Request a Training Program', 'Talk to Our Experts']
    }
  }
};