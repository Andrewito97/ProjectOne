import mongoose from 'mongoose';
import formidable from 'formidable';
import fs from 'fs';
import MovieSchema from '../models/movie.model';
import config from '../../config';

//create connection to specific database
const connection = mongoose.createConnection(config.moviesMongoUri, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true
});

//append specifid schema to the connection and initialize constructor
const Movie = connection.model('Movie', MovieSchema);

//append grid-fs-bucket to the connection and initialize constructor
let gridFSBucket = null;
connection.once('open', function () {
	gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db);
	console.log('Connected to db with movies documents !');
});

connection.on('error', () => {
	throw new Error('Unable to connect to database with movies documents!');
});

const movieController = {
	create(request, response) {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(request, (error, fields, files) => {
			if(error) {
				return response.status(400).json({
					errorMessage: 'Video could not be uploaded !'
				});
			}
			let movie = new Movie(fields);
			movie.save((error, result) => {
				if(error) {
					return response.status(400).json({
						error
					});
				} else {
					let writeStream = gridFSBucket.
						openUploadStreamWithId(
							movie._id,
							files.video.name
						);
					fs.createReadStream(files.video.path).pipe(writeStream);
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
			});
		});
	},

	getMovieByID(request, response, nextHendlear, id){
		Movie
			.findById(id)
			.exec( (error, movie) => {
				if(error || !movie) {
					return response.status(400).json({
						errorMessage: 'Movie not found !'
					});
				}
				request.movie = movie;
				nextHendlear();
			});
	},

	listMovies(request, response) {
		Movie
			.find()
			.skip(Number(request.query.skip))
			.limit(5)
			.sort('-created')
			.exec( (error, movies) => {
				if(error) {
					return response.status(400).json({
						error
					});
				}
				response.json(movies);
			});
	},
    
	listUserMovies(request, response) {
		Movie
			.find({ postedBy: request.profile._id })
			.sort('-created')
			.exec( (error, movies) => {
				if(error || !movies) {
					return response.status(400).json({
						errorMessage: 'Movies not found !'
					});
				}
				response.json(movies);
			});
	},

	searchMovies(request, response) {
		Movie
			.find({$text: {$search: request.query.text}})
			.limit(7)
			.exec( (error, movies) => { 
				if(error || !movies) {
					return response.status(400).json({
						errorMessage: 'Movies not found !'
					});
				}
				response.json(movies);
			});
	},

	findMovie(request, response) {
		Movie
			.findById(request.movie._id)
			.exec( (error, movie) => {
				if(error || !movie) {
					return response.status(400).json({
						errorMessage: 'Movie not found !'
					});
				}
				response.json(movie);
			});
	},

	deleteMovie(request, response) {
		Movie
			.findByIdAndDelete(request.movie._id, (error) => {
				if(error) {
					return response.status(400).json({
						movieError: error
					});
				} else {
					return response.status(200).json({
						success: 'Movie has been deleted !'
					});
				} 
			});
	},

	deleteVideo(request, response) {
		gridFSBucket
			.delete(request.movie._id, (error) => {
				if(error) {
					return response.status(400).json({
						videoError: error
					});
				} else {
					return response.status(200).json({
						success: 'Video has been deleted !'
					});
				} 
			});
	},

	loadVideo(request, response) {
		gridFSBucket
			.find({ _id: request.movie._id })
			.toArray( (error, files) => {
				let file = files[0];

				if (error) {
					return response.status(400).send({
						error
					});
				}
				if (!file) {
					return response.status(404).send({
						errorMessage: 'Video not found !'
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

export default movieController;
