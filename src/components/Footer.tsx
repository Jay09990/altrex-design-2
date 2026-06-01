import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "@/hooks/useTheme";
import darklogo from "@/assets/altrex-logo-bg-black-removebg-blackbg.png";
import lightlogo from "@/assets/altrex-logo-bg-white-removebg-whitebg.png";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-black/[0.08] bg-[var(--bg-void)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Top Section */}
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={theme === "dark" ? darklogo : lightlogo}
                alt="Altrex Logo"
                className="h-12 w-auto object-contain"
              />

              <div className="hidden sm:block">
                <h1 className="text-md font-bold">
                  Altrex
                </h1>
                <p className="text-xs text-[var(--text-secondary)]">
                  Altrex Digital Platforms Pvt Ltd
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-7">
              Build scalable realtime applications with modern messaging, IoT
              connectivity, and distributed cloud infrastructure.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold">
                Subscribe to our newsletter
              </h3>

              <div className="flex flex-col gap-3 sm:flex-row">

                <Input placeholder="Enter your email" />

                <Button>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Integrations
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  API Reference
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Community
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Company
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-black/[0.08] pt-8 md:flex-row md:items-center">
          <p className="text-sm text-[var(--text-secondary)]">
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
