const Date = require('./Date')
const Order = require("./Order")
const Service = require('./Service')
const Client = require('./Client')
const Provider = require('./Provider')


Service.hasMany(Order, { sourceKey: "id", foreignKey: "serviceId" });
Order.belongsTo(Service, { targetKey: "id", foreignKey: "serviceId" });

Client.hasMany(Order, { sourceKey: "user", foreignKey: "client" })
Order.belongsTo(Client, { targetKey: "user", foreignKey: "client" })

Provider.hasMany(Order, { sourceKey: "user", foreignKey: "provider" })
Order.belongsTo(Provider, { targetKey: "user", foreignKey: "provider" })



Provider.hasMany(Service, { sourceKey: "user", foreignKey: "provider" })
Service.belongsTo(Provider, { targetKey: "user", foreignKey: "provider" })

Service.hasOne(Date);
Date.belongsTo(Service);

module.exports = { Date, Order, Service, Client, Provider }