var Db = require('mongoose').Db,
    MongoClient = require('mongoose').MongoClient,
    Server = require('mongoose').Server,
    ReplSetServers = require('mongoose').ReplSetServers,
    ObjectID = require('mongoose').ObjectID,
    Binary = require('mongoose').Binary,
    GridStore = require('mongoose').GridStore,
    Grid = require('mongoose').Grid,
    Code = require('mongoose').Code,
    BSON = require('mongoose').BSON,
    assert = require('assert');
var fs = require('fs');

module.exports = function(app, express, mongoose, config) {
    var db = mongoose.connect(config.localdb);
    // Our file ID
    var fileId = new ObjectID();
    // Open a new file
    var gridStore = new GridStore(db, fileId, 'w');
    // Read the filesize of file on disk (provide your own)
    var fileSize = fs.statSync('./TempImages/testImage1.jpg').size;
    // Read the buffered data for comparision reasons
    var data = fs.readFileSync('./TempImages/testImage1.jpg');
            
    var apiUploads = express.Router();
    
    //APIs for images
    apiUploads.route('/images')
    .post(function (req, res, next){
        gridStore.open(function(err, gridStore) {
            
            // Write the file to gridFS
            gridStore.writeFile('./TempImages/testImage1.jpg', function(err, doc) {

            // Read back all the written content and verify the correctness
            GridStore.read(db, fileId, function(err, fileData) {
                assert.equal(data.toString('base64'), fileData.toString('base64'))
                assert.equal(fileSize, fileData.length);

                db.close();
                });
            });
        });
    })
    .get(function (req, res, next){
        
    })
    .put(function (req, res, next) {
        
    })
    .delete(function (req, res, next) {
        
    });
 


    return apiUploads;
};