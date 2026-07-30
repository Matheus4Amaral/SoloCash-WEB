import { Pencil, Trash2 } from "lucide-react";
import FormatDate from "../FormatDate.jsx";
import "./styles/OwnNotificationCard.css";

const OwnNotificationCard = ({ title, description, date, onEdit, onDelete }) => {
  return (
    <div className="alert-row">
      <div className="alert-content">
        <div className="alert-title-row">
          <h3 className="alert-title" title={title}>{title}</h3>
          <div className="alert-meta">
            <p className="alert-date">
              <FormatDate dataISO={date} />
            </p>
            <div className="alert-actions">
              <button
                type="button"
                className="alert-action-button"
                aria-label={`Editar ${title}`}
                onClick={onEdit}
              >
                <Pencil size={18} />
              </button>
              <button
                type="button"
                className="alert-action-button danger"
                aria-label={`Excluir ${title}`}
                onClick={onDelete}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
        {description && <p className="alert-description">{description}</p>}
      </div>
    </div>
  );
};

export default OwnNotificationCard;
