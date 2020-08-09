import express from 'express';
import bookController from '../controllers/book.controller';
import userController from '../controllers/user.controller';

const bookApi = express.Router();

bookApi.route('/myapi/books')
	.get(bookController.listBooks)
	.post(bookController.create);

bookApi.route('/myapi/books/search')
	.get(bookController.searchBooks);

bookApi.route('/myapi/book/image/:bookId')
	.get(bookController.loadImage);

bookApi.route('/myapi/profile/:userId/books')
	.get(bookController.listUserBooks);

bookApi.route('/myapi/books/:bookId')
	.get(bookController.findBook)
	.delete(bookController.deleteBook);

bookApi.param('userId', userController.getUserByID);
bookApi.param('bookId', bookController.getBookByID);

export default bookApi;
