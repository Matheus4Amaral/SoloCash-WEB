import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Alertas from "./pages/Alertas.jsx";
import AlertasProprios from "./pages/AlertasProprios.jsx";
import Categorias from "./pages/Categorias.jsx";
import Ganhos from "./pages/Ganhos.jsx";
import Gastos from "./pages/Gastos.jsx";
import Historico from "./pages/Historico.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import RedefinirSenha from "./pages/RedefinirSenha.jsx";
import Registrar from "./pages/Registrar.jsx";

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/alertas",
    element: <Alertas />,
  },
  {
    path: "/alertasproprios",
    element: <AlertasProprios />,
  },
  {
    path: "/categorias",
    element: <Categorias />,
  },
  {
    path: "/ganhos",
    element: <Ganhos />,
  },
  {
    path: "/gastos",
    element: <Gastos />,
  },
  {
    path: "/historico",
    element: <Historico />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/redefinirsenha",
    element: <RedefinirSenha />,
  },
  {
    path: "/registrar",
    element: <Registrar />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
