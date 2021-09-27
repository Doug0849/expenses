const express = require('express')
const router = express.Router()
const Accounts = require('../../models/account')

router.get('/', (req, res) => {
  if (!req.cookies.userToken) {
    const name = ''
    return res.render('login', { name })
  }
  Accounts.findOne({ token: req.cookies.userToken })
    .lean()
    .then(account => {
      if (!account) return res.redirect('/')
      return res.redirect(`/expenses/${account.name}`)
    })
})

router.get('/logout', (req, res) => {
  res.clearCookie('userToken')
  return res.redirect(`/`)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const registerTime = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  }
  const { name, password, email } = req.body
  Accounts.create({ name, password, email, registerTime })
  res.render('regSuccess')
})

module.exports = router