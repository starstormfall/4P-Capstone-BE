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
//did this using socket events
// router.put(`/:chatroomId/`, controllers.editRoomDetails);

// integrate with socket so will look into it.

// get all messages in a chatroom
//did this using socket events
// router.get(`/chatroom/:chatroomId/allmessage`, controllers.getAllMessages);

// update message by user
//did this using socket events
// router.post(`/chatroom/:chatroomId/onemessage`, controllers.addMessage);

module.exports = router;
