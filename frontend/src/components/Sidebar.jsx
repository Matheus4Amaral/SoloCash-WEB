import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  TrendingUp,
  TrendingDown,
  History,
  Grid3X3,
} from "lucide-react";
import "./styles/Sidebar.css";

const navigationItems = [
  { label: "Home", icon: Home, path: "/home" },
  { label: "Ganhos", icon: TrendingUp, path: "/gains" },
  { label: "Gastos", icon: TrendingDown, path: "/spents" },
  { label: "Histórico", icon: History, path: "/history" },
  { label: "Categorias", icon: Grid3X3, path: "/categories" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <img
            src="/icon.png"
            alt="Logo SoloCash"
            className="sidebar-logo-img"
          />
        </div>
        <div>
          <h2 className="sidebar-title">SoloCash</h2>
          <p className="sidebar-subtitle">Controle financeiro</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegação principal">
        {navigationItems.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={label}
              type="button"
              className={`sidebar-nav-item ${active ? " active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={() => navigate(path)}
            >
              <Icon size={18} aria-hidden="true" />
              <p>{label}</p>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;