const express = require('express');
const { loginUser } = require('../controllers/auth');
const { getAllProducts } = require('../controllers/products');

const router = express.Router();

router.post('/login', loginUser);
router.get('/products', getAllProducts);

module.exports = router;