import { forwardRef } from "react";

const normalizeMonetaryValue = (value) => {
  const text = String(value ?? "").replace(/\s+/g, "");

  if (!text) {
    return "";
  }

  const lastSeparator = Math.max(
    text.lastIndexOf(","),
    text.lastIndexOf("."),
  );

  if (lastSeparator === -1) {
    return text.replace(/[^\d-]/g, "");
  }

  const integer = text.slice(0, lastSeparator).replace(/[^\d-]/g, "");
  const decimal = text.slice(lastSeparator + 1).replace(/[^\d]/g, "");

  return `${integer || "0"}.${decimal}`;
};

const formatMonetaryValue = (value) => {
  const text = String(value ?? "");

  if (!text) {
    return "";
  }

  return text.replace(".", ",");
};

const MonetaryValueInput = forwardRef(
  ({ value, onValueChange, className, ...props }, ref) => {
    const handleChange = (event) => {
      onValueChange(normalizeMonetaryValue(event.target.value));
    };

    return (
      <input
        {...props}
        ref={ref}
        value={formatMonetaryValue(value)}
        onChange={handleChange}
        className={className}
        inputMode="decimal"
      />
    );
  },
);

MonetaryValueInput.displayName = "MonetaryValueInput";

export default MonetaryValueInput;
