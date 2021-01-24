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