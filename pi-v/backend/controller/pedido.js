const Pedido = require('../models/pedido');
const DetalhePedido = require('../models/detalhePedido');

const postPedido = async (req, res) => {
    try {
        const { user, listaItensPedido } = req.body;
        let valor_total;
        jsonObject.listaItensPedido.servicosSelecionados.forEach(item => {
          valor_total = valor_total + item.preco;
        });
        const user_id = user.id;
        const status = 'processado'
        const newPedido = await Pedido.create({
            user_id,
            valor_total,
            status
        });
        // TODO criar o detalhe do pedido
        res.status(201).json(newPedido); // Retorne o usuário Walker 
    } catch (error) {
        console.error('Erro ao criar Pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar Pagamento' });
    }
};

module.exports = postPedido;