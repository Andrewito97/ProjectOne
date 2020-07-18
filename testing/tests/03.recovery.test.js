/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import RecoveryPage from '../PageObjects/RecoveryPage';
import NewPostForm from '../PageObjects/NewPostForm';
import GmailPage from '../PageObjects/GmailPage';
import GoogleLoginPage from '../PageObjects/GoogleLoginPage';
import FacebookLoginPage from '../PageObjects/FacebookLoginPage';
import ResetPage from '../PageObjects/ResetPage';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import config from '../../config';
import clearInput from '../helpers/clearInput';

describe('Check password recovery functionality', () => {
	beforeEach(() => {
		browser.setWindowSize(1920, 1080);
		BasePage.open();
	});
	afterEach(() => {
		browser.reloadSession();
	});
	after('delete unnecessary accounts', () => {
		BasePage.open();
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		LoginPage.googleButton.waitForClickable();
		browser.pause(2000);
		LoginPage.googleButton.click();
		browser.switchToWindow(browser.getWindowHandles()[2]);
		GoogleLoginPage.emailInput.waitForDisplayed();
		GoogleLoginPage.emailInput.setValue(config.googleTestEmail);
		GoogleLoginPage.emailNextButton.waitForClickable();
		GoogleLoginPage.emailNextButton.click();
		GoogleLoginPage.passwordInput.waitForDisplayed();
		GoogleLoginPage.passwordInput.setValue(config.googleTestPassword);
		GoogleLoginPage.passwordNextButton.waitForClickable();
		GoogleLoginPage.passwordNextButton.click();
		browser.switchToWindow(browser.getWindowHandles()[0]);
		expect(NewPostForm.pageTitle).toHaveText('Create your post');
		TopBar.profileMenu.click();
		TopBar.profileListItem.click();
		expect(ProfilePage.pageTitle).toHaveText('Profile');
		expect(ProfilePage.deleteProfileButton).toBeClickable();
		ProfilePage.deleteProfileButton.click();
		expect(ConfirmWindow.content).toBeDisplayed();
		ConfirmWindow.confirmButton.click();
		expect(SuccessWindow.content).toBeDisplayed();
		SuccessWindow.okButton.click();
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		LoginPage.facebookButton.waitForClickable();
		browser.pause(2000);
		LoginPage.facebookButton.click();
		browser.switchToWindow(browser.getWindowHandles()[2]);
		FacebookLoginPage.emailInput.waitForDisplayed();
		FacebookLoginPage.emailInput.setValue(config.facebookTestEmail);
		FacebookLoginPage.passwordInput.setValue(config.facebookTestPassword);
		FacebookLoginPage.loginButton.waitForClickable();
		FacebookLoginPage.loginButton.click();
		browser.switchToWindow(browser.getWindowHandles()[0]);
		expect(NewPostForm.pageTitle).toHaveText('Create your post');
		TopBar.profileMenu.click();
		TopBar.profileListItem.click();
		expect(ProfilePage.pageTitle).toHaveText('Profile');
		expect(ProfilePage.deleteProfileButton).toBeClickable();
		ProfilePage.deleteProfileButton.click();
		expect(ConfirmWindow.content).toBeDisplayed();
		ConfirmWindow.confirmButton.click();
		expect(SuccessWindow.content).toBeDisplayed();
		SuccessWindow.okButton.click();
		browser.refresh();
	});
	it('should display elements on recovery page', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		LoginPage.recoveryPasswordLink.click();
		expect(RecoveryPage.pageTitle).toHaveText('Recovery');  
		expect(RecoveryPage.emailInput).toBeDisplayed();
		expect(RecoveryPage.sendLinkButton).toBeDisplayed();
		expect(RecoveryPage.sendLinkButton).toBeClickable();
	});
	it('shoud successfully send recovery link', () => {
		// ** send recovery link ** //
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		LoginPage.recoveryPasswordLink.click();
		RecoveryPage.emailInput.setValue(config.testEmail);
		RecoveryPage.sendLinkButton.click();
        
		// ** open gmail, login and click on the recieved link ** //
		GmailPage.open();
		GmailPage.signInButton.click();
		browser.switchToWindow(browser.getWindowHandles()[2]);
		GoogleLoginPage.emailInput.waitForDisplayed();
		GoogleLoginPage.emailInput.setValue(config.testEmail);
		GoogleLoginPage.emailNextButton.waitForClickable();
		GoogleLoginPage.emailNextButton.click();
		GoogleLoginPage.passwordInput.waitForDisplayed();
		GoogleLoginPage.passwordInput.setValue(config.testPassword);
		GoogleLoginPage.passwordNextButton.waitForClickable();
		GoogleLoginPage.passwordNextButton.click();
		browser.pause(5000);
		const boolean = GmailPage.emailListItem.isDisplayed();
		if(!boolean) {
			GmailPage.spamTab.click();
		}
		GmailPage.emailListItem.click();
		GmailPage.recoverLink.click();

		// ** change password (with checking validation) ** //
		browser.switchToWindow(browser.getWindowHandles()[3]);
		expect(ResetPage.pageTitle).toHaveText('Set new password');
		ResetPage.passwordInput.setValue('12345678');
		ResetPage.confirmPasswordInput.setValue('1234567');
		ResetPage.changePasswordButton.click();
		expect(ResetPage.passwordError).toHaveText('Passwords do not match !');
		clearInput(ResetPage.passwordInput);
		ResetPage.passwordInput.setValue('test');
		clearInput(ResetPage.confirmPasswordInput);
		ResetPage.confirmPasswordInput.setValue('test');
		ResetPage.changePasswordButton.click();
		expect(ResetPage.passwordError).toHaveText('Password must be at least 6 characters !');
		clearInput(ResetPage.passwordInput);
		ResetPage.passwordInput.setValue(config.testPasswordChanged);
		clearInput(ResetPage.confirmPasswordInput);
		ResetPage.confirmPasswordInput.setValue(config.testPasswordChanged);
		ResetPage.changePasswordButton.click();
		expect(SuccessWindow.content).toBeDisplayed();
		SuccessWindow.okButton.click();

		// ** login with changed password ** //
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeVisible();
		TopBar.loginListItem.click();
		LoginPage.emailInput.setValue(config.testEmail);
		LoginPage.passwordInput.setValue(config.testPasswordChanged);
		LoginPage.loginButton.click();
		expect(NewPostForm.pageTitle).toHaveText('Create your post');

		// ** delete mail with recovery link ** //
		browser.switchToWindow(browser.getWindowHandles()[2]);
		GmailPage.deleteButton.click();
		GmailPage.deleteButton.waitForExist({ reverse: true });
	});
	it('should display error when recovery invalid email', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		LoginPage.recoveryPasswordLink.click(); 
		RecoveryPage.emailInput.setValue('invalid@gmail.com');
		RecoveryPage.sendLinkButton.click();
		expect(RecoveryPage.emailError).toHaveText('This email is not registered !');
		clearInput(RecoveryPage.emailInput);
		RecoveryPage.emailInput.setValue(config.googleTestEmail);
		RecoveryPage.sendLinkButton.click();
		expect(RecoveryPage.emailError)
			.toHaveText('This email is registered with google so it does not require password to login !');
		clearInput(RecoveryPage.emailInput);
		RecoveryPage.emailInput.setValue(config.facebookTestEmail);
		RecoveryPage.sendLinkButton.click();
		expect(RecoveryPage.emailError)
			.toHaveText('This email is registered with facebook so it does not require password to login !');   
	});
});
