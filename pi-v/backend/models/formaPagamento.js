const Sequelize = require('sequelize')
const db = require('../config/db')

const FormaPagamento = db.define('forma_pagamento', {
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero_cartao: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
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