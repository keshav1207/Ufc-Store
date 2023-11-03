import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";


const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
     
    },

    {
      path: "/register",
      element: < Register/>,
     
    },

    {
      path: "/login",
      element: < Login/>,
     
    },


  ]);

  return <RouterProvider router={router} />;
};

export default Router;