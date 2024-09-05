const Sequelize = require('sequelize')
const db = require('../config/db')

const Newsletter = db.define('newsletter',{
    nome: {
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey: true
    },  
})

module.exports = Newsletter;