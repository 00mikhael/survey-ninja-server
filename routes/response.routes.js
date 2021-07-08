const router = require('express').Router()
const expressDomain = require('express-domain-middleware')

const { database, headers } = require('../middleware')

router.use(expressDomain)
router.use(database)
router.use(headers)

const { responseValidator } = require('../middleware')
const { responseController } = require('../controllers')

router.delete('/', responseValidator.denyAccess)

router.put('/', responseValidator.denyAccess)

router.patch('/', responseValidator.denyAccess)

// Save response
router.post(
    '/',
    [
        responseValidator.checkCreateDetails,
        responseValidator.checkNinjaResponseExist
    ],
    responseController.saveOne
)

// Retrieve all response
router.get('/', responseController.retrieveAll)

// Retrieve one by designation
router.get(
    '/:designation',
    [responseValidator.checkGetDetails],
    responseController.findOne
)

module.exports = router
