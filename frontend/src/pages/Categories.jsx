import { Plus, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Categories.css";
import Sidebar from "../components/Sidebar.jsx";
import CategoryCard from "../components/Categories/CategoryCard.jsx";
import FormatReal from "../components/FormatReal.jsx";
import AddCategory from "../components/modals/Categories/AddCategory.jsx";
import EditCategory from "../components/modals/Categories/EditCategory.jsx";
import RemoveCategory from "../components/modals/Categories/RemoveCategory.jsx";

const categoryArray = [
  {
    id: 1,
    title: "Alimentação",
    limit: 400,
  },
  {
    id: 2,
    title: "Aluguel",
    limit: 0,
  },
  {
    id: 3,
    title: "Contas",
    limit: 0,
  },
  {
    id: 4,
    title: "Lazer",
    limit: 200,
  },
  {
    id: 5,
    title: "Mercado",
    limit: 300,
  },
  {
    id: 6,
    title: "Saúde",
    limit: 200,
  },
  {
    id: 7,
    title: "Transporte",
    limit: 200,
  },
];

function Categories() {
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState(categoryArray);
  const [openModal, setOpenModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setOpenModal("adicionar");
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setOpenModal("editar");
  };

  const openRemoveModal = (category) => {
    setSelectedCategory(category);
    setOpenModal("remover");
  };

  const closeModal = () => {
    setOpenModal(null);
    setSelectedCategory(null);
  };

  const addCategory = ({ title, limit }) => {
    setAllCategories((current) => [
      ...current,
      {
        id: categoryArray.length + 1,
        title,
        limit,
      },
    ]);
    closeModal();
  };

  const editCategory = ({ title, limit }) => {
    setAllCategories((current) =>
      current.map((category) =>
        category.id === selectedCategory?.id
          ? {
              ...category,
              title,
              limit,
            }
          : category,
      ),
    );
    closeModal();
  };

  const removeCategory = () => {
    setAllCategories((current) =>
      current.filter((category) => category.id !== selectedCategory?.id),
    );
    closeModal();
  };

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-content">
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
            <h1 className="dashboard-title">Gerenciar Categorias</h1>
          </div>
          <p className="dashboard-description">
            Controle suas categorias e limite de gastos
          </p>
        </div>

        <div className="dashboard-hero">
          <button
            type="button"
            className="add-category-button"
            aria-label="Adicionar categoria"
            onClick={openAddModal}
          >
            <Plus size={18} aria-hidden="true" />
            Adicionar categoria
          </button>
        </div>

        <div className="categories-panel">
          <h2>Categorias</h2>
          <div className="categories-list">
            {allCategories.length > 0 ? (
              allCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  limit={FormatReal(Number(category.limit))}
                  onEdit={() => openEditModal(category)}
                  onDelete={() => openRemoveModal(category)}
                />
              ))
            ) : (
              <p className="no-Categories-message">
                Nenhuma categoria registrada para este mês
              </p>
            )}
          </div>
        </div>

        <AddCategory
          key="adicionar-categoria"
          isOpen={openModal === "adicionar"}
          onClose={closeModal}
          onSubmit={addCategory}
        />

        <EditCategory
          key={`editar-${selectedCategory?.id ?? "novo"}`}
          isOpen={openModal === "editar"}
          category={selectedCategory}
          onClose={closeModal}
          onSubmit={editCategory}
        />

        <RemoveCategory
          key={selectedCategory?.id ?? "remover-categoria"}
          isOpen={openModal === "remover"}
          category={selectedCategory}
          onClose={closeModal}
          onConfirm={removeCategory}
        />
      </main>
    </div>
  );
}

export default Categories;
