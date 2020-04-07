const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class ProductCategory extends Model { }

ProductCategory.init({
    category_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    
}, { sequelize, modelName: 'productCategory', timestamps: false})

module.exports = ProductCategory