const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    title: String,
    dob: String,
    passportNumber: String,
    phone: String,
    weChat: String,
    school: String,
    specialty: String, 
    emergencyContactName: String,
    emergencyContactNumber: String,
    emergencyContactAddress: String,
    otherInformation: String,
    properties: [Property]
    role: String
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
    checkout(propertyId: ID!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

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

    deleteProperty(propertyId: ID!): Property

    updateUser(
      _id: ID!
      username: String
      email: String
      title: String
      dob: String
      passportNumber: String
      phone: String
      weChat: String
      school: String
      specialty: String
      emergencyContactName: String
      emergencyContactNumber: String
      emergencyContactAddress: String
      otherInformation: String
    ): User

    uploadImage(imageFile: String, fileName: String, fileExtension: String, propertyId: ID): Property

    saveForLater(userId: ID!, propertyId: ID!): User
  }
`;

module.exports = typeDefs;
