import { ArrowUpRight } from "lucide-react";
import "./styles/GainsCard.css";

const GainsCard = ({ amount = 0, active = false, onClick, FormatReal }) => (
  <button
    type="button"
    className={`total-gain-summary-card total-gain-summary-card-gain ${active ? "total-gain-summary-card-active" : ""}`}
    onClick={onClick}
  >
    <div className="total-gain-summary-card-icon" aria-hidden>
      <ArrowUpRight size={22} />
    </div>
    <div className="total-gain-summary-card-content">
      <p className="total-gain-summary-card-label">Entradas</p>
      <p className="total-gain-summary-card-amount">
        {FormatReal(amount)}
      </p>
    </div>
  </button>
);

export default GainsCard;
