const { DataTypes } = require('sequelize');
const sequelize = require('../index')
const Order = sequelize.define("Order", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
		get() {
			return this.getDataValue("id")
		}
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	value: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	date: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	}
})

module.exports = Order