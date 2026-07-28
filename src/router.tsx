import { createBrowserRouter, useParams } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layout/MainLayout";
import Contact from "./pages/Contact";
import SolutionPage from "./pages/SolutionPage";
import SolutionsOverview from "./pages/SolutionsOverview";
import ServicesOverview from "./pages/ServicesOverview";
import IndustriesOverview from "./pages/IndustriesOverview";
import { ServicePage } from "./pages/ServicePage";
import IndustryPage from "./pages/IndustryPage";

const SolutionPageWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <SolutionPage key={slug} />;
};

const ServicePageWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ServicePage key={slug} />;
}

const IndustryPageWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <IndustryPage key={slug} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/solutions", element: <SolutionsOverview /> },
      { path: "/solutions/:slug", element: <SolutionPageWithKey /> },
      { path: "/services", element: <ServicesOverview /> },
      {
        path: 'services/:slug',
        element: <ServicePageWithKey />
      },
      { path: "/industries", element: <IndustriesOverview /> },
      {
        path: 'industries/:slug',
        element: <IndustryPageWithKey />
      }
    ],
  },
]);