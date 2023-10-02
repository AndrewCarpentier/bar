import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../api/auth";
import logo from "../../asset/logo.png";
import { Link } from "react-router-dom";
export default function Signup() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("The email must be entered")
      .email("Invalid Email"),
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
    email: "",
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
      await signup(values);
    } catch (errorMessage) {
      setError("generic", { type: "generic", errorMessage });
    }
  });

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src={logo} width={150} className="mx-auto" alt="" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Sign up
            </h3>
            <p className="">
              Already have an account?{" "}
              <a
                href="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              {...register("email")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
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
            <label className="font-medium">Confirm password</label>
            <input
              type="password"
              required
              {...register("passwordConfirm")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <p>
            By registering, you agree to adhere to our Terms of Service and{" "}
            <Link to="/privacyPolicy" className="text-blue-500 font-bold">
              Privacy Policy
            </Link>
            .
          </p>
          <ul>
            {errors?.email && <li>{errors.email.message}</li>}
            {errors?.password && <li>{errors.password.message}</li>}
            {errors?.confirmPassword && (
              <li>{errors.confirmPassword.message}</li>
            )}
            {errors?.generic && <li>{errors.generic.message}</li>}
          </ul>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            disabled={isSubmitting}
          >
            Create account
          </button>
        </form>
      </div>
    </main>
  );
}
