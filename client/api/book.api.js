import fetch from 'node-fetch';
import getDomain from '../helpers/getDomain.helper';

const domain = getDomain();

const bookApi = {
  async create(token, book) {
    try {
      const response = await fetch(`${domain}/myapi/books`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: book
      });
      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  },
  async listBooks(skip) {
    try {
      const response = await fetch(`${domain}/myapi/books?skip=${skip}`, {
        method: 'GET',
      });
      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  },
  async getUserBooks(userId) {
    try {
      const response = await fetch(`${domain}/myapi/profile/${userId}/books`, {
        method: 'GET',
      });
      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  },
  async searchBooks(text) {
    try {
      const response = await fetch(`${domain}/myapi/books/search?text=${text}`, {
        method: 'GET',
      });
      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  },
  async findBook(bookId) {
    try {
      const response = await fetch(`${domain}/myapi/books/${bookId}`, {
        method: 'GET',
      });
      return response.json(); 
    }
    catch (error) {
      console.log(error);
    }
  },
  async deleteBook(bookId) {
    try {
      const response = await fetch(`${domain}/myapi/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      return response.json(); 
    }
    catch (error) {
      console.log(error);
    }
  }
};

export default bookApi;
