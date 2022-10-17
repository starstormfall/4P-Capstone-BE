const { Router } = require("express");
const controllers = require("../controllers/postsController");
const router = Router();

// to get photos only : /explore?photos=true
router.get(`/explore`, controllers.getAllExplore);

router.get(`/forum`, controllers.getAllForum);

router.get(`/thread`, controllers.getAllThread);

router.get(`/thread/:threadId`, controllers.getOneThread);

// //get entries associatied to individual explore entry
router.get(`/:postId`, controllers.getAssocThread);

// //create entry (Comment && New Explore entry && New Forum)
// //include Forumname to update in controller
// router.post(`/createEntry`, controllers.newEntry);

// create new comment/post in thread (with ThreadId)
router.post(`/create-comment/:threadId`, controllers.createThreadPost);

//create new thread (at forum page?)
router.post(`/create-thread`, controllers.createPost);

//comment. update Posts && Forumname_Post table (if explore column == null. is comment)

module.exports = router;
