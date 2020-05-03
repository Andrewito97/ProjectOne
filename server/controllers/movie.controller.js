import mongoose from 'mongoose';
import formidable from 'formidable';
import fs from 'fs';
import MovieSchema from '../models/movie.model';
import config from '../../config';

//create connection to specific database
const connection = mongoose.createConnection(config.movieMongoUri, {
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
    console.log('Connected to db with music documents !');
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
            };
            let movie = new Movie(fields);
            let writestream = gridFSBucket.
                openUploadStreamWithId(
                    movie._id,
                    files.video.name
                );
            fs.createReadStream(files.video.path).pipe(writestream)
            movie.save((error, result) => {
                if(error) {
                    return response.status(400).json({
                        error
                    });
                } else {
                    return response.status(201).json({
                        success: result
                    });
                };
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
            .sort('-created')
            .exec( (error, movies) => {
                if(error) {
                    return response.status(400).json({
                        error
                    });
                };
                response.json(movies)
        });
    },
    
    listUserMovies(request, response) {
        Movie.find({ postedBy: request.profile._id })
            .sort('-created')
            .exec( (error, movies) => {
                if(error || !movies) {
                    return response.status(400).json({
                        errorMessage: 'Movies not found !'
                    });
                }
                response.json(movies)
        });
    },

    loadMovie(request, response) {
        gridFSBucket
            .find({ _id: request.movie._id })
            .toArray( (error, files) => {
                let file = files[0];

                if (error) {
                    return response.status(400).send({
                        error
                    })
                };
                if (!file) {
                    return response.status(404).send({
                        errorMessage: 'Video not found !'
                    })
                };
        
                if (request.headers['range']) { 
                    //load video from the specific range
                    let parts = request.headers['range'].replace(/bytes=/, '').split('-')
                    let partialstart = parts[0]
                    let partialend = parts[1]
        
                    let startPosition = parseInt(partialstart, 10)
                    let endPosition = partialend ? parseInt(partialend, 10) : file.length - 1
                    let chunksize = (endPosition - startPosition) + 1
        
                    response.writeHead(206, {
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Range': 'bytes ' + startPosition + '-' + endPosition + '/' + file.length,
                        'Content-Type': 'binary/octet-stream'
                    })
        
                    gridFSBucket
                        .openDownloadStream(
                            file._id, {
                                start: startPosition,
                                end: endPosition
                            }
                        )
                        .pipe(response);

                } else { 
                    //load full video by default
                    response.header('Content-Length', file.length)
                    response.header('Content-Type', 'binary/octet-stream')
        
                    gridFSBucket
                        .openDownloadStream( file._id )
                        .pipe(response);
                };
        });
    }
};

export default movieController;
