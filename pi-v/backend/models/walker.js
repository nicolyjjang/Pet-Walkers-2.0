const Sequelize = require('sequelize')
const db = require('./db')

const Walker = db.define('walker',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    senha: { 
        type: Sequelize.STRING,
        allowNull:false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull:true
    },    

})

// Criar a tabela
db.sync({ alter: true });

module.exports = Walker;