import { createContext, useContext, useState } from 'react';

const VisuContext = createContext();

export function VisuProvider({ children }) {
    // Exemplo de estado, como por exemplo, ocultar/mostrar valores
    const [visivel, setVisivel] = useState(true);

    const toggleVisivel = () => {
        setVisivel((prev) => !prev);
    };

    return (
        <VisuContext.Provider value={{ visivel, toggleVisivel }}>
            {children}
        </VisuContext.Provider>
    );
}

export function useVisu() {
    return useContext(VisuContext);
}
