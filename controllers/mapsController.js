const {
  area,
  crowd,
  pin,
  post,
  postCategory,
  favourites,
  category,
  postHashtag,
} = require("../db/models");

const getAllPins = async (req, res) => {
  // #swagger.tags = ['Map']
  const { areaId, categoryId, hashtagId, type } = req.query;

  try {
    if (Object.keys(req.query).length > 0) {
      if (type == "markers") {
        const response = await pin.findAll({
          include: [
            { model: area, attributes: ["prefecture"] },
            {
              model: crowd,
              attributes: ["recordedAt", "crowdSize", "crowdIntensity"],
            },
            {
              model: post,
              include: [
                {
                  model: postCategory,
                  attributes: ["categoryId"],
                },
                {
                  model: postHashtag,
                  attributes: ["hashtagId"],
                },
              ],
            },
          ],
          order: [
            ["id", "ASC"],
            [crowd, "recordedAt", "DESC"],
            [post, "likeCount", "DESC"],
          ],
        });

        const allMarkers = response.map((pin) => {
          const { posts, crowds } = pin;
          let crowdIntensity = "";
          let crowdSize = "";
          let recordedAt = "";

          if (crowds[0]) {
            crowdIntensity = crowds[0].crowdIntensity;
            crowdSize = crowds[0].crowdSize;
            recordedAt = crowds[0].recordedAt;
          }

          const allCats = posts.map((post, i) => {
            const { postCategories } = post;
            const allCategories = postCategories.map((category) => {
              const { categoryId } = category;
              return categoryId;
            });
            return allCategories.flat();
          });

          const allHashs = posts.map((post, i) => {
            const { postHashtags } = post;
            const allHashtags = postHashtags.map((hashtag) => {
              const { hashtagId } = hashtag;
              return hashtagId;
            });
            return allHashtags.flat();
          });

          return {
            position: {
              lat: pin.lat,
              lng: pin.lng,
            },
            id: pin.id,
            name: pin.placeName,
            areaId: pin.areaId,
            categoryId: [...new Set(allCats.flat())],
            hashtagId: [...new Set(allHashs.flat())],
            latestCrowdIntensity: crowdIntensity,
            latestCrowdSize: crowdSize,
            latestCrowdTime: recordedAt,
          };
        });
        return res.json(allMarkers);
      } else if (areaId) {
        const allPins = await pin.findAll({
          where: {
            areaId: areaId,
          },
          include: [
            { model: area, attributes: ["prefecture"] },
            {
              model: crowd,
              attributes: ["recordedAt", "crowdSize", "crowdIntensity"],
            },
            {
              model: post,
              include: [
                {
                  model: postCategory,
                  attributes: ["categoryId"],
                },
                {
                  model: postHashtag,
                  attributes: ["hashtagId"],
                },
              ],
            },
          ],
          order: [
            ["id", "ASC"],
            [crowd, "recordedAt", "DESC"],
          ],
        });

        if (categoryId) {
          const allCategoryPins = await allPins.map((pin) => {
            const allPinPosts = pin.posts.map((post) => {
              const allPosts = post.postCategories.map((category) => {
                if (Number(category.categoryId) === Number(categoryId)) {
                  return pin;
                }
              });
              const result = allPosts.filter((e) => e !== undefined);
              return result;
            });

            const result = allPinPosts.filter((e) => e.length !== 0);
            return result;
          });
          const allCategoryPinsResult = allCategoryPins
            .filter((e) => e.length !== 0)
            .flat(2);

          if (hashtagId) {
            const allCategoryHashPins = await allCategoryPinsResult.map(
              (pin) => {
                const allPinPosts = pin.posts.map((post) => {
                  const allPosts = post.postHashtags.map((hashtag) => {
                    if (Number(hashtag.hashtagId) === Number(hashtagId)) {
                      return pin;
                    }
                  });
                  const result = allPosts.filter((e) => e !== undefined);
                  return result;
                });
                const result = allPinPosts.filter((e) => e.length !== 0);
                return result;
              }
            );
            const allCategoryHashPinsResult = allCategoryHashPins
              .filter((e) => e.length !== 0)
              .flat(2);
            return res.json(allCategoryHashPinsResult);
          } else {
            return res.json(allCategoryPinsResult);
          }
        } else {
          return res.json(allPins);
        }
      }
    } else {
      const allPins = await pin.findAll({
        include: [
          { model: area, attributes: ["prefecture"] },
          {
            model: crowd,
            attributes: ["recordedAt", "crowdSize", "crowdIntensity"],
          },
          {
            model: post,
            include: [
              {
                model: postCategory,
                attributes: ["categoryId"],
              },
              {
                model: postHashtag,
                attributes: ["hashtagId"],
              },
            ],
          },
        ],
        order: [
          ["id", "ASC"],
          [crowd, "recordedAt", "DESC"],
          [post, "likeCount", "DESC"],
        ],
      });

      return res.json(allPins);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

//get map with crowd by pinid (when click on indiv post details)
const getOnePin = async (req, res) => {
  // #swagger.tags = ['Map']
  const { pinId } = req.params;
  try {
    const onePin = await pin.findByPk(pinId, {
      include: [
        { model: area, attributes: ["prefecture"] },
        {
          model: crowd,
          attributes: ["recordedAt", "crowdSize", "crowdIntensity"],
        },
        {
          model: post,
          include: [
            {
              model: postCategory,
              attributes: ["categoryId"],
            },
            {
              model: postHashtag,
              attributes: ["hashtagId"],
            },
          ],
        },
      ],
      order: [
        ["id", "ASC"],
        [crowd, "recordedAt", "DESC"],
      ],
    });

    return res.json(onePin);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

const createCrowdData = async (req, res) => {
  // #swagger.tags = ['Map']
  const { pinId } = req.params;
  const { userId, crowdSize, crowdIntensity } = req.body;

  try {
    const newCheckIn = await crowd.create({
      recordedAt: new Date(),
      userId: userId,
      pinId: pinId,
      crowdSize: crowdSize,
      crowdIntensity: crowdIntensity,
    });

    const newCrowd = await crowd.findAll({
      where: {
        pinId: newCheckIn.pinId,
      },
      order: [["recordedAt", "DESC"]],
      limit: 5,
      attributes: ["id", "recordedAt", "crowdSize", "crowdIntensity"],
    });

    return res.json(newCrowd);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
};

module.exports = {
  getAllPins,
  getOnePin,
  createCrowdData,
};
