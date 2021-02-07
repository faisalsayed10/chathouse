import { Box, Button, Container, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import Chat from "../components/Chat";
import { LOGOUT, SEND_MESSAGE } from "../schema/mutations";
import { UserContext } from "../context/context";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

function ChatWindow() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line
  const [sendMessage, { _ }] = useMutation(SEND_MESSAGE);
  // eslint-disable-next-line
  const [logout, { __ }] = useMutation(LOGOUT); 

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await sendMessage({
        variables: { author: user.userName, message: content },
      });
      setContent("");
    } catch (err) {
      setError("Server not reachable at the moment");
      setContent("");
    }
  };

  const handleLogout = async (e) => {
    try {
      await logout();
      history.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        pos="absolute"
        right="10px"
        colorScheme="cyan"
        variant="ghost"
        top="10px"
        display="block"
        onClick={handleLogout}
      >
        Log Out
      </Button>
      <Flex justify="center" align="center">
        <Container
          borderWidth="2px"
          borderRadius="lg"
          bgColor="#f8f8ff"
          width={["300px", "450px", "500px"]}
          mt="14"
          mx="0"
          p="0"
          height="80vh"
          zIndex="2"
        >
          <Container
            className="custom-scroll"
            height="100%"
            px="2"
            overflow="scroll"
            overflowX="hidden"
          >
            {error ? (
              <Text color="red.500" fontSize="2xl" align="center">
                {error}
              </Text>
            ) : (
              <Chat user={user?.userName} error={error} />
            )}
          </Container>
          <Box
            mt="4"
            as="form"
            display="flex"
            justifyContent="space-between"
            onSubmit={handleSubmit}
          >
            <Input
              mr="1"
              required
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
    </>
  );
}

export default ChatWindow;
