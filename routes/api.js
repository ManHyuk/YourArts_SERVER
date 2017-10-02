'use strict';

const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');
const artsCtrl = require('../controllers/ArtsCtrl');
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

  // USER
  router.route('/users/register')
    .post(userCtrl.register);

  router.route('/users/login')
   .post(userCtrl.login);



  // ARTS

  router.route('/arts/doing')
    .get(artsCtrl.doingList);
  router.route('/arts/done')
    .get(artsCtrl.doneList);
  router.route('/arts/todo')
    .get(artsCtrl.todoList);
  router.route('/search/:search')
    .get(artsCtrl.search);


// COLLECTIONS
  router.route('/collections/:user_idx')
    .get(collectionCtrl.userCollection);
  router.route('/collections/work')
    .post(upload.single('collection_image'), collectionCtrl.workPost);
  router.route('/collections/picture')
    .post(upload.single('collection_image'), collectionCtrl.picturePost);

  router.route('/collections/:collection_idx')
    .get(collectionCtrl.detailCollection)
    .put(collectionCtrl.editCollection)
    .delete(collectionCtrl.delCollection);


  return router;
};
