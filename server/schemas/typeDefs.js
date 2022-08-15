const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Property {
    _id: ID
    title: String
    shortDescription: String
    description: String
    address: String
    price: Float
    deposit: Float
    imageUrl: [String]
    vrUrl: String
    bedroom: Int
    bathroom: Int
    isAvailable: Boolean
    createdAt: String
    modifiedAt: String
  }

  type Base {
    _id: ID
    name: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    property(_id: ID!): Property
    properties: [Property]
    base: [Base]
    singleBase(_id: ID!): Base
    checkout: Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createBase(name: String!): Base
    createProperty(
      title: String!
      description: String!
      shortDescription: String!
      address: String!
      price: Float!
      deposit: Float!
      bedroom: Int!
      bathroom: Int!
      vrUrl: String
    ): Property
    updateProperty(
      _id: ID!
      title: String
      description: String
      shortDescription: String
      address: String
      price: Float
      deposit: Float
      bedroom: Int
      bathroom: Int
      vrUrl: String
      isAvailable: Boolean
    ): Property
  }
`;

module.exports = typeDefs;
