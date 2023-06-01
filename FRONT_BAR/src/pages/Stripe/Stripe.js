import styles from "./Stripe.module.scss";
import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../context";
import { socket } from "../../Socket";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

function Stripe() {
  const { payment } = useContext(AuthContext);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  console.log(payment);

  useEffect(() => {
    fetch("http://localhost:8000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  useEffect(() => {
    let totalPrice = 0;
    payment.map((e) => {
      return (totalPrice = totalPrice + e.price * e.count);
    });

    fetch("http://localhost:8000/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: totalPrice * 100 }),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });
  }, [payment]);

  function onSubmit() {
    socket.emit("command", payment);
  }

  return (
    <div className="d-flex flex-fill">
      <div className={`${styles.payForm} mr20`}>
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onSubmit={onSubmit} />
          </Elements>
        )}
      </div>
      <div className={`${styles.detailCommand}`}>
        <h1>Detail de la commande</h1>
        <ul className={`d-flex ${styles.titleTab}`}>
          <div  className={`${styles.px100} d-flex justify-content-center align-items-center`}>
            
          </div>
          <div className={`${styles.px200} d-flex justify-content-center align-items-center`}>Nom</div>
          <div  className={`${styles.px100} d-flex justify-content-center align-items-center`}>
            Prix
          </div>
          <div  className={`${styles.px100} d-flex justify-content-center align-items-center`}>
            Nombre
          </div>
        </ul>
        <ul>
          {payment.map((p) => (
            <li key={p.id} className="d-flex">
              <div><img src={p.image} width="100px"/></div>
              <div className={`${styles.px200} d-flex justify-content-center align-items-center`}>{p.name}</div>
              <div className={`${styles.px100} d-flex justify-content-center align-items-center`}>{p.price}€</div>
              <div className={`${styles.px100} d-flex justify-content-center align-items-center`}>{p.count}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stripe;
