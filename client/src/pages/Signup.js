import { Box, Button, Center, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  
  return (
    <Box
      display="flex"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="sm" px="4" py="8" borderWidth="2px" borderRadius="lg">
        <Text fontSize="2xl" align="center">
          👋 Sign up
        </Text>
        <Box as="form" mt="16">
          <Input
            placeholder="Username"
            display="block"
            variant="flushed"
            m="0 auto"
            required
            type="text"
          />
          <Input
            placeholder="Email"
            display="block"
            variant="flushed"
            m="0 auto"
            my="2"
            required
            type="text"
          />
          <Input
            placeholder="Password"
            display="block"
            variant="flushed"
            m="0 auto"
            required
            type="password"
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

export default Signup
