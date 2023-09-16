/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import SignupPage from '../PageObjects/SignupPage';
import LoginPage from '../PageObjects/LoginPage';
import NewPostForm from '../PageObjects/NewPostForm';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import Post from '../PageObjects/Post';
import config from '../../config';
import clearInput from '../helpers/clearInput';

describe('Check signup, signin and delete account functionality at standart flow', () => {
  before(() => {
    browser.maximizeWindow();
    BasePage.open();
  });

  after(() => {
    browser.reloadSession();
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
    browser.execute(() => window.scrollBy(0, -200));
    clearInput(SignupPage.nameInput);
    SignupPage.nameInput.setValue('123456789012345678901');
    SignupPage.createButton.click();
    expect(SignupPage.nameError).toHaveText('Name is too long !');
    expect(SignupPage.emailError).toHaveText('Email is required !');
    expect(SignupPage.passwordError).toHaveText('Password is required !');
    browser.execute(() => window.scrollBy(0, -200));
    clearInput(SignupPage.nameInput);
    SignupPage.nameInput.setValue('test');
    SignupPage.createButton.click();
    SignupPage.nameError.waitForExist({ reverse: true });
    expect(SignupPage.emailError).toHaveText('Email is required !');
    expect(SignupPage.passwordError).toHaveText('Password is required !');
    browser.execute(() => window.scrollBy(0, -200));
    SignupPage.emailInput.setValue('test');
    SignupPage.createButton.click();
    SignupPage.nameError.waitForExist({ reverse: true });
    expect(SignupPage.emailError).toHaveText(
      'Please fill a valid email address !'
    );
    expect(SignupPage.passwordError).toHaveText('Password is required !');
    browser.execute(() => window.scrollBy(0, -200));
    clearInput(SignupPage.emailInput);
    SignupPage.emailInput.setValue(config.testNewUserEmail);
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
    expect(SignupPage.passwordError).toHaveText(
      'Password must be at least 6 characters !'
    );
    clearInput(SignupPage.nameInput);
    clearInput(SignupPage.emailInput);
    clearInput(SignupPage.passwordInput);
    clearInput(SignupPage.confirmPasswordInput);
  });

  it('should successfully signup with valid data', () => {
    SignupPage.nameInput.setValue('test');
    SignupPage.emailInput.setValue(config.testNewUserEmail);
    SignupPage.passwordInput.setValue(config.testNewUserPassword);
    SignupPage.confirmPasswordInput.setValue(config.testNewUserPassword);
    SignupPage.createButton.click();
    SignupPage.nameError.waitForExist({ reverse: true });
    SignupPage.emailError.waitForExist({ reverse: true });
    SignupPage.passwordError.waitForExist({ reverse: true });
    expect(SuccessWindow.content).toBeDisplayed();
    expect(SuccessWindow.okButton).toBeDisplayed();
    expect(SuccessWindow.okButton).toBeClickable();
    SuccessWindow.okButton.click();
  });

  it('should display error when login with invalid data', () => {
    TopBar.profileMenu.click();
    expect(TopBar.loginListItem).toBeDisplayed();
    TopBar.loginListItem.click();
    LoginPage.loginButton.click();
    expect(LoginPage.emailError).toHaveText('User not found !');
    LoginPage.passwordError.waitForExist({ reverse: true });
    LoginPage.emailInput.setValue(config.testNewUserEmail);
    LoginPage.loginButton.click();
    LoginPage.emailError.waitForExist({ reverse: true });
    expect(LoginPage.passwordError).toHaveText('Wrong password !');
    clearInput(LoginPage.emailInput);
    clearInput(LoginPage.passwordInput);
  });

  it('should successfully login with correct data', () => {
    LoginPage.emailInput.setValue(config.testNewUserEmail);
    LoginPage.passwordInput.setValue(config.testNewUserPassword);
    LoginPage.loginButton.click();
    TopBar.newsfeedTab.click();
    expect(NewPostForm.pageTitle).toHaveText('Create your post');
  });

  it('shoud successfully edit profile', () => {
    TopBar.profileMenu.click();
    TopBar.profileListItem.click();
    expect(ProfilePage.pageTitle).toHaveText('Profile');
    expect(ProfilePage.userName).toBeDisplayed();
    expect(ProfilePage.userName).toHaveText('test');
    expect(ProfilePage.saveProfileButton).toBeClickable();
    ProfilePage.editNameButton.click();
    expect(ProfilePage.userNameInput).toBeDisplayed();
    expect(ProfilePage.userNameInput).toHaveAttributeContaining(
      'value',
      'test'
    );
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
    expect(ProfilePage.userNameInput).toHaveAttributeContaining(
      'value',
      'tasty'
    );
    ProfilePage.saveNameButton.click();
    ProfilePage.saveProfileButton.click();
    expect(SuccessWindow.content).toBeDisplayed();
    SuccessWindow.okButton.click();
    expect(ProfilePage.saveProfileButton).toBeClickable();
    ProfilePage.saveProfileButton.click();
    expect(ProfilePage.warning).toBeDisplayed();
    expect(ProfilePage.warning).toHaveText('No changes found !');
  });

  it('should successfully delete test account', () => {
    expect(ProfilePage.deleteProfileButton).toBeClickable();
    ProfilePage.deleteProfileButton.click();
    expect(ConfirmWindow.content).toBeDisplayed();
    ConfirmWindow.confirmButton.click();
    expect(SuccessWindow.content).toBeDisplayed();
    SuccessWindow.okButton.click();
    TopBar.newsfeedTab.click();
    expect(Post.postTitle).toBeDisplayed();
  });
});
