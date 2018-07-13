var mongoose = require('mongoose');
var express = require('express');
var flash = require('connect-flash');
var expressValidator = require('express-validator');

mongoose.Promise = global.Promise;

var web = express();

//include files from models folder
var User = require('../models/user');
var Item = require('../models/items');

//Connect to the database
mongoose.connect('mongodb://harshit:harshit1@ds235251.mlab.com:35251/weplan');
var db = mongoose.connection;

// Input data in database
  web.post('/signup', function(req,res){
  var  Username  = req.body.Username;
  var  Email  = req.body.Email
  var  Password  = req.body.Password;
  var  PhoneNo = req.body.PhoneNo;


  // Validation
	req.checkBody('ConfirmPassword', 'Passwords do not match').equals(req.body.Password);

  var errors = req.validationErrors();


var newUser = new User({
      Username  : Username,
      Email     : Email,
      Password  : Password,
      PhoneNo    : PhoneNo
    	});

// create users
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);

  });

  req.flash('success_msg', 'You are sign up and you can  login now');

  res.redirect('/');


});

// Input data in database
  web.post('/items', function(req,res){
  var  Budget  = req.body.Budget;
  var  Food  = req.body.query;
  var  FoodList  = req.body.FoodList;
  var  People = req.body.People;
  var  Query  = req.body.Query;
  var  Venue  = req.body.Venue

  // Validation
  req.checkBody('ConfirmPassword', 'Passwords do not match').equals(req.body.Password);

  var errors = req.validationErrors();

var newItem = new Item({
      Budget  : Budget,
      Food     : Food,
      FoodList  : FoodList,
      People    : People,
      Query  : Query,
      Venue    : Venue
      });

// create users
    newItem.save();
    console.log(newItem)
  req.flash('success_msg', 'Thank you for Connecting!! We Will Contact you soon!!');

  res.redirect('/home');


});



// authentication
web.post('/login',function(req,res){
  User.findOne( { PhoneNo:req.body.PhoneNo},function(err,user){

 if(!user)
{    req.flash('success_msg', 'Unknown User');
     res.redirect('/');
  }
  else{
  User.comparePassword(req.body.Password, user.Password, function(err, isMatch){
    if(err) throw err;
    if(isMatch){
      req.session.authenticated = true;
      var name=user.Username;
      	res.render('userdashboard',{ name: name});

    } else {
        req.flash('error_msg', 'Invalid Password');
      res.redirect('/');
    }
  });

}

  });
  });


//logout function
web.get('/logout', function(req, res){
  delete req.session.authenticated;
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');

});

// home
web.get('/home', function(req, res){
	res.render('userdashboard');
});


web.get('/', function(req, res){
		res.render('home');
});



module.exports = web;
