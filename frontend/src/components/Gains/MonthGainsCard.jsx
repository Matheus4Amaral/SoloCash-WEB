import { ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import FormatDate from "../FormatDate.jsx";
import "./styles/MonthGainsCard.css";

const MonthGainsCard = ({ title, amount, date, onEdit, onDelete }) => {
  return (
    <div className="gain-row">
      <div className="gain-badge" aria-hidden="true">
        <ArrowUpRight size={18} />
      </div>

      <div className="gain-content">
        <h3>{title}</h3>
        <p>
          <FormatDate dataISO={date} />
        </p>
      </div>

      <strong className="gain-amount">{amount}</strong>

      <div className="gain-actions">
        <button
          type="button"
          className="gain-action-button"
          aria-label={`Editar ${title}`}
          onClick={onEdit}
        >
          <Pencil size={18} />
        </button>
        <button
          type="button"
          className="gain-action-button danger"
          aria-label={`Excluir ${title}`}
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MonthGainsCard;
