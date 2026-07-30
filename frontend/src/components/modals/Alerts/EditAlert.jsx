import { CalendarDays, Check, X } from "lucide-react";
import { useRef, useState } from "react";
import "./styles/EditAlert.css";

const EditAlert = ({ isOpen, alert, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(() => ({
    title: alert?.title ?? "",
    description: alert?.description ?? "",
    date: alert?.date ?? "",
  }));
  const dateInputRef = useRef(null);

  if (!isOpen || !alert) {
    return null;
  }

  const formatDisplayDate = (value) => {
    if (!value) {
      return "Selecionar data";
    }

    const [ano, mes, dia] = value.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const openCalendar = () => {
    const input = dateInputRef.current;

    if (!input) {
      return;
    }

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-card edit-modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close-button" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>

        <h2 className="modal-title">
          Editar Alerta
        </h2>

        <p className="modal-subtitle">
          Altere o título, descrição e data antes de salvar.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="modal-input"
              placeholder="Digite um título"
              required
            />
          </div>

          <div className="modal-field">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="modal-input"
              placeholder="Digite uma descrição (opcional)"
            />
          </div>

          <div className="modal-date-row">
            <input
              ref={dateInputRef}
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="visually-hidden-date-input"
              aria-hidden="true"
              tabIndex={-1}
              required
            />

            <button
              type="button"
              className="date-picker-button"
              onClick={openCalendar}
              aria-label="Selecionar data do ganho"
            >
              <CalendarDays size={28} aria-hidden="true" />
              <p>{formatDisplayDate(formData.date)}</p>
            </button>
          </div>

          <div className="modal-actions">
            <button type="submit" className="modal-button confirm">
              <Check size={20} aria-hidden="true" />
              Salvar alterações
            </button>

            <button
              type="button"
              className="modal-button cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAlert;
