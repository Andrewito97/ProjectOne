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

            if(Array.isArray(files.audios)) { //if receive multiple audios     
                for(let i = 0; i < files.audios.length; i++) {
                    let writestream = gridFSBucket
                        .openUploadStream(
                            names[i].audioname, {
                            aliases: 'music'
                        });
                    fs.createReadStream(files.audios[i].path).pipe(writestream);
                    music.audios.push(names[i].audioname);
                };
            } else { // if receive single audio
                let writestream = gridFSBucket
                    .openUploadStream(
                        names[0].audioname, {
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
        gridFSBucket
            .find({ filename: audioName })
            .toArray( (error, audios) => {
                if(error) {
                    return response.status(400).json({
                        errorMessage: 'Audio not found !'
                    });
                };
                if(audios[0] === undefined) {
                    return response.status(400).json({
                        errorMessage: 'Audio didn\'t loaded yet !'
                    });
                };
                request.profile = audios[0];
                nextHendlear();
        });
    },

    listMusic(request, response) {
        Music
            .find()
            .sort('-created')
            .exec( (error, music) => {
                if(error) {
                    return response.status(400).json({
                        error
                    });
                };
                response.status(200).json(music);
        });
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
                response.json(music)
        });
    },

    listAudios(request, response) {
        gridFSBucket
            .find({ aliases: 'music' })
            .toArray( (error, files) => {
                if(error) {
                    return response.status(400).json({
                        error
                    });
                };
                response.status(200).json(files);
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
                let file = files[0]
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
                };
                if (!file) {
                    return response.status(404).send({
                        errorMessage: 'Audio not found !'
                    })
                };
                
                if (request.headers['range']) { 
                    //load audio from the specific range
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
                    });
                    
                    gridFSBucket
                        .openDownloadStream(
                            file._id, {
                                start: startPosition,
                                end: endPosition
                            }
                        )
                        .pipe(response);

                } else { 
                    //load full audio by default
                    response.header('Content-Length', file.length)
                    response.header('Content-Type', 'binary/octet-stream')
        
                    gridFSBucket
                        .openDownloadStream( file._id )
                        .pipe(response);
                };
        });
    }
}

export default musicController;
