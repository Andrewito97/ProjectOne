/* eslint-disable no-undef */
class NewMusicForm {
	get pageTitle() {
		return $('#page-title');
	}

	get authorInput() {
		return $('#author-input');
	}

	get authorError() {
		return $('#author-error');
	}

	get genreSelect() {
		return $('#genre-select');
	}

	get otherOption() {
		return $('[data-value="Other"]');
	}

	get genreInput() {
		return $('#genre-input');
	}

	get genreError() {
		return $('#genre-error');
	}

	get musicNoteButton() {
		return $('#music-note-button');
	}

	get hiddenAudioInput() {
		return $('#hidden-audio-input');
	}

	get audioNameEditInput() {
		return $$('#audio-name-edit-input');
	}

	get newAudioName() {
		return $$('#new-audio-name');
	}

	get audioNameSaveButton() {
		return $$('#audio-name-save-button');
	}

	get audioNameEditButton() {
		return $$('#audio-name-edit-button');
	}

	get audioNameDeleteButton() {
		return $$('#audio-name-delete-button');
	}

	get addSongButton() {
		return $('#add-song-button');
	}
}

export default new NewMusicForm();
