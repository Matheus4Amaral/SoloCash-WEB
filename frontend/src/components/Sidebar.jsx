import {
  Home,
  TrendingUp,
  TrendingDown,
  History,
  Grid3X3,
} from "lucide-react";
import "./styles/Sidebar.css";

const navigationItems = [
  { label: "Home", icon: Home, active: false },
  { label: "Ganhos", icon: TrendingUp, active: true },
  { label: "Gastos", icon: TrendingDown, active: false },
  { label: "Histórico", icon: History, active: false },
  { label: "Categorias", icon: Grid3X3, active: false },
];

const Sidebar = () => {
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
        {navigationItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`sidebar-nav-item ${active ? " active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={18} aria-hidden="true" />
            <p>{label}</p>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
