const sequelize = require('../models/db');

const { QueryTypes } = require('sequelize');

const postLogin = async (req, res) => {
    try {
        const { email, senha, tipo } = req.body;
        console.log('passei aqui');
        console.log(tipo);
        var query;
        if (tipo === 'cliente') {
            query = 'SELECT * FROM clientes WHERE email = :email and senha = :senha;';    
        } else if (tipo === 'walker') {
            query = 'SELECT * FROM walkers WHERE email = :email and senha = :senha;';    
        } else{
            res.status(500).json({error : 'Tipo de usuário não identificado'})
        }
        const [result] = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: { email, senha }, // Passando o parâmetro
        });
        if (result) {
            //res.status(201).json('Login Efetuado com sucesso! ' + id);
            if (tipo === 'cliente'){
                //res.redirect(`/cliente/${id}/informacoes-pessoais-cliente.html`)
                //res.redirect(`/informacoes-pessoais-cliente.html`)
                const obj = { name: "John", age: 30, city: "New York" };
                res.redirect(`/cliente/${result.id}`)
            } else {
                const id = result.id;
                const obj = { tipo: "walker", id: id };
                console.log(obj);
                res.status(200).json(obj);
                //res.redirect(`/walker/${result.id}`)
            }
        } else{
            res.status(401).json('Usuário/Senha incorreto');
        }
    } catch (error) {
        console.error('Erro ao consultar usuario/senha:', error);
        res.status(500).json({ error: 'Erro ao ao consultar usuario/senha' });
    }
};

module.exports = postLogin;

