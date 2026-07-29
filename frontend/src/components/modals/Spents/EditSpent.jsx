import { CalendarDays, Check, X } from "lucide-react";
import { useRef, useState } from "react";
import "./styles/EditSpent.css";
import MonetaryValueInput from "../../MonetaryValueInput.jsx";
import SelectCategory from "../../SelectCategory.jsx";

const EditSpent = ({ isOpen, spent, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(() => ({
    title: spent?.title ?? "",
    amount: spent?.amount ?? "",
    date: spent?.date ?? "",
    category: spent?.category ?? "",
  }));
  const dateInputRef = useRef(null);

  if (!isOpen || !spent) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-card edit-modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close-button" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>

        <h2 className="modal-title">
          Editar Gasto
        </h2>

        <p className="modal-subtitle">
          Altere o título, value e data antes de salvar.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="modal-spent-input"
              placeholder="Digite um título"
              required
            />
          </div>

          <div className="modal-field">
            <MonetaryValueInput
              name="amount"
              value={formData.amount}
              onValueChange={(value) =>
                handleChange({ target: { name: "amount", value } })
              }
              className="modal-spent-input"
              placeholder="Digite o value do gasto"
              required
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
            />

            <button
              type="button"
              className="date-picker-button"
              onClick={openCalendar}
              aria-label="Selecionar data do gasto"
            >
              <CalendarDays size={28} aria-hidden="true" />
              <p>{formatDisplayDate(formData.date)}</p>
            </button>

            <SelectCategory
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="modal-select"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="modal-spent-button confirm">
              <Check size={20} aria-hidden="true" />
              Salvar alterações
            </button>

            <button
              type="button"
              className="modal-spent-button cancel"
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

export default EditSpent;
