import express from 'express';
import songController from '../controllers/song.controller';

const songApi = express.Router();

songApi.route('/myapi/music')
    .get(songController.listSongs)
    .post(songController.create);

songApi.route('/myapi/music/audios')
    .get(songController.listAudios);

songApi.route('/myapi/music/audios/:audioName').get(songController.loadAudio);

songApi.param('audioName', songController.getAudioByName);

export default songApi;
