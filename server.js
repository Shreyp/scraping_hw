var express = require('express');
var cheerio = require('cheerio');
var request = require('request');

var app = express();

var PORT = process.env.PORT || 5680

//handlebars setup
var expressHandlebars = require('express-handlebars');

app.engine('handlebars', expressHandlebars({
  defaultLayout: __dirname + '/views/layouts/main.handlebars'
}));
app.set('view engine', 'handlebars');


//Setup for Logger
var morgan = require('morgan');
app.use(morgan('dev'));

//Setup for Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
  
//Middleware
app.use("/js", express.static("public/js"));
app.use("/css", express.static("public/css"));
app.use("/images", express.static("public/images"));

//Setup for Mongoose
var mongoose = require('mongoose');

//Local Mongoose Setup
mongoose.connect('mongodb://localhost/scraperDB');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//require mongoose schemas
var ScrapedData = require('./models/models.js');

//routes
app.get('/', function(req, res) {
  res.render(__dirname + "/views/home");
});

//Listen
app.listen(PORT, function(){
  console.log("Listening on " + PORT)
});