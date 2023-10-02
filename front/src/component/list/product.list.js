import { deleteProductById } from "../../api/etablishment";
import { MainContext } from "../../context/mainContext";
import { useContext } from "react";
export function ProductList({ products, setShowAddProduct }) {
  const { setEtablishment, etablishment, setUpdateProduct } =
    useContext(MainContext);

  async function deleteProduct(productId) {
    const etablishmentUpdated = await deleteProductById(
      etablishment,
      productId
    );
    setEtablishment(etablishmentUpdated);
  }

  async function updateProduct(product) {
    setUpdateProduct(product);
    setShowAddProduct(true);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, idx) => (
            <div key={idx}>
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.img}
                    alt={product.description}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
                <p>{product.description}</p>
              </div>
              <button
                onClick={() => updateProduct(product)}
                className="px-4 mr-10 py-4 mt-4 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
              >
                Update
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="px-4 py-4 mt-4 text-red-600 bg-red-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
