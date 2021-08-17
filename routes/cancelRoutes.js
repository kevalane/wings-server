// Imports
const express = require('express');
const cancelController = require('../controllers/cancelController');
const router = express.Router();

// Routes
router.get('/getTest', cancelController.cancel_getTest);

module.exports = router;