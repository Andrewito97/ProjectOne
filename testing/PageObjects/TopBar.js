class TopBar {
    get profileMenu() {
        return $('#profile-menu');
    };

    get signUpListItem() {
        return $('#sign-up');
    };

    get loginListItem() {
        return $('#login');
    };

    get profileListItem() {
        return $('#profile');
    };
}

export default new TopBar();
