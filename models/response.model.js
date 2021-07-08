const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

module.exports = (() => {
    const ninjaResponse = mongoose.Schema({
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
            rank: {
                type: String,
                trim: true,
                required: true
            },
            ninjaResponses: [ninjaResponse]
        },
        { timestamps: true }
    )

    responseSchema.plugin(mongoosePaginate)

    const Response = mongoose.model('Response', responseSchema)

    return Response
})()
