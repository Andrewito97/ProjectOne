import express from 'express';
import songController from '../controllers/song.controller';

const songApi = express.Router();

songApi.route('/myapi/music')
    .get(songController.listSongs)
    .post(songController.create);

songApi.route('/myapi/music/:musicId').get(songController.loadSong);

songApi.param('musicId', songController.getSongByID);

export default songApi;
