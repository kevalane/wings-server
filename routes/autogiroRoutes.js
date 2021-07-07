// Imports
const express = require('express');
const autogiroController = require('../controllers/autogiroController');
const router = express.Router();

// Routes
router.post('/getBankInfo', autogiroController.autogiro_getBankInfo);
router.post('/pollBankInfo', autogiroController.autogiro_pollBankInfo);
router.post('/startAutogiro', autogiroController.autogiro_startAutogiro);

module.exports = router;