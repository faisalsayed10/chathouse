const { gql, ApolloServer } = require("apollo-server-express");
const {
  postMessage,
  getAllMessages,
  deleteMessage,
} = require("../util/messages");
const bcrypt = require("bcryptjs");
const { createUser, getUser } = require("../util/users");
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
    count: Int
  }

  type Query {
    messages: [Message]
    me: User
  }

  type Mutation {
    postMessage(message: String!, author: String!): ID
    deleteMessage(id: ID!): String
    register(userName: String!, email: String!, password: String!): Boolean!
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
    register: async (_, { userName, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return createUser({ userName, email, password: hashedPassword });
    },
    login: async (_, { email, password }, { res }) => {
      const { accessToken, refreshToken, user } = loginUser(email, password)

      res.cookie("refresh-token", refreshToken, { expire: 60 * 60 * 24 * 7 });
      res.cookie("access-token", accessToken, { expire: 60 * 15 });

      return user;
    },
    logout: async (_, __, { req, res }) => {
      res.clearCookie("refresh-token");
      res.clearCookie("access-token");
      return true;
    }
  },
};

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
