const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class ProductBrand extends Model { }

ProductBrand.init({
    brand_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
    
}, { sequelize, modelName: 'productBrand', timestamps: false})

module.exports = ProductBrand