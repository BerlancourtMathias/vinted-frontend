import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/index";
import axios from "axios";
import "./signup.css";
const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignUp] = useState({
    email: "",
    username: "",
    password: "",
    newletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const postSignUp = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email: signup.email,
            username: signup.username,
            password: signup.password,
            newsletter: signup.newsletter,
          }
        );
        setSignUp();
      } catch (error) {
        console.log(error.message);
      }
    };
    postSignUp();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      Inscription coucou
      <form label="signUpForm">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={signup.username}
        />
        <input type="email" placeholder="Email" value={signup.email} />
        <input
          type="password"
          placeholder="Mot de passe"
          value={signup.password}
        />
        <input type="checkbox" id="newLetter" value={signup.newletter} />
        <label for="newsLetter">S'inscrire à notre newsletter</label>

        <p id="CGU">
          En vous inscrivant sur Vinted, vous attestez être majeur et
          reconnaissez avoir pris connaissance et acceptez les{" "}
          <span>conditions générales d'utilisation</span> ainsi que notre{" "}
          <span>politique de confidentialité des données</span> de notre
          plateforme. Ces conditions régissent l'utilisation de nos services et
          sont importantes pour garantir une expérience utilisateur sûre et
          agréable pour tous les membres de notre communauté. Nous vous
          encourageons à les lire attentivement afin de comprendre vos droits et
          responsabilités en tant qu'utilisateur de Vinted, ainsi que la manière
          dont nous protégeons vos données personnelles.
        </p>
        <input
          type="submit"
          value="S'inscrire"
          accesskey="
          "
          onSubmit={() => {
            postSignUp;
          }}
        />
        <span onClick={() => navigate("/login")}>
          Tu as déjà un compte ? connecte-toi!
        </span>
      </form>
    </div>
  );
};
export default Signup;
