const Sequelize = require('sequelize');
require('dotenv').config();
const nodeEnv = process.env.NODE_ENV;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
})
// Verifica se o ambiente está apontando para máquina do desenvolvedor
if (nodeEnv === ('local') || nodeEnv === null) {
    // Verifica se ja existe um database pet_walkers em desenvolvimento local antes de iniciar
    const mysql = require('mysql2/promise');
    mysql.createConnection({
        debug: false,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
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