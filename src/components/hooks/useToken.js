import { useState } from 'react';

export default function useToken() {
    
  const getToken = () => {
    const tokenString = window.localStorage.getItem('token');
    let clean;
    if(tokenString!=null){
        clean = tokenString.slice(1,-1);
        console.log(clean);
        console.log(tokenString);
    }
    return clean;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    window.localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  
  return {
      setToken: saveToken,
      token
  }
}