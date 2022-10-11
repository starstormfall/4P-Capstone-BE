const { category, area, hashtag } = require("../db/models");

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
    const allCategories = await category.findAll();

    return res.json(allCategories);
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

module.exports = {
  getAllAreas,
  getAllCategories,
  getAllHashtags,
};
