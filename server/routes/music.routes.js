import express from 'express';
import musicController from '../controllers/music.controller';
import userController from '../controllers/user.controller';

const musicApi = express.Router();

musicApi.route('/myapi/music')
    .get(musicController.listMusic)
    .post(musicController.create);

musicApi.route('/myapi/music/audios')
    .get(musicController.listAudios);

musicApi.route('/myapi/music/audios/:audioName')
    .get(musicController.loadAudio);

musicApi.route('/myapi/profile/:userId/music')
    .get(musicController.listUserMusic);

musicApi.param('userId', userController.getUserByID);
musicApi.param('audioName', musicController.getAudioByName);

export default musicApi;
