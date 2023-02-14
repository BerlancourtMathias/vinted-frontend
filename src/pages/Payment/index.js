import "./payment.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title, price, username, id, image } = location.state;

  console.log("LOCATION:", location);
  return (
    <div className="paymentContainer">
      <h2>Voici le récapitulatif de votre commande :</h2>
      <p>
        <strong>{username} </strong> recevra votre paiement une fois l'article
        reçu
      </p>

      <div className="paymentBody">
        <p> Article : {title}</p>
        <p> Prix: {price.toFixed(2)}</p>
        <p>Frais de port : {(2.5).toFixed(2)} €</p>
        <p>Frais de protection acheteur : {(0.4).toFixed(2)} €</p>
        <p> Total: {(price + 2.5 + 0.4).toFixed(2)}€</p>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <strong>{title} </strong>. vous allez payer{" "}
          <strong>{(price + 2.5 + 0.4).toFixed(2)} €</strong> (frais de
          protection et frais de port inclus)
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} price={price} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
