import { useQuery } from "@apollo/client";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { GET_MESSAGES } from "../query/queries";

function Chat({ user }) {
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;

  console.log(data)

  return (
    <>
      {data ? data?.messages.map(({ message, author, id, createdAt }) => (
        <Box
          key={id}
            display="flex"
            justifyContent={author === user ? "flex-end" : "flex-start"}
            py="2"
        >
          {author !== user && (
            <Box
                height="50px"
                width="50px"
                marginRight="0.5em"
                border="2px solid #e5e6ea"
                borderRadius="full"
                align="center"
                fontSize="18pt"
                pt="5px"
            >
              {author.slice(0, 2).toUpperCase()}
            </Box>
          )}
          <Box
              backgroundColor={user === author ? "#58bf56" : "#e5e6ea"}
              color={user === author ? "white" : "black"}
              px="4"
              pt="0.5em"
              borderRadius="sm"
              maxW="60%"
          >
            {message}
          </Box>
        </Box>
      )) : (<Text fontSize="2xl" align="center">No messages to display.</Text>)}
    </>
  );
}

export default Chat;
