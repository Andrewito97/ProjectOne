import express from 'express';
import movieController from '../controllers/movie.controller';

const movieApi = express.Router();

movieApi.route('/myapi/movies').post(movieController.create);

movieApi.route('/myapi/movies').get(movieController.listMovies);

movieApi.route('/myapi/movies/:movieId').get(movieController.loadMovie);

movieApi.param('movieId', movieController.getMovieByID);

export default movieApi;
