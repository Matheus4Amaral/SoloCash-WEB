import { Check, X } from "lucide-react";
import { useState } from "react";
import "./styles/EditCategory.css";
import MonetaryValueInput from "../../MonetaryValueInput.jsx";

const EditCategory = ({ isOpen, category, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(() => ({
    title: category?.title ?? "",
    limit: category?.limit ?? "",
  }));

  if (!isOpen || !category) {
    return null;
  }

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
          Editar Categoria
        </h2>

        <p className="modal-subtitle">
          Altere o título e o limite (opcional) antes de salvar.
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
            <MonetaryValueInput
              name="limit"
              value={formData.limit}
              onValueChange={(value) =>
                handleChange({ target: { name: "limit", value } })
              }
              className="modal-input"
              placeholder="Digite o valor da categoria"
            />
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

export default EditCategory;
