import mongoose from 'mongoose';
import formidable from 'formidable';
import fs from 'fs';
import MusicSchema from '../models/music.model';
import config from '../../config';

//create connection to specific database
const connection = mongoose.createConnection(config.musicMongoUri, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true
});

//append specifid schema to the connection and initialize constructor
const Music = connection.model('Music', MusicSchema);

//append grid-fs-bucket to the connection and initialize constructor
let gridFSBucket = null;
connection.once('open', function () {
	gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db);
	console.log('Connected to db with music documents !');
});

connection.on('error', (error) => {
	console.error('Unable to connect to database with music documents!');
	console.error(`Reason: ${error}`);
});

const musicController = {
	create(request, response) {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.multiples = true;
		form.parse(request, (error, fields, files) => {
			if(error) {
				return response.status(400).json({
					errorMessage: 'Audio could not be uploaded !'
				});
			}

			let names = JSON.parse(fields.audionames);
			let music = new Music(fields);
			for(let name of names) {
				music.audios.push(name.audioname);
			}

			music.save((error, result) => {
				if(error) {
					return response.status(400).json({
						error
					});
				} else {
					if(Array.isArray(files.audios)) { // if receive multiple audios     
						for(let i = 0; i < files.audios.length; i++) {
							let writeStream = gridFSBucket
								.openUploadStream(
									names[i].audioname, {
										aliases: 'music'
									});
							fs.createReadStream(files.audios[i].path).pipe(writeStream);
							writeStream.on('error', error => {
								return response.status(400).json({
									error
								});
							});
							if((i + 1) === files.audios.length) { // send success response when last audio is written
								writeStream.on('finish', () => {
									return response.status(201).json({
										success: result
									});
								});
							}
						}
					} else { // if receive single audio
						let writeStream = gridFSBucket
							.openUploadStream(
								names[0].audioname, {
									aliases: 'music'
								});
						fs.createReadStream(files.audios.path).pipe(writeStream);
						writeStream.on('error', error => {
							return response.status(400).json({
								error
							});
						});
						writeStream.on('finish', () => {
							return response.status(201).json({
								success: result
							});
						});
					}
				}
			});
		});
	},

	getAudioByName(request, response, nextHendlear, audioName){
		gridFSBucket
			.find({ filename: audioName })
			.toArray( (error, audios) => {
				if(error) {
					return response.status(400).json({
						errorMessage: 'Audio not found !'
					});
				}
				if(audios[0] === undefined) {
					return response.status(400).json({
						errorMessage: 'Audio didn\'t loaded yet !'
					});
				}
				request.profile = audios[0];
				nextHendlear();
			});
	},

	listMusic(request, response) {
		if(request.query.genre === 'All') {
			Music
				.find()
				.skip(Number(request.query.skip))
				.limit(10)
				.sort('-created')
				.exec( (error, music) => {
					if(error) {
						return response.status(400).json({
							error
						});
					}
					response.status(200).json(music);
				});
		} else if(request.query.genre === 'Other') {
			Music
				.find({ genre: {$nin: ['Pop', 'Rock and Metal', 'Hip Hop', 'Indie', 'Folk']} })
				.skip(Number(request.query.skip))
				.limit(10)
				.sort('-created')
				.exec( (error, music) => {
					if(error) {
						return response.status(400).json({
							error
						});
					}
					response.status(200).json(music);
				});
		} else {
			Music
				.find({ genre: request.query.genre })
				.skip(Number(request.query.skip))
				.limit(10)
				.sort('-created')
				.exec( (error, music) => {
					if(error) {
						return response.status(400).json({
							error
						});
					}
					response.status(200).json(music);
				});
		}
        
	},

	listUserMusic(request, response) {
		Music
			.find({postedBy: request.profile._id})
			.sort('-created')
			.exec( (error, music) => {
				if(error || !music) {
					return response.status(400).json({
						errorMessage: 'Music not found !'
					});
				}
				response.json(music);
			});
	},

	getMusicByID(request, response, nextHendlear, musicId) {
		Music
			.findById(musicId)
			.exec( (error, music) => {
				if(error || !music) {
					return response.status(400).json({
						errorMessage: 'Music not found !'
					});
				}
				request.music = music;
				nextHendlear();
			});
	},

	searchMusic(request, response) {
		Music
			.find({$text: {$search: request.query.text}})
			.limit(7)
			.exec( (error, music) => { 
				if(error || !music) {
					return response.status(400).json({
						errorMessage: 'Music not found !'
					});
				}
				response.json(music);
			});
	},

	findMusic(request, response) {
		Music
			.findById(request.music._id)
			.exec( (error, music) => {
				if(error || !music) {
					return response.status(400).json({
						errorMessage: 'Music not found !'
					});
				}
				response.json(music);
			});
	},

	deleteMusic(request, response) {
		Music
			.findByIdAndDelete(request.music._id, (error) => {
				if(error) {
					return response.status(400).json({
						musicError: error
					});
				} else {
					return response.status(200).json({
						success: 'Music has been deleted !'
					});
				} 
			});
	},

	deleteAudio(request, response) {
		gridFSBucket
			.find({ filename: request.profile.filename })
			.toArray( (error, files) => {
				let file = files[0];
				let audioId = file._id;
				gridFSBucket
					.delete(audioId, (error) => {
						if(error) {
							return response.status(400).json({
								audioError: error
							});
						} else {
							return response.status(200).json({
								success: 'Audio has been deleted !'
							});
						} 
					});
			});
	},

	loadAudio(request, response) {
		gridFSBucket
			.find({ filename: request.profile.filename })
			.toArray( (error, files) => {
				let file = files[0];   

				if (error) {
					return response.status(400).send({
						error
					});
				}
				if (!file) {
					return response.status(404).send({
						errorMessage: 'Audio not found !'
					});
				}
            
				let startPosition = request.headers.range.replace(/\D/g, '');
				let endPosition = file.length - 1;
				let chunksize = (endPosition - startPosition) + 1;
    
				response.writeHead(206, {
					'Accept-Ranges': 'bytes',
					'Content-Length': chunksize,
					'Content-Range': 'bytes ' + startPosition + '-' + endPosition + '/' + file.length,
					'Content-Type': 'binary/octet-stream'
				});
                
				let downloadStream = gridFSBucket.openDownloadStream(file._id);
				downloadStream.on('data', chunk => {
					response.write(chunk);
				});
				downloadStream.on('error', error => {
					console.log(error);
				});
				downloadStream.start(startPosition);
				downloadStream.end(file.length);

			});
	}
};

export default musicController;
