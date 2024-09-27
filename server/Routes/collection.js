const express = require('express');
const router = express.Router();

const { addToCollection, removeFromCollection, getCollection } = require('../Controllers/collection');
const { auth } = require('../Middleware/auth');

// http://localhost:5000/api/collection
router.post('/collection/add', auth, addToCollection); // Add product to collection
router.post('/collection/remove', auth, removeFromCollection); // Remove product from collection
router.get('/collection', auth, getCollection); // Get all products in the collection

module.exports = router;
