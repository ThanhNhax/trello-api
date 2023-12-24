import express from 'express'
const app = express()

const host = 'localhost'
const port = 6060

app.get('/', (req, res) => {
  res.send('<h1>Hello, My server Thanh Nhax</h1>')
})

app.listen(port, host, () => {
  console.log(`Hello, My server Thanh Nhax http://${host}:${port}`)
})
