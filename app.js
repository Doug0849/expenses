const express = require ('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

// 第一個參數為副檔名
app.engine('hbs', exphbs)

app.get('/', (req,res) => {
  res.send(``)
})
