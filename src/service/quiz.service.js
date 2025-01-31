const QuizModel = require('../model/quiz.model')

const quizHistoryModel = require('../model/quizHistory.model')

const quizSubmissionModel = require('../model/quizSubmission.model')

const axios = require('axios')

const QUIZ_URL = 'https://www.jsonkeeper.com/b/LLQT'
const QUIZ_SUBMISSION_URL = 'https://api.jsonserve.com/rJvd7g'
const QUIZ_HISTORY_URL = 'https://api.jsonserve.com/XgAgFJ'

async function insertQuizzes() {
  try {
    const response = await axios.get(QUIZ_URL)
    const quizzes = response.data.quiz

    await QuizModel.insertMany(quizzes)
    return { message: 'Quizzes inserted successfully' }
  } catch (error) {
    throw new Error(`Error inserting quizzes: ${error.message}`)
  }
}

async function insertQuizSubmissions() {
  try {
    const response = await axios.get(QUIZ_SUBMISSION_URL)
    const quizSubmissions = response.data

    if (!Array.isArray(quizSubmissions)) {
      throw new Error('Invalid data format: Expected an array.')
    }

    await quizSubmissionModel.insertMany(quizSubmissions)
    return { message: 'Quiz submissions inserted successfully' }
  } catch (error) {
    throw new Error(`Error inserting quiz submissions: ${error.message}`)
  }
}

async function insertQuizHistory() {
  try {
    const response = await axios.get(QUIZ_HISTORY_URL)
    const quizHistory = response.data

    if (!Array.isArray(quizHistory)) {
      throw new Error('Invalid data format: Expected an array.')
    }

    await quizHistoryModel.insertMany(quizHistory)
    return { message: 'Quiz history inserted successfully' }
  } catch (error) {
    throw new Error(`Error inserting quiz history: ${error.message}`)
  }
}

async function getPerformanceData(userId) {
  const performance = await quizSubmissionModel.aggregate([
    { $match: { user_id: userId } },
    {
      $group: {
        _id: { topic: '$topic', difficulty: '$difficulty_level' },
        avgScore: { $avg: '$score' },
        avgAccuracy: { $avg: { $toDouble: '$accuracy' } },
        attempts: { $sum: 1 },
      },
    },
    { $sort: { '_id.difficulty': 1 } },
  ])
  return performance
}

async function generateInsights(userId) {
  const history = await quizHistoryModel.find({ user_id: userId })

  let weakTopics = {}
  let improvements = {}
  let performanceGaps = {}

  history.forEach((attempt) => {
    if (attempt.accuracy < 50) {
      weakTopics[attempt.topic] = (weakTopics[attempt.topic] || 0) + 1
    }
    if (attempt.correct_answers > attempt.incorrect_answers) {
      improvements[attempt.topic] = (improvements[attempt.topic] || 0) + 1
    }
  })

  return { weakTopics, improvements, performanceGaps }
}

async function predictNEETRank(userId, lastYearRank) {
  const submissions = await quizSubmissionModel.find({ user_id: userId })

  let avgScore = 0,
    avgAccuracy = 0
  if (submissions.length) {
    avgScore =
      submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length
    avgAccuracy =
      submissions.reduce((sum, s) => sum + parseFloat(s.accuracy), 0) /
      submissions.length
  }

  let predictedRank = lastYearRank - avgAccuracy * 10 + (100 - avgScore) * 2

  return { predictedRank: Math.max(1, predictedRank) }
}

module.exports = {
  getPerformanceData,
  generateInsights,
  predictNEETRank,
  insertQuizzes,
  insertQuizSubmissions,
  insertQuizHistory,
}
