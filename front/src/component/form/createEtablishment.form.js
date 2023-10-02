import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { CreateEtablishment } from "../../api/etablishment";
import { MainContext } from "../../context/mainContext";
export function CreateEtablishmentForm() {
  const { user } = useContext(AuthContext);
  const { setEtablishmentList, etablishmentList } = useContext(MainContext);
  const validationSchema = yup.object({
    name: yup.string().required(),
  });

  const initialValues = {
    name: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    const newEtablishment = await CreateEtablishment(
      values.name,
      user._id,
      user.email
    );
    let list = [];
    etablishmentList.map((p) => {
      list.push(p);
    });
    list.push(newEtablishment);
    setEtablishmentList(list);
  });

  return (
    <form onSubmit={submit}>
      <div className="max-w-md px-4 ml-10">
        <label for="website-url" className="block py-2 text-gray-500">
          Etablishment name
        </label>
        <div className="flex items-center text-gray-400 border rounded-md">
          <input
            {...register("name")}
            type="text"
            placeholder="Le Fût Gourmand"
            id="website-url"
            className="w-full p-2.5 ml-2 bg-transparent outline-none"
          />
          <button
            disabled={isSubmitting}
            className="px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg ml-4"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
