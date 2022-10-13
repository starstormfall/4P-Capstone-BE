const { category, area, hashtag, post } = require("../db/models");
const { Op } = require("sequelize");

// for ref of tags : // #swagger.tags = ['Post']
// for ref specifying fields: /* #swagger.parameters['photos'] = {
// 	      in: 'query',
//         description: 'photos',
//         type: 'boolean'
//         } */

const getAllAreas = async (req, res) => {
  // #swagger.tags = ['Info']
  try {
    const allAreas = await area.findAll();

    return res.json(allAreas);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getAllCategories = async (req, res) => {
  // #swagger.tags = ['Info']

  try {
    const allCategories = await category.findAll({
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });
    return res.json(allCategories);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getAssocHashtags = async (req, res) => {
  // #swagger.tags = ['Info']
  /* #swagger.parameters['categoryIds'] = {
    in: 'query',
    type: 'array'
    } */

  const { categoryIds } = req.query;

  try {
    const assocHashtags = await hashtag.findAll({
      where: {
        categoryId: categoryIds.split(","),
      },
    });

    console.log(assocHashtags);
    return res.json(assocHashtags);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getAllHashtags = async (req, res) => {
  // #swagger.tags = ['Info']

  try {
    const allHashtags = await hashtag.findAll();

    return res.json(allHashtags);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getSources = async (req, res) => {
  // #swagger.tags = ['Info']
  try {
    const source = ["instagram", "review", "forum"];

    return res.json(source);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const getPhotos = async (req, res) => {
  // #swagger.tags = ['Info']
  /* #swagger.parameters['number'] = {
	      in: 'query',      
        type: 'integer'
        } */
  const { number } = req.query;

  try {
    console.log(post);
    const data = await post.findAll({
      attributes: ["photo_link"],
      raw: true,
      where: {
        explorePost: {
          [Op.ne]: null,
        },
        photoLink: {
          [Op.ne]: null,
        },
      },
    });

    console.log(data);

    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, number);

    const photosUrl = [];

    selected.forEach((post) => photosUrl.push(post.photo_link));

    return res.json(photosUrl);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getAllAreas,
  getAllCategories,
  getAllHashtags,
  getAssocHashtags,
  getPhotos,
  getSources,
};
