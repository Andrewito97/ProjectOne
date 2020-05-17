class TopBar {
    get profileMenu() {
        return $('#profile-menu');
    };

    get signUpListItem() {
        return $('#sign-up');
    };

    get loginListItem() {
        return $('#login a');
    };

    get profileListItem() {
        return $('#profile');
    };
}

export default new TopBar();