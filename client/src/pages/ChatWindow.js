import { Box, Container, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Chat from "../components/Chat";
import { useAddMutation } from "mutation-cache-update";
import { GET_MESSAGES, SEND_MESSAGE } from "../query/queries";

function ChatWindow() {
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("")
  const [sendMessage] = useAddMutation(
    SEND_MESSAGE,
    GET_MESSAGES,
    "postMessage",
    "messages"
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await sendMessage({ variables: { author: user, message: content } });
      setContent("");
    } catch (err) {
      setError("Server not reachable at the moment")
      setContent("");
    }
  };

  return (
    // <Flex
    //   justify="center"
    //   alignItems="center"
    //   bgColor="#f5f4ed"
    //   w="100%"
    //   height="100vh"
    //   direction="column"
    // >
    <Container
      bgColor="#f8f8ff"
      width={["300px", "500px", "1200px"]}
      my="6"
      height="80vh"
      borderRadius="10px"
    >
      <Container my="2" p="0" height="100%" overflow="scroll">
        {error ? (
          <Text color="red.500" fontSize="2xl" align="center">
            {error}
          </Text>
        ) : (
          <Chat user={user} error={error} />
        )}
      </Container>
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
    // </Flex>
  );
}

export default ChatWindow;
