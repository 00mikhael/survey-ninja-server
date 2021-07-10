const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

module.exports = (() => {
    const surveyResponse = mongoose.Schema({
        question: {
            type: String,
            trim: true,
            required: true
        },
        response: {
            type: String,
            trim: true,
            required: true
        },
        correctAnswer: {
            type: String,
            trim: true,
            required: true
        }
    })

    const responseSchema = mongoose.Schema(
        {
            designation: {
                type: String,
                trim: true,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            surveyResponses: [surveyResponse]
        },
        { timestamps: true }
    )

    responseSchema.plugin(mongoosePaginate)

    const ResponseItem = mongoose.model('ResponseItem', responseSchema)

    return ResponseItem
})()
