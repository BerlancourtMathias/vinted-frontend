import "./payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_API_KEY);

const Payment = () => {
  const location = useLocation();
  const { title, price, username } = location.state;
  const amount = price + 2.9;

  return (
    <div className="paymentContainer">
      <h2>Voici le récapitulatif de votre commande :</h2>
      <p>
        <strong>{username} </strong> recevra votre paiement une fois son colis
        envoyé 📦
      </p>

      <div className="paymentBody">
        <p> Article : {title}</p>
        <p> Prix: {price.toFixed(2)}</p>
        <p>Frais de port : {(2.5).toFixed(2)} €</p>
        <p>Frais de protection acheteur : {(0.4).toFixed(2)} €</p>
        <p> Total: {amount.toFixed(2)}€</p>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <strong>{title} </strong>. vous allez payer{" "}
          <strong>{(price + 2.5 + 0.4).toFixed(2)} €</strong> (frais de
          protection et frais de port inclus)
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} amount={amount} username={username} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
