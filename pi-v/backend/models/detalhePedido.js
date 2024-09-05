const Sequelize = require('sequelize')
const db = require('../config/db')

const DetalhePedido = db.define('detalhe_pedido',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_pedido: {
        type: Sequelize.INTEGER,
        allowNull:false,        
    },
    valor: { 
        type: Sequelize.INTEGER,
        allowNull:false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull:false        
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull:false        
    },
})

module.exports = DetalhePedido;