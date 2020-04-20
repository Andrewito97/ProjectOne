import mongoose from 'mongoose';
//import Grid from 'gridfs-stream';
import formidable from 'formidable';
import fs from 'fs';
import Music from '../models/music.model';
import config from '../../config';

const Grid = require('gridfs-stream')
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);
Grid.mongo = mongoose.mongo;

let gridfs = null;
const musicConnection = mongoose.createConnection(config.musicMongoUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
});

musicConnection.once('open', function () {
    console.log('Connected to db with music documents !')
    gridfs = Grid(musicConnection.db);
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
            };

            let names = JSON.parse(fields.audionames)
            let music = new Music(fields);
            music.postedBy = request.profile;

            if(Array.isArray(files.audios)) { //if receive multiple audios     
                for(let i = 0; i < files.audios.length; i++) {
                    let writestream = gridfs
                        .createWriteStream({
                            filename: names[i].audioname, 
                            aliases: 'music'
                        });
                    fs.createReadStream(files.audios[i].path).pipe(writestream);
                    music.audios.push(names[i].audioname);
                };
            } else { // if receive single audio
                let writestream = gridfs
                    .createWriteStream({
                        filename: names[0].audioname, 
                        aliases: 'music'
                    });
                fs.createReadStream(files.audios.path).pipe(writestream);
                music.audios.push(names[0].audioname);
            };
            
            music.save((error, result) => {
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

    getAudioByName(request, response, nextHendlear, audioName){
        gridfs.findOne({filename: audioName}, (error, audio) => {
            if(error || !audio) {
                return response.status(400).json({
                    errorMessage: 'Audio not found !'
                });
            };
            request.profile = audio;
            nextHendlear();
        });
    },

    listMusic(request, response) {
        Music.find((error, music) => {
            if(error) {
                return response.status(400).json({
                    error
                });
            };
            response.status(200).json(music);
        }).sort('-created');
    },

    listAudios(request, response) {
        gridfs.files.find({aliases: 'music'})
            .toArray((error, files) => {
                if(error) {
                    return response.status(400).json({
                        error
                    });
                };
                response.status(200).json(files);
        });
    },

    loadAudio(request, response) {
            gridfs.findOne({
                filename: request.profile.filename
            }, (error, file) => {
                if (error) {
                    return response.status(400).send({
                        error
                    });
                };
                if (!file) {
                    return response.status(404).send({
                        errorMessage: 'Audio not found !'
                    })
                };
        
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
                    });
        
                    gridfs.createReadStream({
                        _id: file._id,
                        range: {
                            startPos: start,
                            endPos: end
                        }
                    }).pipe(response);
                } else {
                    response.header('Content-Length', file.length)
                    response.header('Content-Type', file.contentType)
        
                    gridfs.createReadStream({
                        _id: file._id
                    }).pipe(response);
                };
            });
    }
}

export default musicController;
