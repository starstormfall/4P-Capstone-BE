const { Router } = require("express");
const controllers = require("../controllers/usersController");
const router = Router();

// get one user by Id
router.get(`/:userId`, controllers.getOnePk);

// get all users
router.get(`/all`, controllers.getAll);

// create new user (findOrCreate) (store email(res.body) from auth0??)
router.post(`/`, controllers.insertOne);

// update user data?? (likes and favourites??)
router.put(`/`, controllers.updateOneUser);

// store in user pref router...
// get all favourites belonging to user
router.get(`/:userId/favourite`, controllers.getAllFavourite);

// get all likes belonging to post
router.get(`/:postId/allLikes`, controllers.getAllLikes);

// update likes for user
router.post(`/:postId/like`, controllers.addLikes);

// update favourites for user
router.post(`/:userId/favourites`, controllers.addFavourites);

// delete likes for user
router.put(`/:postId/like`, controllers.deleteLikes);

//delete favourites for user
router.put(`/:userId/favourites`, controllers.deleteFavourites);

module.exports = router;
