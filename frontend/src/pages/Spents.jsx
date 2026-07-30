import { Plus, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Spents.css";
import Sidebar from "../components/Sidebar.jsx";
import MonthlySpentsCard from "../components/Spents/MonthlySpentsCard.jsx";
import MonthSpentsCard from "../components/Spents/MonthSpentCard.jsx";
import FormatReal from "../components/FormatReal.jsx";
import AddSpent from "../components/modals/Spents/AddSpent.jsx";
import EditSpent from "../components/modals/Spents/EditSpent.jsx";
import RemoveSpent from "../components/modals/Spents/RemoveSpent.jsx";
import SelectCategory from "../components/SelectCategory.jsx";

const monthSpentArray = [
  {
    id: 1,
    title: "Compras Mercado",
    amount: "35.89",
    date: "2026-07-16",
    category: "Mercado",
  },
  {
    id: 2,
    title: "Passagem Ônibus",
    amount: "24.99",
    date: "2026-07-15",
    category: "Transporte",
  },
  {
    id: 3,
    title: "Coxinha",
    amount: "10.00",
    date: "2026-07-14",
    category: "Alimentação",
  },
];

function Spents() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [monthSpent, setMonthSpent] = useState(monthSpentArray);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [selectedSpent, setSelectedSpent] = useState(null);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const openAddModal = () => {
    setSelectedSpent(null);
    setOpenModal("adicionar");
  };

  const openEditModal = (spent) => {
    setSelectedSpent(spent);
    setOpenModal("editar");
  };

  const openRemoveModal = (spent) => {
    setSelectedSpent(spent);
    setOpenModal("remover");
  };

  const closeModal = () => {
    setOpenModal(null);
    setSelectedSpent(null);
  };

  const filteredMonthSpent = selectedCategory
    ? monthSpent.filter((spent) => spent.category === selectedCategory)
    : monthSpent;

  const sortedMonthSpent = [...filteredMonthSpent].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  const addSpent = ({ title, amount, date, category }) => {
    setMonthSpent((current) => [
      ...current,
      {
        id: monthSpentArray.length + 1,
        title,
        amount,
        date,
        category,
      },
    ]);
    closeModal();
  };

  const editSpent = ({ title, amount, date, category }) => {
    setMonthSpent((current) =>
      current.map((spent) =>
        spent.id === selectedSpent?.id
          ? {
              ...spent,
              title,
              amount,
              date,
              category,
            }
          : spent,
      ),
    );
    closeModal();
  };

  const removeSpent = () => {
    setMonthSpent((current) =>
      current.filter((spent) => spent.id !== selectedSpent?.id),
    );
    closeModal();
  };

  return (
    <div className="dashboard-page">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-top">
            <button
              type="button"
              className="back-button"
              aria-label="Voltar"
              onClick={handleGoBack}
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <h1 className="dashboard-title">Gerenciar Gastos</h1>
          </div>
          <p className="dashboard-description">
            Controle seus gastos mensais e acompanhe a evolução da sua receita
          </p>
        </div>

        <div className="dashboard-hero">
          <MonthlySpentsCard
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
            FormatReal={FormatReal}
          />

          <button
            type="button"
            className="add-spent-button"
            aria-label="Adicionar gasto"
            onClick={openAddModal}
          >
            <Plus size={18} aria-hidden="true" />
            Adicionar gasto
          </button>
        </div>

        {isVisible && (
          <div className="spents-panel">
            <h2>
              {sortedMonthSpent.length === 0
                ? "Gastos do Mês - 0 Gasto Total"
                : sortedMonthSpent.length === 1
                  ? "Gastos do Mês - 1 Gasto Total"
                  : `Gastos do Mês - ${sortedMonthSpent.length} Gastos Totais`}
            </h2>
            <h3>Categorias:</h3>
            <SelectCategory
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
            <div className="spents-list">
              {sortedMonthSpent.length > 0 ? (
                sortedMonthSpent.map((spent) => (
                  <MonthSpentsCard
                    key={spent.id}
                    title={spent.title}
                    amount={FormatReal(Number(spent.amount))}
                    date={spent.date}
                    category={spent.category}
                    onEdit={() => openEditModal(spent)}
                    onDelete={() => openRemoveModal(spent)}
                  />
                ))
              ) : (
                <p className="no-spents-message">
                  Nenhum gasto registrado para este mês
                </p>
              )}
            </div>
          </div>
        )}

        <AddSpent
          key="adicionar-gasto"
          isOpen={openModal === "adicionar"}
          onClose={closeModal}
          onSubmit={addSpent}
        />

        <EditSpent
          key={`editar-${selectedSpent?.id ?? "novo"}`}
          isOpen={openModal === "editar"}
          spent={selectedSpent}
          onClose={closeModal}
          onSubmit={editSpent}
        />

        <RemoveSpent
          key={selectedSpent?.id ?? "remover-gasto"}
          isOpen={openModal === "remover"}
          spent={selectedSpent}
          onClose={closeModal}
          onConfirm={removeSpent}
        />
      </div>
    </div>
  );
}

export default Spents;
