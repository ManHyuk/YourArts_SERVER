'use strict';

const collectionModel = require('../models/CollectioModel');
const config = require('../config/config');
const resMsg = require('../errors.json');
const moment = require('moment');

// const aws = require('aws-sdk');
// const s3 = new aws.S3();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'yourarts-img',
//     acl: 'public-read', //이미지 읽기만 허용
//     key: function(req, file, cb){
//       cb(null, Date.now() + '.' + file.originalname.split('.').pop());
//     }
//   })
// });

//데이터받아서 쿼리문 실행

/*******************
 * user의콜랙션조회
 ********************/
exports.userCollection = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.params.user_idx;

    result = await collectionModel.userCollection(userData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);
};

/*******************
 * 컬렉션작성(미리보기)
 ********************/
exports.workPost = async(req, res, next) => {
  let imageUrl;
  let result = '';

  if(!req.file) imageUrl = null;
  else imageUrl = req.file.location;

  try {
    const userData = {
      user_idx: req.body.user_idx,
      exhibition_idx: req.body.exhibition_idx,
      collection_content : req.body.content,
      collection_image: imageUrl,
      collection_created : moment(new Date()).format('YYYYMMDD')
    };

    result = await collectionModel.workPost(userData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);
};

/*******************
 * 컬렉션작성(내가찍은사진)
 ********************/
exports.picturePost = async(req, res, next) => {
  let imageUrl;
  let result = '';

  if(!req.file) imageUrl = null;
  else imageUrl = req.file.location;

  try {
    const userData = {
      user_idx: req.body.user_idx,
      exhibition_idx: req.body.exhibition_idx,
      collection_content : req.body.content,
      collection_image: imageUrl,
      collection_created : moment(new Date()).format('YYYYMMDD')
    };

    result = await collectionModel.picturePost(userData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);
};

/*******************
 * 컬렉션상세조회
 ********************/
exports.detailCollection = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.params.collection_idx;

    result = await collectionModel.detailCollection(userData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);
};

/*******************
 * 컬렉션수정
 ********************/
exports.editCollection = async(req, res, next) => {
  let result ='';
  try {
    const userData = {
      collection_idx : req.params.collection_idx,
      content : req.body.content,
      updated : moment(new Date()).format('YYYYMMDD')
    };

    result = await collectionModel.editCollection(userData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);
};

/*******************
 * 콜랙션삭제
 ********************/
exports.delCollection = async(req, res, next) => {
  let result ='';
  try {
    const userData = req.params.collection_idx;

    result = await collectionModel.delCollection(userData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);
};
