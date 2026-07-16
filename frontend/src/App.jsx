import { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { VisuProvider } from "./contexts/VisuContext";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate("/login", { replace: true });
    }, [navigate]);

  return null;
}

export default App
