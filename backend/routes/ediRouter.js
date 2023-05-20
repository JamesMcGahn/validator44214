const express = require('express');
const ediController = require('../controllers/ediController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.route('/x12/translate').post(protect, ediController.readX12);
router.route('/x12/validate').post(protect, ediController.validateX12);

module.exports = router;
