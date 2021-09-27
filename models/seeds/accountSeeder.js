const Account = require('../account')
const Expense = require('../expense')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Account.create({
      name: 'user' + i,
      password: '1234567',
      email: i + '@example.com',
      registerTime: {
        year: '2021',
        month: '09',
        date: '19',
      },
      expenses : [1,2,3,4,5],
    })
  }
  console.log('Created seeds done.')
})