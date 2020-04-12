import mongoose from 'mongoose';
//import Grid from 'gridfs-stream';
import formidable from 'formidable';
import fs from 'fs';
import Movie from '../models/movie.model';

const Grid = require('gridfs-stream')
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);
Grid.mongo = mongoose.mongo;

let gridfs = null;
mongoose.connection.on('connected', () => {
  gridfs = Grid(mongoose.connection.db);
});

const movieController = {
    create(request, response) {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(request, (error, fields, files) => {
            if(error) {
                return response.status(400).json({
                    errorMessage: 'Video could not be uploaded'
                });
            };
            let movie = new Movie(fields);
            movie.postedBy= request.profile;
            if(files.video) {
                let writestream = gridfs.createWriteStream({_id: movie._id})
                fs.createReadStream(files.video.path).pipe(writestream)
            };
            movie.save((error, result) => {
                if(error) {
                    return response.status(400).json({
                        errorMessage: error.message
                    });
                };
                response.json(result);
            });
        });
    },

    getMovieByID(request, response, nextHendlear, id){
        Movie.findById(id)
            .exec((error, movie) => {
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
        Movie.find((error, movies) => {
            if(error) {
                return response.status(400).json({
                    error
                });
            };
            response.json(movies)
        }).sort('-created');
    },

    loadMovie(request, response) {
        gridfs.findOne({
            _id: request.movie._id
        }, (error, file) => {
            if (error) {
                return response.status(400).send({
                    error
                })
            }
            if (!file) {
                return response.status(404).send({
                    errorMessage: 'Video not found !'
                })
            }
    
            if (request.headers['range']) {
                let parts = request.headers['range'].replace(/bytes=/, '').split('-')
                let partialstart = parts[0]
                let partialend = parts[1]
    
                let start = parseInt(partialstart, 10)
                let end = partialend ? parseInt(partialend, 10) : file.length - 1
                let chunksize = (end - start) + 1
    
                response.writeHead(206, {
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Range': 'bytes ' + start + '-' + end + '/' + file.length,
                    'Content-Type': file.contentType
                })
    
                gridfs.createReadStream({
                    _id: file._id,
                    range: {
                        startPos: start,
                        endPos: end
                    }
                }).pipe(response)
            } else {
                response.header('Content-Length', file.length)
                response.header('Content-Type', file.contentType)
    
                gridfs.createReadStream({
                    _id: file._id
                }).pipe(response)
            }
        })
    }
}

export default movieController;
