const mongoose = require('mongoose')

const quizHistorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  quiz_id: { type: Number, required: true },
  user_id: { type: String, required: true },
  submitted_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  score: { type: Number, required: true },
  trophy_level: { type: Number, required: true },
  accuracy: { type: String, required: true },
  speed: { type: String, required: true },
  final_score: { type: String, required: true },
  negative_score: { type: String, required: true },
  correct_answers: { type: Number, required: true },
  incorrect_answers: { type: Number, required: true },
  source: { type: String, required: true },
  type: { type: String, required: true },
  started_at: { type: Date, required: true },
  ended_at: { type: Date, required: true },
  duration: { type: String, required: true },
  better_than: { type: Number, required: true },
  total_questions: { type: Number, required: true },
  rank_text: { type: String, required: true },
  mistakes_corrected: { type: Number, required: true },
  initial_mistake_count: { type: Number, required: true },
  response_map: { type: Map, of: Number, required: true },
})

const quizHistoryModel = mongoose.model('QuizHistory', quizHistorySchema)

module.exports = quizHistoryModel
