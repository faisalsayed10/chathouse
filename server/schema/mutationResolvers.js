const { verify } = require("jsonwebtoken");
const { postMessage, deleteMessage } = require("../util/messages");
const { createUser, loginUser } = require("../util/users");
require("dotenv").config();

const MESSAGE_POSTED = "MESSAGE_POSTED";
const MESSAGE_DELETED = "MESSAGE_DELETED";

const Subscription = {
  newMessage: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(MESSAGE_POSTED),
  },
  deleteMessage: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(MESSAGE_DELETED),
  },
};

const Mutation = {
  postMessage: (_, { message, author }, { req, res, pubsub }) => {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken && !accessToken) {
      throw new Error("You are not logged in");
    }

    let createdAt = new Date().toISOString();
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const id = postMessage({
      message,
      author,
      createdAt,
      isVerified: data.verified || false,
    });

    const messageObject = {
      id,
      message,
      author,
      createdAt,
      isVerified: data.verified || false,
    };

    pubsub.publish(MESSAGE_POSTED, {
      newMessage: messageObject,
    });

    return id;
  },
  deleteMessage: async (_, { id }, { pubsub }) => {
    const messageInfo = await deleteMessage(id);

    pubsub.publish(MESSAGE_DELETED, {
      deleteMessage: messageInfo,
    });

    return "Message Successfully Deleted!";
  },
  register: async (_, { userName, email, password }, { req, res }) => {
    const response = await createUser({ userName, email, password });
    if (response.message) {
      throw new Error(response.message);
    }

    res.cookie("refresh-token", response.refreshToken, {
      expires: new Date(Number(new Date()) + 604800000),
      sameSite: "None",
      secure: true,
    });
    res.cookie("access-token", response.accessToken, {
      expires: new Date(Number(new Date()) + 900000),
      sameSite: "None",
      secure: true,
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
      secure: true,
    });
    res.cookie("access-token", response.accessToken, {
      expires: new Date(Number(new Date()) + 900000),
      sameSite: "None",
      secure: true,
    });

    return response.user;
  },
  logout: async (_, __, { req, res }) => {
    res.clearCookie("refresh-token", {
      sameSite: "None",
      secure: true,
    });
    res.clearCookie("access-token", {
      sameSite: "None",
      secure: true,
    });
    return true;
  },
};

module.exports = { Mutation, Subscription };
