import mongoose from 'mongoose';
//import Grid from 'gridfs-stream';
import formidable from 'formidable';
import fs from 'fs';
import Song from '../models/song.model';

const Grid = require('gridfs-stream')
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);
Grid.mongo = mongoose.mongo;

let gridfs = null;
mongoose.connection.on('connected', () => {
  gridfs = Grid(mongoose.connection.db);
});

const songController = {
    create(request, response) {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(request, (error, fields, files) => {
            if(error) {
                return response.status(400).json({
                    errorMessage: 'Audio could not be uploaded !'
                });
            };
            let song = new Song(fields);
            song.postedBy= request.profile;
            if(files.audio) {
                let writestream = gridfs.createWriteStream({_id: song._id})
                fs.createReadStream(files.audio.path).pipe(writestream)
            };
            song.save((error, result) => {
                if(error) {
                    return response.status(400).json({
                        error
                    });
                } else {
                    return response.status(201).json({
                        success: 'Song is uploaded !'
                    });
                };
            });
        });
    },

    getSongByID(request, response, nextHendlear, id){
        Song.findById(id)
            .exec((error, song) => {
            if(error || !song) {
                return response.status(400).json({
                    errorMessage: 'Audio not found !'
                });
            }
            request.song = song;
            nextHendlear();
        });
    },

    listSongs(request, response) {
        Song.find((error, songs) => {
            if(error) {
                return response.status(400).json({
                    error
                });
            };
            response.json(songs)
        }).sort('-created');
    },

    loadSong(request, response) {
        gridfs.findOne({
            _id: request.song._id
        }, (error, file) => {
            if (error) {
                return response.status(400).send({
                    error
                })
            }
            if (!file) {
                return response.status(404).send({
                    errorMessage: 'Audio not found !'
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

export default songController;
