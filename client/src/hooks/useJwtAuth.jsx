import jwt from 'jsonwebtoken';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';





export const useJwtAuth = () => {
//Purpose of this custom hook is to check for JWT token and check whether its expired and if so, then delete JWT and redirects to Log in page
const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
const isTokenExpired = (token) => {
    try {
      const decodedToken = jwt.decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
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

const navigate = useNavigate()

  useEffect(() => {
    if (jwtToken && isTokenExpired(jwtToken)) {
      localStorage.removeItem('jwtToken');
      setJwtToken(null);
      navigate('/login')
      
    }
  }, [jwtToken]);


  return { jwtToken};



};