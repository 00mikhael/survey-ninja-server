const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.ResponseItem = require('./response.model')

module.exports = db
