import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { beerLoader } from "./loaders/beerLoader";
import Beers from "./pages/Beers/Beers";
import Food from "./pages/Food/Food";
import Homepage from "./pages/Homepage/Homepage";
import Payment from "./pages/Payment/Payment";
import Stripe from "./pages/Stripe/Stripe";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: beerLoader,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: '/beers',
                element: <Beers />
            },
            {
                path: '/food',
                element: <Food />
            },
            {
                path: '/payment',
                element: <Payment />
            },
            {
                path: '/stripe',
                element: <Stripe />
            },
        ]
    }
])