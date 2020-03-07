import express from 'express';
import postController from '../controllers/post.controller';

const postApi = express.Router();

postApi.route('/one').get(postController.showHi);

export default postApi;