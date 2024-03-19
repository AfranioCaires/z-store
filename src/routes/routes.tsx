import Error from "@/pages/error";
import { Home } from "@/pages/home";
import Products from "@/pages/products";
import { Root } from "@/pages/root";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./private-route";
import { Checkout } from "@/pages/checkout";
import { SignIn } from "@/pages/signIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:productId",
        element: <Products />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
