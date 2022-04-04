const express = require('express')
const userRoutes = require("./src/routes/user")
const itemRoutes = require("./src/routes/items")
const app = express()
const bodyParser = require('body-parser')
const port = 3010
var cors = require('cors')



app.get('/ping', (req, res) => {
  res.send('Pong!')
})
app.use(bodyParser.json())
app.use(cors())
app.use("/user", userRoutes)
app.use("/items", itemRoutes)
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})