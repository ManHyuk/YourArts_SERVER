'use strict';

const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');

module.exports = (router) => {

  router.route('/users/register')
    .post(userCtrl.register);

  router.route('/users/login')
    .post(userCtrl.login);





  return router;
};