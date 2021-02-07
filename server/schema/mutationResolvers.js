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
      expires: new Date(Number(new Date()) + 604800000),
      sameSite: "None",
      secure
    });
    res.cookie("access-token", response.accessToken, {
      expires: new Date(Number(new Date()) + 900000),
      sameSite: "None",
      secure,
    });

    return response.userDetails;
  },
  login: async (_, { email, password }, { res }) => {
    const response = await loginUser(email, password);

    if (response.message) {
      throw new Error(response.message);
    }

    res.cookie("refresh-token", response.refreshToken, {
      expires: new Date(Number(new Date()) + 604800000),
      sameSite: "None",
      secure,
    });
    res.cookie("access-token", response.accessToken, {
      expires: new Date(Number(new Date()) + 900000),
      sameSite: "None",
      secure,
    });

    return response.user;
  },
  logout: async (_, __, { req, res }) => {
    res.clearCookie("refresh-token");
    res.clearCookie("access-token");
    return true;
  },
};

module.exports = { Mutation };
