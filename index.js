const express = require('express')
const userRoutes = require("./src/routes/user")
const itemRoutes = require("./src/routes/items")
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3010
var cors = require('cors')



app.get('/ping', (req, res) => {
  res.send('Pong!')
})

app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRoutes)
app.use("/items", itemRoutes)
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})