const Walker = require('./walker')
const Cliente = require('./cliente')
const Usuario = require('./usuario')
const Contato = require('./contato')
const db = { Walker, Cliente, Usuario, Contato }

Object.keys(db).forEach(nomeModelo => {
    if (db[nomeModelo].associate) {
        db[nomeModelo].associate(db);
    }
});

db.Usuario.hasOne(db.Walker, { foreignKey: 'id' });
db.Walker.belongsTo(db.Usuario, { foreignKey: 'id' });
db.Usuario.hasOne(db.Cliente, { foreignKey: 'id' });
db.Cliente.belongsTo(db.Usuario, { foreignKey: 'id' });

db.sequelize = require('../config/db')
db.Sequelize = require('sequelize')

module.exports = db;
