const { post, thread, threadPost } = require("../db/models");
const { Op } = require("sequelize");

// for ref of tags : // #swagger.tags = ['Post']
// for ref specifying fields: /* #swagger.parameters['photos'] = {
// 	      in: 'query',
//         description: 'photos',
//         type: 'boolean'
//         } */

// query for get; body for post
// get all explore posts or photos only with boolean query
const getAllExplore = async (req, res) => {
  // #swagger.tags = ['Post']
  /* #swagger.parameters['photos'] = {
	      in: 'query',       
        type: 'boolean'
        } */
  /* #swagger.parameters['number'] = {
	      in: 'query',      
        type: 'integer'
        } */
  const { photos, number } = req.query;

  try {
    if (photos) {
      // console.log("did this run?");
      const data = await post.findAll({
        attributes: ["photo_link"],
        where: {
          explorePost: {
            [Op.ne]: null,
          },
          photoLink: {
            [Op.ne]: null,
          },
        },
      });

      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, number);

      const photosUrl = [];

      selected.forEach((post) => photosUrl.push(post.dataValues.photo_link));

      return res.json(photosUrl);
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
