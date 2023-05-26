import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context";
import { useState } from "react";

export default function AuthProvider({ children }) {
  const beers = useLoaderData();
  const [numberOfBeers, setNumberOfBeers] = useState({});
  const [sizeOfBeers, setSizeOfBeers] = useState({});

  function setChangeSizePrice(price, id) {
    setSizeOfBeers((beers) => {
      return {
        ...beers,
        [id]: beers[id] ? price : price,
      };
    });
  }

  function addBeer(id) {
    setNumberOfBeers((beers) => {
      return {
        ...beers,
        [id]: beers[id] ? beers[id] + 1 : 1,
      };
    });
  }

  function removeBeer(id) {
    setNumberOfBeers((beers) => {
      return {
        ...beers,
        [id]: beers[id] - 1,
      };
    });
  }

  const payment = Object.entries(numberOfBeers)
    .filter(([key, value]) => value > 0)
    .map(([key, value]) => {
      const findBeer = beers.find((beer) => {
        return beer._id === key;
      });

      let findSize = Object.entries(sizeOfBeers)
        .filter(([key, value]) => value > 0)
        .map(([key, value]) => {
          return {
            id: key,
            price: value,
          };
        })
        .filter((e) => e.id === key);

      return {
        id: key,
        name: findBeer.name,
        price:
          findSize.length === 0 ? findBeer.sizes[0].price : findSize[0].price,
        image: findBeer.img,
        count: value,
      };
    });

  let totalPrice = payment.reduce(
    (acc, value) => acc + value.count * value.price,
    0
  );

  const totalOfBeers = Object.values(numberOfBeers).reduce(
    (acc, value) => acc + value,
    0
  );

  return (
    <AuthContext.Provider
      value={{
        beers,
        addBeer,
        removeBeer,
        totalOfBeers,
        numberOfBeers,
        totalPrice,
        payment,
        setChangeSizePrice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
