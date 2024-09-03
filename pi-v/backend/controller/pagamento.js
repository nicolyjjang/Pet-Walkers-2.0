const Pagamento = require('../models/pagamento');

const postPagamento = async (req, res) => {
    try {
        const { id_pedido, id_forma_pagamento, valor, status } = req.body;
        const newPagamento = await Pagamento.create({
            id_pedido,
            id_forma_pagamento,
            valor,
            status        
        });
        res.status(201).json(newPagamento); // Retorne o usuário Walker 
    } catch (error) {
        console.error('Erro ao criar Pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar Pagamento' });
    }
};

const postProcessarPagamento = async (req, res) => {
    try {
        const client = await pagarme.client.connect({ api_key: 'sua_chave_api_do_pagarme' });
        const transaction = await client.transactions.create({
          amount: amount,
          card_hash: cardHash,
          customer: {
            external_id: '#123456789',
            name: req.session.user.username,
            type: 'individual',
            country: 'br',
            email: 'email@cliente.com',
            documents: [
              {
                type: 'cpf',
                number: '00000000000',
              },
            ],
            phone_numbers: ['+5511999999999'],
            birthday: '1965-01-01',
          },
          billing: {
            name: 'Nome do Pagador',
            address: {
              country: 'br',
              state: 'sp',
              city: 'São Paulo',
              neighborhood: 'Bairro',
              street: 'Rua',
              street_number: '123',
              zipcode: '01001000',
            },
          },
          shipping: {
            name: 'Nome do Recebedor',
            fee: 1000,
            delivery_date: '2024-09-01',
            expedited: true,
            address: {
              country: 'br',
              state: 'sp',
              city: 'São Paulo',
              neighborhood: 'Bairro',
              street: 'Rua',
              street_number: '123',
              zipcode: '01001000',
            },
          },
          items: items.map(item => ({
            id: item.id,
            title: item.name,
            unit_price: item.price,
            quantity: item.quantity,
            tangible: true,
          })),
        });
    
      
      } catch (error) {
        res.status(500).send({ success: false, error: error.message });
      }
};

module.exports = { postPagamento, postProcessarPagamento };