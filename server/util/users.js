const bcrypt = require("bcryptjs");
const { firestore } = require("./firebase-admin");
const { createTokens } = require("./auth");
const { validateEmail } = require("./emailValidator");
const {
  searchIfEmailExists,
  searchIfUserNameExists,
} = require("./userExistence");

const createUser = async (data) => {
  const userRef = await firestore.collection("users");
  const user = await userRef.doc();
  let errors;

  if (data.password.length < 8) {
    errors = { message: "password is too short" };
    return errors;
  }

  if (validateEmail(data.email) === false) {
    errors = { message: "email is invalid" };
    return errors;
  }

  const ifEmailExists = await searchIfEmailExists(userRef, data.email);
  const ifUserNameExists = await searchIfUserNameExists(
    userRef,
    data.userName.toLowerCase()
  );

  if (ifEmailExists && ifEmailExists.message) {
    errors = { message: ifEmailExists.message };
    return errors;
  }

  if (ifUserNameExists && ifUserNameExists.message) {
    errors = { message: ifUserNameExists.message };
    return errors;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userDetails = { ...data, password: hashedPassword, userName: data.userName.toLowerCase(), id: user.id };

  const { accessToken, refreshToken } = createTokens(userDetails);

  user.set({ ...data, password: hashedPassword });
  return { userDetails, userName: data.userName.toLowerCase(), accessToken, refreshToken };
};

const loginUser = async (email, password) => {
  const snapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();

  let user;
  let errors;
  snapshot.forEach((doc) => {
    user = { ...doc.data(), id: doc.id };
  });

  if (user === undefined) {
    errors = { message: "No such user exists" };
    return errors;
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    errors = { message: "Password is incorrect" };
    return errors;
  }

  const { accessToken, refreshToken } = createTokens(user);

  return { accessToken, refreshToken, user };
};

const getUser = async (id) => {
  const doc = await firestore.collection("users").doc(id).get();
  const user = {
    ...doc.data(),
    id: doc.id,
  };

  return user;
};

module.exports = { createUser, loginUser, getUser };
