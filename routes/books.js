const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');

// Create (or get?) a router. This in itself is completely not attached anywhere.
const router = express.Router();

router.get('/', (req, res) => {
    res.render('books', {
        books: []
    });
});

router.get('/new', (req, res) => {
    const book = new Book();
    const authors = Author.find({}, (err, authors) => {
        if (!err) {
            res.render('books/new', {
                book,
                authors
            });
        }
    });
});

const jsonParser = require('body-parser');
const book = require('../models/book');
// app.use(jsonParser());
router.post('/', jsonParser(), (req, res) => {

});

// exports.router = router;
module.exports = router;