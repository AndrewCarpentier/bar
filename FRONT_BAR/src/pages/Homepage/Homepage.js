import { useState, useEffect } from "react";
export default function Homepage() {
  const URLParams = new URLSearchParams(window.location.search);
  const paymentSuccess = URLParams.get("paymentSuccess");
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    if (paymentSuccess) {
      setShowPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 3000);
    }
  }, []);

  return (
    <div className="flex-fill">
      <h1>Homepage</h1>
      {paymentSuccess && showPaymentSuccess && <h1>🎉 Paiement réussi 🎉</h1>}
    </div>
  );
}
