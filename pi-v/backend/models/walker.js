const Sequelize = require('sequelize')
const db = require('../config/db')

const Walker = db.define('walker',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'usuarios',
            key: 'id'
        }             
    },
    nome_tutor: {
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
    endereco:{
        type: Sequelize.STRING,
        allowNull:true
    },    

})

module.exports = Walker;