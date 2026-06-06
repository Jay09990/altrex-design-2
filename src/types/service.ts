export interface ServiceCapabilityGroup {
  title: string;
  items: string[];
}

export interface ServiceDeliveryItem {
  title: string;
  description: string;
}

export interface ActivityGroup {
  title: string;
  activities: string[];
  deliverables?: string[];
  designServices?: string[];
  outputs?: string[];
  typicalComponents?: Record<string, string[]>;
  servicesInclude?: string[];
  deploymentTypes?: string[];
  solutionsDelivered?: string[];
  customizationServices?: string[];
}

export interface ServiceData {
  slug: string;
  title: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    badge?: string;
    ctas: string[];
  };
  keyBenefits: string[];
  overview: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
  whatWeDeliver?: ServiceDeliveryItem[];
  platformCapabilities?: ServiceCapabilityGroup[];
  approachSteps?: ActivityGroup[];
  integrationCapabilities?: ServiceCapabilityGroup[];
  commissioningActivities?: {
    activities: string[];
    verificationAreas: string[];
  };
  trainingPrograms?: {
    title: string;
    topics?: string[];
    programs?: Array<{ name: string; items: string[] }>;
  }[];
  securityAndCompliance?: {
    title: string;
    description: string;
    features: string[];
  };
  scalability?: {
    title: string;
    description: string;
    suitableFor: string[];
    summary: string;
  };
  whyChoose: {
    title: string;
    items: string[] | ServiceDeliveryItem[];
  };
  industries: string[];
  useCases?: ServiceCapabilityGroup[];
  managedPortfolio?: ServiceCapabilityGroup[] | ServiceDeliveryItem[];
  serviceLevels?: Array<{ title: string; coverage: string[]; suitableFor: string }>;
  amcPackages?: Array<{ title: string; coverage: string[] }>;
  consultingAreas?: ServiceDeliveryItem[];
  callToAction: {
    title: string;
    description: string;
    ctas: string[];
  };
}