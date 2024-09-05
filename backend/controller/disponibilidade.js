const Disponibilidade = require('../models/disponibilidade');

const postDisponibilidade = async (req, res) => {
    try {
        const { id, segunda, terca, quarta, quinta, sexta } = req.body;

        const disponibilidade = await Disponibilidade.findByPk(id);
        if (disponibilidade) {
            disponibilidade.segunda = segunda;
            disponibilidade.terca = terca;
            disponibilidade.quarta = quarta;
            disponibilidade.quinta = quinta;
            disponibilidade.sexta = sexta;
            await disponibilidade.save(); // Salve as alterações no banco de dados
            res.status(201).json(disponibilidade); // Retorne o usuário Walker atualizado
        } else {
            const disponibilidade = await Disponibilidade.create({
                id,
                segunda,
                terca,
                quarta,
                quinta,
                sexta
            });        
            res.status(201).json(disponibilidade); // Retorne o usuário Walker atualizado
        }
    } catch (error) {
        console.error('Erro ao atualizar disponibilidade:', error);
        res.status(500).json({ error: 'Erro ao atualizar disponibilidade' });
    }
}

const getDisponibilidade = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const disponibilidade = await Disponibilidade.findOne({
            where: {
                id: id_usuario
            }
        })
        res.json(disponibilidade)
    } catch (error) {
        console.error('Erro ao buscar disponibilidade por usuáro', error);
        res.status(500).json({ error: 'Erro ao buscar disponibilidade por usuáro' });
    }
}
module.exports = { postDisponibilidade, getDisponibilidade };