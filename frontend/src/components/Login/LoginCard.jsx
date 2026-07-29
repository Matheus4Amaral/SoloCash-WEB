import { useState } from "react";
import { EyeOff, Eye, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginCard.css";

const LoginCard = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const visibilityPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Preencha todos os campos");
    try {
      console.log("Email:", email);
      console.log("Senha:", password);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleEnterClick = () => {
    navigate("/gains");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-card">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <p className="form-description">
          Acesse sua conta para gerenciar suas finanças
        </p>

        <div className="field-group">
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
              onClick={visibilityPassword}
              className="eye-button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="button"
          className="forgot-password"
          onClick={handleForgotPasswordClick}
        >
          Esqueceu a senha?
        </button>

        <button
          type="submit"
          className="enter-button"
          onClick={handleEnterClick}
        >
          Entrar
        </button>
      </form>

      <div className="divider">Ou</div>

      <button
        type="button"
        className="register-button"
        onClick={handleRegisterClick}
      >
        Criar uma conta
      </button>
    </div>
  );
};

export default LoginCard;
