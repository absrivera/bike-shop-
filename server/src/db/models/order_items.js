const { Model} = require('sequelize')
const sequelize = require('../dbConfig')
class OrderItems extends Model { }

OrderItems.init({
}, { sequelize, modelName: 'orderItems'})

module.exports = OrderItems
