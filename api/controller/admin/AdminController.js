const Admin = require('./../../model/Admin');


module.exports = {
  getLoginPage: async function(req, res, next) {
    res.render('admin/login', {
      title: 'Kaushik prasath'
    });
  },
  loginAccess: async function(req, res, next) {
    var result;
    var resCode;
    try {
      var mobileNo = req.body.mobileNo;
      var mobileId = req.body.mobileId;
      var queryObj = {};
      if (!(mobileNo == 'undefined' || mobileNo == 0)) {
        queryObj['mobileNo'] = mobileNo;
      }

      result = await Admin.find(queryObj);
      if (!(result.length == 0)) {
        if (result[0].access == 'admin' && result[0].mobileNo == mobileNo) {
          resCode = 1;
        } else {
          resCode = 4;
        }
      } else {
        var creObj = await Admin.create(queryObj);
        resCode = 4;
      }


      res.status(200).send({
        status: 'success',
        code: resCode
      });
    } catch (err) {
      res.status(200).send({
        status: 'failure',
        code: 6,
        errorCode: err.code,
        message: err.message
      });
    }
  },
  dashboard: async function(req, res, next) {
    res.render('admin/dashboard', {
      title: 'Kaushik prasath'
    });
  }
}