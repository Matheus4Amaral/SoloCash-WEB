import { ArrowDownRight, Pencil, Trash2 } from "lucide-react";
import FormatDate from "../FormatDate.jsx";
import "./styles/MonthSpentsCard.css";

const MonthSpentsCard = ({ title, amount, date, category, onEdit, onDelete }) => {
  return (
    <div className="spent-row">
      <div className="spent-badge" aria-hidden="true">
        <ArrowDownRight size={18} />
      </div>

      <div className="spent-content">
        <h3>{title}</h3>
        <p className="spent-meta">
          <FormatDate dataISO={date} />
          <p className="spent-category">{category}</p>
        </p>
      </div>

      <strong className="spent-amount">{amount}</strong>

      <div className="spent-actions">
        <button
          type="button"
          className="spent-action-button"
          aria-label={`Editar ${title}`}
          onClick={onEdit}
        >
          <Pencil size={18} />
        </button>
        <button
          type="button"
          className="spent-action-button danger"
          aria-label={`Excluir ${title}`}
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MonthSpentsCard;
