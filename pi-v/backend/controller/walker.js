const Walker = require('../models/walker');

const postWalker = async (req, res) => {
    try {
        const { nome_tutor, cpf, telefone, email, senha, endereco } = req.body;

        // Crie um novo registro de Walker
        const newWalker = await Walker.create({
            nome_tutor,
            cpf,
            telefone,
            email,
            senha,
            endereco
        });

        res.status(201).json(newWalker); // Retorne o novo usuário Walker
    } catch (error) {
        console.error('Erro ao criar walker:', error);
        res.status(500).json({ error: 'Erro ao criar walker' });
    }
};

module.exports = postWalker;
