const sequelize = require('../config/db');
const sessionStore = require('../config/session');
const { QueryTypes } = require('sequelize');

const postLogin = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");  //habilita endereço de servidor frontend
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const { email, senha, tipo } = req.body;
        const query = 'SELECT * FROM usuarios WHERE email = :email and senha = :senha and tipo = :tipo;';
        const [result] = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: { email, senha, tipo },
        });
        if (result) {
            const id = result.id;
            const obj = { tipo: tipo, id: id, email: email };
            req.session.user = obj;
            console.log('session obj ' + JSON.stringify(req.session.user))
            req.session.save(function (err) {
                if (err) return next(err)
                    console.log(err);
            })
            res.status(200).json(obj);
        } else {
            res.status(401).json({ mensagem: 'Usuário/Senha incorreto' });
        }
    } catch (error) {
        console.error('Erro ao consultar usuario/senha:', error);
        res.status(500).json({ error: 'Erro ao ao consultar usuario/senha' });
    }
};

const getSession = (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000"); //habilita endereço de servidor frontend
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   

    if (req.session.user) {
        res.send({ user: req.session.user });
    } else {
        res.send({ user: null });
    }
};

const postLogout = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");  //habilita endereço de servidor frontend
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: 'Erro ao fazer logout' });
        }
        res.send({ message: 'Logout bem-sucedido' });
    });
};

module.exports = { postLogin, getSession, postLogout} ;


