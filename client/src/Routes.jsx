import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/homePage";
import Register from "./pages/registerPage";
import Login from "./pages/loginPage";
import {ProtectedPage} from "./components/ProtectedPage";
import Category from "./pages/categoryPage";
import Product_Detail from "./pages/product_detailPage";
import ManageProductsPage from "./pages/manageProductsPage";
import SearchResultsPage from "./pages/searchResultsPage";
import AboutUsPage from "./pages/aboutUsPage";
import ContactUsPage from "./pages/contactUsPage";
import CookiePolicyPage from "./pages/cookiePolicyPage";
import PrivatePolicyPage from "./pages/privatePolicyPage";
import ShippingsAndReturnsPage from "./pages/shippingsAndReturnsPage";
import GiftCardsPage from "./pages/giftCardsPage";
import UserDetailsPage from "./pages/userDetailsPage";
import CartPage from "./pages/cartPage";
import StripeSuccessPage from "./pages/stripeSuccessPage";
import StripeFailurePage from "./pages/stripeFailurePage";



const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>  ,    
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
      element: <ProtectedPage>< ManageProductsPage/> </ProtectedPage>,
     
    },

    {
      path: "/searchResults/:searchQuery",
      element: < SearchResultsPage/>,
     
    },

    {
      path: "/aboutUs",
      element: < AboutUsPage/>,
     
    },

    {
      path: "/contactUs",
      element: < ContactUsPage/>,
     
    },

    {
      path: "/cookiePolicy",
      element: < CookiePolicyPage/>,
     
    },

    {
      path: "/privatePolicy",
      element: < PrivatePolicyPage/>,
     
    },

    {
      path: "/shippingsAndReturns",
      element: < ShippingsAndReturnsPage/>,
     
    },
    {
      path: "/giftCards",
      element: < GiftCardsPage/>,
     
    },

    {
      path: "/userDetails",
      element: <ProtectedPage>< UserDetailsPage/></ProtectedPage>,
     
    },

    {
      path: "/cart",
      element: < CartPage/>,
     
    },


    {
      path: "/success",
      element: < StripeSuccessPage/>
     
    },


    {
      path: "/failure",
      element: < StripeFailurePage/>
     
    }
   


  ]);

  return <RouterProvider router={router} />;
};

export default Router;