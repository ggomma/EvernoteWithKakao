const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// routes
const index = require('./routes/index');
const evernote = require('./routes/evernote');
const kakao = require('./routes/kakao');

// MONGO DB CONNECTION
mongoose.connect('mongodb://localhost/evernoteKakao');
const db = mongoose.connection;
db.once('open', () => {
  console.log('=== MONGO DB IS CONNECTED ===');
});

// App setting
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));var app = express()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'gGommaEverNote',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/evernote', evernote);
app.use('/kakao', kakao);

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
  res.send(err)
});

module.exports = app;
