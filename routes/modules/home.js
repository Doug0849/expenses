const express = require('express')
const router = express.Router()
const Accounts = require('../../models/account')

router.get('/', (req, res) => {
  if (!req.cookies.userToken) {
    const name = ''
    return res.render('login', {name})
  }
  Accounts.findOne({ token: req.cookies.userToken })
    .lean()
    .then(account => {
      if (!account) return res.redirect('/')
      return res.redirect(`/expenses/${account.name}`)
    })
})

router.get('/logout', (req,res) => {
  res.clearCookie('userToken')
  return res.redirect(`/`)
})

module.exports = router