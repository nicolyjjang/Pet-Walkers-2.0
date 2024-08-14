const Contato = require('../models/contato');

const postContato = async (req, res) => {
    try {
        const { nome, telefone, email, mensagem, endereco } = req.body;

        // Crie um novo registro de Contato
        const newContato = await Contato.create({
            nome,
            telefone,
            email,
            mensagem,
            endereco
        });

        res.status(201).json(newContato); // Retorne o novo Contato
    } catch (error) {
        console.error('Erro ao criar contato:', error);
        res.status(500).json({ error: 'Erro ao criar contato' });
    }
};

module.exports = postContato;
