import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../asset/logo.png";
import { useParams, Navigate } from "react-router-dom";
import { updatePassword } from "../../api/auth";
import { useState } from "react";
export default function PasswordLost2() {
  const { email } = useParams();
  const [passwordChange, setPasswordChange] = useState(false);
  const validationSchema = yup.object({
    password: yup
      .string()
      .required("The password must be entered")
      .min(6, "At least six characters for the password"),
    passwordConfirm: yup
      .string()
      .required("The confirm password must be entered")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const initialValues = {
    password: "",
    passwordConfirm: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ initialValues, resolver: yupResolver(validationSchema) });

  const submit = handleSubmit(async (values) => {
    try {
      const result = await updatePassword(values.password, email);
      console.log(result);
      setPasswordChange(result);
    } catch (errorMessage) {
      setError("generic", { type: "generic", errorMessage });
    }
  });

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      {passwordChange && <Navigate to={`/`} />}
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <img src={logo} width={150} className="mx-auto" alt="" />
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Password lost
            </h3>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              {...register("password")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password confirm</label>
            <input
              type="password"
              required
              {...register("passwordConfirm")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            disabled={isSubmitting}
          >
            Change password
          </button>
        </form>
        <p className="text-center">
          <a
            href="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
