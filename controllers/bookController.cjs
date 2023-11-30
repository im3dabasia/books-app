const Book = require('../models/bookModel.cjs');
const multer = require('multer');

const SFTPClient = require('../sftp.cjs'); 
require('dotenv').config()


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
  try {
    const { title, author, genre, publicationYear } = req.body;
    console.log(req.file)

    const newBook = new Book({
      title,
      author,
      genre,
      publicationYear,
      filePath: req.file && req.file.path ? req.file.path:""
    });

    // const savedBook = await newBook.save();
    // (async () => {
    //   const port =  22;
    //   const host=process.env.host
    //   const username=process.env.username
    //   const password=process.env.password
  
    //   //* Open the connection
    //   const client = new SFTPClient();
    //   await client.connect({ host, port, username, password });
    //   await client.uploadFile("PATH_SOURCE", "PATH_DESTINATION");
    
    //   //* Close the connection
    //   await client.disconnect();
    // })();

    res.json("savedBook");
  } catch (error) {
    console.error(error);
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
