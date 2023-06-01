export default function Homepage() {
    const URLParams = new URLSearchParams(window.location.search);
    const paymentSuccess = URLParams.get('paymentSuccess');
    return (
        <div className="flex-fill">
            {
                paymentSuccess && (<h1>🎉 Paiement réussi 🎉</h1>)
            }
            <h1>Homepage</h1>
        </div>
    )
}