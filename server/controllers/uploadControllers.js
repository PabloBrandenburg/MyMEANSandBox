exports.updateImage = function(gfs, req, res){

	var user_id = req.data.user_id;
	console.log('updating image for ' + user_id);

	req.pipe(gfs.createWriteStream({
		_id: user_id,
		filename: 'image',
		mode: 'w'
	}));

	res.send('Successfully uploaded the image for user ' + user_id);
};

exports.getImage = function(gfs, user_id, res){

	console.log('requesting the image from user ' + user_id);

	var imageStream = gfs.createReadStream({
		_id: user_id,
		filename: 'image',
		mode: 'r'
	});

	imageStream.on('error', function(error){
		res.send('404', 'Not Found');
		return;
	});

	res.setHeader('Content-Type', 'image/jpeg');
	imageStream.pipe(res);
};