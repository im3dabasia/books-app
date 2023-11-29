const Book = require('../models/bookModel.cjs');

// Controller for fetching all books
async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller for adding a new book
async function addBook(req, res) {
  const { title, author, genre, publicationYear } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      publicationYear,
    });

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function uploadBooks(req, res) {
  const { books } = req.body;

  try {
    const savedBooks = await Book.insertMany(books);
    res.json(savedBooks);
  } catch (error) {
    console.error('Error uploading books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllBooks,
  addBook,
  uploadBooks
};
