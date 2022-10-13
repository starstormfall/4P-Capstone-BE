const { post, thread, threadPost, postCategory } = require("../db/models");
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
//         description: '1: Food, 2: Sightseeing, 3: Accomodation, 4: Fashion 
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
          });
          console.log("did this run here?", categoryPosts);
          return res.json(categoryPosts);
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

module.exports = {
  getAllExplore,
  getAllThread,
  getAllForum,
  getAssocThread,
};
