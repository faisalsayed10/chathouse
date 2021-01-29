const bcrypt = require("bcryptjs");
const { firestore } = require("./firebase-admin");
const { createTokens } = require("./auth");

const createUser = async (data) => {
  const user = await firestore.collection("users").doc();
  user.set({...data, count: 0});
  return true;
};

const loginUser = async (email, password) => {
  const snapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();

  let user;
  snapshot.forEach((doc) => {
    user = { ...doc.data(), id: doc.id };
  });

  if (user === undefined) {
    return null;
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) return null;

  const { accessToken, refreshToken } = createTokens(user);

  return { accessToken, refreshToken, user };
};

const getUser = async (id) => {
  const doc = await firestore.collection("users").doc(id).get();
  const user = {
    ...doc.data(),
    id: doc.id
  }

  return user;
};

module.exports = { createUser, loginUser, getUser };
