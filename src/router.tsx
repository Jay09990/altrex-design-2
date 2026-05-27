import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layout/MainLayout";
import Product from "./pages/Product";
import Solutions from "./pages/Solutions";
import Company from "./pages/Company";
import Pricing from "./pages/Pricing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/solutions",
        element: <Solutions />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
    ],
  },
]);
