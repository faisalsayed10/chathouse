const { auth } = require("./firebase");

const signInWithGithub = () => {
  return auth()
    .signInWithPopup(new auth.GithubAuthProvider())
    .then((response) => {
      return response;
    });
}

const signInWithGoogle = () => {
  return auth()
    .signInWithPopup(new auth.GoogleAuthProvider())
    .then((response) => {
      return response;
    });
};

module.exports = { signInWithGithub, signInWithGoogle }