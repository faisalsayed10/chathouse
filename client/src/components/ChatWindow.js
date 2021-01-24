import { Box, Container, Flex, IconButton, Input } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Chat from "./Chat";

function ChatWindow() {
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Flex
      justify="center"
      alignItems="center"
      bgColor="#f5f4ed"
      w="100%"
      height="100vh"
      direction="column"
    >
      <Container
        bgColor="#f8f8ff"
        width={["300px", "500px", "1200px"]}
        height="70%"
        borderRadius="10px"
      >
        <Chat />
        <Box as="form" display="flex" justifyContent="space-between" onSubmit={handleSubmit}>
          <Input
            mx="1"
            flex="1"
            placeholder="Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Input mr="1" flex="3" placeholder="Type your message..." />
          <IconButton
            type="submit"
            colorScheme="blue"
            icon={<ArrowForwardIcon />}
          />
        </Box>
      </Container>
    </Flex>
  );
}

export default ChatWindow;
