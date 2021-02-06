import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  {
    messages {
      id
      message
      author
      createdAt
    }
  }
`

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const SEND_MESSAGE = gql`
  mutation($author: String!, $message: String!) {
    postMessage(author: $author, message: $message)
  }
`