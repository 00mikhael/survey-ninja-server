const denyAccess = (req, res, next) => {
    return res.status(400).send({
        message: 'Bad Request'
    })
}

const checkCreateDetails = async (req, res, next) => {
    if (!req.body.designation) {
        res.status(400).send({
            message: 'Bad Request'
        })
        return
    }

    if (!req.body.score) {
        res.status(400).send({
            message: 'Bad Request'
        })
        return
    }

    if (!req.body.surveyResponses) {
        res.status(400).send({
            message: 'Bad Request'
        })
        return
    }

    next()
}

const checkNinjaResponseExist = async (req, res, next) => {
    await req.db.ResponseItem.findOne({
        designation: req.body.designation
    }).exec(async (err, response) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return
        }

        if (response) {
            res.status(409).send({
                message: 'Ninja survey response exits'
            })
            return
        }
        next()
    })
}

const checkGetDetails = async (req, res, next) => {
    if (!req.params.designation) {
        res.status(400).send({
            message: 'Bad Request'
        })
        return
    }
    next()
}

const responseValidator = {
    denyAccess,
    checkCreateDetails,
    checkNinjaResponseExist,
    checkGetDetails
}

module.exports = responseValidator
