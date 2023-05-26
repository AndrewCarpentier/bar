import { createBrowserRouter } from "react-router-dom";
import { getOneBeer } from "./apis/beers";
import App from "./App";
import Content from "./components/content/Content";
import ContentBeers from "./components/content/ContentBeer";
import AddBeer from "./components/form/AddBeer";
import UpdateBeer from "./components/form/UpdateBeer";
import Homepage from './components/homepage/Homepage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                index: true,
                element: <Homepage />
            },
            {
                path: '/beers',
                element: <ContentBeers />,
                children: [
                    {
                        path: '',
                        element: <Content />,
                        // children: [
                        //     {
                        //         path: 'form_update',
                        //         element: <UpdateBeer />
                        //     }
                        // ]
                    },
                    {
                        path: 'form_add',
                        element: <AddBeer />
                    },
                    {
                        path: 'form_update/:id',
                        element: <UpdateBeer />,
                        loader: async ({params: {id}}) => getOneBeer(id)
                    }
                ]
            },
            // {
            //     path: 'form_add',
            //     element: <AddBeer />
            // }
        ]
    }
])