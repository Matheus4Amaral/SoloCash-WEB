import "./styles/Login.css";
import LoginCard from "../components/Login/LoginCard.jsx";

function Login() {
  return (
    <>
      <div className="login-page">
        <div className="auth">
          <div>
            <div className="brand-row">
              <div className="brand-mark">
                <img src="/icon.png" alt="SoloCash" className="brand-icon" />
              </div>
              <h1 className="brand-title">SoloCash</h1>
            </div>
            <p className="brand-subtitle">
              Controle financeiro para quem mora sozinho
            </p>
          </div>
          <LoginCard />
          <p className="legal-text">
            Ao continuar, você concorda com nossos Termos de Uso e Política de
            Privacidade
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
