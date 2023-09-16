import express from 'express';
import postController from '../controllers/post.controller';
import userController from '../controllers/user.controller';

const postApi = express.Router();

postApi.route('/myapi/newsfeed')
  .get(postController.listNewsFeed)
  .post(postController.create);

postApi.route('/myapi/newsfeed/:postTag')
  .get(postController.listNewsFeedByTag);

postApi.route('/myapi/posts/search')
  .get(postController.searchPosts);

postApi.route('/myapi/post/image/:postId')
  .get(postController.loadImage);

postApi.route('/myapi/profile/:userId/newsfeed')
  .get(postController.listUserNewsFeed);

postApi.route('/myapi/posts/:postId')
  .get(postController.findPost)
  .delete(postController.deletePost);

postApi.param('userId', userController.getUserByID);
postApi.param('postId', postController.getPostByID);
postApi.param('postTag', postController.getTag);

export default postApi;
