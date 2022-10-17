const { Router } = require("express");
const controllers = require("../controllers/mapsController");
const router = Router();

// get one area? maybe dont need it, can use eager loading under POST controller
// router.get(`/onearea`, controllers.getOneArea);

// all pins and heatmap for each AREA!!  OK
// nearby heatmap for sugguested nearby pinS   OK
//get all locations(pins) (pin by categories choosen by user and suggest to user the nearby place with similar categories)
//Gets all pins, if there is no area selected, if there is area selected, if there is category selected, if there is hashtag selected.
//Includes crowd and category id and hashtag id.
router.get(`/allPins`, controllers.getAllPins);

//Gets one pin, when selected from explore post, or when user clicks on one spot on map.
//Includes crowd, related posts to the same pin, category id and hashtag id.
router.get(`/onePin/:pinId`, controllers.getOnePin);

// // should be more complex... in controllers.

// // get all map crowd details (nearby crowd) (Get crowd/heat base on AREA)
// router.get(`/getCrowd`, controllers.getMap);

// // get one map crowd for explore post
// router.get(`/:pinId/oneCrowd`, controllers.getOneCrowd);

// create map crowd/ map data (input by user).
//Response gives latest 5 check ins for the particular pin/location. Includes crowdSize, recordedAt, crowdIntensity
router.post(`/:pinId/createCrowdData`, controllers.createCrowdData);

module.exports = router;
