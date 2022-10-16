const {
  post,
  thread,
  threadPost,
  postCategory,
  postHashtag,
  hashtag,
  category,
  user,
  like,
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

const getCategoryHashtag = async (req, res) => {
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

    res.json({ categories: categories, hashtags: hashtags });
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getAllExplore,
  getAllThreadInfo,
  getAllForum,
  addLikes,
  getCategoryHashtag,
};
