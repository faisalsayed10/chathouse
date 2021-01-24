const { gql, ApolloServer } = require("apollo-server");
const {
  postMessage,
  getAllMessages,
  deleteMessage,
} = require("../util/messages");
const { signInWithGithub } = require("../util/users");

const typeDefs = gql`
  type Message {
    message: String
    author: String
    id: ID
    createdAt: String
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    postMessage(message: String!, author: String!): ID
    deleteMessage(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    messages: () => getAllMessages(),
  },
  Mutation: {
    postMessage: (_, { message, author }) => {
      const data = {
        message,
        author,
        createdAt: new Date().toISOString(),
      };
      return postMessage(data);
    },
    deleteMessage: (_, { id }) => {
      return deleteMessage(id);
    },
  },
};

module.exports = new ApolloServer({ typeDefs, resolvers });
