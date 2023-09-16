/* eslint-disable no-undef */
class Movie {
  get movieTitle() {
    return $('#movie-title');
  }

  get movieGenre() {
    return $('#movie-genre');
  }

  get movieDescription() {
    return $('#movie-description');
  }

  get movieVideo() {
    return $('#movie-video');
  }

  get movieDate() {
    return $('#movie-date');
  }

  get deleteMovieButton() {
    return $('#delete-movie-button');
  }
}

export default new Movie();
