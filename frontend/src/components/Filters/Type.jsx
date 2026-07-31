import { TrendingDown, TrendingUp } from "lucide-react";
import "./styles/Type.css";

const Type = ({ value = "all", onChange }) => {
  const handleChange = (v) => {
    if (typeof onChange === "function") onChange(v);
  };

  return (
    <div className="type-wrapper" role="tablist" aria-label="Tipo de transação">
      <button
        type="button"
        className={`type-button ${value === "all" ? "active" : ""}`}
        onClick={() => handleChange("all")}
        aria-pressed={value === "all"}
      >
        Todos
      </button>

      <button
        type="button"
        className={`type-button ${value === "gain" ? "active" : ""}`}
        onClick={() => handleChange("gain")}
        aria-pressed={value === "gain"}
      >
        <TrendingUp size={14} aria-hidden="true" />
        Ganhos
      </button>

      <button
        type="button"
        className={`type-button ${value === "spent" ? "active" : ""}`}
        onClick={() => handleChange("spent")}
        aria-pressed={value === "spent"}
      >
        <TrendingDown size={14} aria-hidden="true" />
        Gastos
      </button>
    </div>
  );
};

export default Type;
