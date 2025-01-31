const quizService = require('../service/quiz.service')

async function insertQuizzes(req, res) {
  try {
    const result = await quizService.insertQuizzes()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function insertQuizSubmissions(req, res) {
  try {
    const result = await quizService.insertQuizSubmissions()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function insertQuizHistory(req, res) {
  try {
    const result = await quizService.insertQuizHistory()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function getPerformance(req, res) {
  try {
    const { userId } = req.params
    const performance = await quizService.getPerformanceData(userId)
    res.json({ success: true, data: performance })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

async function getInsights(req, res) {
  try {
    const { userId } = req.params
    const insights = await quizService.generateInsights(userId)
    res.json({ success: true, data: insights })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

async function predictRank(req, res) {
  try {
    const { userId } = req.params
    const { lastYearRank } = req.body
    const prediction = await quizService.predictNEETRank(userId, lastYearRank)
    res.json({ success: true, data: prediction })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

module.exports = {
  getPerformance,
  getInsights,
  predictRank,
  insertQuizHistory,
  insertQuizSubmissions,
  insertQuizzes,
}
