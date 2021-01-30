import { Box, Button, Center, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Box
      display="flex"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="md" height="500px" borderWidth="1px" borderRadius="lg">
        <Text as="h1" fontSize="3rem" align="center">
          Login
        </Text>
        <Box as="form" mt="16">
          <Input
            placeholder="Enter your email"
            display="block"
            variant="flushed"
            m="0 auto"
            my="2"
            required
            type="text"
            w="sm"
          />
          <Input
            placeholder="Password"
            display="block"
            variant="flushed"
            m="0 auto"
            required
            type="password"
            w="sm"
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
