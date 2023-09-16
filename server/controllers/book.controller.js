import mongoose from 'mongoose';
import formidable from 'formidable';
import fs from 'fs';
import BookSchema from '../models/book.model';
import config from '../../config';

//create connection to specific database
const connection = mongoose.createConnection(config.booksMongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//append specified schema to the connection and initialize constructor
const Book = connection.model('Book', BookSchema);

connection.once('open', function () {
  console.log('\x1b[32m', 'Connected to db with books documents !');
});

connection.on('error', (error) => {
  console.error('Unable to connect to database with books documents!');
  console.error(`Reason: ${error}`);
});

const bookController = {
  create(request, response) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(request, (error, fields, files) => {
      if (error) {
        return response.status(400).json({
          errorMessage: 'Image could not be uploaded !',
        });
      }
      let book = new Book(fields);
      if (files.image) {
        book.image.data = fs.readFileSync(files.image.path);
        book.image.contentType = files.image.type;
      }
      book.save((error, result) => {
        if (error) {
          return response.status(400).json({
            error,
          });
        } else {
          return response.status(201).json({
            success: result,
          });
        }
      });
    });
  },

  listBooks(request, response) {
    Book.find()
      .skip(Number(request.query.skip))
      .limit(5)
      .sort('-created')
      .exec((error, books) => {
        if (error) {
          return response.status(400).json({
            error,
          });
        }
        response.json(books);
      });
  },

  listUserBooks(request, response) {
    Book.find({ postedBy: request.profile._id })
      .sort('-created')
      .exec((error, books) => {
        if (error || !books) {
          return response.status(400).json({
            errorMessage: 'Books not found !',
          });
        }
        response.json(books);
      });
  },

  getBookByID(request, response, nextHendlear, bookId) {
    Book.findById(bookId).exec((error, book) => {
      if (error || !book) {
        return response.status(400).json({
          errorMessage: 'Book not found !',
        });
      }
      request.book = book;
      nextHendlear();
    });
  },

  searchBooks(request, response) {
    Book.find({ $text: { $search: request.query.text } })
      .limit(7)
      .exec((error, books) => {
        if (error || !books) {
          return response.status(400).json({
            errorMessage: 'Books not found !',
          });
        }
        response.json(books);
      });
  },

  findBook(request, response) {
    Book.findById(request.book._id).exec((error, book) => {
      if (error || !book) {
        return response.status(400).json({
          errorMessage: 'Book not found !',
        });
      }
      response.json(book);
    });
  },

  deleteBook(request, response) {
    Book.findByIdAndDelete(request.book._id, (error) => {
      if (error) {
        return response.status(400).json({
          error,
        });
      } else {
        return response.status(200).json({
          success: 'Book has been deleted !',
        });
      }
    });
  },

  // eslint-disable-next-line no-unused-vars
  loadImage(request, response, nextHendlear) {
    response.set('Content-Type', request.book.image.contentType);
    return response.send(request.book.image.data);
  },
};

export default bookController;
