import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup"
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      Inscription coucou
      <form label="signUpForm">
        <input type="text" placeholder="Nom d'utilisateur" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <input type="checkbox" id="newLetter" />
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
        <input type="submit" value="S'inscrire" />
        <span onClick={() => navigate("/login")}>
          Tu as déjà un compte ? connecte-toi!
        </span>
      </form>
    </div>
  );
};
export default Signup;
