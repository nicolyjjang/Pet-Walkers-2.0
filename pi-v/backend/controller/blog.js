const sendMail = require('../utils/mailer');
const Newsletter = require('../models/newsletter');

const postNovidades = async (req, res) => {
    const { nome, email } = req.body;

    // Crie um novo registro de Contato
    const corpoEmail = `Olá, ${nome}!
Bem-vindo à nossa newsletter! Estamos empolgados em compartilhar com você as últimas notícias, atualizações e ofertas exclusivas.

Neste mês, você encontrará:

Novo conteúdo em nosso blog
Ofertas especiais para assinantes
Notícias sobre nossos produtos
Não perca nossas atualizações!`
    Newsletter.create({
        nome,
        email
    }).then( result => {
        sendMail(email, 'PetWalkers News!', corpoEmail).then( result => {
            console.log('enviou resposta' + result)
        })
        res.send(result);
    }).catch(error => {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(500).json({ mensagem: 'Já existe um email cadastrado!', tag: 'duplicate' });
        } else {
            console.error('Erro ao criar contato:', error);
            res.status(500).json({ mensagem: 'Erro inesperado ao enviar email' });
        }
    })
};

module.exports = postNovidades;
