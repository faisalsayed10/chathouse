import { ChakraProvider } from "@chakra-ui/react";
import ChatWindow from "./pages/ChatWindow";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./pages/PrivateRoute";
import { UserProvider } from "./context/context";
import { ApolloProvider } from "@apollo/client";
import client from "./Apollo";

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

export default App;
