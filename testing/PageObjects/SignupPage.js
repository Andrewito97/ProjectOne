/* eslint-disable no-undef */
class SignupPage {
	get pageTitle() {
		return $('#page-title');
	}

	get nameInput() {
		return $('#name');
	}

	get nameError() {
		return $('#name-error');
	}

	get emailInput() {
		return $('#email');
	}

	get emailError() {
		return $('#email-error');
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

	get loginLink() {
		return $('[href="/login"]');
	}

	get createButton() {
		return $('#create-button');
	}
}

export default new SignupPage();
