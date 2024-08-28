const Walker = require('../models/walker');
const path = require('path');

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

const getWalkerId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(this.toString(id));
        const walker = await Walker.findByPk(id);
        console.log(walker);
        //res.sendFile(path.join(__dirname, 'public', `informacoes-pessoais-walker.html?param=${id}`));
        res.setHeader('Content-Type', 'text/html') ;
        const filePath = 'informacoes-pessoais-walker.html';
        res.sendFile(filePath, { root: path.join(__dirname, 'public') });
    } catch (error) {
        console.error('Erro ao criar walker:', error);
        res.status(404).send('Erro ao recuperar Walker');
    }
};

module.exports = getWalkerId;
