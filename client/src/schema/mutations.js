import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      userName
      email
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation($author: String!, $message: String!) {
    postMessage(author: $author, message: $message)
  }
`;

export const REGISTER = gql`
  mutation($userName: String!, $email: String!, $password: String!) {
    register(userName: $userName, email: $email, password: $password) {
      id
      userName
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`

export const DELETE_MESSAGE = gql`
  mutation($id: ID!) {
    deleteMessage(id: $id)
  }
`