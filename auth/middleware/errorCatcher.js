let errorResponse = require("../utils/errorResponse")

function errorCatcher(error, req, res, next) {
    process.env.NODE_ENV === "development" && console.log(error)
    let { status, message } = error
    if (error.name && error.parent) return res.status(400).send(errorResponse("User database error"))
    if (status && message) return res.status(status).send(errorResponse(message))
    else return res.status(500).send(errorResponse("Unexpected error"))
}

module.exports = errorCatcher