var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var user = require('./routes/user');

var app = express();

const mongoose = require('mongoose')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

mongoose.set('debug', true);
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once('open', function() {});
db.on('error', function(err) {
  console.error(err);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(multer());
//var ex = new Date(Date.now() + 60000);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  /*cookie: {
    originalMaxAge: 60000,
    maxAge: 60000,
    expires: new Date(Date.now() + 300000),
     //secure: true
  }*/
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;