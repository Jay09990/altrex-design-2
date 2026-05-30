import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { HOME_CHAPTERS } from "@/data/homeChapters";
import ThemeToggle from "@/components/ThemeToggle";
// Add this import at the top
import { useTheme } from "@/hooks/useTheme";

import darklogo from "@/assets/altrex-logo-bg-black-removebg-blackbg.png";
import lightlogo from "@/assets/altrex-logo-bg-white-removebg-whitebg.png";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/product" },
    { name: "Solutions", href: "/solutions" },
    { name: "Pricing", href: "/pricing" },
    { name: "Company", href: "/company" },
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

          <Button size="lg" variant="ghost">
            Sign In
          </Button>

          <Button size="lg">Get Started</Button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex items-center justify-center lg:hidden"
        >
          {mobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
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

              {isHome && (
                <div className="border-t border-black/[0.08] pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Chapters
                  </p>

                  <div className="space-y-3">
                    {HOME_CHAPTERS.map((chapter) => (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => {
                          const target = document.getElementById(chapter.id);
                          target?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          setMobileMenu(false);
                        }}
                        className="block text-left text-sm font-medium"
                      >
                        {chapter.number} {chapter.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4">
                <Button variant="ghost">Sign In</Button>

                <Button>Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
