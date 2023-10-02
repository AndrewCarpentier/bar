import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/menuContext";
import { Link, useParams } from "react-router-dom";
export default function Cart() {
  const { cart, etablishment } = useContext(MenuContext);
  const { etablishmentId } = useParams();
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    cart.map((c) => {
      price += c.product.price * c.quantity;
    });
    setPrice(price);
  }, []);

  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6">
          {etablishment != null &&
            cart.map((product) => (
              <li key={product.product._id} className="flex py-4">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={product.product.img}
                    alt={product.product.description}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.product.href}>
                          {product.product.name}
                        </a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.product.price}€
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      qty : {product.quantity}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.product.description.slice(0, 55)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <div className="border-t mt-6 border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{price}€</p>
          </div>
          <div className="mt-6">
            <Link
              to={`/menu/${etablishmentId}/payment/${price}`}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
