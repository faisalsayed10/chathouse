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
`;

export const GET_USER = gql`
  {
    me {
      id
      userName
      email
    }
  }
`;

export const GET_ALL_USERS_NAME = gql`
  {
    users {
      userName
    }
  }
`;
