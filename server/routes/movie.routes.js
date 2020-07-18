import express from 'express';
import movieController from '../controllers/movie.controller';
import userController from '../controllers/user.controller';

const movieApi = express.Router();

movieApi.route('/myapi/movies')
	.get(movieController.listMovies)
	.post(movieController.create);

movieApi.route('/myapi/movies/search')
	.get(movieController.searchMovies);

movieApi.route('/myapi/movies/:movieId')
	.get(movieController.findMovie)
	.delete(movieController.deleteMovie);

movieApi.route('/myapi/movies/video/:movieId')
	.get(movieController.loadVideo)
	.delete(movieController.deleteVideo);

movieApi.route('/myapi/profile/:userId/movies')
	.get(movieController.listUserMovies);

movieApi.param('userId', userController.getUserByID);
movieApi.param('movieId', movieController.getMovieByID);

export default movieApi;
