import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance"
import {  toast } from 'react-toastify';
import { API_BASE_URL } from "../apicalls/apiService";


export const useJwtAuth = () => {
//Purpose of this custom hook is to check for JWT token and check whether its expired and if so, then delete JWT 
//and redirects to the Log in page.

const [jwtToken, setJwtToken] = useState(localStorage.getItem('token'));


const isTokenExpired = async(jwtToken) => {
    try {
      setAuthToken(jwtToken);
      const response = await axiosInstance.get(`${API_BASE_URL}/api/users/getUserInfo`);
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

  //This custom id was used to avoid duplication of toast message.
  const customId = "AB"

  const checkTokenExpiration = async () => {
    if (jwtToken) {
      try {
        const expired = await isTokenExpired(jwtToken);

        if (expired) {
          localStorage.removeItem('token');
          setJwtToken(null);
          toast.error("Log in expired, Please log in again!", {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
          });
        }
      } catch (error) {
        // Handle errors appropriately
        console.error('Error checking token expiration:', error);
        
      }
    }
  };



  
    useEffect(() => {
      const checkTokenExpirationInterval = setInterval(() => {
        checkTokenExpiration();
      }, 60000); // Check every 60 seconds, adjust as needed
    
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(checkTokenExpirationInterval);
    }, [jwtToken]);
 


  return { jwtToken};
 


};