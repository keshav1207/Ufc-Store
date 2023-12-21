import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import {ProtectedPage} from "./components/ProtectedPage";
import Category from "./pages/category";
import Product_Detail from "./pages/product_detail";
import ManageProductsPage from "./pages/manageProducts";


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
      path: "/categories/:categoryName",
      element: < Category/>,
     
    },

    {
      path: "/products/:productId",
      element: < Product_Detail/>,
     
    },

   
    {
      path: "/manageproduct",
      element: < ManageProductsPage/>,
     
    },


  ]);

  return <RouterProvider router={router} />;
};

export default Router;