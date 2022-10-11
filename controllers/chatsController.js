const { chatroom, message, chatroom_User, user } = require("../db/models");

const getAll = async (req, res) => {
  const { userId } = req.params;
  try {
    const allChatrooms = await chatroom_User.findAll({
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

const getAllMessages = async (req, res) => {
  //to do tomorrow
};

const addMessage = async (req, res) => {};

module.exports = {
  getAll,
  getChatRoom,
  createChatRoom,
  editRoomDetails,
  getAllMessages,
  addMessage,
};
