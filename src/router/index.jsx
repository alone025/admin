import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Products from "../pages/products-page/ProductsPage"; // Example child component
import DiscountPage from "../pages/discounts-page/DiscountsPage";
import CostumersPage from "../pages/costumers-page/CostumersPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Products />
            },
            {
                path: '/discount',
                element: <DiscountPage/>
            },
            {
                path: '/costumers',
                element: <CostumersPage/>
            }
        ]
    }
]);

export default router;
