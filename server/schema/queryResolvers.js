const { getAllMessages } = require("../util/messages");
const { getUser, getAllUsers } = require("../util/users");

const Query = {
  messages: () => getAllMessages(),
  me: (_, __, { req }) => {
    if (!req.id) {
      return null;
    }

    return getUser(req.id);
  },
  users: () => getAllUsers()
};

module.exports = { Query }