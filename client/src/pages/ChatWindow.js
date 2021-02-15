import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import Chat from "../components/Chat";
import { LOGOUT } from "../schema/mutations";
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
import CommunityGuidelinesModal from "../components/CommunityGuidelinesModal";
import { ReactComponent as Github } from "../assets/github.svg";

function ChatWindow() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [logout, { client }] = useMutation(LOGOUT);
  const dummyRef = useRef();
  const { loading, data, subscribeToMore } = useQuery(GET_MESSAGES);

  useEffect(() => dummyRef.current.scrollIntoView({ behavior: "smooth" }), []);

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
      <Flex m="2" align="center" justify="space-between">
        <CommunityGuidelinesModal />
        {/* <ProfileModal /> */}
        <Button
          fontSize={["sm", "md"]}
          padding={["12px", "17px"]}
          colorScheme="blue"
          variant="ghost"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Flex>
      <Flex justify="center" align="center" mt="2">
        <Container
          borderWidth="2px"
          borderRadius="lg"
          bgColor="#f8f8ff"
          mx="0"
          p="0"
          width={["85vw", "80vw", "600px"]}
          height={["65vh", "70vh", "70vh"]}
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
      <Box
        display={["none", "flex", "flex"]}
        justifyContent="center"
        alignItems="center"
        zIndex="1000"
        pos="fixed"
        bottom="0"
        height="30px"
        w="100%"
        bgColor="#dfdfdf"
      >
        <Text as="h4" align="center" mr="1">
          © Faisal Sayed
        </Text>
        <a
          href="https://github.com/faisalsayed10/chathouse"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
      </Box>
    </>
  );
}

export default ChatWindow;
