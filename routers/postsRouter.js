const { Router } = require("express");
const controllers = require("../controllers/postsController");
const router = Router();

// to get photos only : /explore?photos=true
router.get(`/explore`, controllers.getAllExplore);

router.get(`/forum`, controllers.getAllForum);

// to get assoc threads to a post : /thread?postId=1
router.get(`/thread`, controllers.getAllThreadInfo);

router.get(`/:postId/tags`, controllers.getTags);

router.get(`/thread/:threadId`, controllers.getOneThread);

// to add likes to post and retrieve updated like count
router.put(`/:postId/:userId/like`, controllers.addLikes);

// create new comment/post in thread (with ThreadId)
router.post(`/create-comment/:threadId`, controllers.createThreadPost);

//create new thread (at forum page?)
router.post(`/create-thread`, controllers.createPost);

//create new thread (from explore page)
router.post(`/create-thread-from-explore`, controllers.createThreadExplore);

module.exports = router;
