const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')

router.get('/add', (req,res) => {
  return res.render('add')
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
  .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Expenses.findById(id)
    .lean()
    .then(expense => {
      res.render('detail', { expense })
    })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req,res) => {
  const id = req.params.id
  return Expenses.findById(id)
  .lean()
  .then(expense => {
    res.render('edit', {expense})
  })
  .catch(error => console.log(error))
})

router.put('/:id', (req,res) => {
  const id = req.params.id
  const time = {
    year: req.body.time.split('-')[0],
    month: req.body.time.split('-')[1],
    date: req.body.time.split('-')[2],
  }
  const { method, category, itemName, cost, remark } = req.body
  return Expenses.findById(id)
    .then(expense => {
      expense.time.year = time.year
      expense.time.month = time.month
      expense.time.date = time.date
      expense.method = method
      expense.category = category
      expense.itemName = itemName
      expense.cost = cost
      expense.remark = remark
      return expense.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

module.exports = router