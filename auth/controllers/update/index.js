let updater = require("./updater");
let generatePassword = require("../../utils/generatePassword");
let loginAuthenticator = require("../login/loginAuthenticator");
let userFinder = require('../login/findEntry')
let userUpdate = require('./userUpdate')
let successResponse = require('../../utils/successResponse')

let handleUpdate = updater(
    loginAuthenticator,
    generatePassword,
    userFinder,
    userUpdate,
    successResponse
)

module.exports = { handleUpdate }