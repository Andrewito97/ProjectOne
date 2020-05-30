class FacebookLoginPage {
    get emailInput() {
        return $('#email');
    }

    get passwordInput() {
        return $('#pass');
    }

    get loginButton() {
        return $('#loginbutton');
    }
}

export default new FacebookLoginPage();
