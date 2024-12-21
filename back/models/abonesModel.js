const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Abonne = sequelize.define('Abonne', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    adresse: Sequelize.STRING
}, {
    tableName: "abonnes",
    timestamps: false
});

module.exports = Abonne;

