const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  inOrOut: {
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
  remark: {
    type: String,
  },
  time: {
    year: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    minute: {
      type: String,
      required: true,
    },
  }
})

module.exports = mongoose.model('Expense', expenseSchema)