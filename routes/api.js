'use strict';

const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');
const artsCtrl = require('../controllers/ArtsCtrl');
const collectionCtrl = require('../controllers/CollectionCtrl');
const imageCtrl = require('../controllers/ImageCtrl');
const mypageCtrl = require('../controllers/MypageCtrl');

const likeHeartCtrl = require('../controllers/LikeHeartCtrl');


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

  router.route('/arts/:idx')
    .get(authCtrl.auth, artsCtrl.exDetail);



  router.route('/works/:idx')
    .get(artsCtrl.workDetail);

  //like, Heart
  router.route('/like')
    .post(likeHeartCtrl.like)
    .put(likeHeartCtrl.likeEdit);

  router.route('/heart')
    .post(likeHeartCtrl.heart)
    .put(likeHeartCtrl.heartEdit);



  // COLLECTIONS
  router.route('/userCollections/:user_idx')
    .get(collectionCtrl.userCollection);
  router.route('/collections')
    .post(imageCtrl.uploadSingle, collectionCtrl.collectionPost)
    .put(collectionCtrl.editCollection);



  router.route('/collections/edit')
    .put(collectionCtrl.editCollection);

  router.route('/collections/:collection_idx')
    .get(collectionCtrl.detailCollection)
    .delete(collectionCtrl.delCollection);




  //MYPAGE

  router.route('/watch/:user_idx')
    .get(mypageCtrl.watch);
  router.route('/wish/:user_idx')
    .get(mypageCtrl.wish);


  return router;
};
