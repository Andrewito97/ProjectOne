/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import SignupPage from '../PageObjects/SignupPage';
import LoginPage from '../PageObjects/LoginPage';
import SuccessWindow from '../PageObjects/SuccessWindow';
import NewPostForm from '../PageObjects/NewPostForm';
import GoogleLoginPage from '../PageObjects/GoogleLoginPage';
import FacebookLoginPage from '../PageObjects/FacebookLoginPage';
import config from '../../config';
import clearInput from '../helpers/clearInput';

describe('Check signup functionality', () => {
	beforeEach(() => {
		browser.setWindowSize(1920, 1080);
		BasePage.open();
	});
	afterEach(() => {
		browser.reloadSession();
	});
	it('should display elements on signup page', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.signUpListItem.click();
		expect(SignupPage.pageTitle).toHaveText('Sign Up');
		expect(SignupPage.nameInput).toBeDisplayed();
		expect(SignupPage.emailInput).toBeDisplayed();
		expect(SignupPage.passwordInput).toBeDisplayed();
		expect(SignupPage.loginLink).toBeDisplayed();
		expect(SignupPage.createButton).toBeDisplayed();
		expect(SignupPage.createButton).toBeClickable();      
	});
	it('should successfully signup with standart flow valid data', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.signUpListItem.click();
		SignupPage.nameInput.setValue('test');
		SignupPage.emailInput.setValue(config.testEmail);
		SignupPage.passwordInput.setValue(config.testPassword);
		SignupPage.confirmPasswordInput.setValue(config.testPassword);
		SignupPage.createButton.click();
		SignupPage.nameError.waitForExist({ reverse: true });
		SignupPage.emailError.waitForExist({ reverse: true });
		SignupPage.passwordError.waitForExist({ reverse: true });
		expect(SuccessWindow.content).toBeDisplayed();
		expect(SuccessWindow.okButton).toBeDisplayed();
		expect(SuccessWindow.okButton).toBeClickable();
	});
	it('should successfully signup with google', () => {
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
	});
	it('should successfully signup with facebook', () => {
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
	});
	it('should display error when signup with invalid data', () => {
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.signUpListItem.click();
        
		SignupPage.createButton.click();
		expect(SignupPage.nameError).toHaveText('Name is required !');
		expect(SignupPage.emailError).toHaveText('Email is required !');
		expect(SignupPage.passwordError).toHaveText('Password is required !');

		SignupPage.nameInput.setValue('qa');
		SignupPage.createButton.click();
		expect(SignupPage.nameError).toHaveText('Name is too short !');
		expect(SignupPage.emailError).toHaveText('Email is required !');
		expect(SignupPage.passwordError).toHaveText('Password is required !');

		clearInput(SignupPage.nameInput);
		SignupPage.nameInput.setValue('123456789012345678901');
		SignupPage.createButton.click();
		expect(SignupPage.nameError).toHaveText('Name is too long !');
		expect(SignupPage.emailError).toHaveText('Email is required !');
		expect(SignupPage.passwordError).toHaveText('Password is required !');

		clearInput(SignupPage.nameInput);
		SignupPage.nameInput.setValue('test');
		SignupPage.createButton.click();
		SignupPage.nameError.waitForExist({ reverse: true });
		expect(SignupPage.emailError).toHaveText('Email is required !');
		expect(SignupPage.passwordError).toHaveText('Password is required !');

		SignupPage.emailInput.setValue('test');
		SignupPage.createButton.click();
		SignupPage.nameError.waitForExist({ reverse: true });
		expect(SignupPage.emailError).toHaveText('Please fill a valid email address !');
		expect(SignupPage.passwordError).toHaveText('Password is required !');

		clearInput(SignupPage.emailInput);
		SignupPage.emailInput.setValue(config.testEmail);
		SignupPage.createButton.click();
		SignupPage.nameError.waitForExist({ reverse: true });
		SignupPage.emailError.waitForExist({ reverse: true });
		expect(SignupPage.passwordError).toHaveText('Password is required !');
   
		SignupPage.passwordInput.setValue('test');
		SignupPage.createButton.click();
		SignupPage.nameError.waitForExist({ reverse: true });
		SignupPage.emailError.waitForExist({ reverse: true });
		expect(SignupPage.passwordError).toHaveText('Passwords don\'t match !');

		SignupPage.confirmPasswordInput.setValue('test');
		SignupPage.createButton.click();
		SignupPage.nameError.waitForExist({ reverse: true });
		SignupPage.emailError.waitForExist({ reverse: true });
		expect(SignupPage.passwordError).toHaveText('Password must be at least 6 characters !');    

		SignupPage.passwordInput.setValue('123');
		SignupPage.confirmPasswordInput.setValue('123');
		SignupPage.createButton.click();
		SignupPage.nameError.waitForExist({ reverse: true });
		expect(SignupPage.passwordError).toHaveText('Password must be at least 6 characters !');    
		expect(SignupPage.emailError).toHaveText('Email is already existss !');
	});
});
