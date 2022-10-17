const { Router } = require("express");
const controllers = require("../controllers/postsController");
const router = Router();

// to get photos only : /explore?photos=true
router.get(`/explore`, controllers.getAllExplore);

router.get(`/forum`, controllers.getAllForum);

// to get assoc threads to a post : /thread?postId=1
router.get(`/thread`, controllers.getAllThreadInfo);

router.get(`/:postId/category-hashtag`, controllers.getAreaCategoryHashtag);

// to add likes to post and retrieve updated like count
router.put(`/:postId/:userId/like`, controllers.addLikes);

// //create entry (Comment && New Explore entry && New Forum)
// //include Forumname to update in controller
// router.post(`/createEntry`, controllers.newEntry);

//comment. update Posts && Forumname_Post table (if explore column == null. is comment)

module.exports = router;
