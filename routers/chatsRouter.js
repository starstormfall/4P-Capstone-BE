const { Router } = require("express");
const controllers = require("../controllers/chatsController");
const router = Router();

// get all chatrooms of user
router.get(`/:userId/allchat`, controllers.getAll);

// get one chatroom
router.get(`/:userId/:chatroomId`, controllers.getChatRoom);

// create chatroom with host
router.post(`/createchatroom`, controllers.createChatRoom);

module.exports = router;
