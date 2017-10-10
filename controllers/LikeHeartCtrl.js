'use strict';

const likeHeartModel = require('../models/LikeHeartModel');

/******
 * like
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
exports.like = async(req, res, next) => {

  let result = '';

  try {
    const likeData = {
      user_idx : req.body.user_idx,
      exhibition_idx : req.body.exhibition_idx,
      like_count : req.body.like_count
    };

    result = await likeHeartModel.like(likeData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.r(result);
};


/******
 * heart작성
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
exports.heart = async(req, res, next) => {

  let result = '';

  try {
    const heartData = {
      user_idx : req.body.user_idx,
      exhibition_idx : req.body.exhibition_idx,
      heart_used : req.body.heart_used
    };

    result = await likeHeartModel.heart(heartData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.r(result);
};
