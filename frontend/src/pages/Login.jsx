import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './styles/Login.css';

export default function Login() {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');
        setLoading(true);

        try {
            await signIn(email, senha);
            navigate('/home', { replace: true });
        } catch (error) {
            if (error.message === 'Conta desativada') {
                setErro('Sua conta foi desativada. Entre em contato com o suporte.');
            } else {
                setErro('E-mail ou senha incorretos.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">SoloCash</h1>
                    <p className="login-subtitle">Entre na sua conta</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {erro && <p className="login-error">{erro}</p>}

                    <button
                        id="btn-login"
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="login-links">
                    <Link to="/redefinirsenha" className="login-link">Esqueceu a senha?</Link>
                    <Link to="/registrar" className="login-link">Criar conta</Link>
                </div>
            </div>
        </div>
    );
}