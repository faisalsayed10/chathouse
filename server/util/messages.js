const { firestore } = require("./firebase-admin");

const postMessage = async (data) => {
  const message = await firestore.collection("messages").doc();
  message.set(data);
  return message.id;
};

const deleteMessage = async (id) => {
  const messageRef = await firestore.collection("messages").doc(id);
  const messageInfo = await { ...await (await messageRef.get()).data(), id }
  await messageRef.delete();
  return messageInfo;
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
