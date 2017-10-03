'use strict';

const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');
const artsCtrl = require('../controllers/ArtsCtrl');
const collectionCtrl = require('../controllers/CollectionCtrl');
const imageCtrl = require('../controllers/ImageCtrl');

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
  router.route('/userCollections/:user_idx')
    .get(collectionCtrl.userCollection);
  router.route('/collections/work')
    .post(imageCtrl.uploadSingle, collectionCtrl.workPost);
  router.route('/collections/picture')
    .post(imageCtrl.uploadSingle, collectionCtrl.picturePost);

  router.route('/collections/:collection_idx')
    .get(collectionCtrl.detailCollection)
    .delete(collectionCtrl.delCollection);

    router.route('/collections/edit')
      .put(collectionCtrl.editCollection);


  return router;
};
