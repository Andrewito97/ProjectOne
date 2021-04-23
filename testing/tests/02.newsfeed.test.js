/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewPostForm from '../PageObjects/NewPostForm';
import Post from '../PageObjects/Post';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import config from '../../config';
import uploadFile from '../helpers/uploadFile';
import clearInput from '../helpers/clearInput';

describe('Check newsfeed functionality', () => {

	before('login into existing account', () => {
		browser.maximizeWindow();
		BasePage.open();
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();     
		LoginPage.emailInput.setValue(config.testExistingUserEmail);
		LoginPage.passwordInput.setValue(config.testExistingUserPassword);
		LoginPage.loginButton.click();
		TopBar.newsfeedTab.click();
		expect(NewPostForm.pageTitle).toHaveText('Create your post');
	});

	after(() => {
		browser.reloadSession();
	});

	it('should display error when adding post with invalid data', () => {
		NewPostForm.addPostButton.click();
		expect(NewPostForm.titleError).toHaveText('Title is required !');
		expect(NewPostForm.textError).toHaveText('Text is required !');
		NewPostForm.titleInput.setValue('Post title');
		NewPostForm.addPostButton.click();
		NewPostForm.titleError.waitForExist({ reverse: true });
		expect(NewPostForm.textError).toHaveText('Text is required !');
		browser.execute(() => window.scrollBy(0, -200) );
		clearInput(NewPostForm.titleInput);
		NewPostForm.textInput.setValue('Post text');
		NewPostForm.addPostButton.click();
		expect(NewPostForm.titleError).toHaveText('Title is required !');
		NewPostForm.textError.waitForExist({ reverse: true });
		browser.execute(() => window.scrollBy(0, -200) );
		clearInput(NewPostForm.titleInput);
		clearInput(NewPostForm.textInput);
	});

	it('shoud successfully add new post', () => {
		NewPostForm.titleInput.setValue('Post title');
		NewPostForm.tagInput.setValue('lorem ipsum');
		NewPostForm.addTagButton.click();
		NewPostForm.firstTag.waitForDisplayed();
		expect(NewPostForm.firstTag).toBeDisplayed();
		expect(NewPostForm.firstTag).toHaveText('lorem ipsum');
		NewPostForm.deleteFirstTagButton.click();
		NewPostForm.firstTag.waitForExist({ reverse: true });
		NewPostForm.tagInput.setValue('my test tag');
		NewPostForm.addTagButton.click();
		NewPostForm.firstTag.waitForDisplayed();
		expect(NewPostForm.firstTag).toHaveText('my test tag');
		NewPostForm.textInput.setValue('Post text');
		uploadFile(NewPostForm.hiddenImageInput, '../assets/images/art.jpg');
		NewPostForm.addPostButton.click();
		expect(Post.postTitle).toHaveText('Post title');
		expect(Post.postText).toHaveText('Post text');
		expect(Post.firstPostTag).toBeDisplayed();
		expect(Post.firstPostTag).toHaveText('my test tag');
		expect(Post.postImage).toBeDisplayed();
		expect(Post.postDate).toBeDisplayed();
	});

	it('should successfully search and find post', () => {
		TopBar.searchbar.setValue('Post title');
		TopBar.firstSearchResult.waitForDisplayed();
		expect(TopBar.firstSearchResult).toBeDisplayed();
		TopBar.firstSearchResult.click();
		expect(browser).toHaveUrlContaining('newsfeed');
		expect(Post.postTitle).toHaveText('Post title');
		Post.firstPostTag.click();
		expect(browser).toHaveUrlContaining('tags');
		expect(Post.postTitle).toHaveText('Post title');
	});	

	it('should successfully delete post', () => {
		TopBar.profileMenu.click();
		TopBar.profileListItem.click();
		expect(Post.postTitle).toHaveText('Post title');
		expect(Post.deletePostButton).toBeDisplayed();
		Post.deletePostButton.click();
		expect(ConfirmWindow.content).toBeDisplayed();
		expect(ConfirmWindow.confirmButton).toBeDisplayed();
		ConfirmWindow.confirmButton.click();
		expect(SuccessWindow.content).toBeDisplayed();
		expect(SuccessWindow.okButton).toBeDisplayed();
		SuccessWindow.okButton.click();
		ProfilePage.profileNewsfeedTab.click();
		Post.postTitle.waitForExist({ reverse: true });
	});
});
