/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewBookForm from '../PageObjects/NewBookForm';
import Book from '../PageObjects/Book';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import config from '../../config';
import uploadFile from '../helpers/uploadFile';
import clearInput from '../helpers/clearInput';

describe('Check book functionality', () => {

	before('login into existing account', () => {
		browser.maximizeWindow();
		BasePage.open();
		TopBar.profileMenu.click();
		expect(TopBar.loginListItem).toBeDisplayed();
		TopBar.loginListItem.click();     
		LoginPage.emailInput.setValue(config.testExistingUserEmail);
		LoginPage.passwordInput.setValue(config.testExistingUserPassword);
		LoginPage.loginButton.click();
		expect(NewBookForm.pageTitle).toHaveText('Create your post');
		TopBar.booksTab.click();
		expect(NewBookForm.pageTitle).toHaveText('Add book');
	});

	after(() => {
		browser.reloadSession();
	});

	it('should display error when adding book with invalid data', () => {
		NewBookForm.addBookButton.click();
		expect(NewBookForm.titleError).toHaveText('Title is required !');
		expect(NewBookForm.authorError).toHaveText('Author is required !');
		expect(NewBookForm.genreError).toHaveText('Genre is required !');
		expect(NewBookForm.descriptionError).toHaveText('Description is required !');
		NewBookForm.titleInput.setValue('Book title');
		NewBookForm.addBookButton.click();
		NewBookForm.titleError.waitForExist({ reverse: true });
		expect(NewBookForm.authorError).toHaveText('Author is required !');
		expect(NewBookForm.genreError).toHaveText('Genre is required !');
		expect(NewBookForm.descriptionError).toHaveText('Description is required !');
		browser.execute(() => window.scrollBy(0, -200) );
		clearInput(NewBookForm.titleInput);
		NewBookForm.authorInput.setValue('Book author');
		NewBookForm.addBookButton.click();
		NewBookForm.authorError.waitForExist({ reverse: true });
		expect(NewBookForm.titleError).toHaveText('Title is required !');
		expect(NewBookForm.genreError).toHaveText('Genre is required !');
		expect(NewBookForm.descriptionError).toHaveText('Description is required !');
		clearInput(NewBookForm.authorInput);
		NewBookForm.genreInput.setValue('Book genre');
		NewBookForm.addBookButton.click();
		NewBookForm.genreError.waitForExist({ reverse: true });
		expect(NewBookForm.titleError).toHaveText('Title is required !');
		expect(NewBookForm.authorError).toHaveText('Author is required !');
		expect(NewBookForm.descriptionError).toHaveText('Description is required !');
		clearInput(NewBookForm.genreInput);
		NewBookForm.descriptionInput.setValue('Book description');
		NewBookForm.addBookButton.click();
		NewBookForm.descriptionError.waitForExist({ reverse: true });
		expect(NewBookForm.titleError).toHaveText('Title is required !');
		expect(NewBookForm.authorError).toHaveText('Author is required !');
		expect(NewBookForm.genreError).toHaveText('Genre is required !');
		clearInput(NewBookForm.descriptionInput);
	});

	it('shoud successfully add new book', () => {
		NewBookForm.titleInput.setValue('Book title');
		NewBookForm.authorInput.setValue('Book author');
		NewBookForm.genreInput.setValue('Book genre');
		NewBookForm.descriptionInput.setValue('Book description');
		uploadFile(NewBookForm.hiddenImageInput, '../assets/images/art.jpg');
		expect(NewBookForm.imageName).toBeDisplayed();
		expect(NewBookForm.deleteImageButton).toBeDisplayed();
		NewBookForm.addBookButton.click();
		expect(Book.bookTitle).toHaveText('Book title');
		expect(Book.bookAuthor).toHaveText('Book author');
		expect(Book.bookGenre).toHaveText('Book genre');
		expect(Book.bookDescription).toHaveText('Book description');
		expect(Book.bookImage).toBeDisplayed();
		expect(Book.bookDate).toBeDisplayed();
	});

	it('should successfully search and find book', () => {
		TopBar.searchbar.setValue('Book title');
		TopBar.firstSearchResult.waitForDisplayed();
		expect(TopBar.firstSearchResult).toBeDisplayed();
		TopBar.firstSearchResult.click();
		expect(Book.bookTitle).toHaveText('Book title');
	});	

	it('should successfully delete book', () => {
		TopBar.profileMenu.click();
		TopBar.profileListItem.click();
		ProfilePage.profileBooksTab.click();
		expect(Book.bookTitle).toHaveText('Book title');
		expect(Book.deleteBookButton).toBeDisplayed();
		Book.deleteBookButton.click();
		expect(ConfirmWindow.content).toBeDisplayed();
		expect(ConfirmWindow.confirmButton).toBeDisplayed();
		ConfirmWindow.confirmButton.click();
		expect(SuccessWindow.content).toBeDisplayed();
		expect(SuccessWindow.okButton).toBeDisplayed();
		SuccessWindow.okButton.click();
		ProfilePage.profileBooksTab.click();
		Book.bookTitle.waitForExist({ reverse: true });
	});
});
