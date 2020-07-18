/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewPostForm from '../PageObjects/NewPostForm';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import config from '../../config';
import clearInput from '../helpers/clearInput';

describe('Check profile functionality', () => {
	beforeEach(() => {
		browser.setWindowSize(1920, 1080);
		BasePage.open();
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();
		LoginPage.emailInput.setValue(config.testEmail);
		LoginPage.passwordInput.setValue(config.testPasswordChanged);
		LoginPage.loginButton.click();
		expect(NewPostForm.pageTitle).toHaveText('Create your post');
		TopBar.profileMenu.click();
		TopBar.profileListItem.click();
		expect(ProfilePage.pageTitle).toHaveText('Profile');
	});
	afterEach(() => {
		browser.reloadSession();
	});
	it('should display elements in profile', () => {
		expect(ProfilePage.userName).toBeDisplayed();
		expect(ProfilePage.userEmail).toBeDisplayed();
		expect(ProfilePage.editNameButton).toBeDisplayed();
		expect(ProfilePage.editNameButton).toBeClickable();
		expect(ProfilePage.editEmailButton).toBeDisplayed();
		expect(ProfilePage.editEmailButton).toBeClickable();
		expect(ProfilePage.saveProfileButton).toBeDisplayed();
		expect(ProfilePage.saveProfileButton).toBeClickable();
		expect(ProfilePage.deleteProfileButton).toBeDisplayed();
		expect(ProfilePage.deleteProfileButton).toBeClickable();
	});
	it('shoud successfully edit profile', () => {
		expect(ProfilePage.userName).toBeDisplayed();
		expect(ProfilePage.saveProfileButton).toBeClickable();
		ProfilePage.editNameButton.click();
		expect(ProfilePage.userNameInput).toBeDisplayed();
		expect(ProfilePage.userNameInput).toHaveAttributeContaining('value', 'test');
		expect(ProfilePage.saveProfileButton).toBeDisabled();
		clearInput(ProfilePage.userNameInput);
		ProfilePage.userNameInput.setValue('tasty');
		expect(ProfilePage.saveNameButton).toBeDisplayed();
		expect(ProfilePage.saveNameButton).toBeClickable();
		ProfilePage.saveNameButton.click();
		expect(ProfilePage.userName).toBeDisplayed();
		expect(ProfilePage.saveProfileButton).toBeClickable();
		ProfilePage.editNameButton.click();
		expect(ProfilePage.userNameInput).toBeDisplayed();
		expect(ProfilePage.userNameInput).toHaveAttributeContaining('value', 'tasty');
		ProfilePage.saveNameButton.click();
		ProfilePage.saveProfileButton.click();
		expect(SuccessWindow.content).toBeDisplayed();
		SuccessWindow.okButton.click();
		expect(ProfilePage.saveProfileButton).toBeClickable();
		ProfilePage.saveProfileButton.click();
		expect(ProfilePage.warning).toBeDisplayed();
		expect(ProfilePage.warning).toHaveText('No changes found !');
	});
	it('should successfully delete profile', () => {
		expect(ProfilePage.deleteProfileButton).toBeDisplayed();
		ProfilePage.deleteProfileButton.click();
		expect(ConfirmWindow.content).toBeDisplayed();
		ConfirmWindow.calcelButton.click();
		expect(ProfilePage.deleteProfileButton).toBeDisplayed();
		ProfilePage.deleteProfileButton.click();
		ConfirmWindow.confirmButton.click();
		expect(SuccessWindow.content).toBeDisplayed();
		SuccessWindow.okButton.click();
		browser.refresh();
	});
});
