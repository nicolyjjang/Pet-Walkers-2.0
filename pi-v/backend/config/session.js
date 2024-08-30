const sequelize = require('./db');
const SequelizeStore = require('connect-session-sequelize')(require('express-session').Store);

// Criar Sessão
const sessionStore = new SequelizeStore({
    db: sequelize,
});

module.exports = sessionStore;