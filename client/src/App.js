import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";

import Home from "./pages/Home";
import Header from "./components/header";
import Footer from "./components/footer";
import ModalSignup from "./components/modals/ModalSignup";
import ModalLogin from "./components/modals/ModalLogin";
import Content from "./pages/Content";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content" element={<Content />} />
          </Routes>
          <Footer />
          <ModalLogin/>
          <ModalSignup/>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
