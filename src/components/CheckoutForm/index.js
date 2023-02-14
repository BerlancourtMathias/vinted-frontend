import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  // récupe des données de la cb utilisateur:
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    // cr&ation token api stripe
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log("STRIPE Response : ", stripeResponse);
    const stripeToken = stripeResponse.token.id;
    console.log("STRIPE TOKEN :", stripeToken);

    // Requête vers API reacteur et envoi du token avec la variable stripToken déclarée lignes précédentes

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: "Titre annonce de test de requete",
        amount: 42,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div className="checkOContainer">
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>💸💸💸 Le paiement est effectué 💸💸💸</span>
      )}
    </div>
  );
};

export default CheckoutForm;
