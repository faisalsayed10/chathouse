const { gql, ApolloServer } = require("apollo-server-express");
const { Mutation } = require("./mutationResolvers");
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

  type Mutation {
    postMessage(message: String!, author: String!): ID
    deleteMessage(id: ID!): String
    register(userName: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean!
  }
`;

const resolvers = { Query, Mutation };

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  playground: true,
  introspection: true,
});
