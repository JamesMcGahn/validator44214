const express = require('express');
const ediController = require('../controllers/ediController');

const router = express.Router();

router.route('/x12/translate').post(ediController.readX12);
router.route('/x12/validate').post(ediController.validateX12);

module.exports = router;
