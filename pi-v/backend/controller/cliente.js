const Cliente = require('../models/cliente');

const getCliente = async (req, res) => {
    res.send("Teste GET com sucesso");
}

const postCliente = async (req, res) => {
    try {
        const { nome_tutor, cpf, telefone, sexo, email, senha, pet1, pet2, idade, endereco } = req.body;

        // Crie um novo registro de usuário
        const newUser = await Cliente.create({
            nome_tutor,
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

        res.status(201).json(newUser); // Retorne o novo usuário criado
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

module.exports = { postCliente, getCliente };
