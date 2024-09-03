const Sequelize = require('sequelize');

const sequelize = new Sequelize("pet_walkers", "root", "password", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false    
})
// Autenticar no BD
sequelize.authenticate()
    .then(function () {
        console.log("Conexão com o bd realizada com sucesso!")
    }).catch(function (error) {
        console.log("Erro: Conexão com o bd não realizada com sucesso!" + error)
    })

module.exports = sequelize;