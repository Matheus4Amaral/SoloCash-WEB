import { Plus, X } from "lucide-react";
import { useState } from "react";
import "./styles/AddCategory.css";
import MonetaryValueInput from "../../MonetaryValueInput.jsx";

const inicialState = {
  title: "",
  limit: "",
};

const AddCategory = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(inicialState);

  if (!isOpen) {
    return null;
  }

  const cleanForm = () => {
    setFormData(inicialState);
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
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={handleClose}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2 className="modal-title">
          Adicionar Categoria
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
            <MonetaryValueInput
              name="limit"
              value={formData.limit}
              onValueChange={(value) =>
                handleChange({ target: { name: "limit", value } })
              }
              placeholder="Digite o valor do limite (opcional)"
              className="modal-input"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="modal-button confirm">
              <Plus size={20} aria-hidden="true" />
              Adicionar categoria
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

export default AddCategory;
