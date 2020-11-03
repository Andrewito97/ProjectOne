/* eslint-disable no-undef */
class NewBookForm {
	get pageTitle() {
		return $('#page-title');
	}

	get titleInput() {
		return $('#title-input');
	}

	get titleError() {
		return $('#title-error');
	}

	get authorInput() {
		return $('#author-input');
	}

	get authorError() {
		return $('#author-error');
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

	get hiddenImageInput() {
		return $('#hidden-image-input');
	}

	get imageName() {
		return $('#image-name');
	}

	get deleteImageButton() {
		return $('#delete-image-button');
	}

	get addBookButton() {
		return $('#add-book-button');
	}
}

export default new NewBookForm();
