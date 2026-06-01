import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layout/MainLayout";
import Projects from "./pages/Projects";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import Loading from "./pages/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/",
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,

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
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/solutions",
        element: <Solutions />,
      },
      {
        path: "/industries",
        element: <Industries />,
      }
    ],
  },
]);
