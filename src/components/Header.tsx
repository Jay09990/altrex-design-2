import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "@/components/ThemeToggle";
// Add this import at the top
import { useTheme } from "@/hooks/useTheme";

import darklogo from "@/assets/altrex-logo-bg-black-removebg-blackbg.png";
import lightlogo from "@/assets/altrex-logo-bg-white-removebg-whitebg.png";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Solutions", href: "/solutions" },
    { name: "Industries", href: "/industries" },
    { name: "Contact Us", href: "/contact" },
  ];

  const { theme } = useTheme();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
          ? "border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
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
            className="h-30 w-auto object-contain transition-opacity duration-300"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-medium">
              {item.name}
            </Link>
          ))}
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
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] lg:hidden">
          <div className="space-y-4 px-6 py-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Theme
                </p>
                <ThemeToggle />
              </div>

              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-sm font-medium"
                  onClick={() => setMobileMenu(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
