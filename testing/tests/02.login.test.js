/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewPostForm from '../PageObjects/NewPostForm';
import config from '../../config';

describe('Check login functionality', () => {
	beforeEach(() => {
		browser.setWindowSize(1920, 1080);
		BasePage.open();
	});
	it('should display elements on login page', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		expect(LoginPage.pageTitle).toHaveText('Sign In');
		expect(LoginPage.emailInput).toBeDisplayed();
		expect(LoginPage.passwordInput).toBeDisplayed();
		expect(LoginPage.signUpLink).toBeDisplayed();
		expect(LoginPage.recoveryPasswordLink).toBeDisplayed();
		expect(LoginPage.loginButton).toBeDisplayed();
		expect(LoginPage.loginButton).toBeClickable();
		expect(LoginPage.googleButton).toBeDisplayed();
		expect(LoginPage.googleButton).toBeClickable();
		expect(LoginPage.facebookButton).toBeDisplayed();
		expect(LoginPage.facebookButton).toBeClickable();      
	});
	it('should successfully login with correct data', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		LoginPage.emailInput.setValue(config.testEmail);
		LoginPage.passwordInput.setValue(config.testPassword);
		LoginPage.loginButton.click();
		expect(NewPostForm.pageTitle).toHaveText('Create your post');
		browser.reloadSession();
	});
	it('should display error when login with invalid data', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();     
		LoginPage.loginButton.click();
		expect(LoginPage.emailError).toHaveText('User not found !');
		LoginPage.passwordError.waitForExist({ reverse: true });
		LoginPage.emailInput.setValue(config.testEmail);
		LoginPage.loginButton.click();
		LoginPage.emailError.waitForExist({ reverse: true });
		expect(LoginPage.passwordError).toHaveText('Wrong password !');
	});
});
