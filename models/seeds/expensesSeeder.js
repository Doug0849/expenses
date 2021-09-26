const Expense = require('../expense')
const db = require('../../config/mongoose')

db.once('open', () => {
  for ( let i = 0; i < 10; i++){
    Expense.create({
      category: '分類1',
      itemName: `itemName-` + i,
      inOrOut: '支出',
      cost: 100,
      method: '現金',
      remark:'備註內容',
      time: {
        year: '2021',
        month: '09',
        date: '19',
        hour: '21',
        minute: '9',
      }
    })
  }
  console.log('Created seeds done.')
})