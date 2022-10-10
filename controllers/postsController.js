const { Post, User, Like, Pin, Thread } = require("../db/models");
const { Op } = require("sequelize");

// query for get; body for post
// get all explore posts or photos only with boolean query
const getAllExplore = async (req, res) => {
  // #swagger.tags = ['Post']
  /* #swagger.parameters['photos'] = {
	      in: 'query',
        description: 'photos',
        type: 'boolean'
        } */
  const { photos } = req.query;
  console.log("photos", photos, req.query);
  try {
    if (photos) {
      console.log("did this run?");
      const photos = await Post.findAll({
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
      return res.json(photos);
    } else {
      console.log("OR did this run?");
      const posts = await Post.findAll({
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

const getAllForum = async (req, res) => {
  // #swagger.tags = ['Post']
  try {
    const forum = await Post.findAll({
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
  // #swagger.tags = ['User']

  const { postId } = req.params;
  console.log("postId", req.params);
  try {
    const thread = await Post.findAll({
      where: {
        id: postId,
      },
    });
    return res.json(thread);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getAllExplore,
  getAllForum,
  getAssocThread,
};
