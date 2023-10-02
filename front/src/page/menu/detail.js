import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuContext } from "../../context/menuContext";
import { Navigate } from "react-router-dom";
export default function MenuDetail() {
  const [redirect, setRedirect] = useState(false);
  const { etablishmentId, productId } = useParams();
  const { getProduct, product, setCartItem } = useContext(MenuContext);

  useEffect(() => {
    getProduct(productId);
  }, []);

  function onSubmit() {
    setCartItem();
    setRedirect(true);
  }

  return (
    <div className="bg-white">
      {redirect && <Navigate to={`/menu/${etablishmentId}`}></Navigate>}
      <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            src={product && product.img}
            alt={product && product.img}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product && product.name}
          </h1>
        </div>

        <div className="lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {product && product.price}€
          </p>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div>
            <h3 className="sr-only">Description</h3>
          </div>
          <div className="space-y-6">
            <p className="text-base text-gray-900">
              {product && product.description}
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div>
            <h3 className="sr-only">Number</h3>
          </div>
          <div>
            <label className="text-gray-600">Amount</label>
            <div className="relative mt-2 max-w-xs text-gray-500">
              <input
                type="number"
                value="1"
                placeholder="0"
                min="0"
                step="1"
                className="w-full pl-8 pr-16 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <button
            onClick={onSubmit}
            className="w-full px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
          >
            Paye
          </button>
        </div>
      </div>
    </div>
  );
}
