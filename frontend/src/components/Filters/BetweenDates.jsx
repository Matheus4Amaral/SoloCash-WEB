import { useState, useRef } from "react";
import { CalendarDays } from "lucide-react";
import "./styles/BetweenDates.css";

const BetweenDates = ({ isOpen = true, onChangeStart, onChangeEnd }) => {
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const firstDateRef = useRef(null);
  const secondDateRef = useRef(null);

  if (!isOpen) {
    return null;
  }

  const formatDisplayDate = (value) => {
    if (!value) {
      return "DD/MM/AAAA";
    }

    const [ano, mes, dia] = value.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const openCalendar = (ref) => {
    const input = ref.current;

    if (!input) {
      return;
    }

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  };

  const handleStartChange = (value) => {
    setFirstDate(value);
    if (typeof onChangeStart === "function") onChangeStart(value);
  };

  const handleEndChange = (value) => {
    setSecondDate(value);
    if (typeof onChangeEnd === "function") onChangeEnd(value);
  };

  return (
    <>
      <div className="modal-date-row">
        <input
          ref={firstDateRef}
          type="date"
          name="startDate"
          value={firstDate}
          onChange={(e) => handleStartChange(e.target.value)}
          className="visually-hidden-date-input"
          aria-hidden="true"
          tabIndex={-1}
        />

        <button
          type="button"
          className="date-picker-button"
          onClick={() => openCalendar(firstDateRef)}
          aria-label="Selecionar data do início"
        >
          <CalendarDays size={28} aria-hidden="true" />
          <p>{formatDisplayDate(firstDate)}</p>
        </button>
      </div>

      <p className="date-divider">até</p>

      <div className="modal-date-row">
        <input
          ref={secondDateRef}
          type="date"
          name="endDate"
          value={secondDate}
          onChange={(e) => handleEndChange(e.target.value)}
          className="visually-hidden-date-input"
          aria-hidden="true"
          tabIndex={-1}
        />

        <button
          type="button"
          className="date-picker-button"
          onClick={() => openCalendar(secondDateRef)}
          aria-label="Selecionar data do fim"
        >
          <CalendarDays size={28} aria-hidden="true" />
          <p>{formatDisplayDate(secondDate)}</p>
        </button>
      </div>
    </>
  );
};

export default BetweenDates;
