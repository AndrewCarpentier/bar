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

  useEffect(() => {
    fetch("http://localhost:8000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  useEffect(() => {
    let totalPrice = 0;
    payment.map((e) => {
      return totalPrice = totalPrice + (e.price * e.count)
    });

    fetch("http://localhost:8000/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: (totalPrice * 100) }),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });
  }, [payment]);

  function onSubmit() {
    socket.emit("command", payment);
  }

  return (
    <div>
      Stripe
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onSubmit={onSubmit} />
        </Elements>
      )}
    </div>
  );
}

export default Stripe;
