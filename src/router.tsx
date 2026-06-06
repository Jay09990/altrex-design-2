import { createBrowserRouter, useParams } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layout/MainLayout";
import Industries from "./pages/Industries";
import Contact from "./pages/Contact";
import SolutionPage from "./pages/SolutionPage";

const SolutionPageWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <SolutionPage key={slug} />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/industries", element: <Industries /> },
      { path: "/contact", element: <Contact /> },
      { path: "/solutions/:slug", element: <SolutionPageWithKey /> },
    ],
  },
]);