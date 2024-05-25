const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

const Patient = connection.define('Patient', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    phone_number: { type: DataTypes.STRING, allowNull: false, validate: { len: [10] } },
    password: {
        type: DataTypes.STRING, allowNull: false,
    },
    photo: { type: DataTypes.STRING, allowNull: false },
    psychiatrist_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Psychiatrists',
            key: 'id'
        }
    }
});

module.exports = Patient;
