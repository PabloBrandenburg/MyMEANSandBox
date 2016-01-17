var express    = require('express');
var app        = express();
var mongoose   = require('mongoose'); // for working w/ our database
var path       = require('path');
var bodyParser = require('body-parser'); // get body-parser
var morgan     = require('morgan'); // used to see requests
// Server Setup
var config             = require('./server/config/config');

//APP CONFIGURATION ----------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// log all requests to the console
app.use(morgan('dev'));

//ROUTES FOR OUR API-------------------------------------------------------------------------
var apiUploads = require ('./server/routes/apiUploads.js')(app, express, mongoose, config);//API router 
    //all routes prefix with /uploads 
    app.use('/uploads', apiUploads);

// connect to the database
mongoose.connect(config.localdb);

// set public server to set assets
app.use(express.static(__dirname + '/public'));

// set up our one route to  the index.html file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//STARTS SERVER ON PORT XXXX------------------------------------------------------------

//Local set up, for development purposes, must hide above two line
app.listen(config.port);
console.log('Server running at http://localhost: ' + config.port);
