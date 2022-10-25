const { Router } = require("express");
const controllers = require("../controllers/friendsController");
const router = Router();

// get all friends of user (where {[OP.or]: [{intiator: userId 1},  {added == userId 1}]})
router.get(`/:userId/allfriends`, controllers.getFriendList);

// Upon sending friend question (pending)
router.post(`/:userId/addfriend`, controllers.requestFriend);

// approved
router.put(`/:userId`, controllers.updateFriendStatus);

// idw friend you anymore || reject friend request
router.delete(`/:userId/removefriend`, controllers.deleteFriend);

module.exports = router;
