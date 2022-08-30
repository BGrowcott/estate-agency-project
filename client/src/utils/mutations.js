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
    ) {
      modifiedAt
      createdAt
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
      createdAt
      modifiedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String
    $email: String
    $title: String
    $dob: String
    $passportNumber: String
    $phone: String
    $weChat: String
    $school: String
    $specialty: String
    $emergencyContactName: String
    $emergencyContactNumber: String
    $emergencyContactAddress: String
    $otherInformation: String
  ) {
    updateUser(
      _id: $id
      username: $username
      email: $email
      title: $title
      dob: $dob
      passportNumber: $passportNumber
      phone: $phone
      weChat: $weChat
      school: $school
      specialty: $specialty
      emergencyContactName: $emergencyContactName
      emergencyContactNumber: $emergencyContactNumber
      emergencyContactAddress: $emergencyContactAddress
      otherInformation: $otherInformation
    ) {
      username
      email
      _id
      password
      title
      passportNumber
      dob
      phone
      weChat
      school
      specialty
      emergencyContactName
      emergencyContactNumber
      emergencyContactAddress
      otherInformation
      properties {
        _id
        title
        deposit
      }
    }
  }
`;

export const IMAGE_UPLOAD = gql`
  mutation imageUpload(
    $imageFile: String
    $fileName: String
    $fileExtension: String
    $propertyId: ID
  ) {
    uploadImage(
      imageFile: $imageFile
      fileName: $fileName
      fileExtension: $fileExtension
      propertyId: $propertyId
    ) {
      imageUrl
    }
  }
`;
