const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    exposedHeaders: 'Authorization',
    credentials: true // Permite o envio de cookies
};
app.use(cors(corsOptions));
app.use(express.json()); // Habilita o parsing de JSON
require('dotenv').config();
const session = require('express-session');
const sessionStore = require('./config/session');
const nodeEnv = process.env.NODE_ENV;
const secret = process.env.SESSION_SECRET;

// Verifica se o ambiente está apontando para máquina do desenvolvedor
if (nodeEnv === ('local')) {
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
            chamarRotas();
        }).catch(function (e) {
            console.error(e)
        })
    });
} else {
    chamarRotas();
}
// Configurar o middleware para sessões
app.use(session({
    secret: secret, 
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false } // Defina como true em produção com HTTPS
}));
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: https://localhost:8080");
});
function chamarRotas() {
    // Importe o arquivo de rotas do Cadastro de Clientes
    const clienteRoutes = require('./routes/cliente.js');
    const walkerRoutes = require('./routes/walker.js');
    const loginRoutes = require('./routes/login.js');
    const contatoRoutes = require('./routes/contato.js');

    // Use as rotas definidas no arquivo cliente.js
    app.use(clienteRoutes);
    app.use('/walker', walkerRoutes);
    app.use('/login', loginRoutes);
    app.use(contatoRoutes);
}