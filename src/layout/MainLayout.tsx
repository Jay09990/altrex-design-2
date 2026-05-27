import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCursor from "@/components/CustomCursor";

const MainLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--bg-void)] text-[var(--text-primary)]">
      {/* Custom Cursor */}
      <CustomCursor />
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
