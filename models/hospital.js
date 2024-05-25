// models/hospital.js
const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

const Hospital = connection.define('Hospital', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

module.exports = Hospital;
