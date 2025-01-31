const express = require('express')

const bodyParser = require('body-parser')

const mainRouter = require('./src/routes/index.routes')

const { dbConnection } = require('./src/config/db.config')

require('dotenv').config()

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

app.use('/api', mainRouter)

app.listen(port, async () => {
  await dbConnection()
  console.log('server started on port ' + port)
})
