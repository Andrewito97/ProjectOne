/* eslint-disable no-undef */
import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewMusicForm from '../PageObjects/NewMusicForm';
import Music from '../PageObjects/Music';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import config from '../../config';
import uploadFile from '../helpers/uploadFile';
import clearInput from '../helpers/clearInput';

describe('Check music functionality', () => {
  before('login into existing account', () => {
    browser.maximizeWindow();
    BasePage.open();
    TopBar.profileMenu.click();
    expect(TopBar.loginListItem).toBeDisplayed();
    TopBar.loginListItem.click();
    LoginPage.emailInput.setValue(config.testExistingUserEmail);
    LoginPage.passwordInput.setValue(config.testExistingUserPassword);
    LoginPage.loginButton.click();
    TopBar.musicTab.click();
    expect(NewMusicForm.pageTitle).toHaveText('Add music');
    browser.refresh();
  });

  after(() => {
    browser.reloadSession();
  });

  it('should display error when adding music with invalid data', () => {
    expect(NewMusicForm.authorInput).toBeDisplayed();
    expect(NewMusicForm.musicNoteButton).toBeDisplayed();
    expect(NewMusicForm.musicNoteButton).toBeClickable();
    expect(NewMusicForm.addSongButton).toBeDisplayed();
    expect(NewMusicForm.addSongButton).toBeDisabled();
    uploadFile(
      NewMusicForm.hiddenAudioInput,
      '../assets/audios/luftbaloons.mp3'
    );
    NewMusicForm.addSongButton.click();
    NewMusicForm.authorError.waitForExist({ timeout: 30000 });
    NewMusicForm.authorError.waitForDisplayed();
    expect(NewMusicForm.authorError).toBeDisplayed();
    expect(NewMusicForm.authorError).toHaveText('Author is required !');
    NewMusicForm.audioNameDeleteButton[0].click();
  });

  it('shoud successfully add new music', () => {
    NewMusicForm.authorInput.setValue('test author');
    NewMusicForm.genreSelect.click();
    NewMusicForm.otherOption.waitForDisplayed();
    NewMusicForm.otherOption.click();
    NewMusicForm.genreInput.setValue('test genre');
    uploadFile(
      NewMusicForm.hiddenAudioInput,
      '../assets/audios/luftbaloons.mp3'
    );
    expect(NewMusicForm.newAudioName).toBeElementsArrayOfSize(1);
    expect(NewMusicForm.audioNameEditButton).toBeElementsArrayOfSize(1);
    expect(NewMusicForm.audioNameDeleteButton).toBeElementsArrayOfSize(1);
    uploadFile(
      NewMusicForm.hiddenAudioInput,
      '../assets/audios/augenblick.mp3'
    );
    expect(NewMusicForm.newAudioName).toBeElementsArrayOfSize(2);
    expect(NewMusicForm.audioNameEditButton).toBeElementsArrayOfSize(2);
    expect(NewMusicForm.audioNameDeleteButton).toBeElementsArrayOfSize(2);
    NewMusicForm.audioNameDeleteButton[0].click();
    expect(NewMusicForm.newAudioName).toBeElementsArrayOfSize(1);
    expect(NewMusicForm.audioNameEditButton).toBeElementsArrayOfSize(1);
    expect(NewMusicForm.audioNameDeleteButton).toBeElementsArrayOfSize(1);
    NewMusicForm.audioNameEditButton[0].click();
    expect(NewMusicForm.audioNameEditInput[0]).toBeDisplayed();
    clearInput(NewMusicForm.audioNameEditInput[0]);
    NewMusicForm.audioNameEditInput[0].setValue('test audio name');
    NewMusicForm.audioNameSaveButton[0].click();
    expect(NewMusicForm.newAudioName[0]).toHaveText('test audio name');
    NewMusicForm.addSongButton.click();
    expect(Music.audioName).toBeDisplayed();
    expect(Music.audioName).toHaveText('test audio name');
    expect(Music.musicAuthor).toBeDisplayed();
    expect(Music.musicAuthor).toHaveText('test author');
    expect(Music.musicGenre).toBeDisplayed();
    expect(Music.musicGenre).toHaveText('test genre');
    expect(Music.playPauseButton).toBeDisplayed();
    expect(Music.playPauseButton).toBeClickable();
    expect(Music.audioVolumeButton).toBeDisplayed();
    expect(Music.audioVolumeButton).toBeClickable();
  });

  it('should successfully search and find music', () => {
    TopBar.searchbar.setValue('test author');
    TopBar.firstSearchResult.waitForDisplayed();
    expect(TopBar.firstSearchResult).toBeDisplayed();
    TopBar.firstSearchResult.click();
    expect(Music.musicAuthor).toHaveText('test author');
    expect(Music.musicGenre).toHaveText('test genre');
    expect(Music.audioName).toHaveText('test audio name');
  });

  it('should successfully delete music', () => {
    TopBar.profileMenu.click();
    TopBar.profileListItem.click();
    browser.refresh();
    expect(ProfilePage.pageTitle).toHaveText('Profile');
    ProfilePage.profileMusicTab.click();
    expect(Music.musicAuthor).toBeDisplayed();
    expect(Music.musicAuthor).toHaveText('test author');
    expect(Music.deleteMusicButton).toBeDisplayed();
    Music.deleteMusicButton.click();
    expect(ConfirmWindow.content).toBeDisplayed();
    expect(ConfirmWindow.cancelButton).toBeDisplayed();
    ConfirmWindow.cancelButton.click();
    ConfirmWindow.content.waitForExist({ reverse: true });
    Music.deleteMusicButton.click();
    expect(ConfirmWindow.content).toBeDisplayed();
    expect(ConfirmWindow.confirmButton).toBeDisplayed();
    ConfirmWindow.confirmButton.click();
    expect(SuccessWindow.content).toBeDisplayed();
    expect(SuccessWindow.okButton).toBeDisplayed();
    SuccessWindow.okButton.click();
    ProfilePage.profileMusicTab.click();
    Music.musicAuthor.waitForExist({ reverse: true });
  });
});
