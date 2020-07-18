/* eslint-disable no-undef */
class NewMovieForm {
	get pageTitle() {
		return $('#page-title');
	}

	get titleInput() {
		return $('#title-input');
	}

	get titleError() {
		return $('#title-error');
	}

	get genreInput() {
		return $('#genre-input');
	}

	get genreError() {
		return $('#genre-error');
	}

	get descriptionInput() {
		return $('#description-input');
	}

	get descriptionError() {
		return $('#description-error');
	}

	get hiddenVideoInput() {
		return $('#hidden-video-input');
	}

	get movieCreationButton() {
		return $('#movie-creation-button');
	}

	get videoName() {
		return $('#video-name');
	}

	get deleteVideoButton() {
		return $('#delete-video-button');
	}

	get addVideoButton() {
		return $('#add-video-button');
	}
}

export default new NewMovieForm();
