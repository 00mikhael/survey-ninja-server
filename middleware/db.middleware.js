const db = require('../models')

const database = async (req, res, next) => {
    req.db = db;
    next();
}

module.exports = database;
