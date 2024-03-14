import Error from "@/pages/error";
import { Home } from "@/pages/home";
import Products from "@/pages/products";
import { Root } from "@/pages/root";
import { createBrowserRouter } from "react-router-dom";

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
    ],
    errorElement: <Error />,
  },
  // {
  //   path: "/signin",
  //   element: <SignIn />,
  // },
  // {
  //   path: "/users",
  //   element: (
  //     <PrivateRoute>
  //       <Users />
  //     </PrivateRoute>
  //   ),
  // },
]);

export default router;
