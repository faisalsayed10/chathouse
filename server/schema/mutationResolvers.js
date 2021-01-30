const { postMessage, deleteMessage } = require("../util/messages");
const { createUser, loginUser } = require("../util/users");
require("dotenv").config();

const Mutation = {
  postMessage: (_, { message, author }, { req, res }) => {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken && !accessToken) {
      throw new Error("You are not logged in");
    }

    return postMessage({
      message,
      author,
      createdAt: new Date().toISOString(),
    });
  },
  deleteMessage: async (_, { id }) => {
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
};

module.exports = { Mutation };
