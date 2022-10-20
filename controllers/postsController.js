const {
  user,
  post,
  thread,
  threadPost,
  postCategory,
  postHashtag,
  hashtag,
  category,
  like,
  area, 
  friendship,

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

  const { userId, areaId, categoryIds, hashtagIds, source } = req.query;

  try {
    if (Object.keys(req.query).length > 0) {
      if (areaId) {
        const areaPostsArray = await post.findAll({
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
        const areaPosts = {};
        areaPostsArray.forEach((post) => {
          areaPostsIds.push(post.id);
          areaPosts[post.id] = post;
        });

        if (categoryIds) {
          const categoryPosts = await postCategory.findAll({
            where: {
              postId: areaPostsIds,
              categoryId: categoryIds.split(","),
            },
            include: post,
          });

          const areaCategoryPosts = {};
          const areaCategoryPostsIds = [];

          categoryPosts.forEach((post) => {
            areaCategoryPosts[post.post.id] = post.post;
            !areaCategoryPostsIds.includes(post.post.id)
              ? areaCategoryPostsIds.push(post.post.id)
              : null;
          });

          if (hashtagIds) {
            const hashtagPosts = await postHashtag.findAll({
              where: {
                postId: areaCategoryPostsIds,
                hashtagId: hashtagIds.split(","),
              },
              include: post,
            });

            const areaCategoryHashtagPosts = {};
            const areaCategoryHashtagPostsIds = [];

            hashtagPosts.forEach((post) => {
              areaCategoryHashtagPosts[post.post.id] = post.post;
              !areaCategoryHashtagPostsIds.includes(post.post.id)
                ? areaCategoryHashtagPostsIds.push(post.post.id)
                : null;
            });

            return res.json(areaCategoryHashtagPosts);
          }

          return res.json(areaCategoryPosts);
        }

        return res.json(areaPosts);
      }
    } else {
      const postsArray = await post.findAll({
        where: {
          explorePost: {
            [Op.ne]: null,
          },
        },
        raw: true,
      });
      const posts = {};
      postsArray.forEach((post) => (posts[post.id] = post));
      return res.json(posts);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getAllThreadInfo = async (req, res) => {
  // #swagger.tags = ['Post']
  /* #swagger.parameters['postId'] = {
    in: 'query',
    type: 'integer'
    } */

  const { postId } = req.query;

  try {
    let allThread = [];

    if (Object.keys(req.query).length > 0) {
      console.log("did this run?");
      const assocThreadPost = await threadPost.findAll({
        where: {
          postId: postId,
        },
      });

      for (const row of assocThreadPost) {
        const assocThread = await row.getThread();
        allThread.push(assocThread);
      }
    } else {
      allThread = await thread.findAll();
    }

    const allThreadInfo = [];

    for (const row of allThread) {
      // console.log(row.topic);
      const postsCount = await threadPost.findAndCountAll({
        where: { threadId: row.id },
        attributes: ["postId"],
        raw: true,
        include: { model: post, attributes: ["userId"] },
      });

      const lastPost = await threadPost.findAll({
        limit: 1,
        where: { threadId: row.id },
        order: [["createdAt"]],
        raw: true,
        include: { model: post, attributes: ["content", "createdAt"] },
      });

      const users = [];
      postsCount.rows.forEach((post) =>
        !users.includes(post["post.userId"])
          ? users.push(post["post.userId"])
          : null
      );

      const threadInfo = {
        id: row.id,
        topic: row.topic,
        postsCount: postsCount.count,
        usersCount: users.length,
        lastPost: lastPost[0]["post.content"],
        lastPostCreatedAt: lastPost[0]["post.createdAt"],
      };

      allThreadInfo.push(threadInfo);
    }

    return res.json(allThreadInfo);
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
        {
          model: post,
          include: [
            {
              model: user,
              attributes: ["name", "id", "photoLink"],
            },
          ],
        },
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

const addLikes = async (req, res) => {
  // #swagger.tags = ['Post']
  /* #swagger.parameters['postId'] = {
	      in: 'path',
        type: 'integer'
        } */
  /* #swagger.parameters['userId'] = {
	      in: 'path',
        type: 'integer'
        } */
  const { userId, postId } = req.params;
  try {
    const [addLikes, created] = await like.findOrCreate({
      where: { userId: userId, postId: postId },
    });

    if (!created) {
      await addLikes.destroy();
    }

    const likes = await like.findAndCountAll({
      where: {
        postId: postId,
      },
    });

    const updateLikeCount = await post.update(
      { likeCount: likes.count, updatedAt: new Date() },
      {
        where: {
          id: postId,
        },
      }
    );

    const updatedPostLikeCount = await post.findByPk(postId);

    return res.json(updatedPostLikeCount);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getTags = async (req, res) => {
  // #swagger.tags = ['Post']
  /* #swagger.parameters['postId'] = {
    in: 'path',
    type: 'integer'
    } */

  const { postId } = req.params;

  try {
    const categoriesPosts = await postCategory.findAll({
      where: { postId: postId },
    });

    const hashtagsPosts = await postHashtag.findAll({
      where: { postId: postId },
    });

    const areasPosts = await post.findByPk(postId);

    console.log(areasPosts);

    const areaName = await areasPosts.getArea({ raw: true });

    const prefecture = areaName.prefecture;

    const categories = [];

    for (const entry of categoriesPosts) {
      const categoryNames = await entry.getCategory({
        attributes: ["name"],
        raw: true,
      });
      categories.push(categoryNames.name);
    }

    const hashtags = [];

    for (const entry of hashtagsPosts) {
      const hashtagNames = await entry.getHashtag({
        attributes: ["name"],
        raw: true,
      });
      hashtags.push(hashtagNames.name);
    }

    res.json({
      categories: categories,
      hashtags: hashtags,
      prefecture: prefecture,
    });
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

    // return a findall for rerendering

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
  getAllThreadInfo,
  getAllForum,
  getOneThread,
  createThreadPost,
  createPost,
  addLikes,
  getTags,
};
