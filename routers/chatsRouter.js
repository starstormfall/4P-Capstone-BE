const { Router } = require("express");
const controllers = require("../controllers/chatsController");
const router = Router();

router.get("/", (req, res) => res.send("This is chat controller!"));

// get all chatrooms of user
router.get(`/:userId/allchat`, controllers.getAll);

// get one chatroom
router.get(`/:userId/:chatroomId`, controllers.getChatRoom);

// create chatroom with host
router.post(`/createchatroom`, controllers.createChatRoom);

// populate users in chatroom || update chatroom (inactive)
router.put(`/:chatroomId/`, controllers.editRoomDetails);

// integrate with socket so will look into it.

// get all messages in a chatroom
router.get(`/chatroom/:chatroomId/allmessage`, controllers.getAllMessages);

// update message by user
router.post(`/:chatroomId/onemessage`, controllers.addMessage);

module.exports = router;
