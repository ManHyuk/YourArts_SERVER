'use strict';

const mypageModel = require('../models/MypageModel');
const config = require('../config/config');
const resMsg = require('../errors.json');

/******
 * watch 조회
 * @param req
 */
exports.watch = async(req, res, next) => {
  let result = '';
  try {
    const watchData = req.params.user_idx;
    result = await mypageModel.watch(watchData);
  } catch(error) {
    return next(error);
  }
  return res.json(result);
};

/******
 * wish 조회
 * @param req
 */
exports.wish = async(req, res, next) => {
  let result = '';
  try {
    const wishData = req.params.user_idx;
    result = await mypageModel.wish(wishData);
  } catch(error) {
    return next(error);
  }
  return res.json(result);
};
