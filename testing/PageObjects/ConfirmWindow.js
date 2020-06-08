class ConfirmWindow {
    get content() {
        return $('#confirm-window');
    }

    get calcelButton() {
        return $('#cancel-button');
    }

    get confirmButton() {
        return $('#confirm-button');
    }
}

export default new ConfirmWindow();
