const db = require('../models')
const dbUrl = process.env.MONGODB_URL

exports.connectToDatabase = async () => {
    await db.mongoose
        .connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex: true
        })
        .then(() => {
            console.log(`Connected to base-server database!`)
            return true
        })
        .catch(e => {
            console.log(`Unable to connect to database, error: `, e.message)
            process.exit()
        })
}
