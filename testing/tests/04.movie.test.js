/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewMovieForm from '../PageObjects/NewMovieForm';
import Movie from '../PageObjects/Movie';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import config from '../../config';
import uploadFile from '../helpers/uploadFile';
import clearInput from '../helpers/clearInput';

describe('Check movie functionality', () => {
  before('login into existing account', () => {
    browser.maximizeWindow();
    BasePage.open();
    TopBar.profileMenu.click();
    expect(TopBar.loginListItem).toBeDisplayed();
    TopBar.loginListItem.click();
    LoginPage.emailInput.setValue(config.testExistingUserEmail);
    LoginPage.passwordInput.setValue(config.testExistingUserPassword);
    LoginPage.loginButton.click();
    TopBar.moviesTab.click();
    expect(NewMovieForm.pageTitle).toHaveText('Add trailer');
    browser.refresh();
  });

  after(() => {
    browser.reloadSession();
  });

  it('should display error when adding movie with invalid data', () => {
    uploadFile(NewMovieForm.hiddenVideoInput, '../assets/videos/trailer.mp4');
    NewMovieForm.addVideoButton.click();
    expect(NewMovieForm.titleError).toHaveText('Title is required !');
    expect(NewMovieForm.genreError).toHaveText('Genre is required !');
    expect(NewMovieForm.descriptionError).toHaveText(
      'Description is required !'
    );
    NewMovieForm.titleInput.setValue('test title');
    NewMovieForm.addVideoButton.click();
    NewMovieForm.titleError.waitForExist({ reverse: true });
    expect(NewMovieForm.genreError).toHaveText('Genre is required !');
    expect(NewMovieForm.descriptionError).toHaveText(
      'Description is required !'
    );
    browser.execute(() => window.scrollBy(0, -200));
    clearInput(NewMovieForm.titleInput);
    NewMovieForm.genreInput.setValue('test genre');
    NewMovieForm.addVideoButton.click();
    expect(NewMovieForm.titleError).toHaveText('Title is required !');
    NewMovieForm.genreError.waitForExist({ reverse: true });
    expect(NewMovieForm.descriptionError).toHaveText(
      'Description is required !'
    );
    browser.execute(() => window.scrollBy(0, -200));
    clearInput(NewMovieForm.genreInput);
    NewMovieForm.descriptionInput.setValue('test description');
    NewMovieForm.addVideoButton.click();
    expect(NewMovieForm.titleError).toHaveText('Title is required !');
    expect(NewMovieForm.genreError).toHaveText('Genre is required !');
    NewMovieForm.descriptionError.waitForExist({ reverse: true });
    clearInput(NewMovieForm.descriptionInput);
    NewMovieForm.deleteVideoButton.click();
  });

  it('shoud successfully add new movie', () => {
    NewMovieForm.titleInput.setValue('Movie title');
    NewMovieForm.genreInput.setValue('Movie genre');
    NewMovieForm.descriptionInput.setValue('Movie description');
    uploadFile(NewMovieForm.hiddenVideoInput, '../assets/videos/trailer.mp4');
    NewMovieForm.addVideoButton.click();
    Movie.movieTitle.waitForDisplayed();
    browser.execute(() => window.scrollBy(0, -200));
    expect(Movie.movieTitle).toBeDisplayed();
    expect(Movie.movieTitle).toHaveText('Movie title');
    expect(Movie.movieGenre).toBeDisplayed();
    expect(Movie.movieGenre).toHaveText('Movie genre');
    expect(Movie.movieDescription).toBeDisplayed();
    expect(Movie.movieDescription).toHaveText('Movie description');
    expect(Movie.movieVideo).toBeDisplayed();
  });

  it('should successfully search and find movie', () => {
    TopBar.searchbar.setValue('Movie title');
    TopBar.firstSearchResult.waitForDisplayed();
    expect(TopBar.firstSearchResult).toBeDisplayed();
    TopBar.firstSearchResult.click();
    expect(Movie.movieTitle).toHaveText('Movie title');
    expect(Movie.movieGenre).toHaveText('Movie genre');
    expect(Movie.movieDescription).toHaveText('Movie description');
  });

  it('should successfully delete movie', () => {
    TopBar.profileMenu.click();
    TopBar.profileListItem.click();
    browser.refresh();
    expect(ProfilePage.pageTitle).toHaveText('Profile');
    ProfilePage.profileMoviesTab.click();
    expect(Movie.movieTitle).toBeDisplayed();
    expect(Movie.movieTitle).toHaveText('Movie title');
    expect(Movie.movieGenre).toBeDisplayed();
    expect(Movie.movieGenre).toHaveText('Movie genre');
    expect(Movie.movieDescription).toBeDisplayed();
    expect(Movie.movieDescription).toHaveText('Movie description');
    expect(Movie.deleteMovieButton).toBeDisplayed();
    Movie.deleteMovieButton.click();
    expect(ConfirmWindow.content).toBeDisplayed();
    expect(ConfirmWindow.cancelButton).toBeDisplayed();
    ConfirmWindow.cancelButton.click();
    ConfirmWindow.content.waitForExist({ reverse: true });
    Movie.deleteMovieButton.click();
    expect(ConfirmWindow.content).toBeDisplayed();
    expect(ConfirmWindow.confirmButton).toBeDisplayed();
    ConfirmWindow.confirmButton.click();
    expect(SuccessWindow.content).toBeDisplayed();
    expect(SuccessWindow.okButton).toBeDisplayed();
    SuccessWindow.okButton.click();
    ProfilePage.profileMoviesTab.click();
    Movie.movieTitle.waitForExist({ reverse: true });
  });
});
