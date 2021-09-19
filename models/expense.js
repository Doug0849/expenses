const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  category_1: {
    type: String,
    required: true,
  },
  category_2: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
    method: {
    type: String,
    required: true,
  },
  time: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    hour: {
      type: Number,
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
  }
})

module.exports = mongoose.model('Expense', expenseSchema)