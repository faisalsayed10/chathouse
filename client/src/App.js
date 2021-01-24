import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import ChatWindow from './components/ChatWindow';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
          <ChatWindow />
      </ChakraProvider>
    </ApolloProvider>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default App;
