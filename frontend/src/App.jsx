import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { VisuProvider } from "./contexts/VisuContext";
// import './App.css'

const PUBLIC_ROUTES = ['/login', '/registrar', '/redefinirsenha'];

function AppContent() {

    const navigate = useNavigate();
    const location = useLocation();
    const { usuario, loading } = useAuth();


    useEffect(() => {
        if (loading) return;

        const isPublicRouter = PUBLIC_ROUTES.includes(location.pathname);

        if (!usuario && !isPublicRouter) {
            // Sem login e não rota publica vai para => login
            navigate("/login", { replace: true });
        } else if (usuario && isPublicRouter) {
            // Logado e rota publica vai para => Home
            navigate("/home", { replace: true });
        } else if (location.pathname === '/') {
            // Rota " / " verifica se está logado
            navigate(usuario ? "/home" : "/login", { replace: true });
        }
    }, [usuario, loading, location.pathname, navigate]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: '#0f172a',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.1rem'
            }}>
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

export default App
