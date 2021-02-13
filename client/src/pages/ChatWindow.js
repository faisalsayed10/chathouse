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
import Draft from "../draft/Draft";

function ChatWindow() {
  const { user } = useContext(UserContext);
  const history = useHistory();
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
          width={["300px", "450px", "600px"]}
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
            <Chat
              user={user?.userName}
              dummy={dummyRef}
              loading={loading}
              data={data}
              subscribeToNewMessages={subscribeToNewMessages}
              subscribeToDeletedMessages={subscribeToDeletedMessages}
            />
            <span ref={dummyRef}></span>
          </Container>
          <Draft dummyRef={dummyRef} userName={user?.userName} />
        </Container>
      </Flex>
    </>
  );
}

export default ChatWindow;
