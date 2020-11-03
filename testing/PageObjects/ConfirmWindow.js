/* eslint-disable no-undef */
class ConfirmWindow {
	get content() {
		return $('#confirm-window');
	}

	get cancelButton() {
		return $('#cancel-button');
	}

	get confirmButton() {
		return $('#confirm-button');
	}
}

export default new ConfirmWindow();
