var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var path = require('path');
var exphbs = require('express-handlebars');

var web = express();

//include files from directory....
var todocontroller = require('./routes/todocontroller');
var user = require('./models/user');

//set up emplate engine
web.set('views', path.join(__dirname, 'views'));
web.engine('handlebars', exphbs({defaultLayout:'layout'}));
web.set('view engine', 'handlebars');

//static files
web.use(express.static((__dirname, 'public')));


//include files from routes folder
 var users = require('./routes/todocontroller');
 //flash
web.use(flash());
//Express Session
web.use(session({
  secret: 'secretsmmsmsmmm',
  saveUninitialized : true,
  resave : true
}));


web.use(checkAuth);

function checkAuth (req, res, next) {
  // don't serve /secure to those not logged in
  // you should add to this list, for each and every secure url
  if (((req.url === '/home') || (req.url === '/home') && (!req.session || !req.session.authenticated))) {
    res.redirect('/');
    return;
  }

  next();
}

// BodyParser Middleware
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: true }));
web.use(cookieParser());


//passport initialize
web.use(passport.initialize());
web.use(passport.session());






//express-validator
web.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      var root    = namespace.shift()
      var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Global vars
web.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
});



//use included files
web.use(todocontroller );

//listen to port
web.listen(5000);
console.log('go listen to port 5000');
