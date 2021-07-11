const getPagination = (page, size) => {
    const limit = size ? +size : 10
    const offset = page ? page * limit : 0
    return {
        limit,
        offset
    }
}

exports.saveOne = async (req, res) => {
    const response = new req.db.ResponseItem({
        designation: req.body.designation,
        score: req.body.score,
        surveyResponses: req.body.surveyResponses
    })

    await response
        .save()
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).send({
                message: err
            })
        })
}

exports.retrieveAll = async (req, res) => {
    const { page, size } = req.query
    const { limit, offset } = getPagination(page, size)

    await req.db.ResponseItem.paginate(
        {},
        {
            offset,
            limit,
            sort: { createdAt: -1 }
        }
    )
        .then(data => {
            res.status(200).send({
                totalItems: data.totalDocs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
                responseList: data.docs
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err
            })
        })
}

exports.findOne = async (req, res) => {
    const { designation } = req.params

    await req.db.ResponseItem.findOne({
        designation: designation
    })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Not Found`
                })
            } else {
                res.status(200).send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err
            })
        })
}
