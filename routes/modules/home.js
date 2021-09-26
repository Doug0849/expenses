const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')

router.get('/', (req, res) => {
  Expenses.find()
    .lean()
    .sort({ time: 'desc' })
    .then(expenseItems => res.render('index', { expenseItems }))
    .catch(error => console.log(error))
})

module.exports = router