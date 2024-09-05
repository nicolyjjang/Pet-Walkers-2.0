const Sequelize = require('sequelize')
const db = require('../config/db')

const Cliente = db.define('clientes',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,          
    },
    nome_cliente: {
        type: Sequelize.STRING,
        allowNull:false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull:false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull:false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull:true,
        defaultValue: 'Indefinido'
    },
    pet1: {
        type: Sequelize.STRING,
        allowNull:false
    },
    pet2:{
        type: Sequelize.STRING,
        allowNull:true
    },
    idade:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull:true
    },    

})

module.exports = Cliente;