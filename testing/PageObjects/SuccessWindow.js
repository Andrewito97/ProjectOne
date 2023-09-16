/* eslint-disable no-undef */
class SuccessWindow {
  get content() {
    return $('#success-window');
  }

  get okButton() {
    return $('#ok-button');
  }
}

export default new SuccessWindow();
