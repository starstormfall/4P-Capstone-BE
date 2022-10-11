const { Router } = require("express");
const controllers = require("../controllers/infoController");
const router = Router();

// to get areas

router.get(`/areas`, controllers.getAllAreas);

router.get(`/categories`, controllers.getAllCategories);

router.get(`/hashtags`, controllers.getAllHashtags);

module.exports = router;
