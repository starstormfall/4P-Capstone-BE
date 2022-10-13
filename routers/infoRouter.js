const { Router } = require("express");
const controllers = require("../controllers/infoController");
const router = Router();

// to get areas

router.get(`/areas`, controllers.getAllAreas);

router.get(`/categories`, controllers.getAllCategories);
router.get(`/categories/hashtags`, controllers.getAssocHashtags);

router.get(`/hashtags`, controllers.getAllHashtags);

router.get(`/photos`, controllers.getPhotos);

router.get(`/sources`, controllers.getSources);

module.exports = router;
