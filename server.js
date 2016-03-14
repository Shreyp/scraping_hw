var express = require('express');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
var routes = require('./routes/routes.js');

var app = express();

var PORT = process.env.PORT || 5680

//handlebars setup
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//Setup for Logger
var morgan = require('morgan');
app.use(logger('dev'));

//Setup for Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));

//Middleware
app.use("/js", express.static("public/js"));
app.use("/css", express.static("public/css"));
app.use("/images", express.static("public/images"));


//Listen
app.listen(PORT, function(){
  console.log("Listening on " + PORT)
}])