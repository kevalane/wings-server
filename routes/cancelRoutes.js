// Imports
const express = require('express');
const cancelController = require('../controllers/cancelController');
const router = express.Router();

// Routes
router.post('/cancelAutogiro', cancelController.cancel_cancelAutogiro);

module.exports = router;