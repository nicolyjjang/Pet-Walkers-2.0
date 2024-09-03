const Walker = require('./walker')
const Cliente = require('./cliente')
const Usuario = require('./usuario')
const Contato = require('./contato')
const Pedido = require('./pedido')
const Pagamento = require('./pagamento')
const FormaPagamento = require('./formaPagamento')
const DetalhePedido = require('./detalhePedido')
const db = { Walker, Cliente, Usuario, Contato, Pedido, Pagamento, FormaPagamento, DetalhePedido }

Object.keys(db).forEach(nomeModelo => {
    if (db[nomeModelo].associate) {
        db[nomeModelo].associate(db);
    }
});

db.Usuario.hasOne(db.Walker, { foreignKey: 'id' });
db.Walker.belongsTo(db.Usuario, { foreignKey: 'id' });
db.Usuario.hasOne(db.Cliente, { foreignKey: 'id' });
db.Cliente.belongsTo(db.Usuario, { foreignKey: 'id' });

db.Pedido.hasOne(db.Usuario, { foreignKey: 'id' });
db.Usuario.belongsTo(db.Pedido, { foreignKey: 'id' });
db.Pagamento.hasOne(db.Pedido, { foreignKey: 'id' });
db.Pedido.belongsTo(db.Pagamento, { foreignKey: 'id' });
db.FormaPagamento.hasOne(db.Usuario, { foreignKey: 'id' });
db.Usuario.belongsTo(db.FormaPagamento, { foreignKey: 'id' });
db.Pedido.hasMany(db.DetalhePedido, { foreignKey: 'id' });
db.DetalhePedido.belongsTo(db.Pedido, { foreignKey: 'id' });
db.Pagamento.hasOne(db.FormaPagamento, { foreignKey: 'id' });
db.FormaPagamento.belongsTo(db.Pagamento, { foreignKey: 'id'});

db.sequelize = require('../config/db')
db.Sequelize = require('sequelize')

module.exports = db;
