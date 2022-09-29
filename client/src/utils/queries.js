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
    shortDescription
    deposit
    imageUrl
    vrUrl
    isAvailable
  }
}
`;

export const QUERY_SINGLE_PROPERTY = gql`
query singleProperty($id: ID!) {
  property(_id: $id) {
    _id
    title
    description
    address
    price
    bedroom
    bathroom
    shortDescription
    deposit
    imageUrl
    vrUrl
    isAvailable
  }
}
`

export const QUERY_ME = gql`
query userDetail {
  me {
    _id
    username
    email
    title
    dob
    passportNumber
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
      address
      deposit
    }
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query Checkout($propertyId: ID!) {
    checkout(propertyId: $propertyId) {
      session
    }
  }
`;

export const QUERY_USERS = gql`
query Query {
  users {
    _id
    username
    email
    title
    dob
    passportNumber
    phone
    weChat
    properties {
      _id
      title
      address
    }
    role
  }
}
`
