import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import close from "./close.png";
import "./login.css";

const Login = ({ showModal, setShowModal, handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLogginError] = useState("");

  const handleEmailchange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleCloseModal = () => {
    setShowModal(!showModal);
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,

          password: password,
        }
      );
      const token = response.data.token;
      if (token) {
        setLogginError("");
        handleToken(token);
        handleCloseModal();
      }
    } catch (error) {
      setLogginError(error.message);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button id="closeModal" onClick={handleCloseModal}>
          <img src={close} alt="croix fermer modal" />
        </button>
        <div className="loginModal">
          <h2>Se connecter</h2>

          <form label="logInForm" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailchange}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
            {loginError !== "" ? (
              <div className="badPassword">
                💡 Votre mot de passe ou adresse email est incorrecte
              </div>
            ) : null}
            <input type="submit" value="Se connecter" />
            <span
              onClick={() => {
                navigate("/signup");
                setShowModal(!showModal);
              }}
            >
              Pas encore de compte ? inscris-toi!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
