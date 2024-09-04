const Sequelize = require('sequelize');
require('dotenv').config();
const nodeEnv = process.env.NODE_ENV;

const sequelize = new Sequelize("pet_walkers", "root", "password", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})
// Verifica se o ambiente está apontando para máquina do desenvolvedor
if (nodeEnv === ('local') || nodeEnv === null) {
    // Verifica se ja existe um database pet_walkers em desenvolvimento local antes de iniciar
    const mysql = require('mysql2/promise');
    mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        port: '3306',
        debug: false
    }).then((connection) => {
        connection.query('CREATE DATABASE IF NOT EXISTS pet_walkers;').then(() => {
            // Autenticar no BD
            sequelize.authenticate()
                .then(function () {
                    console.log("Conexão com o bd realizada com sucesso!")
                }).catch(function (error) {
                    console.log("Erro: Conexão com o bd não realizada com sucesso!" + error)
                })
        }).catch(function (e) {
            console.error(e)
        })
    })
}
else {
    // Autenticar no BD
    sequelize.authenticate()
        .then(function () {
            console.log("Conexão com o bd realizada com sucesso!")
        }).catch(function (error) {
            console.log("Erro: Conexão com o bd não realizada com sucesso!" + error)
        })
}

module.exports = sequelize;