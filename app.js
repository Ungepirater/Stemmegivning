
/**
* Module dependencies.
**/

var express = require('express');
var http = require('http');
var path = require('path');
/**
* File io management
**/
var fs = require('fs');

/**
* Get settings
**/

var settings = JSON.parse(fs.readFileSync('./settings.json'));
/**
* Crypto and DB
**/

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = settings["SaltWorkFactor"];

/**
* DB setup
**/

mongoose.connect(settings["mongoDBhost"], settings["mongoDBdatabase"]);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connected to DB');
});


/**
* Other settings
**/
var theme = settings["theme"];


var app = express();


// all environments
app.set('port', settings["port"]);
app.set('views', path.join(__dirname, 'views/'+theme+'/'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(settings["cookieSecret"]));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public/'+theme+'/')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/**
* Index route
**/
app.get('/', function(req,res){
	
	res.render('index ', { user: req.user });

});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
