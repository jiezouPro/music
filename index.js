const express = require('express')
const { type } = require('express/lib/response')
const app = express()
const port = 3000
const path = require('path')
const { getData } = require('./mysql')

app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded());

app.get('/', (req, res) => {
  console.log(req.body)
  res.send('Hello World!')
})

app.get('/test', async function (req, res) {
  const sql='SELECT * FROM musiclist'
  let result = await getData(sql)
  res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const sql='SELECT * FROM musiclist'
// getData(sql)


