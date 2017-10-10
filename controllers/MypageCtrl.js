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
  return res.r(result);

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

 exports.wish = async(req, res, next) => {
   let result = [];
   let data = '';
   try {
     const wishData = req.params.user_idx;
     data = await mypageModel.wish(wishData);
   } catch(error) {
     return next(error);
   }

   for(let i = 0 ; i<data.length; i++) {
     // 시작 +, 종료 - => 진행중
     if (data[i].end_date < 0) {
       data[i].flag = 'doing';
       result.push(data[i]);
     }
   }

   return res.r(result);
 };

