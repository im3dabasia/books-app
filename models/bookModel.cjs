const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: String,
  publicationYear: Number,
});

const Book = mongoose.model('Book', bookModel);

module.exports = Book;