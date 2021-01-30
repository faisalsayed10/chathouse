const { firestore } = require("./firebase-admin");

const postMessage = async (data) => {
  const message = await firestore.collection("messages").doc();
  message.set(data);
  return message.id;
};

const deleteMessage = async (id) => {
  const message = await firestore.collection("messages").doc(id).delete();
  return "DELETED!";
};

const getAllMessages = async () => {
  const snapshot = await firestore.collection("messages").orderBy("createdAt", "asc").get();
  const messages = [];
  snapshot.forEach((doc) => {
    messages.push({ ...doc.data(), id: doc.id });
  });

  return messages;
};

const getMessage = async (id) => {
  const doc = await firestore.collection("messages").doc(id).get();
  const message = {
    ...doc.data(),
    id: doc.id,
  };

  return message;
};

module.exports = { postMessage, getAllMessages, deleteMessage, getMessage };
