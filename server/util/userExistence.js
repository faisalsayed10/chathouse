async function searchIfEmailExists(userRef, email) {
  const snapshot = await userRef.where("email", "==", email).get();
  let document;
  snapshot.forEach((doc) => {
    document = { ...doc.data() };
  });

  if (document === undefined) {
    return;
  }

  return { message: "Email already exists." };
}

async function searchIfUserNameExists(userRef, userName) {
  const snapshot = await userRef.where("userName", "==", userName).get();
  let document;
  snapshot.forEach((doc) => {
    document = { ...doc.data() };
  });

  if (document === undefined) {
    return;
  }

  return { message: "Username already exists." };
}

module.exports = { searchIfEmailExists, searchIfUserNameExists };