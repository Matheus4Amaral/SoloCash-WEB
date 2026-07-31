import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import FormatDate from "../FormatDate.jsx";
import "./styles/HistoryCard.css";

const HistoryCard = ({
  title = "",
  amount = "0",
  date = "",
  category = "",
  type = "spent",
  FormatReal,
}) => {
  const formatAmount = (a) => {
    const n = Number(a);
    if (Number.isNaN(n)) return a;
    return FormatReal(n);
  };

  return (
    <div className="history-card">
      <div
        className={`history-icon ${type === "gain" ? "gain" : "spent"}`}
        aria-hidden
      >
        {type === "gain" ? (
          <ArrowUpRight size={20} />
        ) : (
          <ArrowDownRight size={20} />
        )}
      </div>

      <div className="history-body">
        <div className="history-left">
          <div className="history-title">{title}</div>
          {type === "spent" && category && category.trim() !== "" && (
            <div className="history-category">{category}</div>
          )}
        </div>

        <div className="history-right">
          <div className="history-amount">{formatAmount(amount)}</div>
          <div className="history-date">
            <FormatDate dataISO={date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
