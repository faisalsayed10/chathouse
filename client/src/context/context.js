import React, { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie'
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // state with user information??
  // login function which will call the mutation
  // signup function which will call the mutation
  // useeffect to check if the user exists?
  // and then search the user from the jwt decoded token?
  // but how is the cookies gonna passed to the front end?
  // cookie automatically passed when i invoke the login in the frontend mebbe?


  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (Cookies.get("access-token")) {
      setIsAuthenticated(true);
    }
  }, []);


  return <UserContext.Provider value={{ user, isAuthenticated }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
