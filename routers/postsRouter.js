const { Router } = require("express");
const controllers = require("../controllers/postsController");
const router = Router();

//get all entries by Explore or Forum to display (where {explore !== null})
router.get(`/allEntries`, controllers.getEntries);

//get entries associatied to individual explore entry
router.get(`/:postId/getAssEntries`, controllers.getAssEntries);

//create entry (Comment && New Explore entry && New Forum)
//include Forumname to update in controller
router.post(`/createEntry`, controllers.newEntry);

//comment. update Posts && Forumname_Post table (if explore column == null. is comment)

module.exports = router;
