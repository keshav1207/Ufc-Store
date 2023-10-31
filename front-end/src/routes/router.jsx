import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Register from "./register";


const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
     
    },

    {
      path: "/register",
      element: < Register/>,
     
    },


  ]);

  return <RouterProvider router={router} />;
};

export default Router;