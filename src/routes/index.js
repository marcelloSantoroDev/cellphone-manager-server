const express = require('express');

const router = express.Router();

const userRoute = require('./user.route');
const loginRoute = require('./login.route');
const authRoute = require('./auth.route');
const productRoute = require('./product.route');

router.use('/user', userRoute);
router.use('/login', loginRoute);
router.use('/auth', authRoute);
router.use('/products', productRoute);

module.exports = router;