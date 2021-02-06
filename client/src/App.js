import { ChakraProvider } from "@chakra-ui/react";
import ChatWindow from "./pages/ChatWindow";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./pages/PrivateRoute";
import { UserProvider } from "./context/context";

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <UserProvider>
            <Switch>
              <PrivateRoute path="/" exact>
                <ChatWindow />
              </PrivateRoute>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </UserProvider>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: 'include'
});

export default App;
