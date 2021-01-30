const { getAllMessages } = require("../util/messages");
const { getUser } = require("../util/users");

const Query = {
  messages: () => getAllMessages(),
  me: (_, __, { req }) => {
    if (!req.id) {
      return null;
    }

    return getUser(req.id);
  },
};

module.exports = { Query }