import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./loginpage.css";

const LoginPage = ({ handleToken, token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailchange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
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
      console.log("response axios: ", response);
      const token = response.data.token;

      if (token) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
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
        <input type="submit" value="Se connecter" />
        <span onClick={() => navigate("/signup")}>
          Pas encore de compte ? inscris-toi!
        </span>
      </form>
    </div>
  );
};
export default LoginPage;
