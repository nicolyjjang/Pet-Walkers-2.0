const Cliente = require('../models/cliente');
const User = require('../models/usuario');

const getCliente = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('id do cliente: ' + id)
        const cliente = await Cliente.findOne({
            where: {
                id: id
            },
            include: [{
                model: User,
                required: true
            }]
        });

        if (cliente === null) {
            res.status(500).json({ error: 'Cliente não encontrado' });
        } else {
            res.status(201).json(cliente);
        }
    } catch (error) {
        console.error('Erro ao obter cliente:', error);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
};

const atualizaCliente = async (req, res) => {
    try {
        const { id, nome_cliente, cpf, telefone, sexo, email, senha, pet1, pet2, idade, endereco } = req.body;

        const user = await User.findByPk(id);
        if (user) {
            user.email = email;
            await user.save(); // Salve as alterações no banco de dados
            console.log('Usuário atualizado com sucesso!');
        } else {
            console.log('Usuário não encontrado.');
        }
        const cliente = await Cliente.findByPk(id);
        if (cliente) {
            cliente.nome_cliente = nome_cliente;
            cliente.cpf = cpf;
            cliente.telefone = telefone;
            cliente.sexo = sexo;
            cliente.pet1 = pet1;
            cliente.pet2 = pet2;
            cliente.idade = idade;
            cliente.endereco = endereco;
            await cliente.save(); // Salve as alterações no banco de dados
            console.log('Cliente atualizado com sucesso!');
        } else {
            console.log('Cliente não encontrado.');
        }
        const combinedJson = { ...user, ...cliente };
        res.status(201).json(combinedJson); // Retorne o usuário Cliente atualizado
    } catch (error) {
        console.error('Erro ao atualizar Cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar Cliente' });
    }
};

const postCliente = async (req, res) => {
    try {
        const { nome_cliente, cpf, telefone, sexo, email, senha, pet1, pet2, idade, endereco } = req.body;
        const tipo = 'cliente'
        const newUser = await User.create({
            email,
            senha,
            tipo
        });
        const id = newUser.id;
        // Crie um novo registro de Cliente
        const newCliente = await Cliente.create({
            id,
            nome_cliente,
            cpf,
            telefone,
            sexo,
            pet1,
            pet2,
            idade,
            endereco
        });

        const combinedJson = { ...newUser, ...newCliente };
        res.status(201).json(combinedJson); // Retorne o usuário cliente 
    } catch (error) {
        console.error('Erro ao criar Cliente:', error);
        res.status(500).json({ error: 'Erro ao criar Cliente' });
    }
};

module.exports = { postCliente, getCliente, atualizaCliente };
