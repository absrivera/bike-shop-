const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Product extends Model { }

Product.init({
    product_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    model_year: {
        type: DataTypes.INTEGER
    },
    list_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, { sequelize, modelName: 'product' , timestamps: false})


module.exports = Product