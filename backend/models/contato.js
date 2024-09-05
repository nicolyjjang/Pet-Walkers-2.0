const Sequelize = require('sequelize')
const db = require('../config/db')

const Contato = db.define('contato',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull:false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    mensagem: { 
        type: Sequelize.STRING,
        allowNull:false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull:true
    },    

})

module.exports = Contato;