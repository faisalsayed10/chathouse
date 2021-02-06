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
        <div
          key={id}
          style={{
            justifyContent: author === user ? "flex-end" : "flex-start",
            paddingBottom: "1em",
          }}
        >
          {author !== user && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18pt",
                paddingTop: 5,
              }}
            >
              {author.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              backgroundColor: user === author ? "#58bf56" : "#e5e6ea",
              color: user === author ? "white" : "black",
              padding: "1em",
              borderRadius: "1em",
              maxWidth: "60%",
            }}
          >
            {message}
          </div>
        </div>
      )) : (<Text fontSize="2xl" align="center">No messages to display.</Text>)}
    </>
  );
}

export default Chat;
