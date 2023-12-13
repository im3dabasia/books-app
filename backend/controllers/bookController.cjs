const path = require('path');
require('dotenv').config()
const fs = require('fs');

const Book = require('../models/bookModel.cjs');
const { uploadFileToRemote, downloadFileFromRemote } = require('../utils/transferSetup.cjs');

//constants
const REMOTE_PATH = `/Users/admin/Desktop/Cloud-Computing/backend/download/`
const LOCAL_PATH = `/Users/admin/Desktop/Cloud-Computing/backend/uploads/`

async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getOneBook(req, res) {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);

    console.log(book)
    const localPath = `${LOCAL_PATH}${book._id}.pdf`;

    console.log(localPath)
    const downloadStatus = await downloadFileFromRemote(book.filePath, localPath);

    console.log(downloadStatus)

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addBook(req, res) {
  try {
    const { title, author, genre, publicationYear } = req.body;
    const file = req.file;

    const newBook = new Book({
      title,
      author,
      genre,
      publicationYear,
      filePath: file ? file.path : "",
    });

    const savedBook = await newBook.save();
    const relativePath = `../uploads/${file && file.filename ? file.filename : ""}`;
    const absolutePath = path.resolve(__dirname, relativePath);

    //can be changed based on remote path
    const remotePath = `${REMOTE_PATH}${savedBook._id}.pdf`;

    console.log(remotePath)
    const uploadStatus = await uploadFileToRemote(absolutePath, remotePath);

    if (uploadStatus) {
      const updatedBook = await updateBookPath(savedBook._id, remotePath);
      res.json(updatedBook);
    } else {

      console.error('File upload failed');
      res.status(500).json({ error: 'File upload failed' });
    }
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

async function deleteBook(req, res) {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully', deletedBook });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateBookPath(bookId, newPath) {

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: { filePath: newPath } },
      { new: true }
    );

    if (!updatedBook) {
      console.error('Book not found');
      return null;
    }

    console.log('Book updated successfully:');
    return updatedBook;
  } catch (error) {
    console.error('Error updating book:', error.message);
    throw error;
  }
}

async function streamBook(req, res) {
  
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const localPath = `${LOCAL_PATH}${bookId}.pdf`;
    const downloadStatus = await downloadFileFromRemote(book.filePath, localPath);

    if (downloadStatus) {
      console.log("Downloaded on server");
    }
    console.log("Getting PDF file from the server to client (streaming version)");

    const stream = fs.createReadStream(localPath);
    res.writeHead(200, {
      'Content-disposition': 'attachment; filename="' + encodeURIComponent(path.basename(localPath)) + '"',
      'Content-type': 'application/pdf',
    });
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

async function noStreamBook(req, res) {

  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const localPath = `${LOCAL_PATH}${bookId}.pdf`;
    const downloadStatus = await downloadFileFromRemote(book.filePath, localPath);
    if (downloadStatus) {
      console.log("Downloaded on server");
    }

    console.log("Getting PDF file from the server! to client (non-streaming version)");

    fs.readFile(localPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.writeHead(200, {
          'Content-disposition': 'attachment; filename="' + encodeURIComponent(path.basename(localPath)) + '"',
          'Content-type': 'application/pdf',
        });
        res.end(data);
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllBooks,
  addBook,
  uploadBooks,
  getOneBook,
  deleteBook,
  streamBook,
  noStreamBook
};
