import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layout/MainLayout";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

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
        path: "/solutions",
        element: <Solutions />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/industries",
        element: <Industries />,
      },
      {
        path: "/contact",
        element: <Contact />,
      }
    ],
  },
]);
