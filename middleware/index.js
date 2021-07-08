const database = require('./db.middleware')
const headers = require('./headers.middleware')
const responseValidator = require('./response.middleware')

module.exports = {
    database,
    headers,
    responseValidator
}
