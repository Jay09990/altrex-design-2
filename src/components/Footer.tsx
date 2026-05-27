import { FiMail } from "react-icons/fi";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Top Section */}
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Button size="icon-lg">A</Button>

              <div className="hidden sm:block">
                <h1 className="text-md font-bold">
                  Altrex
                </h1>
                <p className="text-xs text-gray-500">
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

                <Input placeholder="Enter your email" className="py-6"/>

                <Button className="px-4 py-6">
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
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-gray-200 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-gray-500">
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
