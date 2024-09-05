const Sequelize = require('sequelize')
const db = require('../config/db')

const Pedido = db.define('pedido',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull:false,       
    },
    valor_total: { 
        type: Sequelize.INTEGER,
        allowNull:false
    },
    status: {
        type: Sequelize.STRING,
        allowNull:false        
    }
})

module.exports = Pedido;