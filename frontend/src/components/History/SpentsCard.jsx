import { ArrowDownRight } from "lucide-react";
import "./styles/SpentsCard.css";

const SpentsCard = ({ amount = 0, active = false, onClick, FormatReal }) => (
  <button
    type="button"
    className={`total-spent-summary-card total-spent-summary-card-spent ${active ? "total-spent-summary-card-active" : ""}`}
    onClick={onClick}
  >
    <div className="total-spent-summary-card-icon" aria-hidden>
      <ArrowDownRight size={22} />
    </div>
    <div className="total-spent-summary-card-content">
      <p className="total-spent-summary-card-label">Saídas</p>
      <p className="total-spent-summary-card-amount">
        {FormatReal(amount)}
      </p>
    </div>
  </button>
);

export default SpentsCard;
