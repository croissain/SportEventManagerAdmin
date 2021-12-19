var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const tournamentRouter = require('./routes/tournament');
const teamRouter = require('./routes/team');
const pagiHelper = require('express-handlebars-paginate');


const expressHandlebarsSections = require('express-handlebars-sections');

const passport = require('passport');
const session = require('express-session');

const app = express();

// view engine setup
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'layout',

  helpers: {
    section: expressHandlebarsSections(),
    createPagination: pagiHelper.createPagination,
    sum: function (a, b) {
      return a + b;
    }

  }
}));











app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tournament', tournamentRouter);
app.use('/team', teamRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
