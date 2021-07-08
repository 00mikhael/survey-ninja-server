require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { connectToDatabase } = require('./config/db.config')

const appUrl = process.env.APP_URL
const app = express()

const {
    responseRouter,
} = require('./routes')

const db = async _ => {
    await connectToDatabase()
}
db()

app.use(
    cors({
        origin: appUrl
    })
)

app.use(logger(`${app.get('env') === 'production' ? 'combined' : 'dev'}`))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/responses', responseRouter)
app.get(['/', '/api'], (req, res) => {
    res.redirect('/api/responses')
})

app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    res.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500).send({
        status: err.status,
        message: err.message
    })
})

module.exports = app
