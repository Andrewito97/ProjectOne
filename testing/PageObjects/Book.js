/* eslint-disable no-undef */
class Book {
  get bookTitle() {
    return $('#book-title');
  }

  get bookAuthor() {
    return $('#book-author');
  }

  get bookGenre() {
    return $('#book-genre');
  }

  get bookDescription() {
    return $('#book-description');
  }

  get bookImage() {
    return $('#book-image');
  }

  get bookDate() {
    return $('#book-date');
  }

  get deleteBookButton() {
    return $('#delete-book-button');
  }
}

export default new Book();
