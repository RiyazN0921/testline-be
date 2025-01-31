const express = require('express')

const quizRouter = express.Router()

const quizController = require('../controller/quiz.controller')

quizRouter.post('/insert-quizzes', quizController.insertQuizzes)

quizRouter.post(
  '/insert-quiz-submissions',
  quizController.insertQuizSubmissions,
)

quizRouter.post('/insert-quiz-history', quizController.insertQuizHistory)

quizRouter.get('/performance/:userId', quizController.getPerformance)

quizRouter.get('/insights/:userId', quizController.getInsights)

quizRouter.post('/predict-rank/:userId', quizController.predictRank)

module.exports = quizRouter
