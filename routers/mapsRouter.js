const { Router } = require("express");
const controllers = require("../controllers/mapsController");
const router = Router();

// // get all areas (pass areaModel to mapsController)
// //same as info controller getAllAreas?
// router.get(`/allAreas`, controllers.getAll);

// get one area? maybe dont need it, can use eager loading under POST controller
// router.get(`/onearea`, controllers.getOneArea);

// controller to include crowd model.
// all pins and heatmap for each AREA!!  OK
// nearby heatmap for sugguested nearby pinS   OK
//get all locations(pins) (pin by categories choosen by user and sugguest to user the nearby place with similar catergories)
router.get(`/allPins/:areaId`, controllers.getAllPins);

// // get one location? for post (include categories as well???)
// router.get(`/onePin`, controllers.getOneLocation);

// // should be more complex... in controllers.

// // get all map crowd details (nearby crowd) (Get crowd/heat base on AREA)
// router.get(`/getCrowd`, controllers.getMap);

// // get one map crowd for explore post
// router.get(`/:pinId/oneCrowd`, controllers.getOneCrowd);

// // create map crowd/ map data (input by user)
// router.post(`/:pinId/createCrowdData`, controllers.createCrowdData);

module.exports = router;
