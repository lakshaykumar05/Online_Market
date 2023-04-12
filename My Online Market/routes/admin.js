const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// GET add-product
// console.log('admin routes');
router.get('/add-product', adminController.getAddProduct);

// GET All Products
router.get('/products', adminController.getAllProducts);

// Get Edit particular product
router.get('/edit-product/:productId', adminController.getEditProduct);

// Post Edit product
router.post('/edit-product', adminController.postEditProduct);

// POST add-product
router.post('/add-product', adminController.postAddProduct);

// Delete product
router.post('/delete-product', adminController.deleteProduct)

module.exports = router;    