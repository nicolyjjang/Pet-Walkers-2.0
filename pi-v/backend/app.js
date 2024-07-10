const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json()); // Habilita o parsing de JSON
app.use(cors());

// Importe o arquivo de rotas do Cadastro de Clientes
const clienteRoutes = require('./routes/cliente.js');

// Use as rotas definidas no arquivo cliente.js
app.use(clienteRoutes);

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: https://localhost:8080");
});
