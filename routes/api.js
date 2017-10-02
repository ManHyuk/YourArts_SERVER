'use strict';

const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');
const collectionCtrl = require('../controllers/CollectionCtrl');

const aws = require('aws-sdk');
const s3 = new aws.S3();
const multer = require('multer');
const multerS3 = require('multer-s3');
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'yourarts-img',
    acl: 'public-read', //이미지 읽기만 허용
    key: function(req, file, cb){
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    }
  })
});

module.exports = (router) => {

  router.route('/users/register')
    .post(userCtrl.register);

  router.route('/users/login')
    .post(userCtrl.login);


    //user의 콜랙션조회
    router.route('/collections/:user_idx')
    .get(collectionCtrl.userCollection);

    //컬렉션작성(미리보기)
    router.route('/collections/work')
      .post(upload.single('collection_image'), collectionCtrl.workPost);
    //컬렉션작성(내가찍은사진)
    router.route('/collections/picture')
      .post(upload.single('collection_image'), collectionCtrl.picturePost);

    //컬렉션상세조회, 컬렉션수정, 콜랙션삭제
    router.route('/collections/:collection_idx')
      .get(collectionCtrl.detailCollection)
      .put(collectionCtrl.editCollection)
      .delete(collectionCtrl.delCollection);


  return router;
};
