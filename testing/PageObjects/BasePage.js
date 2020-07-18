class BasePage {
	constructor() {
		this.title = 'Project One';
	}

	open() {
		// eslint-disable-next-line no-undef
		browser.url(browser.config.baseUrl);
	}
}

export default new BasePage();
