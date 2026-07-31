import { ChevronLeft, FileText, BanknoteArrowUp, BanknoteArrowDown, ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/History.css";
import Sidebar from "../components/Sidebar.jsx";
import FilterHistoryCard from "../components/History/FilterHistoryCard.jsx";
import GainsCard from "../components/History/GainsCard.jsx";
import SpentsCard from "../components/History/SpentsCard.jsx";
import HistoryCard from "../components/History/HistoryCard.jsx";
import { parseDateValue } from "../components/FormatDate.jsx";
import FormatReal from "../components/FormatReal.jsx";

const transactionArray = [
  {
    id: 1,
    title: "Compras Mercado",
    amount: "35.89",
    date: "2026-07-16",
    category: "Mercado",
    type: "spent"
  },
  {
    id: 2,
    title: "Passagem Ônibus",
    amount: "24.99",
    date: "2026-07-15",
    category: "Transporte",
    type: "spent"
  },
  {
    id: 3,
    title: "Coxinha",
    amount: "10.00",
    date: "2026-07-14",
    category: "Alimentação",
    type: "spent"
  },
  {
    id: 4,
    title: "Pagamento",
    amount: "1621",
    date: "2026-07-16",
    category: "",
    type: "gain"
  },
  {
    id: 5,
    title: "Pensão",
    amount: "500",
    date: "2026-07-15",
    category: "",
    type: "gain"
  },
];

function History() {
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(transactionArray);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("");
  const [valueSortState, setValueSortState] = useState(0);
  const [sortDateState, setSortDateState] = useState(0);

  const filteredTransactions = useMemo(() => {
    let result = transaction.slice();
    if (type === "gain") {
      result = result.filter((a) => a.type === "gain");
    } else if (type === "spent") {
      result = result.filter((a) => a.type === "spent");
    }
    if (search && search.trim() !== "") {
      result = result.filter((a) =>
        (a.title || "").toLowerCase().includes(search.trim().toLowerCase()),
      );
    }
    if (category && category.trim() !== "") {
      result = result.filter((a) => (a.category || "").trim() === category.trim());
    }
    if (startDate) {
      const start = parseDateValue(startDate);
      result = result.filter((a) => parseDateValue(a.date) >= start);
    }
    if (endDate) {
      const end = parseDateValue(endDate);
      result = result.filter((a) => parseDateValue(a.date) <= end);
    }

    if (valueSortState === 0) {
      result.sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
    } else {
      result.sort((a, b) => (Number(a.amount) || 0) - (Number(b.amount) || 0));
    }

    if (sortDateState === 0) {
      result.sort((a, b) => {
        const da = parseDateValue(a.date);
        const db = parseDateValue(b.date);
        return (db ? db.getTime() : 0) - (da ? da.getTime() : 0);
      });
    } else {
      result.sort((a, b) => {
        const da = parseDateValue(a.date);
        const db = parseDateValue(b.date);
        return (da ? da.getTime() : 0) - (db ? db.getTime() : 0);
      });
    }

    return result;
  }, [transaction, type, category, search, startDate, endDate, valueSortState, sortDateState]);

  const totals = useMemo(
    () =>
      filteredTransactions.reduce(
        (acc, item) => {
          const value = Number(item.amount) || 0;
          if (item.type === "gain") acc.gain += value;
          if (item.type === "spent") acc.spent += value;
          return acc;
        },
        { gain: 0, spent: 0 },
      ),
    [filteredTransactions],
  );

  const handleTypeSelect = (selectedType) =>
    setType((currentType) => (currentType === selectedType ? "all" : selectedType));

  const cleanFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setType("all");
    setCategory("");
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="dashboard-page">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-top">
            <button type="button" className="back-button" aria-label="Voltar" onClick={handleGoBack}>
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <h1 className="dashboard-title">Histórico Financeiro</h1>
          </div>
          <p className="dashboard-description">
            Aqui você pode gerenciar suas transações, visualizar detalhes e filtrar por nome, período, tipo e categoria.
          </p>
        </div>

        <div className="dashboard-hero">
          <div className="dashboard-summary-cards">
            <GainsCard
              amount={totals.gain}
              active={type === "gain"}
              onClick={() => handleTypeSelect("gain")}
              FormatReal={FormatReal}
            />
            <SpentsCard
              amount={totals.spent}
              active={type === "spent"}
              onClick={() => handleTypeSelect("spent")}
              FormatReal={FormatReal}
            />
          </div>

          <FilterHistoryCard
            searchValue={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            onChangeStart={setStartDate}
            onChangeEnd={setEndDate}
            typeValue={type}
            onTypeChange={setType}
            categoryValue={category}
            onCategoryChange={setCategory}
          />
        </div>

        <div className="transactions-panel">
          <div className="transactions-header">
            <h2 className="transactions-title">
              {filteredTransactions.length === 0 || filteredTransactions.length === 1
                ? `${filteredTransactions.length} resultado encontrado`
                : `${filteredTransactions.length} resultados encontrados`}
            </h2>

            <div className="results-actions">
              <button className="icon-button" type="button" aria-label="Exportar">
                <FileText size={20} />
              </button>

              <button
                className="icon-button"
                type="button"
                aria-label="Alternar banknote"
                onClick={() => setValueSortState((s) => (s + 1) % 2)}
              >
                {valueSortState === 0 && <BanknoteArrowUp size={20} />}
                {valueSortState === 1 && <BanknoteArrowDown size={20} />}
              </button>

              <button
                className="icon-button"
                type="button"
                aria-label="Alternar sort"
                onClick={() => setSortDateState((s) => (s + 1) % 2)}
              >
                {sortDateState === 0 && <ArrowDownWideNarrow size={20} />}
                {sortDateState === 1 && <ArrowDownNarrowWide size={20} />}
              </button>
            </div>
          </div>
          <div className="transactions-list">
            {filteredTransactions.length === 0 ? (
              <p className="no-transactions-message">Nenhuma transação registrada</p>
            ) : (
              filteredTransactions.map((a) => (
                <HistoryCard
                  key={a.id}
                  title={a.title}
                  amount={a.amount}
                  category={a.category}
                  date={a.date}
                  type={a.type}
                  FormatReal={FormatReal}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
