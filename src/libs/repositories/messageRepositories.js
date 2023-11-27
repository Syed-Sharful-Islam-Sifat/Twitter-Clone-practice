import Message from "@/models/messages";
import { dbConnect } from "@/config/db";
import User from "@/models/users";
export async function getAllMessagesRepo() {
  try {
    await dbConnect();

    const allMessages = await Message.find();

    return allMessages;
  } catch (error) {
    console.log("error on getMessages service", error);
  }
}

export async function createMessageRepo(firstUserId, secondUserId) {
  try {
    await dbConnect();
    const message = await Message.create({
      firstUserId,
      secondUserId,
    });

    return message;
  } catch (error) {
    console.log("error on message create service", error);
  }
}

export async function getSingleMessageRepo(messageId) {
  try {
    await dbConnect();

    const message = await Message.findById(messageId);
    // console.log('res.socket.io',res.server.socket.io)
    return message;
  } catch (error) {
    console.log("error on single message get service", error);
  }
}

export async function getNotificationsRepo(session) {
  try {
    await dbConnect();
    const user = await User.findById(session.id);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNotificationsRepo(payload) {
  try {
    await dbConnect();
    const user = await User.findById(payload.receiverId);

    if (!user.notifications.includes(payload.senderId)) {
      user.notifications.push(payload.senderId);
      await user.save();
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNotificationsRepo(payload) {
  try {
    await dbConnect();
    const user = await User.findById(payload.sessionId);
    if (user.notifications.includes(payload.userId)) {
      user.notifications.pull(payload.userId);
      await user.save();
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateSingleMessageRepo(payload) {
  // console.log('on updateSingleMessage',payload);
  await dbConnect();
  const message = await Message.findById(payload.messageId);

  const seen =
    payload.session.id === payload.newMessage.receiverId ? "true" : "false";
  message.lastMessage.seen = seen;
  message.lastMessage.userId = payload.newMessage.senderId;

  await message.save();

  return message;
}
export async function updateSeenandunSeenMessagesRepo(payload) {
  await dbConnect();
  const message = await Message.findById(payload.messageId);
  // console.log('message on updateSeenandUnseen',message);
  message.lastMessage.seen = "true";
  await message.save();
  return message;
}
