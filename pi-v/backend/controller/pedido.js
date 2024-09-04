const Pedido = require('../models/pedido');
const DetalhePedido = require('../models/detalhePedido');

const postPedido = async (req, res) => {
    const { id_usuario, selecionados } = req.body;
    var valor_total = 0;
    selecionados.forEach(item => {
        valor_total = valor_total + item.preco;
    });
    const status = 'cadastrado'
    const newPedido = Pedido.create({
        id_usuario,
        valor_total,
        status
    }).then((pedido) => {
        const id = pedido.id
        const detalhePedidoComId = selecionados.map(item => ({
            ...item,        // Mantém os campos existentes
            id_pedido: id,
            quantidade: 1 
        }));
        const detalhePedidoRenomeado = detalhePedidoComId.map(item => ({
            id_pedido: item.id_pedido, 
            descricao: item.nome,
            valor: item.preco,
            quantidade: item.quantidade,
        }));
        DetalhePedido.bulkCreate(detalhePedidoRenomeado).then(() => {
            res.status(201).json(pedido);
        })
    }).catch(error => {
        console.error('Erro ao criar Pedido:', error);
        res.status(500).json({ error: 'Erro ao criar Pedido' });
    })
}

module.exports = postPedido;