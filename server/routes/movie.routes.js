import express from 'express';
import movieController from '../controllers/movie.controller';

const movieApi = express.Router();

movieApi.route('/myapi/movies')
    .get(movieController.listMovies)
    .post(movieController.create);

movieApi.route('/myapi/movies/:movieId').get(movieController.loadMovie);

movieApi.param('movieId', movieController.getMovieByID);

export default movieApi;
