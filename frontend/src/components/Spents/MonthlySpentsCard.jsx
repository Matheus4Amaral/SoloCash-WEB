import { Eye, EyeOff, TrendingDown } from "lucide-react";
import "./styles/MonthlySpentsCard.css";

const MonthlySpentsCard = ({ isVisible, toggleVisibility, FormatReal }) => {
  return (
    <div className="spents-summary-card">
      <div className="spents-summary-badge">
        <TrendingDown size={26} />
      </div>

      <div className="summary-copy">
        <p className="summary-kicker">
          Mês Anterior: {isVisible ? FormatReal(2000.69) : "••••••"}
        </p>
        <h2 className="summary-title">Total de Gastos Mensal</h2>
        <p className="summary-spent-amount">
          {isVisible ? FormatReal(70.88) : "••••••"}
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

export default MonthlySpentsCard;
