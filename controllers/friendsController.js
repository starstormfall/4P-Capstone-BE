const { Friendship, User, Post } = require("../db/models");
const { Op } = require("sequelize");

// get all friends of current logged in user. Includes the details of the friends, and the post where they connected with.

//maybe filter on backend for pending vs confirmed?
const getFriendList = async (req, res) => {
  const { userId } = req.params;
  try {
    const userFriends = await Friendship.findAll({
      where: {
        [Op.or]: [{ initiatedUserId: userId }, { addedUserId: userId }],
      },
      // include: [Post, User],

      include: [
        {
          model: Post,
          attributes: ["content"],
        },
        {
          model: User,
          as: "addedUser",
          attributes: ["name", "photoLink"],
        },
        {
          model: User,
          as: "initiatedUser",
          attributes: ["name", "photoLink"],
        },
      ],
    });

    return res.json(userFriends);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

//when current logged in user clicks add friend. Controller first checks if record exists in table. If doesn't exist, friend request is sent to the other user. If exists, then message is returned.
const requestFriend = async (req, res) => {
  const { userId } = req.params;
  const { friendId, postId, reason } = req.body;
  try {
    const existFriend = await Friendship.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ initiatedUserId: userId }, { addedUserId: friendId }],

            [Op.and]: [{ initiatedUserId: friendId }, { addedUserId: userId }],
          },
        ],
      },
    });

    if (existFriend != null) {
      return res.json(
        "Friend already exists or pending acceptance of friend request."
      );
    } else {
      const newRequest = await Friendship.create({
        postId: postId,
        initiatedUserId: userId,
        addedUserId: friendId,
        reason: reason,
        status: "pending",
      });

      const newRequestFriend = await Friendship.findByPk(newRequest.id, {
        include: [Post, User],
      });

      return res.json(newRequestFriend);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

//When friend request is accepted, update friendship table status from pending to confirmed. First, find the particular friendship pair with PK. Then update, then return with the post and user (hopefully).
//if frontend can pass the friendship Id, it will be easy to query. If cannot, then change to friendId instead.
const updateFriendStatus = async (req, res) => {
  const { userId } = req.params;
  const { friendId, friendshipId } = req.body;
  try {
    const friendRequest = await Friendship.findByPk(friendshipId, {
      include: [Post, User],
    });

    const friendResponse = await friendRequest.update({
      status: "confirmed",
    });

    // const friendResponse = await friendRequest.update({
    //   where: {status: "confirmed"},
    //   returning: true,
    // });

    return res.json(friendResponse);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

//When friend deleted, find the particular friendship pair with PK. Then destroy. Return the destroyed friendship Id.
//if frontend can pass the friendship Id, it will be easy to query. If cannot, then change to friendId instead.
const deleteFriend = async (req, res) => {
  const { userId } = req.params;
  const { friendId, friendshipId } = req.body;
  try {
    const unfriendRequest = await Friendship.findByPk(friendshipId);

    await unfriendRequest.destroy();

    return res.json(friendshipId);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getFriendList,
  requestFriend,
  updateFriendStatus,
  deleteFriend,
};
