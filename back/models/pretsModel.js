const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Livre = require('./livresModel');
const Abonne = require('./abonesModel');

const Pret = sequelize.define('Pret', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date_pret: {
        type: Sequelize.DATE,
        allowNull: false
    },
    date_retour: {
        type: Sequelize.DATE
    },
    id_livre: {
        type: Sequelize.INTEGER,
        references: {
            model: Livre,
            key: 'id'
        }
    },
    id_abonne: {
        type: Sequelize.INTEGER,
        references: {
            model: Abonne,
            key: 'id'
        }
    }
}, {
    tableName: "prets",
    timestamps: false,
});

Livre.hasMany(Pret, { foreignKey: 'id_livre' });
Pret.belongsTo(Livre, { foreignKey: 'id_livre' });

Abonne.hasMany(Pret, { foreignKey: 'id_abonne' });
Pret.belongsTo(Abonne, { foreignKey: 'id_abonne' });

module.exports = Pret;
