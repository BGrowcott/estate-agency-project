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
import Auth from "./utils/auth";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Header from "./components/header";
import Footer from "./components/footer";
import ModalSignup from "./components/modals/ModalSignup";
import ModalLogin from "./components/modals/ModalLogin";
import Content from "./pages/Content";
import PropertyView from "./pages/PropertyView";

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

let user;

function App() {

  if (Auth.loggedIn()){
    user = Auth.getProfile();
  }
  function adminPage() {
    if (Auth.loggedIn() && user.data.role === "admin") {
      return <Route path="/admin" element={<Admin />} />;
    }
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content" element={<Content />} />
            {adminPage()}
            <Route path="/property/:id" element={<PropertyView/>}/>
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
          <ModalLogin />
          <ModalSignup />
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
