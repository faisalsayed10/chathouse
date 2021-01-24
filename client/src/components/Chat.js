import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import React from "react";
import { GET_MESSAGES } from "../query/queries";

function Chat() {
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      m="2"
      height="100%"
    >
      {data.messages.map(({ message, author, id, createdAt }) => (
        <h1>{message}</h1>
      ))}
    </Box>
  );
}

export default Chat;
