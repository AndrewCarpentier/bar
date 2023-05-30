import { useContext } from "react";
import { AuthContext } from "../../context";
import { socket } from "../../Socket";

function Stripe() {
  const { payment } = useContext(AuthContext);

  function onSubmit(){
    socket.emit('command', payment)
  }

  return (
    <div>
      Stripe
      <button onClick={onSubmit}>Valider</button>
    </div>
  );
}

export default Stripe;
