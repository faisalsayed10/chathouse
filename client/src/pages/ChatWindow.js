import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useContext, useRef, useState } from "react";
import Chat from "../components/Chat";
import { LOGOUT, SEND_MESSAGE } from "../schema/mutations";
import { UserContext } from "../context/context";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { GET_MESSAGES } from "../schema/queries";
import {
  SUBSCRIBE_TO_DELETED_MESSAGES,
  SUBSCRIBE_TO_MESSAGES,
} from "../schema/subscriptions";
import Rte from "../components/RichTextEditor";

function ChatWindow() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [logout, { client }] = useMutation(LOGOUT);
  const dummyRef = useRef();
  const { loading, data, subscribeToMore } = useQuery(GET_MESSAGES);

  const handleLogout = async (e) => {
    try {
      await logout();
      await client.clearStore();
      history.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await sendMessage({
        variables: { author: user.userName, message: content },
      });
      setContent("");
      dummyRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError("Server not reachable at the moment");
      setContent("");
    }
  };

  const subscribeToNewMessages = () =>
    subscribeToMore({
      document: SUBSCRIBE_TO_MESSAGES,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newMessage;
        return Object.assign({}, prev, {
          messages: [newFeedItem, ...prev.messages],
        });
      },
    });

  const subscribeToDeletedMessages = () =>
    subscribeToMore({
      document: SUBSCRIBE_TO_DELETED_MESSAGES,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const deletedItem = subscriptionData.data.deleteMessage;
        const messages = prev.messages.filter(
          (item) => item.id !== deletedItem.id
        );
        return { messages };
      },
    });

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
            overflowY="auto"
          >
            {error ? (
              <Text color="red.500" fontSize="2xl" align="center">
                {error}
              </Text>
            ) : (
              <Chat
                user={user?.userName}
                dummy={dummyRef}
                loading={loading}
                data={data}
                subscribeToNewMessages={subscribeToNewMessages}
                subscribeToDeletedMessages={subscribeToDeletedMessages}
              />
            )}
            <span ref={dummyRef}></span>
          </Container>
          <Box
            mt="4"
            as="form"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onSubmit={handleSubmit}
          >
            <Input
              mr="1"
              required
              placeholder="Type your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* <Rte value={content} setValue={setContent} /> */}
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
