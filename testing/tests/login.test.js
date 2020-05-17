import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';

describe('Check login functionality', () => {
    beforeEach(() => {
        browser.setWindowSize(1920, 1080);
        BasePage.open();
    })
    it('should display elements on login page', () => {
        TopBar.profileMenu.click();
        expect(TopBar.loginListItem).toBeVisible();
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
        
    })
    it('should display error when login with invalid data', () => {
        TopBar.profileMenu.click();
        expect(TopBar.loginListItem).toBeVisible();
        TopBar.loginListItem.click();
        
        LoginPage.loginButton.click();
        expect(LoginPage.emailError).toHaveText('User not found !');
        LoginPage.passwordError.waitForExist({ reverse: true });

        LoginPage.emailInput.setValue('gandriy123wf@gmail.com');
        LoginPage.loginButton.click();
        LoginPage.emailError.waitForExist({ reverse: true });
        expect(LoginPage.passwordError).toHaveText('Wrong password !');
    })
})