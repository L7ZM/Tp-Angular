const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Livre = sequelize.define('Livre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titre: Sequelize.STRING,
    auteur: Sequelize.STRING
},
{
    tableName: "livres",
    timestamps: false
});

module.exports = Livre;

// const Pret = require('./pretsModel');
// Livre.hasMany(Pret, { foreignKey: 'id_livre' });
