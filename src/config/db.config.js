require('dotenv').config()

const mongoose = require('mongoose')

exports.dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database connection established')
  } catch (error) {
    console.log(error)
  }
}
