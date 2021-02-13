import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_MESSAGES = gql`
  subscription {
    newMessage {
      id
      author
      message
    }
  }
`;

export const SUBSCRIBE_TO_DELETED_MESSAGES = gql`
  subscription {
    deleteMessage {
      id
    }
  }
`;
