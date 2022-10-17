const {
  user,
  post,
  thread,
  threadPost,
  postCategory,
  postHashtag,
} = require("../db/models");
const { Op } = require("sequelize");

// for ref of tags : // #swagger.tags = ['Post']
// for ref specifying fields: /* #swagger.parameters['photos'] = {
// 	      in: 'query',
//         description: 'photos',
//         type: 'boolean'
//         } */

const getAllExplore = async (req, res) => {
  // #swagger.tags = ['Post']
  /* #swagger.parameters['areaId'] = {
// 	      in: 'query',
//         description: '1: Tokyo, 2: Hokkaido, 3: Osaka ',
//         type: 'integer'
//         } */
  /* #swagger.parameters['categoryIds'] = {
// 	      in: 'query',
//         description: '1: Food, 2: Sightseeing, 3: Accomodation, 4: Fashion',
//         type: 'array'
//         } */
  /* #swagger.parameters['hashtagIds'] = {
// 	      in: 'query',
//         description: '1: cafe, 2: desserts, 3: food, 4: drinks, 5: sights, 6: manmade, 7: sightseeing, 8: stay, 9: beauty, 10: ootd', 
//         type: 'array'
//         } */

  const { areaId, categoryIds, hashtagIds, source } = req.query;

  try {
    if (Object.keys(req.query).length > 0) {
      if (areaId) {
        const areaPosts = await post.findAll({
          where: {
            explorePost: {
              [Op.ne]: null,
            },
            areaId: areaId,
          },
          raw: true,
        });

        // list of postIds within an area
        const areaPostsIds = [];
        areaPosts.forEach((post) => areaPostsIds.push(post.id));

        if (categoryIds) {
          const categoryPosts = await postCategory.findAll({
            where: {
              postId: areaPostsIds,
              categoryId: categoryIds.split(","),
            },
            include: post,
          });

          const areaCategoryPosts = [];
          const areaCategoryPostsIds = [];

          categoryPosts.forEach((post) => {
            !areaCategoryPosts.includes(post)
              ? areaCategoryPosts.push(post.post)
              : null;
            !areaCategoryPostsIds.includes(post.post.id)
              ? areaCategoryPostsIds.push(post.post.id)
              : null;
          });

          if (hashtagIds) {
            console.log("did this run??", areaCategoryPostsIds);

            const hashtagPosts = await postHashtag.findAll({
              where: {
                postId: areaCategoryPostsIds,
                hashtagId: hashtagIds.split(","),
              },
              include: post,
            });

            const areaCategoryHashtagPosts = [];
            const areaCategoryHashtagPostsIds = [];

            hashtagPosts.forEach((post) => {
              !areaCategoryHashtagPosts.includes(post)
                ? areaCategoryHashtagPosts.push(post.post)
                : null;
              !areaCategoryHashtagPostsIds.includes(post.post.id)
                ? areaCategoryHashtagPostsIds.push(post.post.id)
                : null;
            });
            console.log(areaCategoryHashtagPostsIds);

            return res.json(areaCategoryHashtagPosts);
          }

          return res.json(areaCategoryPosts);
        }

        return res.json(areaPosts);
      }
    } else {
      const posts = await post.findAll({
        where: {
          explorePost: {
            [Op.ne]: null,
          },
        },
      });
      return res.json(posts);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getAllThread = async (req, res) => {
  // #swagger.tags = ['Post']
  try {
    const allThread = await thread.findAll();

    return res.json(allThread);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getOneThread = async (req, res) => {
  // #swagger.tags = ['Post']
  const { threadId } = req.params;
  try {
    const oneThread = await threadPost.findAll({
      where: { threadId: threadId },
      include: [
        { model: post, include: [{ model: user, attributes: ["name", "id"] }] },
        { model: thread },
      ],
    });
    return res.json(oneThread);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getAllForum = async (req, res) => {
  // #swagger.tags = ['Post']
  try {
    const forum = await post.findAll({
      include: thread,
      where: {
        forumPost: true,
      },
    });
    return res.json(forum);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getAssocThread = async (req, res) => {
  // #swagger.tags = ['Post']
  /* #swagger.parameters['postId'] = {
	      in: 'path',
        type: 'integer'
        } */

  const { postId } = req.params;

  try {
    const assocThread = await threadPost.findAll({
      include: thread,
      where: {
        postId: postId,
      },
    });

    const threadList = [];

    assocThread.forEach((threadTitle) =>
      threadList.push({
        threadId: threadTitle.thread.id,
        threadTitle: threadTitle.thread.topic,
      })
    );

    return res.json(assocThread);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

// IF THREAD EXIST (create comment)
const createThreadPost = async (req, res) => {
  // #swagger.tags = ['Post']
  console.log("add comments");
  //validate requirements for explore post

  // update in post table ()
  const {
    // update explore/forum/comment
    content,
    areaId,
    forumPost,
    explorePost,
    userId,
    externalLink,
    title,
    photoLink,
    locationName,
  } = req.body;
  // update in threadPost table
  const { threadId } = req.params;
  try {
    const addNewComment = await post.create({
      content: content,
      userId: userId,
      // explore_post: forum && forum_post: true (conditionally set on frontend)
      forumPost: forumPost,
      explorePost: explorePost,
      // infornation required for post to be on explore page!
      title: title,
      photoLink: photoLink,
      // updated with general pref
      areaId: areaId,
      locationName: locationName,
      externalLink: externalLink,
    });

    const linkNewComment = await threadPost.create({
      postId: addNewComment.id,
      threadId: threadId,
    });

    return res.status(201).json({
      addNewComment,
      linkNewComment,
    });
    //return to front end
  } catch (err) {
    console.log(err, "error");
    return res.status(400).json({ error: true, msg: err });
  }
};

// create thread and determine if explore or not explore
const createPost = async (req, res) => {
  // #swagger.tags = ['Post']
  console.log("add comments");
  //validate requirements for explore post
  const {
    userId,
    content,
    areaId,
    forumPost,
    explorePost,
    externalLink,
    title,
    photoLink,
    locationName,
    // update thread table
    topic,
  } = req.body;
  // update in threadPost table
  try {
    const createNewThread = await post.create({
      content: content,
      userId: userId,
      // explore_post: forum && forum_post: true (conditionally set on frontend)
      forumPost: forumPost,
      explorePost: explorePost,
      // infornation required for post to be on explore page!
      title: title,
      photoLink: photoLink,
      // updated with general pref
      areaId: areaId,
      locationName: locationName,
      externalLink: externalLink,
    });

    const newTopic = await thread.create({
      topic: topic,
    });

    const updateTheadPost = await threadPost.create({
      postId: createNewThread.id,
      threadId: newTopic.id,
    });

    return res.status(201).json({
      createNewThread,
      updateTheadPost,
    });
    //return to front end
  } catch (err) {
    console.log(err, "error");
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getAllExplore,
  getAllThread,
  getAllForum,
  getAssocThread,
  getOneThread,
  createThreadPost,
  createPost,
};
