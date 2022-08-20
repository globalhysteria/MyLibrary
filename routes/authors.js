const express = require('express');

// Create (or get?) a router. This in itself is completely not attached anywhere.
const router = express.Router();

router.get('/', (req, res) => {
    // console.log("Hit /");
    let searchQuery = req.query.searchQuery;
    if (!searchQuery) {
        searchQuery = '';
    }
    Author.find({
        // givenName: new RegExp(searchQuery, 'i')
        givenName: {$regex: searchQuery, $options: 'i' }
    }, (err, authors) => {
        if (err) {
            console.log("ERROR");
            res.redirect('/');
        } else {
            console.log("AUTHORS:", authors);
            res.render('authors', {
                authors
            });
        }
    });
});

const Author = require('../models/author');
router.get('/new', (req, res) => {
    console.log("req.query:", req.query);
    const author = new Author();
    // author.givenName = "Barnaba";
    // author.familyName = "Barnacle";
    res.render('authors/new', {
        author,
        // errorMessage: req.query.errorMessage
    });
});

const jsonParser = require('body-parser');
// app.use(jsonParser());
router.post('/', jsonParser(), (req, res) => {
    // console.log("");
    console.log('Create author:', req.body);
    const newAuthor = new Author({
        givenName: req.body.givenName,
        familyName: req.body.familyName
    });
    console.log('newAuthor:', newAuthor);
    newAuthor.save((err, author) => {
        if (err) {
            res.render('authors/new', {
                author: newAuthor,
                errorMessage: 'Invalid form field(s)' // err
            });
        } else {
            console.log("Successfully saved author!");
            res.redirect('authors');
        }
    });
    // res.send('Create');
});

// exports.router = router;
module.exports = router;