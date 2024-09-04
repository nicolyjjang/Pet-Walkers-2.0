const Pagamento = require('../models/pagamento');
const pagarme = require('pagarme');

//const pagarmeClient = pagarme.client.connect({ api_key: 'SUA_CHAVE_API' });

const postPagamento = async (req, res) => {
  try {
    console.log('Pagamento: ' + JSON.stringify(req.body))
    const { id_pedido, numero_cartao, cvv, mes_expiracao, ano_expiracao, valor, status } = req.body;
/*     pagarmeClient.transaction.create({
      amount,
      payment_method,
      card_number,
      card_expiration_date,
      card_cvv,
    }).then(transaction => {
 */
      Pagamento.create({
        id_pedido,
        numero_cartao,
        cvv,
        mes_expiracao,
        ano_expiracao,
        valor,
        status
      }).then(response => {
        res.status(200).json(response);
      }).catch(error => {
        console.error('Erro ao processar pagamento:', error);
        res.status(500).json({ error: 'Erro ao processar pagamento no db' })
      });
/*     }).catch(error => {
      console.error('Erro ao processar pagamento:', error);
      res.status(500).json({ error: 'Erro ao processar pagamento pagarme' })
    }); */

  } catch (error) {
    console.error('Erro ao criar Pagamento:', error);
    res.status(500).json({ error: 'Erro ao criar Pagamento' });
  }
};


module.exports = postPagamento;