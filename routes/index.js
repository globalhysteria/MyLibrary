const express = require('express');

// Create (or get?) a router. This in itself is completely not attached anywhere.
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Hit /");
    res.render('index');
});

// exports.router = router;
module.exports = router;