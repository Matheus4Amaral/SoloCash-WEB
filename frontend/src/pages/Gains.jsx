import { Plus, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./styles/Gains.css";
import Sidebar from "../components/Sidebar.jsx";
import MonthlyGainsCard from "../components/Gains/MonthlyGainsCard.jsx";
import MonthGainsCard from "../components/Gains/MonthGainsCard.jsx";
import FormatReal from "../components/FormatReal.jsx";
import AddGain from "../components/modals/Gains/AddGain.jsx";
import EditGain from "../components/modals/Gains/EditGain.jsx";
import RemoveGain from "../components/modals/Gains/RemoveGain.jsx";

const monthGainArray = [
  {
    id: 1,
    title: "Pagamento",
    amount: "1621",
    date: "2026-07-16",
  },
  {
    id: 2,
    title: "Pensão",
    amount: "500",
    date: "2026-07-15",
  },
];

function Gains() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [monthGain, setMonthGain] = useState(monthGainArray);
  const [openModal, setOpenModal] = useState(null);
  const [selectedGain, setSelectedGain] = useState(null);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const openAddModal = () => {
    setSelectedGain(null);
    setOpenModal("adicionar");
  };

  const openEditModal = (gain) => {
    setSelectedGain(gain);
    setOpenModal("editar");
  };

  const openRemoveModal = (gain) => {
    setSelectedGain(gain);
    setOpenModal("remover");
  };

  const closeModal = () => {
    setOpenModal(null);
    setSelectedGain(null);
  };

  const addGain = ({ title, amount, date }) => {
    setMonthGain((current) => [
      ...current,
      {
        id: monthGainArray.length + 1,
        title,
        amount,
        date,
      },
    ]);
    closeModal();
  };

  const editGain = ({ title, amount, date }) => {
    setMonthGain((current) =>
      current.map((gain) =>
        gain.id === selectedGain?.id
          ? {
              ...gain,
              title,
              amount,
              date,
            }
          : gain,
      ),
    );
    closeModal();
  };

  const removeGain = () => {
    setMonthGain((current) =>
      current.filter((gain) => gain.id !== selectedGain?.id),
    );
    closeModal();
  };

  return (
    <div className="dashboard-page">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-top">
            <button type="button" className="back-button" aria-label="Voltar" onClick={handleGoBack}>
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <h1 className="dashboard-title">Gerenciar Ganhos</h1>
          </div>
          <p className="dashboard-description">
            Controle seus ganhos mensais e acompanhe a evolução da sua receita
          </p>
        </div>

        <div className="dashboard-hero">
          <MonthlyGainsCard
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
            FormatReal={FormatReal}
          />

          <button
            type="button"
            className="add-gain-button"
            aria-label="Adicionar ganho"
            onClick={openAddModal}
          >
            <Plus size={18} aria-hidden="true" />
            Adicionar ganho
          </button>
        </div>

        {isVisible && (
          <div className="gains-panel">
            <h2>
              {monthGain.length === 0
                ? "Ganhos do Mês - 0 Ganho Total"
                : monthGain.length === 1
                  ? "Ganhos do Mês - 1 Ganho Total"
                  : `Ganhos do Mês - ${monthGain.length} Ganhos Totais`}
            </h2>
            <div className="gains-list">
              {monthGain.length > 0 ? (
                monthGain.map((gain) => (
                  <MonthGainsCard
                    key={gain.id}
                    title={gain.title}
                    amount={FormatReal(Number(gain.amount))}
                    date={gain.date}
                    onEdit={() => openEditModal(gain)}
                    onDelete={() => openRemoveModal(gain)}
                  />
                ))
              ) : (
                <p className="no-gains-message">
                  Nenhum ganho registrado para este mês
                </p>
              )}
            </div>
          </div>
        )}

        <AddGain
          key="adicionar-ganho"
          isOpen={openModal === "adicionar"}
          onClose={closeModal}
          onSubmit={addGain}
        />

        <EditGain
          key={`editar-${selectedGain?.id ?? "novo"}`} 
          isOpen={openModal === "editar"}
          gain={selectedGain}
          onClose={closeModal}
          onSubmit={editGain}
        />

        <RemoveGain
          key={selectedGain?.id ?? "remover-ganho"}
          isOpen={openModal === "remover"}
          gain={selectedGain}
          onClose={closeModal}
          onConfirm={removeGain}
        />
      </div>
    </div>
  );
}

export default Gains;
