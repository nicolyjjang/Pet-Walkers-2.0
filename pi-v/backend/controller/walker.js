const Walker = require('../models/walker');
const User = require('../models/usuario');

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
        const combinedJson = { ...newUser, ...newWalker };
        res.status(201).json(combinedJson); // Retorne o usuário Walker 
    } catch (error) {
        console.error('Erro ao criar walker:', error);
        res.status(500).json({ error: 'Erro ao criar walker' });
    }
};
const getWalker = async (req, res) => {
    try {
        const id = req.params.id;
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
            res.status(201).json(walker);
        }
    } catch (error) {
        console.error('Erro ao obter walker:', error);
        res.status(500).json({ error: 'Erro ao buscar walker' });
    }
};

const atualizaWalker = async (req, res) => {
    try {
        const { id, nome_tutor, cpf, telefone, email, endereco } = req.body;

        const user = await User.findByPk(id);
        if (user) {
            user.email = email;
            await user.save(); // Salve as alterações no banco de dados
            console.log('Usuário atualizado com sucesso!');
        } else {
            console.log('Usuário não encontrado.');
        }
        const walker = await Walker.findByPk(id);
        if (walker) {
                walker.nome_tutor = nome_tutor;
                walker.cpf = cpf;
                walker.telefone = telefone;
                walker.endereco = endereco;
            await walker.save(); // Salve as alterações no banco de dados
            console.log('Walker atualizado com sucesso!');
        } else {
            console.log('Walker não encontrado.');
        }
        const combinedJson = { ...user, ...walker };
        res.status(201).json(combinedJson); // Retorne o usuário Walker atualizado
    } catch (error) {
        console.error('Erro ao atualizar walker:', error);
        res.status(500).json({ error: 'Erro ao atualizar walker' });
    }
};

module.exports = { postWalker, getWalker, atualizaWalker };