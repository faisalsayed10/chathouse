import { useQuery } from "@apollo/client";
import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../components/Loading";
import { UserContext } from "../context/context";
import { GET_USER } from "../schema/queries";

function Signup() {
  const {
    handleSignup,
    email,
    password,
    userName,
    setEmail,
    setPassword,
    setUserName,
  } = useContext(UserContext);
  const { data, loading } = useQuery(GET_USER);

  if (loading) return <Loading />;
  if (data.me?.id) return <Redirect to="/" />;

  return (
    <Box
      display="flex"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Text as="h1" fontSize="3xl" align="center">
        👋 Chathouse
      </Text>
      <Text as="p" align="center" mb="4">
        Public Drop-In Chat App
      </Text>
      <Box w="sm" px="4" py="8" borderWidth="2px" borderRadius="lg">
        <Text as="h2" fontSize="2xl" align="center">
          Sign up
        </Text>
        <Box as="form" mt="16" onSubmit={handleSignup}>
          <Input
            placeholder="Username"
            display="block"
            variant="flushed"
            m="0 auto"
            required
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Email"
            display="block"
            variant="flushed"
            m="0 auto"
            my="2"
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            display="block"
            variant="flushed"
            m="0 auto"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            m="0 auto"
            my="8"
            display="block"
            type="submit"
            colorScheme="cyan"
            variant="ghost"
          >
            Signup
          </Button>
        </Box>
        <Center>
          <Text as="h6">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "underline" }}>
              Log in
            </Link>
          </Text>
        </Center>
      </Box>
    </Box>
  );
}

export default Signup;
