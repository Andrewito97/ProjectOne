/* eslint-disable no-undef */
class Book {
	get bookTitle() {
		return $('#book-title div span:nth-child(1)');
	}

	get bookAuthor() {
		return $('#book-title div span:nth-child(2) > span span:nth-child(1)');
	}

	get bookGenre() {
		return $('#book-title div span:nth-child(2) > span span:nth-child(3)');
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
