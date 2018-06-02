const Message = require('./../../model/Message');


module.exports = {
  contact: async function(req, res, next) {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    let createObj = {};
    let result;
    let resCode;

    var creObj = await Message.create(creObj);
    if (!(name == 'undefined' || name == null || name == "")) {
      createObj['name'] = name;
    }
    if (!(email == 'undefined' || email == null || email == "")) {
      createObj['email'] = email;
    }
    if (!(message == 'undefined' || message == null || message == "")) {
      createObj['message'] = message;
    }

    result = await Message.create(createObj);
    if (result) {
      resCode = 1;
    }

    console.log(result);

    if (resCode === 1) {
      res.status(200).send({
        message: 'success',
        code: resCode,
        user: result
      });
    }
  }
}