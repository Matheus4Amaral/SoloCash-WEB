import { useState } from "react";
import { EyeOff, Eye, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./styles/RegisterCard.css";

const RegisterCard = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const visibilityPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword)
      return alert("Preencha todos os campos");
    if (password !== confirmPassword) return alert("As senhas não coincidem");
    try {
      console.log("Nome:", name);
      console.log("Email:", email);
      console.log("Senha:", password);
      console.log("Confirmar Senha:", confirmPassword);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="register-card">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <p className="form-description">
          Crie sua conta para gerenciar suas finanças
        </p>

        <div className="field-group">
          <div className="input-wrapper">
            <User size={18} aria-hidden="true" />
            <input
              type="name"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <Mail size={18} aria-hidden="true" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password-container">
            <div className="input-wrapper">
              <Lock size={18} aria-hidden="true" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="eye-button"
              onClick={visibilityPassword}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="password-container">
            <div className="input-wrapper">
              <Lock size={18} aria-hidden="true" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="eye-button"
              onClick={visibilityPassword}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="enter-button"
          onClick={handleLoginClick}
        >
          Criar conta
        </button>
      </form>

      <button
        type="button"
        className="have-account"
        onClick={handleLoginClick}
      >
        Já tem uma conta? Entrar
      </button>
    </div>
  );
};

export default RegisterCard;
