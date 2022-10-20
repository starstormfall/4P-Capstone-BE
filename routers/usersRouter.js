const { Router } = require("express");
const controllers = require("../controllers/usersController");
const router = Router();

// get one user by EMAIL
router.get(`/:email`, controllers.getOne);

// get all users
router.get(`/all`, controllers.getAll);

// create new user (findOrCreate) (store email(res.body) from auth0??)
router.post(`/`, controllers.insertOne);

// update user data??
router.put(`/update/:userId`, controllers.updateOneUser);

router.put(`/:userId/login`, controllers.updateUserLogin);

// store in user pref router...
// get all favourites belonging to user
router.get(`/:userId/favourite`, controllers.getAllFavourite);
router.get(`/:userId/like`, controllers.getAllLike);

// get all likes belonging to post
router.get(`/:postId/allLikes`, controllers.getAllPostLikes);

// from hb : moved to postsController
// update likes for user
// router.post(`/:userId/:postId/like`, controllers.addLikes);

// update favourites for user
router.post(`/:userId/post/:postId/favourites`, controllers.addFavourites);

module.exports = router;
