import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import ProtectedPage from "../components/ProtectedPage";
import Category from "./category";
import Product_Detail from "./product_detail";
import AddProductPage from "./addProduct";


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

    {
      path: "/product",
      element: < Product_Detail/>,
     
    },

    {
      path: "/addproduct",
      element: < AddProductPage/>,
     
    },


  ]);

  return <RouterProvider router={router} />;
};

export default Router;