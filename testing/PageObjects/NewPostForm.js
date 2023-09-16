/* eslint-disable no-undef */
class NewPostForm {
  get pageTitle() {
    return $('#page-title');
  }

  get titleInput() {
    return $('#title-input');
  }

  get titleError() {
    return $('#title-error');
  }

  get tagInput() {
    return $('#tag-input');
  }

  get addTagButton() {
    return $('#add-tag-button');
  }

  get firstTag() {
    return $('#tag-1');
  }

  get deleteFirstTagButton() {
    return $('#delete-tag-button-1');
  }

  get textInput() {
    return $('#text-input');
  }

  get textError() {
    return $('#text-error');
  }

  get cameraButton() {
    return $('#camera-button');
  }

  get hiddenImageInput() {
    return $('#hidden-image-input');
  }

  get imageName() {
    return $('#image-name');
  }

  get deleteImageButton() {
    return $('#delete-image-button');
  }

  get addPostButton() {
    return $('#add-post-button');
  }
}

export default new NewPostForm();
