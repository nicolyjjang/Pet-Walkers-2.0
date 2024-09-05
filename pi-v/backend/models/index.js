const Walker = require('./walker')
const Cliente = require('./cliente')
const Usuario = require('./usuario')
const Contato = require('./contato')
const Pedido = require('./pedido')
const Pagamento = require('./pagamento')
const FormaPagamento = require('./formaPagamento')
const DetalhePedido = require('./detalhePedido')
const Disponibilidade = require('./disponibilidade')
const db = { Walker, Cliente, Usuario, Contato, Pedido, Pagamento, FormaPagamento, DetalhePedido, Disponibilidade }

Object.keys(db).forEach(nomeModelo => {
    if (db[nomeModelo].associate) {
        db[nomeModelo].associate(db);
    }
});

db.Usuario.hasOne(db.Walker,{foreignKey:'id'});
db.Walker.belongsTo(db.Usuario,{foreignKey:'id'});
db.Usuario.hasOne(db.Cliente,{foreignKey:'id'});
db.Cliente.belongsTo(db.Usuario,{foreignKey:'id'});
db.Usuario.hasOne(db.Disponibilidade,{foreignKey:'id'});
db.Disponibilidade.belongsTo(db.Usuario,{foreignKey:'id'});
db.Usuario.hasOne(db.Pedido,{foreignKey:'id_usuario'});
db.Pedido.belongsTo(db.Usuario,{foreignKey:'id_usuario'});
db.Usuario.hasOne(db.FormaPagamento,{foreignKey:'id_usuario'});
db.FormaPagamento.belongsTo(db.Usuario,{foreignKey:'id_usuario'});
db.Pedido.hasOne(db.Pagamento,{foreignKey:'id_pedido'});
db.Pagamento.belongsTo(db.Pedido,{foreignKey:'id_pedido'});
db.Pedido.hasMany(db.DetalhePedido,{foreignKey:'id_pedido'});
db.DetalhePedido.belongsTo(db.Pedido,{foreignKey:'id_pedido'});

db.sequelize = require('../config/db')
db.Sequelize = require('sequelize')

module.exports = db;
