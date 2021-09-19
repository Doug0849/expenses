const Expense = require('../expense')
const db = require('../../config/mongoose')

db.once('open', () => {
  for ( let i = 0; i < 10; i++){
    Expense.create({
      category_1: '分類1',
      category_2: '分類2',
      itemName: `itemName-` + i,
      cost: 100,
      method: '現金',
      time: {
        year: 2021,
        month: 9,
        date: 19,
        hour: 21,
        minute: 9,
      }
    })
  }
  console.log('Created seeds done.')
})