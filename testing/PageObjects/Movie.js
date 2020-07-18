/* eslint-disable no-undef */
class Movie {
	get movieTitle() {
		return $('#movie-title div span:nth-child(1)');
	}

	get movieGenre() {
		return $('#movie-title div span:nth-child(2)');
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
