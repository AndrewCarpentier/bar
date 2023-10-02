import { useEffect, useState, Fragment, useContext } from "react";
import { GetEtablishmentByEtablishmentId } from "../../api/etablishment";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/menuContext";
export default function Menu() {
  const { etablishmentId } = useParams();
  const { setEtablishment, etablishment, cart } = useContext(MenuContext);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  useEffect(() => {
    GetEtablishmentByEtablishmentId(etablishmentId).then((values) => {
      setEtablishment(values);
    });

    localStorage.setItem("table", urlParams.get("table"));
  }, []);

  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6">
          {etablishment != null &&
            etablishment.productList.map((product) => (
              <li key={product._id} className="flex py-4">
                <Link
                  to={`/menu/${etablishmentId}/detail/${product._id}`}
                  className="flex"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={product.img}
                      alt={product.description}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.price}€
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description.slice(0, 55)}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
        {cart.length > 0 && (
          <Link
            to={`/menu/${etablishmentId}/cart`}
            className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
          >
            <button className="w-full px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
              Cart
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
