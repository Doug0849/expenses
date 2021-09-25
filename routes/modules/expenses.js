const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')

router.get('/add', (req,res) => {
  res.render('add')
})

router.post('/add', (req,res) => {
  const time = {
    year: req.body.time.split('-')[0],
    month: req.body.time.split('-')[1],
    date: req.body.time.split('-')[2],
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
}
  const { method, category, itemName, cost, remark }= req.body
  return Expenses.create({category, itemName, cost, method, remark, time})
  .then(res.redirect('/'))
})


module.exports = router