// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      /*Appending extension with original name*/
      cb(null, file.originalname ) 
    }
  })
  
var upload = multer({ storage: storage });

const { getAllBooks, addBook, uploadBooks } = require('../controllers/bookController.cjs');

// GET all books
router.get('/', getAllBooks);

// POST a new book
router.post('/', upload.single('file'), addBook);

// POST mass upload of books
router.post('/bulk-upload', uploadBooks);

module.exports = router;

module.exports = router;
