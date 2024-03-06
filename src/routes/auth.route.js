const express = require('express');

const router = express.Router();

const { authController } = require('../controllers');

router.post('/', authController.authUser);

module.exports = router;
