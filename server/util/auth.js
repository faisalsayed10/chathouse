const { sign } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const refreshToken = sign(
    { id: user.id, email: user.email, userName: user.userName },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const accessToken = sign(
    { id: user.id, email: user.email, userName: user.userName },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15min",
    }
  );

  return { refreshToken, accessToken };
};

module.exports = { createTokens }