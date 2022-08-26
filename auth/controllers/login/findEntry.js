let User = require('../../sequelize/models/User')
let DBError = require("../../utils/DBError")
async function findEntry(user) {
    try {
        let data = await User.findOne({ where: { user } })
        if (!data) throw new DBError(400, "User not found.")
        else return data
    } catch (error) {
        throw error
    }
}
module.exports = findEntry