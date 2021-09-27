const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const login = require('./modules/login')

router.use('/',home)
router.use('/expenses', expenses)
router.use('/login', login)

module.exports = router