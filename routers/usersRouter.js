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

// update likes for user

// update favourites for user

module.exports = router;
