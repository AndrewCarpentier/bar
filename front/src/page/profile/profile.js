import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../../component/header/header";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
export default function Profile() {
  const { user } = useContext(AuthContext);
  const validationSchema = yup.object({
    email: yup.string().email(),
    password: yup.string().min(6),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ initialValues, resolver: yupResolver(validationSchema) });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    try {
    } catch (errorMessage) {
      setError("generic", { type: "generic", errorMessage });
    }
  });

  return (
    <main className="w-full h-screen flex flex-col items-center px-4">
      <Header></Header>
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder={user.email}
              {...register("email")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            disabled={isSubmitting}
          >
            Change
          </button>
        </form>
      </div>
    </main>
  );
}
