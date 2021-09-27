const mongoose = require('mongoose')
const Schema = mongoose.Schema
const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registerTime: {
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
  },
  token: {
    type: String,
  },
  expenses: {
    type: Array,
  },
})

module.exports = mongoose.model('Account', accountSchema)