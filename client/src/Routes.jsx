import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/homePage";
import Register from "./pages/registerPage";
import Login from "./pages/loginPage";
import {ProtectedPage} from "./components/ProtectedPage";
import Category from "./pages/categoryPage";
import Product_Detail from "./pages/product_detailPage";
import ManageProductsPage from "./pages/manageProductsPage";


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