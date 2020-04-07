const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Customer extends Model { }

Customer.init({
    customer_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your first name'
            }
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your last name'
            }
        }
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'Please enter your email address'
            }
        }
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'customer' })

module.exports = Customer