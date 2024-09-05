const Sequelize = require('sequelize')
const db = require('../config/db')

const Disponibilidade = db.define('disponibilidade',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,          
    },
    segunda: {
        type: Sequelize.STRING,
        allowNull:false
    },
    terca: {
        type: Sequelize.STRING,
        allowNull:false
    },
    quarta: {
        type: Sequelize.STRING,
        allowNull:false
    },
    quinta: {
        type: Sequelize.STRING,
        allowNull:false
    },
    sexta: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Disponibilidade;