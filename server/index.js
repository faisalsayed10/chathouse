const server = require("./schema/schema.js");
require("dotenv").config();

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
