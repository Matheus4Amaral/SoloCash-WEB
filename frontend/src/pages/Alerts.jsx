import { Eye, Plus, ChevronLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Alerts.css";
import Sidebar from "../components/Sidebar.jsx";
import FilterAlertCard from "../components/Alerts/FilterAlertCard.jsx";
import NotificationCard from "../components/Alerts/NotificationCard.jsx";
import OwnNotificationCard from "../components/Alerts/OwnNotificationCard.jsx";
import AddAlert from "../components/modals/Alerts/AddAlert.jsx";
import EditAlert from "../components/modals/Alerts/EditAlert.jsx";
import RemoveAlert from "../components/modals/Alerts/RemoveAlert.jsx";

const alertArray = [
  {
    id: 1,
    title: "Economia Realizada",
    description: "Parabéns! Você economizou R$ 220,31 ao final do mês anterior",
    date: "2026-07-01",
    isActive: true,
  },
  {
    id: 2,
    title: "Gasto Alto",
    description: "Você atingiu 80% do limite em gastos de Lazer",
    date: "2026-06-29",
    isActive: true,
  },
  {
    id: 3,
    title: "Gasto Alto",
    description: "Você atingiu 60% do limite em gastos de Lazer",
    date: "2026-06-22",
    isActive: true,
  },
  {
    id: 4,
    title: "Prejuízo",
    description: "Poxa... Você teve um prezuízo de R$ 7,21 ao final do mês anterior",
    date: "2026-06-01",
    isActive: true,
  },
  {
    id: 5,
    title: "Limite de Gastos",
    description: "Você atingiu 100% do limite em gastos de Lazer",
    date: "2026-05-29",
    isActive: true,
  },
  {
    id: 6,
    title: "Pagar conta água",
    description: "",
    date: "2026-07-24",
    isActive: false,
  },
  {
    id: 7,
    title: "Pagar cel",
    description: "10/10 parcela",
    date: "2026-07-25",
    isActive: false,
  },
];

function Alerts() {
  const navigate = useNavigate();

  const [isOwnAlerts, setIsOwnAlerts] = useState(false);
  const [alert, setAlert] = useState(alertArray);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [selectedOwnAlert, setSelectedOwnAlert] = useState(null);

  const toggleOwnAlerts = () => {
    setIsOwnAlerts((prev) => !prev);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const openAddModal = () => {
    setSelectedOwnAlert(null);
    setOpenModal("adicionar");
  };

  const openEditModal = (alert) => {
    setSelectedOwnAlert(alert);
    setOpenModal("editar");
  };

  const openRemoveModal = (alert) => {
    setSelectedOwnAlert(alert);
    setOpenModal("remover");
  };

  const closeModal = () => {
    setOpenModal(null);
    setSelectedOwnAlert(null);
  };

  const filteredAlerts = useMemo(() => {
    const base = alert.filter((a) => (isOwnAlerts ? a.isActive === false : a.isActive === true));
    let result = base;
    if (search && search.trim() !== "") {
      result = result.filter((a) => (a.title || "").toLowerCase().includes(search.trim().toLowerCase()));
    }
    if (startDate) {
      const start = new Date(startDate);
      result = result.filter((a) => new Date(a.date) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      result = result.filter((a) => new Date(a.date) <= end);
    }
    return result;
  }, [alert, isOwnAlerts, search, startDate, endDate]);

  const cleanFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
  };

  const addAlert = ({ title, description, date }) => {
    setAlert((current) => [
      ...current,
      {
        id: alertArray.length + 1,
        title,
        description,
        date,
        isActive: false
      },
    ]);
    closeModal();
  };

  const editAlert = ({ title, description, date }) => {
    setAlert((current) =>
      current.map((alert) =>
        alert.id === selectedOwnAlert?.id
          ? {
              ...alert,
              title,
              description,
              date,
            }
          : alert,
      ),
    );
    closeModal();
  };

  const removeAlert = () => {
    setAlert((current) =>
      current.filter((alert) => alert.id !== selectedOwnAlert?.id),
    );
    closeModal();
  };

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-top">
            <button type="button" className="back-button" aria-label="Voltar" onClick={handleGoBack}>
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <h1 className="dashboard-title">Gerenciar Alertas</h1>
          </div>
          <p className="dashboard-description">
            Aqui você pode gerenciar seus alertas de ganhos e gastos. Também pode estar adicionando, editando ou removendo os próprios alertas conforme necessário.
          </p>
        </div>

          <div className="dashboard-hero">
          {!isOwnAlerts && (
            <FilterAlertCard
              searchValue={search}
              onSearchChange={(e) => setSearch(e.target.value)}
              onChangeStart={setStartDate}
              onChangeEnd={setEndDate}
            />
          )}

          <button
            type="button"
            className="add-alert-button"
            aria-label="Adicionar alerta"
            onClick={openAddModal}
          >
            <Plus size={18} aria-hidden="true" />
            Adicionar alerta
          </button>

          <button
            type="button"
            className="toogle-view-button"
            aria-label={`Visualizar alertas ${isOwnAlerts ? "próprios" : "ativos"}`}
            onClick={() => {
              toggleOwnAlerts();
              cleanFilters();
            }}
          >
            <Eye size={18} aria-hidden="true" />
            Visualizar alertas {isOwnAlerts ? "próprios" : "ativos"}
          </button>
        </div>

        <div className="alerts-panel">
          <h2>{isOwnAlerts ? "Notificações próprias" : "Notificações ativas"}</h2>
          <div className="alerts-list">
            {filteredAlerts.length === 0 ? (
              <p className="no-alerts-message">Nenhum alerta registrado.</p>
            ) : (
              filteredAlerts.map((a) =>
                isOwnAlerts ? (
                  <OwnNotificationCard
                    key={a.id}
                    title={a.title}
                    description={a.description}
                    date={a.date}
                    onEdit={() => openEditModal(a)}
                    onDelete={() => openRemoveModal(a)}
                  />
                ) : (
                  <NotificationCard
                    key={a.id}
                    title={a.title}
                    description={a.description}
                    date={a.date}
                    onEdit={() => openEditModal(a)}
                    onDelete={() => openRemoveModal(a)}
                  />
                ),
              )
            )}
          </div>
        </div>

        <AddAlert
          key="adicionar-alerta"
          isOpen={openModal === "adicionar"}
          onClose={closeModal}
          onSubmit={addAlert}
        />

        <EditAlert
          key={`editar-${selectedOwnAlert?.id ?? "novo"}`} 
          isOpen={openModal === "editar"}
          alert={selectedOwnAlert}
          onClose={closeModal}
          onSubmit={editAlert}
        />

        <RemoveAlert
          key={selectedOwnAlert?.id ?? "remover-alerta"}
          isOpen={openModal === "remover"}
          alert={selectedOwnAlert}
          onClose={closeModal}
          onConfirm={removeAlert}
        />
      </main>
    </div>
  );
}

export default Alerts;
