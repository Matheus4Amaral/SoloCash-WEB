import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Alerts from "./pages/Alerts.jsx";
import Categories from "./pages/Categories.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Gains from "./pages/Gains.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Spents from "./pages/Spents.jsx";
import App from "./App.jsx";

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "gains",
        element: <Gains />,
      },
      {
        path: "spents",
        element: <Spents />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
