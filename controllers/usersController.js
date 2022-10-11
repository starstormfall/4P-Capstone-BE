const { user, favourite, like } = require("../db/models");

const e = require("express");

// get one user
const getOnePk = async (req, res) => {
  // #swagger.tags = ['User']

  const { userId } = req.params;
  console.log(userId);

  try {
    const userInfo = await user.findByPk(userId);
    console.log(userInfo);
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
  console.log("request body", req.body);
  try {
    // const currentUser = await User.findByPk(userId);
    const currentUser = await user.findOne({
      where: { email: email },
    });
    console.log(currentUser);

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
  console.log(favourite);

  try {
    const allFavourites = await favourite.findAll({
      where: { userId: userId },
    });
    return res.json(allFavourites);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// get all post's likes
const getAllLikes = async (req, res) => {
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

// create likes for user
const addLikes = async (req, res) => {
  // #swagger.tags = ['User']
  const { postId } = req.params;
  const { userId } = req.body;
  console.log(postId);
  console.log(like);
  try {
    const [addLikes, created] = await like.findOrCreate({
      where: { userId: userId, postId: postId },
    });
    console.log("created", created);
    console.log("addLikes", addLikes);
    if (created) {
      return res.json(addLikes);
    } else {
      const updateLikes = await addLikes.destroy();
      return res.json(updateLikes);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// create favourites for user
const addFavourites = async (req, res) => {
  // #swagger.tags = ['User']
  const { userId } = req.params;
  const { postId } = req.body;
  try {
    const [addFavourites, created] = await favourite.findOrCreate({
      where: { userId: userId, postId: postId },
    });
    console.log("created", created);
    console.log("addFavourites", addFavourites);
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

//working
// const addLikes = async (req, res) => {
//   const { postId } = req.params;
//   const { userId } = req.body;
//   // console.log("post and user id", postId, userId);
//   try {
//     const likeExists = await Like.findOne({
//       where: { userId: userId, postId: postId },
//     });
//     console.log(likeExists);
//     if (likeExists) {
//       const removeLikes = await likeExists.destroy();
//       return res.json(removeLikes);
//     } else {
//       console.log("post and user id", postId, userId);
//       const addLikes = await Like.create({
//         userId: 1,
//         postId: 4,
//       });
//       return res.json(addLikes);
//     }
//   } catch (err) {
//     return res.status(400).json({ error: true, msg: err });
//   }
// };

// const updateFavourites = async (req, res) => {
//   const { userId, postId } = req.params;
//   try {
//     const favouriteExists = await Favourite.findOne({
//       where: {
//         userId: userId,
//         postId: postId,
//       },
//     });
//     if (favouriteExists) {
//       const removeFavourites = await Favourite.destroy();
//       return res.json(removeFavourites);
//     } else {
//       const addFavourites = await Favourite.create({
//         userId: userId,
//         postId: postId,
//       });
//       return res.json(addFavourites);
//     }
//   } catch (err) {
//     return res.status(400).json({ error: true, msg: err });
//   }
// };

// const addFavourites = async (req, res) => {
//   const { userId, postId } = req.body;
//   try {
//     const favouriteExists = await Favourite.findOne({
//       where: {
//         userId: userId,
//         postId: postId,
//       },
//     });
//     if (favouriteExists) {
//       res.json("You have favourited the post.");
//     } else {
//       const addFavourites = await Favourite.create({
//         userId: userId,
//         postId: postId,
//       });
//       return res.json(addFavourites);
//     }
//   } catch (err) {
//     return res.status(400).json({ error: true, msg: err });
//   }
// };

// find by ID of the likes of the post
// const addLikes = async (req, res) => {
//   const { postId } = req.params;
//   const { userId } = req.body;
//   try {
//     const likeExists = await Like.findOne({
//       where: { userId: userId, postId: postId },
//     });

//     if (likeExists) {
//       res.json("You liked the post previously.");
//     } else {
//       const addLikes = await Like.create({
//         userId: userId,
//         postId: postId,
//       });
//       return res.json(addLikes);
//     }
//   } catch (err) {
//     return res.status(400).json({ error: true, msg: err });
//   }
// };

module.exports = {
  getOnePk,
  getAll,
  insertOne,
  updateOneUser,
  getAllFavourite,
  getAllLikes,
  addLikes,
  addFavourites,
};
