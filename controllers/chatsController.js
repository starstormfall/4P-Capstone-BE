const { chatroom, message, chatroomUser, user } = require("../db/models");

const getAll = async (req, res) => {
  // #swagger.tags = ['Chat']
  const { userId } = req.params;
  try {
    const allChatrooms = await chatroomUser.findAll({
      where: {
        userId: userId,
      },
      include: [chatroom],
      order: [[chatroom, "createdAt", "DESC"]],
    });

    return res.status(201).json({
      allChatrooms,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getChatRoom = async (req, res) => {
  // #swagger.tags = ['Chat']
  const { chatroomId } = req.params;

  try {
    const allUsers = await chatroomUser.findAll({
      where: {
        chatroomId: chatroomId,
      },
      include: [user],
    });

    return res.status(201).json({
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createChatRoom = async (req, res) => {
  // #swagger.tags = ['Chat']
  const { roomName, hostUserId, usersToAdd } = req.body;

  try {
    const newRoom = await chatroom.create({
      roomName: roomName,
      hostUserId: hostUserId,
      active: true,
    });

    //usersToAdd is to be an array of userIds of the friends to add, including the host.
    const newUserObj = usersToAdd.map((user) => ({
      chatroomId: newRoom.id,
      userId: Number(user),
    }));

    const newUsers = await chatroomUser.bulkCreate(newUserObj);

    return res.status(201).json({
      newUsers,
      newRoom,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editRoomDetails = async (data) => {
  const chatroomToDeactivate = await chatroom.findByPk(data.chatroomId);

  await chatroomToDeactivate.update({
    active: false,
  });

  return "Chat has been deactivated by host.";
};

const addMembers = async (data) => {
  const newUsers = await chatroomUser.bulkCreate(data);

  return `${newUsers.length} new friends added to chat`;
};

const getAllMessages = async (chatroomId) => {
  //call the messages model.
  //return the all messages, with includes
  const allMessages = await message.findAll({
    where: { chatroomId: chatroomId },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: user,
        as: "posterUser",
        attributes: ["name", "photoLink"],
      },
    ],
  });

  return allMessages;
};

const addMessage = async (data) => {
  //create new row in messages table with new chat message
  await message.create({
    message: data.message,
    chatroomId: data.chatroomId,
    posterUserId: data.posterUserId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });

  //Find and update current chatroom with updatedAt
  const chatroomToUpdateDate = await chatroom.findByPk(data.chatroomId);
  await chatroomToUpdateDate.update({
    updatedAt: data.updatedAt,
  });

  //get all the messages related to the chatroom, and return to socketio.
  const allNewMessages = await message.findAll({
    where: { chatroomId: data.chatroomId },
    include: [
      {
        model: user,
        as: "posterUser",
        attributes: ["name", "photoLink"],
      },
    ],
    order: [["id", "ASC"]],
  });

  return allNewMessages;
};

const deleteChatAccess = async (data) => {
  const itemToDestroy = await chatroomUser.findOne({
    where: { chatroomId: data.chatroomId, userId: data.userId },
    include: [
      {
        model: user,
        attributes: ["name"],
      },
    ],
  });

  await itemToDestroy.destroy();

  return `User ${itemToDestroy.user.name} has left the chatroom.`;
};

module.exports = {
  getAll,
  getChatRoom,
  createChatRoom,
  editRoomDetails,
  getAllMessages,
  addMessage,
  deleteChatAccess,
  addMembers,
};
