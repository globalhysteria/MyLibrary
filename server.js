const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/index');
const authorsRouter = require('./routes/authors');
const mongoose = require('mongoose');

const processEnv = (process.env.NODE_ENV === 'production') ?
    process.env : require('dotenv').config().parsed;

const app = express();

// Set templating language.
app.set('view engine', 'ejs');

// Not needed?
// app.set('views', __dirname + '/views');

// Layouts are for the shared part of views, e.g. header and footer.
app.set('layout', __dirname + '/views/layouts/layout');
app.use(expressLayouts);

// Serve static pages like CSS, JavaScript(?).
app.use(express.static('public'));

// Note it does matter where we put these - needs to be after expressLayouts to
// use/show the layout in this route. It doesn't have to be after express.static
// though.
app.use('/', router);
app.use('/authors', authorsRouter);

mongoose.connect(processEnv.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => {
    console.log('[GM-Error] Mongoose error:', error);
});
db.once('open', error => {
    console.log('Opened connection to Mongoose');
});

const port = processEnv.PORT || 3000;
console.log("Port:", port);
app.listen(port);