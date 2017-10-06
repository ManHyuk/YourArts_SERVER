'use strict';

const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');
const artsCtrl = require('../controllers/ArtsCtrl');
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
    .get(artsCtrl.exDetail);


  router.route('/works/:idx')
    .get(artsCtrl.workDetail);






  return router;
};