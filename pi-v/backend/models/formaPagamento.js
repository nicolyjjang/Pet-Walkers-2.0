const Sequelize = require('sequelize')
const db = require('../config/db')

const FormaPagamento = db.define('forma_pagamento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero_cartao: {
        type: Sequelize.STRING,
        unique: true,
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
})

module.exports = FormaPagamento;