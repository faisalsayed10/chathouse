const { gql, ApolloServer } = require("apollo-server-express");
const {
  postMessage,
  getAllMessages,
  deleteMessage,
} = require("../util/messages");
const { createUser, getUser, loginUser } = require("../util/users");
require("dotenv").config();

const typeDefs = gql`
  type Message {
    message: String
    author: String
    id: ID
    createdAt: String
  }

  type User {
    id: ID!
    userName: String!
    email: String!
  }

  type Query {
    messages: [Message]
    me: User
  }

  type Mutation {
    postMessage(message: String!, author: String!): ID
    deleteMessage(id: ID!): String
    register(userName: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean!
  }
`;

const resolvers = {
  Query: {
    messages: () => getAllMessages(),
    me: (_, __, { req }) => {
      if (!req.id) {
        return null;
      }

      return getUser(req.id);
    },
  },
  Mutation: {
    postMessage: (_, { message, author }) => {
      return postMessage({
        message,
        author,
        createdAt: new Date().toISOString(),
      });
    },
    deleteMessage: (_, { id }) => {
      return deleteMessage(id);
    },
    register: async (_, { userName, email, password }, { req, res }) => {
      const response = await createUser({ userName, email, password });
      if (response.message) {
        throw new Error(response.message);
      }

      res.cookie("refresh-token", response.refreshToken, {
        expire: 60 * 60 * 24 * 7,
      });
      res.cookie("access-token", response.accessToken, { expire: 60 * 15 });

      return response.userDetails;
    },
    login: async (_, { email, password }, { res }) => {
      const response = await loginUser(email, password);

      if (response.message) {
        throw new Error(response.message);
      }

      res.cookie("refresh-token", response.refreshToken, {
        expire: 60 * 60 * 24 * 7,
      });
      res.cookie("access-token", response.accessToken, { expire: 60 * 15 });

      return response.user;
    },
    logout: async (_, __, { req, res }) => {
      res.clearCookie("refresh-token");
      res.clearCookie("access-token");
      return true;
    },
  },
};

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
