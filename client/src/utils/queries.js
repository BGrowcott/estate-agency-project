import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_PROPERTIES = gql`
  query allProperties {
    properties {
      _id
      title
      description
      address
      price
      bedroom
      bathroom
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query Checkout {
    checkout {
      session
    }
  }
`;
