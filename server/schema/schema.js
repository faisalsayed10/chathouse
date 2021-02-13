const { gql, ApolloServer, PubSub } = require("apollo-server-express");
const { Mutation, Subscription } = require("./mutationResolvers");
const { Query } = require("./queryResolvers");

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

  type Subscription {
    newMessage: Message
    deleteMessage: Message
  }

  type Mutation {
    postMessage(message: String!, author: String!): ID
    deleteMessage(id: ID!): String
    register(userName: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean!
  }
`;

const pubsub = new PubSub()
const resolvers = { Subscription, Query, Mutation };

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub }),
  playground: true,
  introspection: true,
});
