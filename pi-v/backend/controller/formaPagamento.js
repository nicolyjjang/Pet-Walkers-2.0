const FormaPagamento = require('../models/formaPagamento');

const postFormaPagamento = async (req, res) => {
    try {
      const { id_usuario, tipo, numero_cartao, cvv, mes_expiracao, ano_expiracao } = req.body;
      const newFormaPagamento = await FormaPagamento.create({
            id_usuario,
            tipo,
            numero_cartao,
            cvv,        
            mes_expiracao,
            ano_expiracao
        });
        res.status(201).json(newFormaPagamento); // Retorne o usuário Walker 
    } catch (error) {
        console.error('Erro ao criar Pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar Pagamento' });
    }
};

module.exports = postFormaPagamento;