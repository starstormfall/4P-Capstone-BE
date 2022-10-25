const { Router } = require("express");
const controllers = require("../controllers/mapsController");
const router = Router();

// all pins and heatmap for each AREA
// nearby heatmap for sugguested nearby pins
//get all locations(pins) (pin by categories choosen by user and suggest to user the nearby place with similar categories)
//Gets all pins, if there is no area selected, if there is area selected, if there is category selected, if there is hashtag selected.
//Includes crowd and category id and hashtag id.
router.get(`/allPins`, controllers.getAllPins);

//Gets one pin, when selected from explore post, or when user clicks on one spot on map.
//Includes crowd, related posts to the same pin, category id and hashtag id.
router.get(`/onePin/:pinId`, controllers.getOnePin);

// create map crowd/ map data (input by user).
//Response gives latest 5 check ins for the particular pin/location. Includes crowdSize, recordedAt, crowdIntensity
router.post(`/:pinId/createCrowdData`, controllers.createCrowdData);

module.exports = router;
