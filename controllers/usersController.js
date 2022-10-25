const { user, favourite, like, post } = require("../db/models");

const e = require("express");

// get one user
const getOne = async (req, res) => {
  // #swagger.tags = ['User']

  const { email } = req.params;

  try {
    const userInfo = await user.findOne({
      where: { email: email },
    });

    return res.json(userInfo);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// get all users
const getAll = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const allUser = await user.findAll();
    return res.json(allUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// create one user
const insertOne = async (req, res) => {
  // #swagger.tags = ['User']
  const { email } = req.body;
  try {
    const newUser = await user.findOrCreate({
      where: { email: email },
    });
    return res.json(newUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// update user's informations
const updateOneUser = async (req, res) => {
  // #swagger.tags = ['User']
  const { userId } = req.params;
  const { email, name, nationality, score, lastLogin, photoLink, loginStreak } =
    req.body;

  try {
    // const currentUser = await User.findByPk(userId);
    const currentUser = await user.findOne({
      where: { email: email },
    });

    await currentUser.update({
      updatedAt: new Date(),
      name: name,
      nationality: nationality,
      score: score,
      // (put) when user logins in.
      lastLogin: lastLogin,
      photoLink: photoLink,
      // (put) when users logins in.
      loginStreak: loginStreak,
    });
    // await currentUser.save();
    return res.json(currentUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// get all user's favourites
const getAllFavourite = async (req, res) => {
  // #swagger.tags = ['User']
  const { userId } = req.params;

  try {
    const allFavourites = await favourite.findAll({
      where: { userId: userId },
      include: { model: post },
    });

    const favouritePostIds = [];
    const favouritePosts = {};

    allFavourites.forEach((favourite) => {
      favouritePostIds.push(favourite.postId);
      favouritePosts[favourite.postId] = favourite.post;
    });

    return res.json({
      favouritePostIds: favouritePostIds,
      favouritePosts: favouritePosts,
    });
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// get all user's likes
const getAllLike = async (req, res) => {
  // #swagger.tags = ['User']
  const { userId } = req.params;

  try {
    const allLikes = await like.findAll({
      where: { userId: userId },
      include: { model: post },
    });

    const likePostIds = [];
    const likePosts = {};

    allLikes.forEach((like) => {
      likePostIds.push(like.postId);
      likePosts[like.postId] = like.post;
    });

    return res.json({ likePostIds: likePostIds, likePosts: likePosts });
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// get all post's likes
const getAllPostLikes = async (req, res) => {
  // #swagger.tags = ['User']
  const { postId } = req.params;
  try {
    const allLikes = await like.findAll({
      where: { postId: postId },
    });
    return res.json(allLikes);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// create favourites for user
const addFavourites = async (req, res) => {
  // #swagger.tags = ['User']
  const { userId, postId } = req.params;
  // const { postId } = req.body;
  try {
    const [addFavourites, created] = await favourite.findOrCreate({
      where: { userId: userId, postId: postId },
    });

    if (created) {
      return res.json(addFavourites);
    } else {
      const updateFavourites = await addFavourites.destroy();
      return res.json(updateFavourites);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const updateUserLogin = async (req, res) => {
  // #swagger.tags = ['User']
  const { userId } = req.params;
  const { currentDate } = req.body;

  try {
    const userInfo = await user.findOne({
      where: { id: userId },
    });

    const todayDate = new Date();
    const lastLoginDate = new Date(userInfo.lastLogin);
    const yesterdayDate = new Date(
      new Date().setDate(new Date().getDate() - 1)
    );

    const currentLoginStreak = userInfo.loginStreak;
    const currentScore = userInfo.score;
    const pointsAdded = currentLoginStreak >= 4 ? 5 : 1;

    const loginStatus = {
      status: "",
      updatedInfo: {},
      scoreAdded: "",
    };

    // if current login date differs from last login date
    if (todayDate.toDateString() !== lastLoginDate.toDateString()) {
      // check if lastLogin date === yesterday for streak
      if (yesterdayDate.toDateString() === lastLoginDate.toDateString()) {
        // if last login was yesterday, then add to streak and add score based on loginstreak
        await userInfo.update({
          lastLogin: new Date(),
          loginStreak: currentLoginStreak + 1,
          score: currentScore + pointsAdded,
        });

        loginStatus["status"] = "added streak";
        loginStatus["scoreAdded"] = pointsAdded;
        loginStatus["updatedInfo"] = userInfo;
      } else {
        // else if last login is not yesterday, then reset login streak and only add 1 point
        await userInfo.update({
          lastLogin: new Date(),
          loginStreak: 1,
          score: currentScore + 1,
        });
        loginStatus["status"] = "reset streak";
        loginStatus["scoreAdded"] = 1;
        loginStatus["updatedInfo"] = userInfo;
      }
    } else {
      // if current login date same as last logged in, just update date
      await userInfo.update({ lastLogin: new Date() });
      loginStatus["status"] = "no change";
      loginStatus["scoreAdded"] = 0;
      loginStatus["updatedInfo"] = userInfo;
    }

    return res.json(loginStatus);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getOne,
  getAll,
  insertOne,
  updateOneUser,
  getAllFavourite,
  getAllLike,
  getAllPostLikes,
  addFavourites,
  updateUserLogin,
};
