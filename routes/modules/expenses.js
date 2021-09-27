const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')
const Accounts = require('../../models/account')
const account = require('../../models/account')



router.get('/:name', (req, res) => {
  Accounts.findOne({ token: req.cookies.userToken })
    .then(account => {
      if (!account) {
        return res.redirect('/')
      }
      return account
    })
    .then(account => {
      Expenses.find({ _id: { $in: account.expenses } })
        .lean()
        .sort({ time: 'desc' })
        .then(expenseItems => {
          const name = req.params.name
          expenseItems.forEach(item => {
            item.name = name
          })
          return res.render('list', { expenseItems, name })
        })
    })
})


router.get('/:name/add', (req, res) => {
  const name = req.params.name
  Accounts.findOne({ token: req.cookies.userToken })
    .then(account => {
      if (!account) {
        return res.redirect('/')
      }
      return res.render('add', { name })
    })
})

router.post('/:name/add', (req, res) => {
  Accounts.findOne({ token: req.cookies.userToken })
    .then(account => {
      if (!account) {
        return res.redirect('/')
      }
      Expenses.findOne({}, { _id: 1 }).sort({ _id: -1 }).limit(1).then(expense => {
        const idNumber = Number(expense._id) + 1
        const name = req.params.name
        const time = {
          year: req.body.time.split('-')[0],
          month: req.body.time.split('-')[1],
          date: req.body.time.split('-')[2],
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
        }
        const { method, inOrOut, category, itemName, cost, remark } = req.body
        Expenses.create({ _id: idNumber, category, itemName, inOrOut, cost, method, remark, time }).then(
          Accounts.findOneAndUpdate({ token: req.cookies.userToken }, { $addToSet: { expenses: idNumber } })
            .then(res.redirect(`/expenses/${name}`))
        )
      })
    })
    .catch(error => console.log(error))
})

router.get('/:name/:id', (req, res) => {
  Accounts.findOne({ token: req.cookies.userToken })
    .then(account => {
      if (!account) {
        return res.redirect('/')
      }
      const id = req.params.id
      const name = req.params.name
      return Expenses.findById(id)
        .lean()
        .then(expense => {
          res.render('detail', { expense, name })
        })
    })
    .catch(error => console.log(error))
})

router.get('/:name/:id/edit', (req, res) => {
  Accounts.findOne({ token: req.cookies.userToken })
    .then(account => {
      if (!account) {
        return res.redirect('/')
      }
      const id = req.params.id
      const name = req.params.name
      return Expenses.findById(id)
        .lean()
        .then(expense => {
          res.render('edit', { expense, name })
        })
    })
    .catch(error => console.log(error))
})

router.put('/:name/:id', (req, res) => {
  Accounts.findOne({ token: req.cookies.userToken })
    .then(account => {
      if (!account) {
        return res.redirect('/')
      }
      const id = req.params.id
      const time = {
        year: req.body.time.split('-')[0],
        month: req.body.time.split('-')[1],
        date: req.body.time.split('-')[2],
      }
      const { method, inOrOut, category, itemName, cost, remark } = req.body
      return Expenses.findById(id)
        .then(expense => {
          expense.time.year = time.year
          expense.time.month = time.month
          expense.time.date = time.date
          expense.method = method
          expense.category = category
          expense.itemName = itemName
          expense.inOrOut = inOrOut
          expense.cost = cost
          expense.remark = remark
          return expense.save()
        })
        .then(() => res.redirect(`/`))
    })
    .catch(error => console.log(error))
})

router.delete('/:name/:id', (req, res) => {
  Accounts.findOne({ token: req.cookies.userToken })
    .then(account => {
      if (!account) {
        return res.redirect('/')
      }
      const id = req.params.id
      return Expenses.findById(id)
        .then(expense => expense.remove())
        .then(() => res.redirect('/'))
    })
    .catch(error => console.log(error))
})

module.exports = router