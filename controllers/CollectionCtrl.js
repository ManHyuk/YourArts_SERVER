'use strict';

const collectionModel = require('../models/CollectioModel');
const config = require('../config/config');
const resMsg = require('../errors.json');


//데이터받아서 쿼리문 실행

/*******************
 * user의콜랙션조회
 ********************/
exports.userCollection = async(req, res, next) => {
  let result = '';
  try {
    const userIdxData = req.params.user_idx;

    result = await collectionModel.userCollection(userIdxData);

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
  let image;
  let result = '';
  if(!req.file) image = null;
  else image = req.file.location;

  try {
    const collectionData = {
      user_idx: req.body.user_idx,
      exhibition_idx: req.body.exhibition_idx,
      collection_content : req.body.collection_content,
      collection_image: image
    };

    result = await collectionModel.workPost(collectionData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);

  // ,
  // collection_created : moment(new Date()).format('YYYYMMDD'),
  // collection_updated : moment(new Date()).format('YYYYMMDD')
};

/*******************
 * 컬렉션작성(내가찍은사진)
 ********************/
exports.picturePost = async(req, res, next) => {
  let image;
  let result = '';
  if(!req.file) image = null;
  else image = req.file.location;

  try {
    const collectionData = {
      user_idx: req.body.user_idx,
      exhibition_idx: req.body.exhibition_idx,
      collection_content : req.body.collection_content,
      collection_image: image
    };

    result = await collectionModel.picturePost(collectionData);

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
    const collectionIdxData = req.params.collection_idx;

    result = await collectionModel.detailCollection(collectionIdxData);
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
    const collectionEditData = {
      collection_idx : req.body.collection_idx,
      content : req.body.content
    };

    result = await collectionModel.editCollection(collectionEditData);

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
    const collectionIdxData = req.params.collection_idx;

    result = await collectionModel.delCollection(collectionIdxData);

  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.json(result);
};
