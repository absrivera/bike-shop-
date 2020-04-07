const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('example', 'abigailrivera', 'root', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions:{
        options: {
            useUTC: false,
            dateFirst: 1
        }
    }
})

module.exports = sequelize