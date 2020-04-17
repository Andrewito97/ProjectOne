import express from 'express';
import postController from '../controllers/post.controller';

const postApi = express.Router();

postApi.route('/myapi/newsfeed')
    .get(postController.listNewsFeed)
    .post(postController.create);

postApi.route('/myapi/post/image/:postId')
    .get(postController.loadImage);

postApi.param('postId', postController.getPostByID);

export default postApi;