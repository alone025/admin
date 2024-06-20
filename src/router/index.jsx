import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Products from "../pages/products-page/ProductsPage"; // Example child component

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Products />
            }
        ]
    }
]);

export default router;
