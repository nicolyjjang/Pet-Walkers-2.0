const Sequelize = require('sequelize')

const sequelize = new Sequelize("pet_walkers", "root", "password", {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o bd realizada com sucesso!")
}).catch(function(){
    console.log("Erro: Conexão com o bd não realizada com sucesso!")
})

module.exports = sequelize;