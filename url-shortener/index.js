const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hi from URL-Shortener Backend!')
})

app.listen(port, () => {
  console.log(`URL-Shortener app listening on port ${port}`)
})