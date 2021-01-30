import { ChakraProvider } from "@chakra-ui/react";
import ChatWindow from "./pages/ChatWindow";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" exact>
              <ChatWindow />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default App;
