const express = require('express');
const upload = require('../utils/multerConfig.cjs');

const { getAllBooks,
  addBook,
  uploadBooks,
  getOneBook,
  deleteBook,
  streamBook, 
  noStreamBook} = require('../controllers/bookController.cjs');

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', upload.single('file'), addBook);
router.post('/bulk-upload', uploadBooks);
router.get('/:id', getOneBook);
router.delete('/:id', deleteBook);
router.post('/stream/:id', streamBook);
router.post('/no-stream/:id', noStreamBook);


module.exports = router;
