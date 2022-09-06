const { Sequelize } = require("sequelize")
const config = require('./config')
const sequelize = new Sequelize(config[process.env.NODE_ENV])
sequelize.sync({force:true})



module.exports = sequelize