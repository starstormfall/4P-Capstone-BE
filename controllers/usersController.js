const { User, Favourite, Like } = require("../db/models");

// get one user
const getOnePk = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  console.log(User);
  console.log(Favourite);
  console.log(Like);
  try {
    const userInfo = await User.findByPk(userId);
    console.log(userInfo);
    return res.json(userInfo);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// get all users
const getAll = async (req, res) => {
  try {
    const allUser = await User.findAll();
    return res.json(allUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// create one user
const insertOne = async (req, res) => {
  const { email } = req.body;
  try {
    const newUser = await User.findOrCreate({
      where: { email: email },
    });
    return res.json(newUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// update user's informations
const updateOneUser = async (req, res) => {
  const { userId } = req.params;
  const { email, name, nationality, score, lastLogin, photoLink, loginStreak } =
    req.body;
  console.log("request body", req.body);
  try {
    // const currentUser = await User.findByPk(userId);
    const currentUser = await User.findOne({
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
  const { userId } = req.params;
  console.log(Favourite);

  try {
    const allFavourites = await Favourite.findAll({
      where: { userId: userId },
    });
    return res.json(allFavourites);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// get all post's likes
const getAllLikes = async (req, res) => {
  const { postId } = req.params;
  try {
    const allLikes = await Like.findAll({
      where: { postId: postId },
    });
    return res.json(allLikes);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// create likes for user
const addLikes = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  console.log(postId);
  console.log(Like);
  try {
    const [addLikes, created] = await Like.findorCreate({
      where: { userId: userId },
      defaults: {
        postId: postId,
      },
    });
    console.log("created", created);
    console.log("addLikes", addLikes);

    return res.json(addLikes);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// create favourites for user
const addFavourites = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const addFavourites = await Favourite.findorCreate({
      where: { userId: userId, postId: postId },
    });
    return res.json(addFavourites);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

//delete likes for user
const deleteLikes = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const removeLikes = await Like.destroy({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    return res.json(removeLikes);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

//delete favourites for user
const deleteFavourites = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const removeFavourites = await Favourite.destroy({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    return res.json(removeFavourites);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// const updateLikes = async (req, res) => {
//   const { userId, postId } = req.params;
//   try {
//     const likeExists = await Like.findOne({
//       where: { userId: userId, postId: postId },
//     });

//     if (likeExists) {
//       const removeLikes = await Like.destory();
//       return res.json(removeLikes);
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
  deleteLikes,
  deleteFavourites,
};
