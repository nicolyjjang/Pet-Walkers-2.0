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
        console.error('Erro ao criar Forma de Pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar Forma de Pagamento' });
    }
};
const getFormasPagamento = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const formasPagamento = await FormaPagamento.findAll({
            where: {
                id_usuario: id_usuario
            }
        })
        console.log(formasPagamento)
        res.json(formasPagamento)
    } catch (error) {
        console.error('Erro ao buscar formas de pagamento por usuário', error);
        res.status(500).json({ error: 'Erro ao buscar formas de pagamento por usuário' });
    }
}
module.exports = { postFormaPagamento, getFormasPagamento};