import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/useTheme";
import lightlogo from "@/assets/AltrexLogoTr1.png";
import darklogo from "@/assets/AltrexLogoTr2.png";

const solutionLinks = [
  { name: "Connectivity & Data Acquisition", href: "/solutions/connectivity" },
  { name: "Industrial IoT Platform", href: "/solutions/iiot-platform" },
  { name: "Web SCADA & Real-Time Monitoring", href: "/solutions/web-scada" },
  { name: "GIS & Asset Management", href: "/solutions/gis-asset-management" },
  { name: "Fleet Management & VTS", href: "/solutions/fleet-management" },
  { name: "Automatic Meter Reading (AMR)", href: "/solutions/amr" },
  { name: "Energy Management", href: "/solutions/energy-management" },
  { name: "Alarm & Event Management", href: "/solutions/alarm-management" },
  { name: "Analytics & Reporting", href: "/solutions/analytics-reporting" },
  { name: "Cybersecurity & Access Control", href: "/solutions/cybersecurity" },
  { name: "CCTV & Video Surveillance", href: "/solutions/cctv-surveillance" },
];

const serviceLinks = [
  { name: "SaaS Platform Services", href: "/services/saas-platform" },
  { name: "Turnkey Project Implementation", href: "/services/turnkey-implementation" },
  { name: "Managed Services & AMC", href: "/services/managed-services-amc" },
  { name: "System Integration Services", href: "/services/system-integration" },
  { name: "Industrial IoT & Edge Integration", href: "/services/industrial-iot-edge" },
  { name: "CCTV & Video Analytics Services", href: "/services/cctv-video-analytics" },
  { name: "Cloud & Infrastructure Services", href: "/services/cloud-infrastructure" },
  { name: "GIS & Asset Digitization", href: "/services/gis-asset-digitization" },
  { name: "Training & Consulting", href: "/services/training-consulting" },
];

const industryLinks = [
  { name: "City Gas Distribution (CGD)", href: "/industries/cgd" },
  { name: "Oil & Gas", href: "/industries/oil-gas" },
  { name: "Power & Utilities", href: "/industries/power-utilities" },
  { name: "Water & Wastewater", href: "/industries/water-wastewater" },
  { name: "Renewable Energy", href: "/industries/renewable-energy" },
  { name: "Manufacturing & Industrial Automation", href: "/industries/manufacturing-automation" },
  { name: "Logistics & Transportation", href: "/industries/logistics-transportation" },
  { name: "Smart Cities", href: "/industries/smart-cities" },
  { name: "Infrastructure & Utilities", href: "/industries/infrastructure-utilities" },
];

const linkClass =
  "text-sm text-muted-foreground hover:text-orange-500 transition-colors duration-150 leading-snug block py-0.5";

const SectionLinks = ({ links }: { links: { name: string; href: string }[] }) => (
  <ul
    style={{
      columns: 1,
      columnGap: "1.75rem",
    }}
  >
    {links.map((link) => (
      <li key={link.href} style={{ breakInside: "avoid", marginBottom: "0.6rem" }}>
        <Link to={link.href} className={linkClass}>
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className="bg-white dark:bg-black z-10 mt-20"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
      }}
    >
      {/* ── Brand row ── */}
      <div
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div
          className="py-10"
          style={{
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          <img
            src={isDark ? darklogo : lightlogo}
            alt="Altrex Logo"
            className="h-5 w-auto object-contain mb-4"
          />
          <p className="text-sm text-muted-foreground max-w-sm font-medium leading-relaxed">
            Build scalable realtime applications with modern messaging, IoT
            connectivity, and distributed cloud infrastructure.
          </p>
        </div>

        {/* ── Bento panels ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3">

          {/* Solutions */}
          <div
            className="py-10 lg:pr-10"
            style={{
              borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            }}
          >
            <h3 className="mb-5 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-500">
              Solutions
            </h3>
            <SectionLinks links={solutionLinks} />
          </div>

          {/* Services */}
          <div
            className="py-10 lg:px-10"
            style={{
              borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`
            }}
          >
            <h3 className="mb-5 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-500">
              Services
            </h3>
            <SectionLinks links={serviceLinks} />
          </div>

          {/* Industries */}
          <div
            className="py-10 lg:pl-10"
          >
            <h3 className="mb-5 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-500">
              Industries
            </h3>
            <SectionLinks links={industryLinks} />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center"
          style={{
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          <p className="text-sm text-muted-foreground">
            © 2026 Altrex. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Button size="icon-lg" variant="outline">
              <FaGithub />
            </Button>
            <Button size="icon-lg" variant="outline">
              <FaXTwitter />
            </Button>
            <Button size="icon-lg" variant="outline">
              <FaLinkedinIn />
            </Button>
            <Button size="icon-lg" variant="outline">
              <FiMail />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;