const {
  area,
  crowd,
  pin,
  post,
  postCategory,
  favourites,
  category,
} = require("../db/models");

const getAllPins = async (req, res) => {
  const { areaId } = req.params;

  try {
    const allPins = await pin.findAll({
      where: {
        areaId: areaId,
      },
      include: [area, crowd],
    });

    return res.json(allPins);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getAllPins,
};
