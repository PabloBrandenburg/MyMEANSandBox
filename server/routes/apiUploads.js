var config      = require('../config/config');
//var cloudinary  = require('cloudinary');
var mongoose	= require('mongoose');
var Grid 		= require('gridfs-stream');//GridFS mongodb

//mongoose.connect(config.Imgdb);
var mongodb 	= mongoose.connection;


module.exports = function(app, express) {
   
   var apiUploads = express.Router();
   
   var uploadCtr = require('../controllers/uploadControllers');

        apiUploads.route('/imageFile/:filename')
            .get(uploadCtr.getImage);

        apiUploads.post('/imageUpload', function(req, res){

            var gfs = Grid (mongodb.db, mongoose.mongo);

            uploadCtr.updateImage(gfs, req, res);

    });

    return apiUploads;
};