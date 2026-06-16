import React from "react";
import ReactDOM from "react-dom/client";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./global.css";
import App from "./App";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LoadingProvider } from "@/context/LoadingContext";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
  smoothWheel: true,
});

// Feed Lenis into GSAP ScrollTrigger
function raf(time: number) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Make lenis globally accessible for components
(window as any).lenis = lenis;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>
);
