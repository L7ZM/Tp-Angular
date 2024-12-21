const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuthUser = sequelize.define('AuthUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: {
            msg: 'Le nom existe déja. Veuillez en choisir un autre.'
        }
    },
    password: {
        type: DataTypes.STRING
    }
},
{
    tableName: "users",
    timestamps: false
});

module.exports = AuthUser;