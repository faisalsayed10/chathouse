import { useMutation } from "@apollo/client";
import React, { useState, createContext } from "react";
import { LOGIN } from "../query/queries";
import { useHistory } from "react-router-dom";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // signup function which will call the mutation
  // and then search the user from the jwt decoded token?

  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();
  // eslint-disable-next-line
  const [login, { _ }] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await login({ variables: { email, password } });
      setUser(data.login);
      console.log("redirecting...");
      history.push("/");
    } catch (err) {
      console.error(err);
      setErrors({ message: err.message });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userName,
        email,
        password,
        errors,
        setEmail,
        setPassword,
        setUserName,
        setErrors,
        handleLogin,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
