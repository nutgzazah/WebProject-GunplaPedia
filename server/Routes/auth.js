const express = require('express')
const router = express.Router()

const { register, login, currentUser } = require('../Controllers/auth')
const { auth, adminCheck } = require('../Middleware/auth')


//http://localhost:5000/api/register
router.post('/register', register)
router.post('/login', login)
router.post('/current-user',auth, currentUser)
router.post('/current-admin',auth, adminCheck, currentUser)


module.exports = router