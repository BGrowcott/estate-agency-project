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
    description: String
    address: String
    price: Int
    imageUrl: [String]
    bedroom: Int
    bathroom: Int
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
    createProperty(title: String!, description: String!, address: String! price: Int!, bedroom: Int, bathroom: Int): Property
  }
`;

module.exports = typeDefs;
