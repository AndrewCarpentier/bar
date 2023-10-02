import { useState } from "react";
import { MenuContext } from "../context/menuContext";

export default function MenuProvider({ children }) {
  const [etablishment, setEtablishment] = useState(null);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(null);

  function getProduct(idProduct) {
    const product = etablishment.productList.filter(
      (product) => product._id === idProduct
    )[0];
    setProduct(product);
    return product;
  }

  function setCartItem() {
    const c = cart;
    let bool = false;
    c.map((p) => {
      if (p.product._id === product._id) {
        p.quantity = p.quantity + 1;
        bool = true;
      }
    });
    if (!bool) {
      c.push({ product, quantity: 1 });
    }
    setCart(c);
  }

  return (
    <MenuContext.Provider
      value={{
        setEtablishment,
        etablishment,
        getProduct,
        product,
        setCartItem,
        cart,
        setCart
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
