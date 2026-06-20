const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// @desc    Create a new book (Secure & Validated)
// @route   POST /books
exports.createBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, author, price, isbn, publishedDate } = req.body;
    
    // Check if duplicate ISBN exists safely
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ success: false, message: 'A book with this ISBN already exists.' });
    }

    const newBook = await Book.create({ title, author, price, isbn, publishedDate });
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all books (With Advanced Bonus Search, Filtering & Pagination)
// @route   GET /books
exports.getAllBooks = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    let query = {};

    // Advanced search implementation (Title or Author search)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination calculations
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Optimized lean query execution
    const books = await Book.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .lean();

    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count: books.length,
      pagination: {
        totalBooks,
        currentPage: pageNum,
        totalPages: Math.ceil(totalBooks / limitNum)
      },
      data: books
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single book by ID
// @route   GET /books/:id
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error); // Catches invalid ObjectIDs safely via global handler
  }
};

// @desc    Update an existing book's details
// @route   PUT /books/:id
exports.updateBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a book from storage
// @route   DELETE /books/:id
exports.deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book successfully deleted' });
  } catch (error) {
    next(error);
  }
};