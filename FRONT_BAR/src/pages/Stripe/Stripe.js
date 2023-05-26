import { useContext } from "react";
import { AuthContext } from "../../context";

function Stripe(){
    const {payment} = useContext(AuthContext);
    console.log(
        payment
    )
    return(
        <div>Stripe</div>
    )
};

export default Stripe;