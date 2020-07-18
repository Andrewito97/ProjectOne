/* eslint-disable no-undef */
class ProfilePage {
	get pageTitle() {
		return $('#page-title');
	}

	get userNameInput() {
		return $('#user-name-input');
	}

	get userName() {
		return $('#user-name');
	}

	get saveNameButton() {
		return $('#save-name-button');
	}

	get editNameButton() {
		return $('#edit-name-button');
	}

	get nameError() {
		return $('#name-error');
	}

	get userEmailInput() {
		return $('#user-email-input');
	}

	get userEmail() {
		return $('#user-email');
	}

	get saveEmailButton() {
		return $('#save-email-button');
	}

	get editEmailButton() {
		return $('#edit-email-button');
	}

	get emailError() {
		return $('#email-error');
	}

	get saveProfileButton() {
		return $('#save-profile-button');
	}

	get warning() {
		return $('#warning');
	}

	get deleteProfileButton() {
		return $('#delete-profile-button');
	}

	get profileNewsfeedTab() {
		return $('#profile-newsfeed-tab');
	}
    
	get profileMusicTab() {
		return $('#profile-music-tab');
	}

	get profileMoviesTab() {
		return $('#profile-movies-tab');
	}
}

export default new ProfilePage();
