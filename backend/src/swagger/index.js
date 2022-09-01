let swaggerUI = require('swagger-ui-express')
let yaml = require('yamljs')
let config = yaml.load('./swagger-config.yaml')
let express = require('express')
let router = express.Router()
router.use('/', swaggerUI.serve, swaggerUI.setup(config))

module.exports = router