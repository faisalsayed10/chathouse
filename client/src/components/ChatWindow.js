import { Box, Container, Flex, IconButton, Input } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Chat from "./Chat";
import { useAddMutation, Loading } from "mutation-cache-update";
import { GET_MESSAGES, SEND_MESSAGE } from "../query/queries";

function ChatWindow() {
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [sendMessage, { error, loading, data }] = useAddMutation(
    SEND_MESSAGE,
    GET_MESSAGES,
    "postMessage",
    "messages"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ variables: { author: user, message: content } });
    setContent("");
  };

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
        <Chat user={user} />
        <Box
          as="form"
          display="flex"
          justifyContent="space-between"
          onSubmit={handleSubmit}
        >
          <Input
            mx="1"
            flex="1"
            placeholder="Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Input
            mr="1"
            flex="3"
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
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
