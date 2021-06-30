const express = require('express');
const autogiroController = require('../controllers/autogiroController');

const router = express.Router();

router.get('/getBankInfo', autogiroController.autogiro_getBankInfo);

module.exports = router;