require("dotenv").config();
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const { createTokens } = require("./util/auth.js");
const { getUser } = require("./util/users.js");
const app = require("express")();
app.use(cookieParser());
const server = require("./schema/schema.js");


const startServer = async () => {
  app.use(async (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken && !accessToken) {
      return next();
    }

    try {
      const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.id = data.id;
      return next();
    } catch {}

    if (!refreshToken) {
      return next();
    }

    let data;

    try {
      data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return next();
    }

    const user = await getUser(data.id);

    // token is invalid
    if (!user || user.count !== data.count) {
      return next();
    }

    const tokens = createTokens(user);

    res.cookie("refresh-token", tokens.refreshToken, {
      expire: 60 * 60 * 24 * 7,
    });
    res.cookie("access-token", tokens.accessToken, { expire: 60 * 15 });
    req.id = user.id;

    next();
  });

  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

startServer();
