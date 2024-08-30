const Sequelize = require('sequelize')
const db = require('../config/db')

const Usuario = db.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    senha: { 
        type: Sequelize.STRING,
        allowNull:false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull:false        
    }
})

// Criar a tabela
db.sync({ alter: true });

module.exports = Usuario;