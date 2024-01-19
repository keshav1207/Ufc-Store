import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import {ProtectedPage} from "./components/ProtectedPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ManageProductsPage from "./pages/ManageProductsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import PrivatePolicyPage from "./pages/PrivatePolicyPage";
import ShippingsAndReturnsPage from "./pages/ShippingsAndReturnsPage";
import GiftCardsPage from "./pages/GiftCardsPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import CartPage from "./pages/CartPage";
import StripeSuccessPage from "./pages/StripeSuccessPage";
import StripeFailurePage from "./pages/StripeFailurePage";



const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<HomePage/>  ,    
    },

    {
      path: "/register",
      element: < RegisterPage/>,
     
    },

    {
      path: "/login",
      element: < LoginPage/>,
     
    },

    {
      path: "/categories/:categoryName",
      element: < CategoryPage/>,
     
    },

    {
      path: "/products/:productId",
      element: < ProductDetailPage/>,
     
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