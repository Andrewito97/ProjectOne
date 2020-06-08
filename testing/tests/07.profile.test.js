import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewPostForm from '../PageObjects/NewPostForm';
import Post from '../PageObjects/Post';
import config from '../../config';
import uploadFile from '../helpers/uploadFile';
import clearInput from '../helpers/clearInput';

describe('Check post functionality', () => {
    beforeEach(() => {
        browser.setWindowSize(1920, 1080);
        BasePage.open();

        // ** login in previosly created account ** //
        TopBar.profileMenu.click();
        expect(TopBar.loginListItem).toBeDisplayed();
        TopBar.loginListItem.click();
        LoginPage.emailInput.setValue(config.testEmail);
        LoginPage.passwordInput.setValue(config.testPasswordChanged);
        LoginPage.loginButton.click();
        expect(NewPostForm.pageTitle).toHaveText('Create your post');
    });
    it('should display elements on new post form', () => {
        expect(NewPostForm.titleInput).toBeDisplayed();
        expect(NewPostForm.textInput).toBeDisplayed();
        expect(NewPostForm.cameraButton).toBeDisplayed();
        expect(NewPostForm.cameraButton).toBeClickable();
        expect(NewPostForm.addPostButton).toBeDisplayed();
        expect(NewPostForm.addPostButton).toBeClickable();
        uploadFile(NewPostForm.hiddenImageInput, '../assets/images/art.jpg');
        expect(NewPostForm.deleteImageButton).toBeDisplayed();
        expect(NewPostForm.addPostButton).toBeClickable();
        browser.reloadSession();
    });
    it('shoud successfully add new post', () => {
        NewPostForm.titleInput.setValue('Post title');
        NewPostForm.textInput.setValue('Post text content');
        NewPostForm.addPostButton.click();
        expect(Post.postTitle).toHaveText('Post title');
        expect(Post.postText).toHaveText('Post text content');
        NewPostForm.titleInput.setValue('Another post title');
        NewPostForm.textInput.setValue('Another post text content');
        uploadFile(NewPostForm.hiddenImageInput, '../assets/images/art.jpg');
        NewPostForm.addPostButton.click();
        expect(Post.postTitle).toHaveText('Another post title');
        expect(Post.postText).toHaveText('Another post text content');
        expect(Post.postImage).toBeDisplayed();
        browser.reloadSession();
    });
    it('should display error when post with invalid data', () => {
        NewPostForm.addPostButton.click();
        expect(NewPostForm.titleError).toHaveText('Title is required !');
        expect(NewPostForm.textError).toHaveText('Text is required !');
        NewPostForm.titleInput.setValue('Post title');
        NewPostForm.addPostButton.click();
        NewPostForm.titleError.waitForExist({ reverse: true });
        expect(NewPostForm.textError).toHaveText('Text is required !');
        clearInput(NewPostForm.titleInput)
        NewPostForm.textInput.setValue('Post text');
        NewPostForm.addPostButton.click();
        expect(NewPostForm.titleError).toHaveText('Title is required !');
        NewPostForm.textError.waitForExist({ reverse: true });
        browser.reloadSession();
    });
})
