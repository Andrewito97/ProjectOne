/* eslint-disable no-undef */
class TopBar {
	get newsfeedTab() {
		return $('#newsfeed-tab');
	}

	get musicTab() {
		return $('#music-tab');
	}

	get moviesTab() {
		return $('#movies-tab');
	}

	get profileMenu() {
		return $('#profile-menu');
	}

	get signUpListItem() {
		return $('#sign-up');
	}

	get loginListItem() {
		return $('#login');
	}

	get profileListItem() {
		return $('#profile');
	}
}

export default new TopBar();
