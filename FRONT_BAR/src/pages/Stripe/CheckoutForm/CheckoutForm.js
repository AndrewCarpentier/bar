import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

function CheckoutForm({ onSubmit }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/?paymentSuccess=true`,
        },
      })
      .then(onSubmit());

    if (error) {
      setMessage(error.message);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-primary mt20" disabled={isProcessing}>
        {isProcessing ? "en cours de traitement" : "Payez maintenant"}
      </button>
      {message}
    </form>
  );
}

export default CheckoutForm;
