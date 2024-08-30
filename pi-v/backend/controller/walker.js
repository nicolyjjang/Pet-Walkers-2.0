const Walker = require('../models/walker');
const User = require('../models/usuario');
const path = require('path');
const Sequelize = require('sequelize');


const postWalker = async (req, res) => {
    try {
        const { nome_tutor, cpf, telefone, email, senha, endereco } = req.body;
        const tipo = 'walker'
        const newUser = await User.create({
            email,
            senha,
            tipo
        });
        const id = newUser.id;
        // Crie um novo registro de Walker
        const newWalker = await Walker.create({
            id,
            nome_tutor,
            cpf,
            telefone,
            endereco
        });

        res.status(201).json(newWalker); // Retorne o novo usuário Walker
    } catch (error) {
        console.error('Erro ao criar walker:', error);
        res.status(500).json({ error: 'Erro ao criar walker' });
    }
};
const getWalker = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('id: ' + JSON.stringify(id));
        const walker = await Walker.findOne({
            where: {
                id: id
            },
            include: [{
                model: User,
                required: true
              }]         
        });

    if (walker === null) {
        res.status(500).json({ error: 'Walker não encontrado' });
    } else {
        console.log(walker); // 'exampleUser'
        res.status(201).json(walker);
    }
} catch (error) {
    console.error('Erro ao obter walker:', error);
    res.status(500).json({ error: 'Erro ao buscar walker' });
}
};

module.exports = { postWalker, getWalker };