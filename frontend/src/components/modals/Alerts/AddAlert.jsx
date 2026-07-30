import { CalendarDays, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import "./styles/AddAlert.css";

const inicialState = {
  title: "",
  description: "",
  date: "",
};

const AddAlert = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(inicialState);
  const dateInputRef = useRef(null);

  if (!isOpen) {
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

  const cleanForm = () => {
    setFormData(inicialState);
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
    const payload = formData;
    cleanForm();
    onSubmit(payload);
  };

  const handleClose = () => {
    cleanForm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div
        className="modal-card add-modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={handleClose}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2 className="modal-title">
          Adicionar Alerta
        </h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Digite um título"
              className="modal-input"
              required
            />
          </div>

          <div className="modal-field">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Digite uma descrição (opcional)"
              className="modal-input"
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
              aria-label="Selecionar data do alerta"
            >
              <CalendarDays size={28} aria-hidden="true" />
              <p>{formatDisplayDate(formData.date)}</p>
            </button>
          </div>

          <div className="modal-actions">
            <button type="submit" className="modal-button confirm">
              <Plus size={20} aria-hidden="true" />
              Adicionar alerta
            </button>

            <button
              type="button"
              className="modal-button cancel"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlert;
