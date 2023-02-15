import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ title, amount, username }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loginError, setLogginError] = useState(""); //je fais un state a loginError pour gérer les messages d'erreur
  // récupe des données de la cb utilisateur:
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("sent : ", amount, title, username);
    try {
      setIsLoading(true);

      const cardElement = elements.getElement(CardElement);

      // creation token api stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: username,
      });
      console.log("STRIPE Response : ", stripeResponse);
      const stripeToken = stripeResponse.token.id;
      console.log("STRIPE TOKEN :", stripeToken);

      // Requête vers API reacteur et envoi du token avec la variable stripToken déclarée lignes précédentes
      debugger;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: amount,
        }
      );
      console.log("total=", amount);
      console.log("response data=", response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log("error:", error.message);
      setLogginError(error.message); //je maj mon state pour afficher un msg d'erreur si besoin
    }
  };

  return (
    <div className="checkOContainer">
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button disabled={isLoading} type="submit">
            Valider
          </button>
          <div className="errorLog">{loginError}</div>
        </form>
      ) : (
        <div>
          <span>💸💸💸 Le paiement est effectué 💸💸💸</span>
          <div className="gifDelivery">
            <iframe
              title="gif"
              src="https://giphy.com/embed/9DgxhWOxHDHtF8bvwl"
            ></iframe>
          </div>
          <p>
            <a href="https://giphy.com/gifs/9DgxhWOxHDHtF8bvwl">via GIPHY</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
