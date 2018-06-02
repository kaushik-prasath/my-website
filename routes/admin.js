var express = require('express');
var router = express.Router();
let UserController = require('./../api/controller/user/UserController');
let AdminController = require('./../api/controller/admin/AdminController');




router.route('/login').get(AdminController.getLoginPage).post(AdminController.loginAccess);
router.route('/logout').get(function(req, res, next) {
  res.render('admin/logout');
});
router.route('/dashboard').get(AdminController.dashboard);


module.exports = router;