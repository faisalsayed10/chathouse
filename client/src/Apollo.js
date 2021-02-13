import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: user.id
    // }
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;