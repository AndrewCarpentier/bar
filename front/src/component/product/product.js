import { useContext, useState } from "react";
import { CreateProductForm } from "../form/createProduct.form";
import { ProductList } from "../list/product.list";
import { MainContext } from "../../context/mainContext";
export function Product({ idEtablishment }) {
  const { etablishment, setUpdateProduct } = useContext(MainContext);
  const [showAddProduct, setShowAddProduct] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShowAddProduct(!showAddProduct);
          setUpdateProduct(null);
        }}
        className="px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg ml-4"
      >
        {showAddProduct ? <p>return back</p> : <p>add product</p>}
      </button>

      {showAddProduct ? (
        <CreateProductForm
          idEtablishment={idEtablishment}
          setShowAddProduct={setShowAddProduct}
        />
      ) : (
        <ProductList
          products={etablishment.productList}
          setShowAddProduct={setShowAddProduct}
        />
      )}
    </div>
  );
}
