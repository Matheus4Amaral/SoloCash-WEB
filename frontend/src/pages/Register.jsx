import "./styles/Register.css";
import RegisterCard from "../components/Register/RegisterCard.jsx";

function Register() {
  return (
    <>
      <div className="register-page">
        <div className="auth">
          <div>
            <div className="brand-row">
              <div className="brand-mark">
                <img src="/icon.png" alt="SoloCash" className="brand-icon" />
              </div>
              <h1 className="brand-title">SoloCash</h1>
            </div>
            <p className="brand-subtitle">
              Começe a controlar suas finanças hoje
            </p>
          </div>
          <RegisterCard />
        </div>
      </div>
    </>
  );
}

export default Register;
