import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_PROPERTY = gql`
  mutation createProperty(
    $title: String!
    $description: String!
    $address: String!
    $price: Int!
    $bedroom: Int
    $bathroom: Int
  ) {
    createProperty(
      title: $title
      description: $description
      address: $address
      price: $price
      bedroom: $bedroom
      bathroom: $bathroom
    ) {
      _id
      title
      description
      address
      price
      imageUrl
      bedroom
      bathroom
    }
  }
`;
