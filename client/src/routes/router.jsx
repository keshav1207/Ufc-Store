import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import ProtectedPage from "../components/ProtectedPage";
import Category from "./category";


const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<ProtectedPage>  <Home/> </ProtectedPage> ,    
    },

    {
      path: "/register",
      element: < Register/>,
     
    },

    {
      path: "/login",
      element: < Login/>,
     
    },

    {
      path: "/category",
      element: < Category/>,
     
    },


  ]);

  return <RouterProvider router={router} />;
};

export default Router;