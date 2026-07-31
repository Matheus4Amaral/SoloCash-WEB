import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import "./styles/SelectCategory.css";

const categories = [
  "Alimentação",
  "Aluguel",
  "Contas",
  "Lazer",
  "Mercado",
  "Saúde",
  "Transporte",
];

const SelectCategory = ({ name = "category", value, onChange, required = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="select-category-wrapper">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="select-category"
        required={required}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <span className="select-category-icon" aria-hidden="true">
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </span>
    </div>
  );
};

export default SelectCategory;
