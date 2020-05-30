class GoogleLoginPage {
    get emailInput() {
        return $('#identifierId');
    }

    get emailNextButton() {
        return $('#identifierNext');
    }

    get passwordInput() {
        return $('[type="password"]');
    }

    get passwordNextButton() {
        return  $('#passwordNext');
    }
}

export default new GoogleLoginPage();
