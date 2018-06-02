var express = require('express');
var router = express.Router();
let UserController = require('./../api/controller/user/UserController');


router.get('/', (req, res) => {
  res.render('home', {
    title: 'Kaushik prasath'
  });
});

router.route('/contact').post(UserController.contact)


module.exports = router;