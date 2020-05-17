class LoginPage {
    get pageTitle() {
        return $('#page-title');
    }

    get emailInput() {
        return $('#email');
    }

    get emailError() {
        return $('#email-error')
    }

    get passwordInput() {
        return $('#password');
    }

    get passwordError() {
        return $('#password-error')
    }

    get signUpLink() {
        return $('[href="/signup"]');
    }

    get recoveryPasswordLink() {
        return $('[href="/recovery"]');
    }

    get loginButton() {
        return $('#login-button');
    }

    get googleButton() {
        return $('#google-button');
    }

    get facebookButton() {
        return $('#facebook-button');
    }
}

export default new LoginPage();