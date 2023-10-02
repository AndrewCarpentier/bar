import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProduct, modifyProduct } from "../../api/product";
import { useContext } from "react";
import { MainContext } from "../../context/mainContext";
export function CreateProductForm({ idEtablishment, setShowAddProduct }) {
  const { setEtablishment, updateProduct } = useContext(MainContext);
  const validationSchema = yup.object({
    name: yup.string().required(),
    img: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    sizes: yup.array().of(
      yup.object({
        price: yup.number,
      })
    ),
  });

  const initialValues = {
    name: "",
    img: "",
    description: "",
    price: 0,
    sizes: [],
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    trigger,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "sizes",
    control,
  });

  function addActivity() {
    append({
      size: "",
      price: 0,
    });
  }

  function deleteActivity(index) {
    remove(index);
  }

  const submit = handleSubmit(async (values) => {
    setShowAddProduct(false);
    if (updateProduct) {
      const etablishmentUpdated = await modifyProduct(
        values,
        idEtablishment,
        updateProduct
      );
      setEtablishment(etablishmentUpdated);
    } else {
      const etablishmentUpdated = await addProduct(values, idEtablishment);
      setEtablishment(etablishmentUpdated);
    }
  });

  return (
    <form onSubmit={submit}>
      <div className="max-w-md px-4 ml-10">
        <label for="website-url" className="block py-2 text-gray-500">
          Name
        </label>
        <div className="flex items-center text-gray-400 border rounded-md">
          <input
            {...register("name")}
            defaultValue={updateProduct && updateProduct.name}
            type="text"
            placeholder=""
            id="website-url"
            className="w-full p-2.5 ml-2 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="max-w-md px-4 ml-10">
        <label for="website-url" className="block py-2 text-gray-500">
          Image url
        </label>
        <div className="flex items-center text-gray-400 border rounded-md">
          <input
            {...register("img")}
            defaultValue={updateProduct && updateProduct.img}
            type="text"
            placeholder=""
            id="website-url"
            className="w-full p-2.5 ml-2 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="max-w-md px-4 ml-10">
        <label for="website-url" className="block py-2 text-gray-500">
          Price
        </label>
        <div className="flex items-center text-gray-400 border rounded-md">
          <input
            {...register("price")}
            defaultValue={updateProduct && updateProduct.price}
            type="number"
            min="0"
            step=".10"
            placeholder=""
            id="website-url"
            className="w-full p-2.5 ml-2 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="max-w-md px-4 ml-10">
        <label for="website-url" className="block py-2 text-gray-500">
          Description
        </label>
        <div className="flex items-center text-gray-400 border rounded-md">
          <input
            {...register("description")}
            defaultValue={updateProduct && updateProduct.description}
            type="text"
            placeholder=""
            id="website-url"
            className="w-full p-2.5 ml-2 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="max-w-md px-4 ml-10">
        {/* <button
          className="px-4 py-4 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
          onClick={addActivity}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <ul>
            {fields.map((sizes, idx) => (
              <li key={sizes.id}>
                <label>size</label>
                <select
                  {...register(`sizes[${idx}].size`)}
                  id="size"
                  className="mb10"
                >
                  <option value="25cl">25 cl</option>
                  <option value="33cl">33 cl</option>
                  <option value="50cl">50 cl</option>
                  <option value="1l">1l</option>
                </select>
                <label className="mb10 text-info" htmlFor="price">
                  Price
                </label>
                <input
                  {...register(`sizes[${idx}].price`)}
                  className="flex-fill mb10"
                  id="price"
                  type="number"
                  min="0"
                  step=".10"
                />
                <button
                  type="button"
                  onClick={() => deleteActivity(idx)}
                  className="btn btn-warning mt-10"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </div> */}
        <button
          disabled={isSubmitting}
          className="px-6 py-3.5 mt-3 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg ml-4"
        >
          {updateProduct ? "Change product" : "Create product"}
        </button>
      </div>
    </form>
  );
}
