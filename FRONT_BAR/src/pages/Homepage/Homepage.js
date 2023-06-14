import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context";
export default function Homepage() {
  const URLParams = new URLSearchParams(window.location.search);
  const paymentSuccess = URLParams.get("paymentSuccess");
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const {resetCommand} = useContext(AuthContext)

  useEffect(() => {
    if (paymentSuccess) {
      setShowPaymentSuccess(true);
      resetCommand()
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
