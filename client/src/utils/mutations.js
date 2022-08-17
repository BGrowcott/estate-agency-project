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
    $shortDescription: String!
    $address: String!
    $price: Float!
    $deposit: Float!
    $bedroom: Int!
    $bathroom: Int!
    $vrUrl: String
    $keyFeatures: [String]
  ) {
    createProperty(
      title: $title
      description: $description
      shortDescription: $shortDescription
      address: $address
      price: $price
      deposit: $deposit
      bedroom: $bedroom
      bathroom: $bathroom
      vrUrl: $vrUrl
      keyFeatures: $keyFeatures
    ) {
      modifiedAt
      createdAt
      keyFeatures
      isAvailable
      bathroom
      bedroom
      vrUrl
      imageUrl
      deposit
      price
      address
      description
      shortDescription
      title
      _id
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty(
    $id: ID!
    $shortDescription: String
    $title: String
    $description: String
    $address: String
    $price: Float
    $deposit: Float
    $bedroom: Int
    $bathroom: Int
    $vrUrl: String
    $isAvailable: Boolean
    $keyFeatures: [String]
  ) {
    updateProperty(
      _id: $id
      shortDescription: $shortDescription
      title: $title
      description: $description
      address: $address
      price: $price
      deposit: $deposit
      bedroom: $bedroom
      bathroom: $bathroom
      vrUrl: $vrUrl
      isAvailable: $isAvailable
      keyFeatures: $keyFeatures
    ) {
      _id
      title
      shortDescription
      description
      address
      price
      deposit
      vrUrl
      imageUrl
      bedroom
      bathroom
      isAvailable
      keyFeatures
      createdAt
      modifiedAt
    }
  }
`;
