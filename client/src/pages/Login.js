import { useQuery } from "@apollo/client";
import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../components/Loading";
import { UserContext } from "../context/context";
import { GET_USER } from "../schema/queries";

function Login() {
  const { handleLogin, email, password, setEmail, setPassword } = useContext(
    UserContext
  );
  
  const { data, loading } = useQuery(GET_USER, { fetchPolicy: 'network-only' });

  if (loading) return <Loading />;
  if (data.me?.id) return <Redirect to="/" />;

  return (
    <Box
      display="flex"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="sm" px="4" py="8" borderWidth="2px" borderRadius="lg">
        <Text as="h2" fontSize="2xl" align="center">
          👋 Log in
        </Text>
        <Box as="form" mt="16" onSubmit={handleLogin}>
          <Input
            placeholder="Enter your email"
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
            Login
          </Button>
        </Box>
        <Center>
          <Text as="h6">
            Don't have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "underline" }}>
              Sign up
            </Link>
          </Text>
        </Center>
      </Box>
    </Box>
  );
}

export default Login;
