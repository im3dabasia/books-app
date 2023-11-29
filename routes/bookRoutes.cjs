// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBooks, addBook, uploadBooks } = require('../controllers/bookController.cjs');

// GET all books
router.get('/', getAllBooks);

// POST a new book
router.post('/', addBook);

// POST mass upload of books
router.post('/bulk-upload', uploadBooks);

module.exports = router;


module.exports = router;
