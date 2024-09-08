const Pagamento = require('../models/pagamento');
const axios = require('axios');
require('dotenv').config();
const MOCKY_URL = process.env.MOCKY_URL;

const postPagamento = async (req, res) => {
  try {
    const { id_pedido, numero_cartao, cvv, mes_expiracao, ano_expiracao, valor, status, nome_titular } = req.body;

    const descricao = 'Pagamento Mock';
    const data_expiracao = mes_expiracao + '/' + ano_expiracao;

    //Acionar API de pagamentos de teste
    axios.post(MOCKY_URL, {
      valor,
      descricao,
      nome_titular,
      numero_cartao,
      data_expiracao,
      cvv
    }).then((resposta) => {
      console.log('Retorno da API de Pagamentos: ' + JSON.stringify(resposta.data))
      Pagamento.create({
        id_pedido,
        numero_cartao,
        cvv,
        mes_expiracao,
        ano_expiracao,
        valor,
        nome_titular,
        status,
      }).then(response => {
        res.status(200).json(response);
      }).catch(error => {
        console.error('Erro ao processar pagamento:', error);
        res.status(500).json({ error: 'Erro ao processar pagamento no db' })
      });
    }).catch(error => {
      console.error('Erro ao processar API pagamento MOCKY:', error);
      res.status(500).json({ error: 'Erro ao processar pagamento pagarme' })
    });

  } catch (error) {
    console.error('Erro ao criar Pagamento:', error);
    res.status(500).json({ error: 'Erro ao criar Pagamento' });
  }
};


module.exports = postPagamento;