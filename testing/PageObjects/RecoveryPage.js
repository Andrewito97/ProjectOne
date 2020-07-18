/* eslint-disable no-undef */
class RecoveryPage {
	get pageTitle() {
		return $('#page-title');
	}

	get emailInput() {
		return $('#email-input');
	}

	get sendLinkButton() {
		return $('#send-link-button');
	}

	get emailError() {
		return $('#email-error');
	}
}

export default new RecoveryPage();
