import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // If a smooth-scroller (lenis) is used, prefer its API so we don't fight it.
    const lenis = (window as any).lenis as
      | { scrollTo: (target: Element | number, opts?: any) => void }
      | undefined;

    try {
      if (lenis && typeof lenis.scrollTo === "function") {
        // lenis accepts an element or number; scroll to top instantly.
        // Pass a short duration to ensure a jump rather than a smooth glide.
        lenis.scrollTo(0, { duration: 0 });
      } else {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  return (
    <div className="relative flex min-h-screen flex-col [overflow-x:clip] bg-background text-foreground">
      {/* Custom Cursor */}
      <CustomCursor />
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
