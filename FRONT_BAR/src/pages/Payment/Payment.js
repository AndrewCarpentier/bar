import { useContext } from "react";
import { AuthContext } from "../../context";
import { NavLink } from "react-router-dom";

export default function Payment() {
  const { totalPrice, payment } = useContext(AuthContext);
  return (
    <>
      <div className="d-flex flex-fill flex-column">
        {payment.length !== 0 ? (
          payment.map((beer, i) => {
            return (
              <h3 key={i}>
                NOM : {beer.name} | QTE : {beer.count} | TOTAL :{" "}
                {(beer.count * beer.price).toFixed(2)}
              </h3>
            );
          })
        ) : (
          <h3> Panier vide ...</h3>
        )}
      </div>
      <h2>TOTAL PANIER : {totalPrice.toFixed(2)}</h2>
      <NavLink to={payment.length === 0 ? "/payment" : "/stripe"}>
        <button className="btn btn-primary">PAY</button>
      </NavLink>
    </>
  );
}
