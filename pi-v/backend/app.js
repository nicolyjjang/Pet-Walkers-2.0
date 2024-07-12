const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json()); // Habilita o parsing de JSON
app.use(cors());
require('dotenv').config();
const nodeEnv = process.env.NODE_ENV;

// Verifica se o ambiente está apontando para máquina do desenvolvedor
if (nodeEnv === ('local')) {
    // Verifica se ja existe um database pet_walkers em desenvolvimento local antes de iniciar
    const mysql = require('mysql2/promise');
    mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        port: '3306'
    }).then((connection) => {
        connection.query('CREATE DATABASE IF NOT EXISTS pet_walkers;').then(() => {
            chamarRotas();
        }).catch(function (e) {
            console.error(e)
        })
    });
}else{
    chamarRotas();
}
function chamarRotas() {
    // Importe o arquivo de rotas do Cadastro de Clientes
    const clienteRoutes = require('./routes/cliente.js');

    // Use as rotas definidas no arquivo cliente.js
    app.use(clienteRoutes);

    app.listen(8080, () => {
        console.log("Servidor iniciado na porta 8080: https://localhost:8080");
    });
}