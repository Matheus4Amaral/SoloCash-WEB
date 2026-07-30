import { Search as SearchIcon } from "lucide-react";
import "./styles/Search.css";

const Search = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <SearchIcon size={18} aria-hidden="true" />
      <input
        type="text"
        className="search-input"
        placeholder={"Buscar por nome"}
        value={value}
        onChange={onChange}
        aria-label={"Buscar por nome"}
      />
    </div>
  );
};

export default Search;
