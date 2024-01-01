import { useState } from 'react';
import { useEffect } from 'react';

import axiosInstance  from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance"






export const useJwtAuth = () => {
//Purpose of this custom hook is to check for JWT token and check whether its expired and if so, then delete JWT and redirects to Log in page
const [jwtToken, setJwtToken] = useState(localStorage.getItem('token'));



const isTokenExpired = async(jwtToken) => {
    try {
      setAuthToken(jwtToken);
      const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo");
      console.log(response.data);
      
      if (response.data.error == "Token expired") {

        // Token has expired
        return true;
      }
      // Token is still valid
     
      return false;
    } catch (error) {
      
      // Handle decoding errors
      console.error('Error decoding JWT:', error);
      return true; // Assume expired on error
    }


  };

  const checkTokenExpiration = async () => {
    if (jwtToken && (await isTokenExpired(jwtToken))) {
      localStorage.removeItem('token');
      setJwtToken(null);
      
    }
  };



  
    useEffect(() => {
      const checkTokenInterval = setInterval(() => {
        checkTokenExpiration();
      }, 60000); // Check every 60 seconds, adjust as needed
    
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(checkTokenInterval);
    }, [jwtToken]);
 


  return { jwtToken};



};