import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { VisuProvider } from "./contexts/VisuContext";
// import './App.css'

const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, loading } = useAuth();

//   useEffect(() => {
//     if (loading) return;

//     const isPublicRouter = PUBLIC_ROUTES.includes(location.pathname);

//     if (!usuario && !isPublicRouter) {
//       navigate("/login", { replace: true });
//     } else if (usuario && isPublicRouter) {
//       navigate("/home", { replace: true });
//     } else if (location.pathname === "/") {
//       navigate(usuario ? "/home" : "/login", { replace: true });
//     }
//   }, [usuario, loading, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="loading">
        <p>Carregando...</p>
      </div>
    );
  }

  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <VisuProvider>
        <AppContent />
      </VisuProvider>
    </AuthProvider>
  );
}

export default App;
