import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./page/homepage/homepage";
import Signup from "./page/signup/signup";
import Signin from "./page/signin/signin";
import Detail from "./page/detail/detail";
import Menu from "./page/menu/menu";
import MenuDetail from "./page/menu/detail";
import Cart from "./page/menu/cart";
import Stripe from "./page/stripe/stripe";
import { userLoader } from "./loader/userLoader";
import ProtectedRouteAuth from "./protectedRoutes/ProtectedRouteAuth";
import Contact from "./page/contact/contact";
import PasswordLost from "./page/passwordLost/passwordLost";
import PasswordLost2 from "./page/passwordLost/passwordLost2";
import Profile from "./page/profile/profile";
import PrivacyPolicy from "./page/privacyPolicy/privacyPolicy";
export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "signup",
        element: (
          <ProtectedRouteAuth>
            <Signup />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "signin",
        element: (
          <ProtectedRouteAuth>
            <Signin />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "menu/:etablishmentId",
        element: <Menu />,
      },
      {
        path: "menu/:etablishmentId/cart",
        element: <Cart />,
      },
      {
        path: "privacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "menu/:etablishmentId/detail/:productId",
        element: <MenuDetail />,
      },
      {
        path: "menu/:etablishmentId/payment/:price",
        element: <Stripe />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "passwordLost",
        element: (
          <ProtectedRouteAuth>
            <PasswordLost />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "passwordLost/:email",
        element: (
          <ProtectedRouteAuth>
            <PasswordLost2 />
          </ProtectedRouteAuth>
        ),
      },
    ],
  },
]);
