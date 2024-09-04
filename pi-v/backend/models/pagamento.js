const Sequelize = require('sequelize')
const db = require('../config/db')

const Pagamento = db.define('pagamento',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_pedido: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: 'pedidos',
            key: 'id'
        }          
    },
    numero_cartao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cvv: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mes_expiracao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ano_expiracao: {
        type: Sequelize.STRING,
        allowNull: false,
    },    
    valor: { 
        type: Sequelize.INTEGER,
        allowNull:false
    },    
    status: {
        type: Sequelize.STRING,
        allowNull:false        
    }
})

module.exports = Pagamento;