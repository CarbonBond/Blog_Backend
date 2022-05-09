var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

var v1Router = require('./routes/version/private');
const auth = require('./routes/auth')
const posts = require('./routes/version/public')

require('./controller/passport');
require('dotenv').config()

var app = express();


app.use(cors({
  origin: process.env.COR_URL
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v/1/public', posts);
app.use('/api/v/1', passport.authenticate('jwt', {session: false}), v1Router);
app.use('/auth', auth);
app.use('/', (req, res) => {
  res.send('blogapi')
  return;
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === true//'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
