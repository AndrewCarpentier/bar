import { useState } from "react";
import { MainContext } from "../context/mainContext";
export default function MainProvider({ children }) {
  const [etablishmentList, setEtablishmentList] = useState(null);
  const [etablishment, setEtablishment] = useState(null);
  const [commandList, setCommandList] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);

  return (
    <MainContext.Provider
      value={{
        setEtablishment,
        etablishment,
        etablishmentList,
        setEtablishmentList,
        commandList,
        setCommandList,
        updateProduct,
        setUpdateProduct
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
