import { Eye, EyeOff, TrendingUp } from "lucide-react";
import "./styles/MonthlyGainsCard.css";

const MonthlyGainsCard = ({ isVisible, toggleVisibility, FormatReal }) => {
  return (
    <div className="gains-summary-card">
      <div className="gains-summary-badge">
        <TrendingUp size={26} />
      </div>

      <div className="summary-copy">
        <p className="summary-kicker">
          Mês Anterior: {isVisible ? FormatReal(2371) : "••••••"}
        </p>
        <h2 className="summary-title">Total de Ganhos Mensal</h2>
        <p className="summary-gain-amount">
          {isVisible ? FormatReal(2121) : "••••••"}
        </p>
      </div>

      <div className="summary-eye">
        <button
          type="button"
          className="summary-eye-button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Ocultar" : "Mostrar"}
        >
          {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>
    </div>
  );
};

export default MonthlyGainsCard;
