import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null)
    const [nome, setNome] = useState('')
    const [loading, setLoading] = useState(true)

    // Carrega sessão salva no localStorage ao iniciar
    useEffect(() => {
        const token = localStorage.getItem('token')
        const usuarioSalvo = localStorage.getItem('usuario')

        if (token && usuarioSalvo) {
            try {
                const parsed = JSON.parse(usuarioSalvo)
                setUsuario(parsed)
                setNome(parsed.nome || '')
            } catch {
                localStorage.removeItem('token')
                localStorage.removeItem('usuario')
            }
        }

        setLoading(false)
    }, [])

    const signIn = async (email, password) => {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha: password })
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Erro ao fazer login')
        }

        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))

        setUsuario(data.usuario)
        setNome(data.usuario.nome || '')
    }

    const signUp = async (nome, email, password) => {
        const res = await fetch(`${API_URL}/api/auth/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha: password })
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Erro ao registrar')
        }
    }

    const signOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        setUsuario(null)
        setNome('')
    }

    // Helper para requisições autenticadas
    const authFetch = (url, options = {}) => {
        const token = localStorage.getItem('token')
        return fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        })
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                nome,
                loading,
                signIn,
                signUp,
                signOut,
                authFetch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)