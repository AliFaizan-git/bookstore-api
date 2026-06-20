
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { body } = require('express-validator');

// Shared validation rules array
const bookValidationRules = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('author').notEmpty().withMessage('Author is required').trim(),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('isbn').notEmpty().withMessage('ISBN identifier is required').trim(),
  body('publishedDate').isISO8601().withMessage('Must provide a valid date format (YYYY-MM-DD)')
];

// Map endpoints cleanly
router.route('/')
  .post(bookValidationRules, bookController.createBook)
  .get(bookController.getAllBooks);

router.route('/:id')
  .get(bookController.getBookById)
  .put(bookValidationRules, bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;