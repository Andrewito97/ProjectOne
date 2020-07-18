/* eslint-disable no-undef */
class ResetPage {
	get pageTitle() {
		return $('#page-title');
	}

	get passwordInput() {
		return $('#password');
	}

	get confirmPasswordInput() {
		return $('#confirm-password');
	}

	get passwordError() {
		return $('#password-error');
	}

	get changePasswordButton() {
		return $('#change-password-button');
	}
}

export default new ResetPage();
