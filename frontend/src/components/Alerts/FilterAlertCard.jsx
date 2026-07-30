import "./styles/FilterAlertCard.css";
import Search from "../Filters/Search";
import BetweenDates from "../Filters/BetweenDates";

const FilterAlertCard = ({ searchValue, onSearchChange, onChangeStart, onChangeEnd }) => {
  return (
    <div className="alerts-summary-card">
      <div className="alerts-summary-copy">
        <Search value={searchValue} onChange={onSearchChange} />

        <div className="alerts-summary-period">
          <p className="alerts-summary-kicker">Análise por período:</p>
          <div className="alerts-summary-dates">
            <BetweenDates isOpen={true} onChangeStart={onChangeStart} onChangeEnd={onChangeEnd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAlertCard;
