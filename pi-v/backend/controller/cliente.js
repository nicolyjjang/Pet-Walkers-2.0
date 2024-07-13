const Cliente = require('../models/cliente');

const getCliente = async (req, res) => {
    res.send("Teste GET com sucesso");
}

const postCliente = async (req, res) => {
    try {
        const { nome_cliente, cpf, telefone, sexo, email, senha, pet1, pet2, idade, endereco } = req.body;

        // Crie um novo registro de Cliente
        const newCliente = await Cliente.create({
            nome_cliente,
            cpf,
            telefone,
            sexo,
            email,
            senha,
            pet1,
            pet2,
            idade,
            endereco
        });

        res.status(201).json(newCliente); // Retorne o novo Cliente criado
    } catch (error) {
        console.error('Erro ao criar Cliente:', error);
        res.status(500).json({ error: 'Erro ao criar Cliente' });
    }
};

module.exports = { postCliente, getCliente };
