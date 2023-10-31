import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";


const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
     
    },

   
    
  ]);

  return <RouterProvider router={router} />;
};

export default Router;