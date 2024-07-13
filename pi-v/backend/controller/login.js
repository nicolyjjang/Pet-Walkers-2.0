const sequelize = require('../models/db');

const { QueryTypes } = require('sequelize');

const postLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log(req.body)
        const query = 'SELECT COUNT(*) AS total FROM (SELECT nome_cliente FROM clientes WHERE email = :email and senha = :senha UNION SELECT nome_tutor FROM walkers  WHERE email = :email and senha = :senha) as UNIAO';

        const [resultados] = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: { email, senha }, // Passando o parâmetro
        });
        console.log('resultados',resultados)
        if (resultados.total > 0 ) {
            res.status(201).json('Login Efetuado com sucesso!');
        } else{
            res.status(201).json('Usuário/Senha incorreto');
        }
    } catch (error) {
        console.error('Erro ao consultar usuario/senha:', error);
        res.status(500).json({ error: 'Erro ao ao consultar usuario/senha' });
    }
};

module.exports = postLogin;

