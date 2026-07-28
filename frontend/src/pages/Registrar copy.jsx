import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './styles/Registrar.css';

export default function Registrar() {
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegistrar = async (e) => {
        e.preventDefault();
        setErro('');
        setLoading(true);

        try {
            await signUp(nome, email, senha);
            navigate('/login', { replace: true });
        } catch (error) {
            setErro(error.message || 'Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="registrar-card">
                <h1>Criar Conta</h1>
                <form onSubmit={handleRegistrar}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                        />
                    </div>
                    {erro && <p className="form-error">{erro}</p>}
                    <button id="btn-registrar" type="submit" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Criar conta'}
                    </button>
                </form>
                <Link to="/login">Já tem uma conta? Entrar</Link>
            </div>
        </div>
    );
}
