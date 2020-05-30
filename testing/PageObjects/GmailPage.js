class GmailPage {
    get signInButton() {
        return $('.header--desktop .header__nav--ltr [ga-event-action="sign in"]');
    }

    get emailListItem() {
        return $('[role="row"]');
    }

    get recoverLink() {
        return $('[data-message-id] a[rel="noreferrer"]');
    }

    get deleteButton() {
        return $('[act="10"][jslog]');
    }

    open() {
        browser.url('https://mail.google.com/');
    }
}

export default new GmailPage();
