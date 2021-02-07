import { useMutation } from "@apollo/client";
import React, { useState, createContext } from "react";
import { LOGIN, REGISTER } from "../schema/mutations";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // eslint-disable-next-line
  const [login, { _ }] = useMutation(LOGIN, { onCompleted: undefined });
  // eslint-disable-next-line
  const [register, { __ }] = useMutation(REGISTER);
  const toast = useToast();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await login({ variables: { email, password } });
      console.log(data)
      setUser(data.login);
      toast({
        title: `Login Success!`,
        description: `You've logged in successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
      setPassword("");
      console.log("redirecting...");
      history.push("/");
    } catch (err) {
      console.error(err);
      toast({
        title: `An error occured.`,
        description: `${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const { data } = await register({
        variables: { userName, email, password },
      });
      setUser(data.register);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
      setUserName("");
      setPassword("");
      console.log("redirecting...");
      history.push("/");
    } catch (err) {
      console.error(err);
      toast({
        title: `An error occured.`,
        description: `${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userName,
        email,
        password,
        toast,
        setEmail,
        setPassword,
        setUserName,
        handleLogin,
        setUser,
        handleSignup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
