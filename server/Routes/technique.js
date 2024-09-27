const express = require('express');
const router = express.Router();

const { read, list, create, update, remove } = require('../Controllers/technique');
// middleware
const { auth, adminCheck } = require('../Middleware/auth');
const { upload } = require('../Middleware/upload');

// http://localhost:5000/api/technique
router.get('/technique', list);
router.get('/technique/:id', read);
router.post('/technique', upload, create);
router.put('/technique/:id', upload, update);

router.delete('/technique/:id', remove);

module.exports = router;
