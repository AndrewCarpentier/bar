import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm/checkoutForm";
import { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { socket } from "../../socket";
import { MenuContext } from "../../context/menuContext";
export default function Stripe() {
  const { price, etablishmentId } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { cart, setCart } = useContext(MenuContext);

  useEffect(() => {
    console.log({ cart });
    fetch("http://localhost:8000/api/payment/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/payment/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: price * 100,
        table: localStorage.getItem("table"),
      }),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });
  }, []);

  function onSubmit() {
    socket.emit("command", {
      cart,
      etablishmentId,
      price,
      table: localStorage.getItem("table"),
    });
    setCart([]);
    setRedirect(true);
  }

  return (
    <div>
      {redirect && <Navigate to={`/menu/${etablishmentId}`} />}
      <div>
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onSubmit={onSubmit} />
          </Elements>
        )}
      </div>
    </div>
  );
}
