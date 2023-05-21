const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
router.route('/logout').get(authController.logout);
router.route('/loggedIn').get(protect, authController.loggedIn);

module.exports = router;
