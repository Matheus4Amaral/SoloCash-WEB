import { Trash2, X } from "lucide-react";
import "./styles/RemoveSpent.css";

const RemoveSpent = ({ isOpen, spent, onClose, onConfirm }) => {
  if (!isOpen || !spent) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-card remove-modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close-button" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>

        <p className="modal-kicker danger-kicker">Atenção</p>

        <h2 className="modal-title remove-title">
          Deseja mesmo excluir “{spent.title}”?
        </h2>

        <div className="modal-actions remove-actions">
          <button
            type="button"
            className="modal-spentbutton confirm-danger"
            onClick={onConfirm}
          >
            <Trash2 size={20} aria-hidden="true" />
            SIM
          </button>

          <button
            type="button"
            className="modal-spentbutton cancel"
            onClick={onClose}
          >
            NÃO
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSpent;
