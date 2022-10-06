const { Chatroom, Message, Chatroom_User, User } = require("../db/models");

const getAll = async (req, res) => {
  const { userId } = req.params;
  try {
    const allChatrooms = await Chatroom_User.findAll({
      where: {
        userId: userId,
      },
    });

    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getChatRoom = async (req, res) => {};

const createChatRoom = async (req, res) => {};

const editRoomDetails = async (req, res) => {};

const getAllMessages = async (req, res) => {};

const addMessage = async (req, res) => {};

module.exports = {
  getAll,
  getChatRoom,
  createChatRoom,
  editRoomDetails,
  getAllMessages,
  addMessage,
};
