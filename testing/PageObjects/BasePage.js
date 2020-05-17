class BasePage {
    constructor() {
        this.title = 'Project One'
    };

    open() {
        browser.url(browser.config.baseUrl)
    };
}

export default new BasePage();