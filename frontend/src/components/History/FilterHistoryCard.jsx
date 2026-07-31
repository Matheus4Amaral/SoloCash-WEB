import "./styles/FilterHistoryCard.css";
import Search from "../Filters/Search";
import BetweenDates from "../Filters/BetweenDates";
import SelectCategory from "../Filters/SelectCategory";
import Type from "../Filters/Type";

const FilterHistoryCard = ({
  searchValue,
  onSearchChange,
  onChangeStart,
  onChangeEnd,
  typeValue = "all",
  onTypeChange,
  categoryValue = "",
  onCategoryChange,
}) => {
  return (
    <div className="histories-summary-card">
      <div className="summary-copy">
        <Search value={searchValue} onChange={onSearchChange} />

        <div className="summary-type-row">
          <Type value={typeValue} onChange={onTypeChange} />

          <div className="summary-categories">
            <p className="summary-kicker">Categorias:</p>
            <SelectCategory
              name="category"
              value={categoryValue}
              onChange={(e) => {
                if (typeof onCategoryChange === "function")
                  onCategoryChange(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="summary-period">
          <p className="summary-kicker">Análise por período:</p>
          <div className="summary-dates">
            <BetweenDates
              isOpen={true}
              onChangeStart={onChangeStart}
              onChangeEnd={onChangeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHistoryCard;
