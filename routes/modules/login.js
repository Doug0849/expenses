const express = require('express')
const router = express.Router()
const Accounts = require('../../models/account')

function generatedToken() {
  const lowerCase = 'abcdefghijklmnopqrstuvwkyz'
  const upperCase = lowerCase.toUpperCase()
  const numbers = '1234567890'
  let allLetter = lowerCase + upperCase + numbers
  let accountToken = ''
  for ( let i = 0 ; i < 10 ; i++ ) {
    accountToken += allLetter[Math.round(Math.random() * allLetter.length)]
  }
  return accountToken
}

router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  Accounts.findOne({ "email" : email, "password" : password })
    .then(account => {
      if (!account) {
        return res.render('loginFail')
      }
      account.token = generatedToken()
      res.cookie('userToken', account.token)
      account.save()
      return res.redirect(`/expenses/${account.name}`)
    })
  .catch(error => console.log(error))
})
module.exports = router