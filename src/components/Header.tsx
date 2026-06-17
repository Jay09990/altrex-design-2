import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Cpu, 
  Layers, 
  Monitor, 
  MapPin, 
  Truck, 
  Activity, 
  Zap, 
  Bell, 
  BarChart3, 
  ShieldCheck, 
  Video,
  Cloud,
  Settings,
  Sliders,
  Briefcase,
  Wrench,
  GraduationCap,
  Flame,
  Droplet,
  Factory,
  Building
} from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import lightlogo from "@/assets/AltrexLogoTr1.png";
import darklogo from "@/assets/AltrexLogoTr2.png";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const location = useLocation(); 
  
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Solutions", href: "#" },
    { name: "Services", href: "#" },
    { name: "Industries", href: "#" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Solutions Data Setup
  const solutionCategories = [
    {
      title: "Core Infrastructure",
      items: [
        { name: "Connectivity & Data Acquisition", href: "/solutions/connectivity", icon: Cpu },
        { name: "Industrial IoT Platform", href: "/solutions/iiot-platform", icon: Layers },
        { name: "Web SCADA & Real-Time Monitoring", href: "/solutions/web-scada", icon: Monitor },
        { name: "GIS & Asset Management", href: "/solutions/gis-asset-management", icon: MapPin },
      ]
    },
    {
      title: "Operations & Efficiency",
      items: [
        { name: "Fleet Management & VTS", href: "/solutions/fleet-management", icon: Truck },
        { name: "Automatic Meter Reading (AMR)", href: "/solutions/amr", icon: Activity },
        { name: "Energy Management", href: "/solutions/energy-management", icon: Zap },
        { name: "Alarm & Event Management", href: "/solutions/alarm-management", icon: Bell },
      ]
    },
    {
      title: "Intelligence & Security",
      items: [
        { name: "Analytics & Reporting", href: "/solutions/analytics-reporting", icon: BarChart3 },
        { name: "Cybersecurity & Access Control", href: "/solutions/cybersecurity", icon: ShieldCheck },
        { name: "CCTV & Video Surveillance Management", href: "/solutions/cctv-surveillance", icon: Video },
      ]
    }
  ];

  // Services Data Setup
  const serviceCategories = [
    {
      title: "Core Deployments",
      items: [
        { name: "SaaS Platform Services", href: "/services/saas-platform", icon: Cloud },
        { name: "Turnkey Project Implementation", href: "/services/turnkey-implementation", icon: Briefcase },
        { name: "Managed Services & AMC", href: "/services/managed-services-amc", icon: Wrench },
      ]
    },
    {
      title: "Integration Services",
      items: [
        { name: "System Integration Services", href: "/services/system-integration", icon: Sliders },
        { name: "Industrial IoT & Edge Integration", href: "/services/industrial-iot-edge", icon: Cpu },
        { name: "CCTV & Video Analytics Services", href: "/services/cctv-video-analytics", icon: Video },
      ]
    },
    {
      title: "Infrastructure & Advisory",
      items: [
        { name: "Cloud & Infrastructure Services", href: "/services/cloud-infrastructure", icon: Settings },
        { name: "GIS & Asset Digitization", href: "/services/gis-asset-digitization", icon: MapPin },
        { name: "Training & Consulting", href: "/services/training-consulting", icon: GraduationCap },
      ]
    }
  ];

  // Industry Data Setup
  const industryCategories = [
    {
      title: "Energy & Resources",
      items: [
        { name: "City Gas Distribution (CGD)", href: "/industries/cgd", icon: Flame },
        { name: "Oil & Gas", href: "/industries/oil-gas", icon: Settings },
        { name: "Power & Utilities", href: "/industries/power-utilities", icon: Zap },
      ]
    },
    {
      title: "Infrastructure & Automation",
      items: [
        { name: "Water & Wastewater", href: "/industries/water-wastewater", icon: Droplet },
        { name: "Renewable Energy", href: "/industries/renewable-energy", icon: Activity },
        { name: "Manufacturing & Industrial Automation", href: "/industries/manufacturing-automation", icon: Factory },
      ]
    },
    {
      title: "Smart Ecosystems",
      items: [
        { name: "Logistics & Transportation", href: "/industries/logistics-transportation", icon: Truck },
        { name: "Smart Cities", href: "/industries/smart-cities", icon: Building },
        { name: "Infrastructure & Utilities", href: "/industries/infrastructure-utilities", icon: Layers },
      ]
    }
  ];

  const { theme } = useTheme();

  // Solutions Hover Event Handlers
  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  // Services Hover Event Handlers
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  // Industries Hover Event Handlers
  const handleIndustriesEnter = () => {
    if (industriesTimeoutRef.current) clearTimeout(industriesTimeoutRef.current);
    setIndustriesOpen(true);
  };

  const handleIndustriesLeave = () => {
    industriesTimeoutRef.current = setTimeout(() => {
      setIndustriesOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (industriesTimeoutRef.current) clearTimeout(industriesTimeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
          ? "border-b bg-card/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Go to home"
          onClick={() => setMobileMenu(false)}
          className="flex items-center"
        >
          <img
            src={theme === "dark" ? darklogo : lightlogo}
            alt="Altrex Logo"
            className="h-5 w-auto object-contain transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => {
            const isActive = location.pathname.startsWith(item.href);

            // Solutions Dynamic Menu Render
            if (item.name === "Solutions") {
              return (
                <div
                  key={item.name}
                  className="relative h-16 flex items-center"
                  onMouseEnter={handleSolutionsEnter}
                  onMouseLeave={handleSolutionsLeave}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 relative z-50 ${
                      isActive || solutionsOpen ? "text-[var(--accent-violet)]" : "hover:text-[var(--accent-violet)]"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180 text-[var(--accent-violet)]" : ""}`} />
                  </Link>

                  {solutionsOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 w-[760px] rounded-xl border border-[var(--border-subtle)] bg-card p-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-3 gap-6">
                        {solutionCategories.map((category) => (
                          <div key={category.title} className="flex flex-col gap-3">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground border-b border-[var(--border-subtle)] pb-2">
                              {category.title}
                            </h4>
                            <ul className="flex flex-col gap-1">
                              {category.items.map((subItem) => {
                                const Icon = subItem.icon;
                                return (
                                  <li key={subItem.name}>
                                    <Link
                                      to={subItem.href}
                                      onClick={() => setSolutionsOpen(false)}
                                      className="group flex items-center gap-2.5 rounded-lg p-2 transition-all duration-150 hover:bg-[var(--accent-violet)]/5"
                                    >
                                      <div className="rounded-md bg-card border border-[var(--border-subtle)] p-1.5 text-muted-foreground group-hover:border-[var(--accent-violet)]/30 group-hover:text-[var(--accent-violet)] transition-colors shadow-sm">
                                        <Icon className="h-3.5 w-3.5" />
                                      </div>
                                      <span className="text-xs font-medium text-inherit group-hover:text-[var(--accent-violet)] transition-colors leading-snug">
                                        {subItem.name}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Services Dynamic Menu Render
            if (item.name === "Services") {
              return (
                <div
                  key={item.name}
                  className="relative h-16 flex items-center"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 relative z-50 ${
                      isActive || servicesOpen ? "text-[var(--accent-violet)]" : "hover:text-[var(--accent-violet)]"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[var(--accent-violet)]" : ""}`} />
                  </Link>

                  {servicesOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 w-[760px] rounded-xl border border-[var(--border-subtle)] bg-card p-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-3 gap-6">
                        {serviceCategories.map((category) => (
                          <div key={category.title} className="flex flex-col gap-3">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground border-b border-[var(--border-subtle)] pb-2">
                              {category.title}
                            </h4>
                            <ul className="flex flex-col gap-1">
                              {category.items.map((subItem) => {
                                const Icon = subItem.icon;
                                return (
                                  <li key={subItem.name}>
                                    <Link
                                      to={subItem.href}
                                      onClick={() => setServicesOpen(false)}
                                      className="group flex items-center gap-2.5 rounded-lg p-2 transition-all duration-150 hover:bg-[var(--accent-violet)]/5"
                                    >
                                      <div className="rounded-md bg-card border border-[var(--border-subtle)] p-1.5 text-muted-foreground group-hover:border-[var(--accent-violet)]/30 group-hover:text-[var(--accent-violet)] transition-colors shadow-sm">
                                        <Icon className="h-3.5 w-3.5" />
                                      </div>
                                      <span className="text-xs font-medium text-inherit group-hover:text-[var(--accent-violet)] transition-colors leading-snug">
                                        {subItem.name}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Industries Dynamic Menu Render
            if (item.name === "Industries") {
              return (
                <div
                  key={item.name}
                  className="relative h-16 flex items-center"
                  onMouseEnter={handleIndustriesEnter}
                  onMouseLeave={handleIndustriesLeave}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 relative z-50 ${
                      isActive || industriesOpen ? "text-[var(--accent-violet)]" : "hover:text-[var(--accent-violet)]"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${industriesOpen ? "rotate-180 text-[var(--accent-violet)]" : ""}`} />
                  </Link>

                  {industriesOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 w-[760px] rounded-xl border border-[var(--border-subtle)] bg-card p-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-3 gap-6">
                        {industryCategories.map((category) => (
                          <div key={category.title} className="flex flex-col gap-3">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground border-b border-[var(--border-subtle)] pb-2">
                              {category.title}
                            </h4>
                            <ul className="flex flex-col gap-1">
                              {category.items.map((subItem) => {
                                const Icon = subItem.icon;
                                return (
                                  <li key={subItem.name}>
                                    <Link
                                      to={subItem.href}
                                      onClick={() => setIndustriesOpen(false)}
                                      className="group flex items-center gap-2.5 rounded-lg p-2 transition-all duration-150 hover:bg-[var(--accent-violet)]/5"
                                    >
                                      <div className="rounded-md bg-card border border-[var(--border-subtle)] p-1.5 text-muted-foreground group-hover:border-[var(--accent-violet)]/30 group-hover:text-[var(--accent-violet)] transition-colors shadow-sm">
                                        <Icon className="h-3.5 w-3.5" />
                                      </div>
                                      <span className="text-xs font-medium text-inherit group-hover:text-[var(--accent-violet)] transition-colors leading-snug">
                                        {subItem.name}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-[var(--accent-violet)]" : "hover:text-[var(--accent-violet)]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
        </div>

        {/* Mobile Button */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex items-center justify-center lg:hidden"
        >
          {mobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-[var(--border-subtle)] bg-card lg:hidden">
          <div className="space-y-4 px-6 py-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Theme
                </p>
                <ThemeToggle />
              </div>

              {navLinks.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block text-sm font-medium transition-colors ${
                      isActive ? "text-[var(--accent-violet)]" : "hover:text-[var(--accent-violet)]"
                    }`}
                    onClick={() => setMobileMenu(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;