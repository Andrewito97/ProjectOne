/* eslint-disable no-undef */

class BasePage {
	constructor() {
		this.title = 'Project One';
	}

	open() {
		browser.url(browser.config.baseUrl);
		browser.setCookies(
			{ 
				name: 'cookie_consent_user_accepted',
				value: 'true'
			});
		browser.refresh();
	}
}

export default new BasePage();
