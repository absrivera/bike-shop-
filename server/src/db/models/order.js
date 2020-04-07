const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Order extends Model { }

Order.init({
    order_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    
}, { sequelize, modelName: 'order'})

module.exports = Order