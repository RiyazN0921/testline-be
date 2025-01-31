const express = require('express')

const quizRouter = require('./quiz.routes')

const mainRouter = express.Router()

mainRouter.get('/status', (req, res) => {
  res.json({ message: 'server is live' })
})

mainRouter.use('/quiz', quizRouter)

module.exports = mainRouter
