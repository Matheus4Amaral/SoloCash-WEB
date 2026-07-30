import { ArrowDownRight, Pencil, Trash2 } from "lucide-react";
import "./styles/CategoryCard.css";

const CategoryCard = ({ title, limit, onEdit, onDelete }) => {
  return (
    <div className="category-row">
      <div className="category-content">
        <h3>{title}</h3>
      </div>

      <strong className="category-limit">{limit}</strong>

      <div className="category-actions">
        <button
          type="button"
          className="category-action-button"
          aria-label={`Editar ${title}`}
          onClick={onEdit}
        >
          <Pencil size={18} />
        </button>
        <button
          type="button"
          className="category-action-button danger"
          aria-label={`Excluir ${title}`}
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
